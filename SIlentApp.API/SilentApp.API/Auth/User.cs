using Microsoft.AspNetCore.Identity;

namespace SilentApp.API.Auth
{
    public class User : IdentityUser<int>
    {
        public int UserId { get; set; }
    }
}
