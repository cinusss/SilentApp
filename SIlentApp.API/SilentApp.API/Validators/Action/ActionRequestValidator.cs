using FluentValidation;
using SilentApp.API.Models.App.Request;

namespace SilentApp.API.Validators.Action
{
    public class ActionRequestValidator : AbstractValidator<AddActionRequest>
    {
        public ActionRequestValidator()
        {
            RuleFor(m => m.ActionDate).NotEmpty().WithMessage("Bad request");
        }
    }
}
