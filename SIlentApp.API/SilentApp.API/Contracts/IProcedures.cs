using System.Collections.Generic;

namespace SilentApp.API.Contracts
{
    public interface IProcedures
    {
        T Execute<T>(string name, object parametersIn, int applicationType) where T : new();
        T GetCollection<T, V>(string name, object parametersIn, int applicationType, out List<V> items) where T : new() where V : new();
    }
}
