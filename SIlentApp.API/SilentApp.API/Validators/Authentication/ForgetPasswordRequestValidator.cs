using FluentValidation;
using SilentApp.API.Models.AppWebsite.Request;

namespace SilentApp.API.Validators.Authentication
{
    public class ForgetPasswordRequestValidator : AbstractValidator<ForgottenPasswordRequest>
    {
        public ForgetPasswordRequestValidator()
        {
            RuleFor(m => m.Email).NotEmpty().WithMessage("Bad request").EmailAddress().WithMessage("Bad request");
        }
    }
}
