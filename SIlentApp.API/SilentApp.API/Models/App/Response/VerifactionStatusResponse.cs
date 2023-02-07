using static SilentApp.API.Data.Procedures;

namespace SilentApp.API.Models.App.Response
{
    public class VerifactionStatusResponse : DatabaseResult
    {
        [DbParameter]
        public bool IsVerified { get; set; }
    }
}
