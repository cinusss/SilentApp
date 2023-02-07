using FluentValidation;
using SilentApp.API.Models.AppWebsite.Request;

namespace SilentApp.API.Validators.Contact
{
    public class ContactRequestValidator : AbstractValidator<ContactRequest>
    {
        public ContactRequestValidator()
        {
            RuleFor(m => m.Title).NotEmpty().WithMessage("Bad request");
            RuleFor(m => m.MessageText).NotEmpty().WithMessage("Bad request").MinimumLength(10)
                .WithMessage("Bad request")
                .MaximumLength(300)
                .WithMessage("Bad request");
        }
    }
}
