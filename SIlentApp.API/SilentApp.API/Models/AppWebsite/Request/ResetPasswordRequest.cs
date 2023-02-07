namespace SilentApp.API.Models.AppWebsite.Request
{
    public class ResetPasswordRequest 
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
