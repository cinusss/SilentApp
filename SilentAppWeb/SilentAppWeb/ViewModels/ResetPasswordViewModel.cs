using FluentValidation.Attributes;
using SilentAppWeb.Validators;

namespace SilentAppWeb.ViewModels
{
    [Validator(typeof(ResetPasswordValidator))]
    public class ResetPasswordViewModel
    {
        public string Password { get; set; }
        public string PasswordRepeat { get; set; }
        public string Guid { get; set; }
        public string ValidationMessage { get; set; }
    }
}
