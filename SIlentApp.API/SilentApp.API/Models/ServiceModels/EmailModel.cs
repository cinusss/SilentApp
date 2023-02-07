using static SilentApp.API.Data.Procedures;

namespace SilentApp.API.Models.ServiceModels
{
    public class EmailModel : DatabaseResult
    {
        [DbParameter]
        public string User { get; set; }
        [DbParameter]
        public string Secret { get; set; }
        [DbParameter]
        public int Port { get; set; }
        [DbParameter]
        public string Host { get; set; }
        [DbParameter]
        public string RecipientEmails { get; set; }
        [DbParameter]
        public string SenderEmail { get; set; }
        [DbParameter]
        public string Subject { get; set; }
        [DbParameter]
        public string Body { get; set; }
        [DbParameter]
        public string CcRecipentEmails { get; set; }
        [DbParameter]
        public string BccRecipentEmails { get; set; }
    }
}
