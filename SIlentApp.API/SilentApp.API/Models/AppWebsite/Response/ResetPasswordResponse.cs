using static SilentApp.API.Data.Procedures;

namespace SilentApp.API.Models.AppWebsite.Response
{
    public class ResetPasswordResponse : DatabaseResult
    {
        [DbParameter]
        public string Refresh { get; set; }
        [DbIgnore]
        public string Token { get; set; }
    }
}
