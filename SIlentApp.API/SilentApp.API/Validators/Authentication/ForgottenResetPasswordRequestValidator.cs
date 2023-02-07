using FluentValidation;
using SilentApp.API.Extensions;
using SilentApp.API.Models.Website.Request;

namespace SilentApp.API.Validators.Authentication
{
    public class ForgottenResetPasswordRequestValidator : AbstractValidator<ForgottenResetPasswordRequest>
    {
        public ForgottenResetPasswordRequestValidator()
        {
            RuleFor(m => m.Guid).NotEmpty().WithMessage("Bad request");
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
