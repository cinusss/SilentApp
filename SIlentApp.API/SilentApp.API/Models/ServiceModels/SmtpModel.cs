namespace SilentApp.API.Models.ServiceModels
{
    public class SmtpModel
    {
        public string User { get; set; }
        public string Secret { get; set; }
        public int Port { get; set; }
        public string Host { get; set; }
    }
}
