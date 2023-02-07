using FluentValidation;
using SilentApp.API.Extensions;
using SilentApp.API.Models.AppWebsite.Request;

namespace SilentApp.API.Validators.Settings
{
    public class DeleteRequestValidator : AbstractValidator<DeleteRequest>
    {
        public DeleteRequestValidator()
        {
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
