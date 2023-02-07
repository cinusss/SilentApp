using FluentValidation;
using SilentApp.API.Extensions;
using SilentApp.API.Models.AppWebsite.Request;

namespace SilentApp.API.Validators.Authentication
{
    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterRequestValidator()
        {
            RuleFor(m => m.Email).NotEmpty().WithMessage("Bad request").EmailAddress().WithMessage("Bad request");
            RuleFor(m => m.AccountName).NotEmpty().WithMessage("Bad request").MinimumLength(4)
                .WithMessage("Bad request")
                .MaximumLength(28)
                .WithMessage("Bad request");
            RuleFor(m => m.Password).NotEmpty().WithMessage("Bad request")
                .MinimumLength(6)
                .WithMessage("Bad request")
                .MaximumLength(40)
                .WithMessage("Bad request")
                .Must(password => UserExtensions.IsPasswordFormatCorrect(password))
                .WithMessage("Bad request");
        }


    }
}
