using FluentValidation;
using SilentApp.API.Models.App.Request;

namespace SilentApp.API.Validators.Link
{
    public class LinkRequestValidator : AbstractValidator<AddLinkRequest>
    {
        public LinkRequestValidator()
        {
            RuleFor(m => m.Link).NotEmpty().WithMessage("Bad request");
            RuleFor(m => m.GroupId).NotEmpty().WithMessage("Bad request");
        }
    }
}
