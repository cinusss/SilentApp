using System.Threading.Tasks;

namespace SilentAppWeb.Contracts
{
    public interface IGenericRepository
    {
        Task<TR> PostAsync<T, TR>(string uri, T data, string authToken = "");
        Task<TR> PutAsync<T, TR>(string uri, T data, string authToken = "");
    }
}
