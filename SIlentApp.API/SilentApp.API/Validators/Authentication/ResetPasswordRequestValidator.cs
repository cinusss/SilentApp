using FluentValidation;
using SilentApp.API.Extensions;
using SilentApp.API.Models.AppWebsite.Request;

namespace SilentApp.API.Validators.Authentication
{
    public class ResetPasswordRequestValidator : AbstractValidator<ResetPasswordRequest>
    {
        public ResetPasswordRequestValidator()
        {
            RuleFor(m => m.OldPassword).NotEmpty().WithMessage("Bad request")
                .MinimumLength(6)
                .WithMessage("Bad request")
                .MaximumLength(40)
                .WithMessage("Bad request")
                .Must(password => UserExtensions.IsPasswordFormatCorrect(password))
                .WithMessage("Bad request");
            RuleFor(m => m.NewPassword).NotEmpty().WithMessage("Bad request")
                .MinimumLength(6)
                .WithMessage("Bad request")
                .MaximumLength(40)
                .WithMessage("Bad request")
                .Must(password => UserExtensions.IsPasswordFormatCorrect(password))
                .WithMessage("Bad request");
        }
    }
}
