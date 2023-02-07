using FluentValidation;
using SilentApp.API.Extensions;
using SilentApp.API.Models.AppWebsite.Request;

namespace SilentApp.API.Validators.Authentication
{
    public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {
        public LoginRequestValidator()
        {
            RuleFor(m => m.AccountName).NotEmpty().WithMessage("Wprowadź prawidłowy login lub hasło, aby zalogować się.").MinimumLength(4)
                .WithMessage("Wprowadź prawidłowy login lub hasło, aby zalogować się.")
                .MaximumLength(28)
                .WithMessage("Wprowadź prawidłowy login lub hasło, aby zalogować się.");
            RuleFor(m => m.Password).NotEmpty().WithMessage("Wprowadź prawidłowy login lub hasło, aby zalogować się.")
                .MinimumLength(6)
                .WithMessage("Wprowadź prawidłowy login lub hasło, aby zalogować się.")
                .MaximumLength(40)
                .WithMessage("Wprowadź prawidłowy login lub hasło, aby zalogować się.")
                .Must(password => UserExtensions.IsPasswordFormatCorrect(password))
                .WithMessage("Wprowadź prawidłowy login lub hasło, aby zalogować się.");
        }
    }
}
