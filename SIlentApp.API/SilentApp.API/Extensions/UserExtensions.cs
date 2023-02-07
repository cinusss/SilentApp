using System.Linq;
using System.Security.Claims;

namespace SilentApp.API.Extensions
{
    public static class UserExtensions
    {
        public static int? GetUser(this ClaimsPrincipal @this)
        {
            var sub = @this.Claims.SingleOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
            return string.IsNullOrEmpty(sub) ? (int?)null : int.Parse(sub);
        }

        public static bool IsPasswordFormatCorrect(string password)
        {
            return (password.Any(c => char.IsDigit(c)) && password.Any(c => char.IsUpper(c)));
        }
    }
}
