using FluentValidation;
using SilentApp.API.Enumerators;
using SilentApp.API.Models.AppWebsite.Request;
using System;

namespace SilentApp.API.Validators.Authentication
{
    public class RegisterDetailedRequestValidator : AbstractValidator<RegisterDetailedRequest>
    {
        public RegisterDetailedRequestValidator()
        {
            RuleFor(m => m.InstagramName).NotEmpty().WithMessage("Bad request").MaximumLength(30).WithMessage("Bad request");
            RuleFor(m => m.Nationality).NotEmpty().WithMessage("Bad request").Must(nat => Enum.IsDefined(typeof(Nationality), nat)).WithMessage("Bad request");
            RuleFor(m => m.Gender).NotEmpty().WithMessage("Bad request").Must(gen => Enum.IsDefined(typeof(Gender), gen)).WithMessage("Bad request");
            RuleFor(m => m.BirthYear).NotEmpty().WithMessage("Bad request").GreaterThan(1900).WithMessage("Bad request");          
        }
    }
}
