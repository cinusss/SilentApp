using Microsoft.Extensions.Configuration;
using SilentApp.API.Contracts;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Xml;
using System.Xml.Serialization;

namespace SilentApp.API.Data
{
    public class Procedures : IProcedures
    {
        private readonly IConfiguration _configuration;
        private readonly string _providerGuid;

        public Procedures(IConfiguration configuration)
        {
            _configuration = configuration;
            _providerGuid = _configuration.GetSection("ProviderGuid").Value;
        }

        public T Execute<T>(string name, object parametersIn, int applicationType) where T : new()
        {
            T parametersOut = new T();
            using (var cmd = PrepareCommand(name, parametersIn, applicationType, parametersOut))
            {
                cmd.Connection.Open();
                cmd.ExecuteNonQuery();
                cmd.Connection.Close();
                ParseResult(parametersOut, cmd);
            }
            return parametersOut;
        }

        public T GetCollection<T, V>(string name, object parametersIn, int applicationType, out List<V> items) where T : new() where V : new()
        {
            T result = new T();
            items = new List<V>();

            using (var cmd = PrepareCommand(name, parametersIn, applicationType, result))
            {
                using (var data = new SqlDataAdapter(cmd))
                {
                    cmd.Connection.Open();
                    try
                    {
                        using var reader = cmd.ExecuteReader();

                        while (reader.Read())
                        {
                            V item = new V();
                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                var columnName = reader.GetName(i);
                                item.TrySetValue(columnName, reader[i]);
                            }
                            items.Add(item);
                        }
                    }
                    catch(Exception ex)
                    {
                        var e = ex;
                    }
                }
                cmd.Connection.Close();
                ParseResult(result, cmd);
            }
            return result;
        }

        private void ParseResult<T>(T parametersOut, SqlCommand cmd) where T : new()
        {
            var properties = GetDatebaseProperties(parametersOut);
            foreach(var item in properties)
            {
                var value = cmd.Parameters[string.Format("@{0}", item.Name)].Value;
                parametersOut.TrySetValue(item.Name, value);
            }
        }

        private SqlCommand PrepareCommand(string name, object parametersIn, int applicationType, object parametersOut)
        {
            SqlCommand cmd = new SqlCommand(name)
            {
                CommandType = System.Data.CommandType.StoredProcedure
            };

            if (parametersIn != null)
            {
                if (applicationType == 1)
                {
                    cmd.Connection = new SqlConnection
                    {
                        ConnectionString = _configuration.GetConnectionString("MobileConnection")
                    };
                }
                if (applicationType == 2)
                {
                    cmd.Connection = new SqlConnection
                    {
                        ConnectionString = _configuration.GetConnectionString("WebsiteConnection")
                    };
                }
                var properties = GetDatebaseProperties(parametersIn);

                if(!properties.Exists(x => x.Name == "PROVIDER_GUID"))
                {
                    cmd.Parameters.Add("@PROVIDER_GUID", SqlDbType.UniqueIdentifier).Value = new Guid(_providerGuid);
                }

                foreach (var item in properties)
                {
                    var type = ProcedureHelper.GetDatabaseType(item.PropertyType);
                    var value = parametersIn.GetType().GetProperty(item.Name).GetValue(parametersIn, null);

                    if (type == SqlDbType.VarChar || type == SqlDbType.VarBinary || type == SqlDbType.NVarChar)
                    {
                        cmd.Parameters.Add(string.Format("@{0}", item.Name), type, -1).Value = value;
                    }
                    else if(type == SqlDbType.Xml)
                    {
                        var serializer = new XmlSerializer(item.PropertyType);
                        StringBuilder builder = new StringBuilder();
                        using (var writer = XmlWriter.Create(builder, new XmlWriterSettings() { OmitXmlDeclaration = true }))
                        {
                            serializer.Serialize(writer, value);
                        }
                        cmd.Parameters.Add(string.Format("@{0}", item.Name), type).Value = builder.ToString();
                    }
                    else
                    {
                        cmd.Parameters.Add(string.Format("@{0}", item.Name), type).Value = value;
                    }
                }
            }

            if (parametersOut != null)
            {
                var properties = GetDatebaseProperties(parametersOut);
                foreach (var item in properties)
                {
                    var type = ProcedureHelper.GetDatabaseType(item.PropertyType);
                    SqlParameter param;

                    if(type == SqlDbType.VarChar || type == SqlDbType.VarBinary || type == SqlDbType.NVarChar)
                    {
                        param = new SqlParameter(string.Format("@{0}", item.Name), type, -1);
                    }
                    else
                    {
                        param = new SqlParameter(string.Format("@{0}", item.Name), type);
                    }

                    param.Direction = ParameterDirection.Output;
                    var value = parametersOut.GetType().GetProperty(item.Name).GetValue(parametersOut, null);
                    param.Value = value;
                    cmd.Parameters.Add(param);
                }
            }
            return cmd;
        }

        private List<PropertyInfo> GetDatebaseProperties(object instance)
        {
            List<PropertyInfo> properties = new List<PropertyInfo>();
            if (!Attribute.IsDefined(instance.GetType(), typeof(DbParameter)))
            {
                properties = instance.GetType().GetProperties().Where(x => Attribute.IsDefined(x, typeof(DbParameter))
                || instance.GetType().Namespace == null).ToList();
            }
            else
            {
                properties = instance.GetType().GetProperties().Where(x => !Attribute.IsDefined(x, typeof(DbIgnore))).ToList();
            }
            return properties;
        }

        public class DatabaseResult
        {
            [DbParameter]
            public int StatusCode { get; set; }

            [DbParameter]
            public string ReturnMessage { get; set; }
        }

        public class ItemsResult<T, V> where V : DatabaseResult
        {
            public V Result { get; set; }
            public List<T> Items { get; set; }
        }

        public class DbParameter : Attribute { }
        public class DbIgnore : Attribute { }
    }
}
