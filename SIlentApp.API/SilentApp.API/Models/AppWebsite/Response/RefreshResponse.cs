using static SilentApp.API.Data.Procedures;

namespace SilentApp.API.Models.AppWebsite.Response
{
    public class RefreshResponse : DatabaseResult
    {
        [DbParameter]
        public string RefreshOut { get; set; }
        [DbIgnore]
        public string Token { get; set; }
    }
}
