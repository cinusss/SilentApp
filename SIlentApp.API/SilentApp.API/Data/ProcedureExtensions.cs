using System;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace SilentApp.API.Data
{
    public static class ProcedureExtensions
    {
        public static bool TrySetValue(this object instance, string propertyName, object value)
        {
            if(value != DBNull.Value)
            {
                var properties = instance.GetType().GetProperty(propertyName);
                var dec = properties.DeclaringType;
                if(properties != null && (properties.PropertyType.IsPrimitive || properties.PropertyType.IsValueType 
                    || properties.PropertyType == typeof(string) || 
                    (properties.PropertyType.IsGenericType && properties.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>))))
                {
                    properties.SetValue(instance, value);
                }
                else if (properties.PropertyType.Name == "Byte[]")
                {
                    properties.SetValue(instance, value);
                }
                else
                {
                    try
                    {
                        var document = XDocument.Parse(value as string);
                        var serializer = new XmlSerializer(properties.PropertyType);
                        using (var reader = document.CreateReader())
                        {
                            properties.SetValue(instance, serializer.Deserialize(reader));
                        }
                    }
                    catch(Exception ex)
                    {
                        return false;
                    }
                }
                return true;
            }
            return true;
        }
    }
}
