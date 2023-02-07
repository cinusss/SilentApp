namespace SilentApp.API.Models.AppWebsite.Request
{
    public class RegisterRequest
    {
        public string AccountName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        //public bool TermsConsent { get; set; }
        //public bool MarketingConsent { get; set; }
    }
}
