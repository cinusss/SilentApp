namespace SilentApp.API.Models.Website.Request
{
    public class ForgottenResetPasswordRequest
    {
        public string Guid { get; set; }
        public string Password { get; set; }
    }
}
