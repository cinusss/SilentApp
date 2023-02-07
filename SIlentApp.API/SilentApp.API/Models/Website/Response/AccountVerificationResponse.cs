using static SilentApp.API.Data.Procedures;

namespace SilentApp.API.Models.Website.Response
{
    public class AccountVerificationResponse : DatabaseResult
    {
        [DbParameter]
        public string Message { get; set; }
    }
}
