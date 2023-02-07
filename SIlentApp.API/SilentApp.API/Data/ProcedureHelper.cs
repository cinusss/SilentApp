using System;
using System.Collections.Generic;
using System.Data;

namespace SilentApp.API.Data
{
    public class ProcedureHelper
    {
        private static Dictionary<Type, SqlDbType> typeConverter;

        static ProcedureHelper()
        {
            typeConverter = new Dictionary<Type, SqlDbType>
            {
                [typeof(string)] = SqlDbType.VarChar,
                [typeof(string)] = SqlDbType.NVarChar,
                [typeof(char[])] = SqlDbType.VarChar,
                [typeof(byte)] = SqlDbType.TinyInt,
                [typeof(short)] = SqlDbType.SmallInt,
                [typeof(int)] = SqlDbType.Int,
                [typeof(long)] = SqlDbType.BigInt,
                [typeof(byte[])] = SqlDbType.VarBinary,
                [typeof(bool)] = SqlDbType.Bit,
                [typeof(DateTime)] = SqlDbType.DateTime2,
                [typeof(DateTimeOffset)] = SqlDbType.DateTimeOffset,
                [typeof(decimal)] = SqlDbType.Decimal,
                [typeof(float)] = SqlDbType.Real,
                [typeof(double)] = SqlDbType.Float,
                [typeof(TimeSpan)] = SqlDbType.Time,
                [typeof(Guid)] = SqlDbType.UniqueIdentifier,
                [typeof(char)] = SqlDbType.Char,
                [typeof(DataTable)] = SqlDbType.Structured
            };
        }

        public static SqlDbType GetDatabaseType(Type type)
        {
            type = Nullable.GetUnderlyingType(type) ?? type;
            if(typeConverter.ContainsKey(type))
            {
                return typeConverter[type];
            }
            else if(type.IsClass)
            {
                return SqlDbType.Xml;
            }
            throw new ArgumentException($"{type.FullName} is not a supported .NET class");
        }

        public static SqlDbType GetDatabaseType<T>()
        {
            return GetDatabaseType(typeof(T));
        }
    }
}
