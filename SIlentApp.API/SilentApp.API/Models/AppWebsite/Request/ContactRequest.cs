namespace SilentApp.API.Models.AppWebsite.Request
{
    public class ContactRequest
    {
        public string Title { get; set; }
        public string Email { get; set; }
        public string MessageText { get; set; }
        public int SourceId { get; set; }
    }
}
