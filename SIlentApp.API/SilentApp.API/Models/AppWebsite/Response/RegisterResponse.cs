using static SilentApp.API.Data.Procedures;

namespace SilentApp.API.Models.AppWebsite.Response
{
    
    public class RegisterResponse : DatabaseResult
    {

        [DbParameter]
        public int UserId { get; set; }

        [DbParameter]
        public string Refresh { get; set; }
        [DbIgnore]
        public string Token { get; set; }
    }
}
