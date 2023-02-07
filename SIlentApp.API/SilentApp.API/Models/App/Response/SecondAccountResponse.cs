using static SilentApp.API.Data.Procedures;

namespace SilentApp.API.Models.App.Response
{
    public class SecondAccountResponse : DatabaseResult
    {
        [DbParameter]
        public string InstagramNameUpgrade { get; set; }
    }
}
