using FluentValidation;
using SilentAppWeb.ViewModels;
using System.Linq;

namespace SilentAppWeb.Validators
{
    public class ResetPasswordValidator : AbstractValidator<ResetPasswordViewModel>
    {
        public ResetPasswordValidator()
        {
            RuleFor(m => m.Password)
                .NotNull()
                .WithMessage("Proszę o podanie hasła")
                .NotEmpty()
                .WithMessage("Proszę o podanie hasła")
                .MinimumLength(6)
                .WithMessage("Hasło powinno składać się z min. 6 znaków")
                .MaximumLength(40)
                .WithMessage("Hasło powinno składać się z max. 40 znaków")
                .Must(IsPasswordCorrect)
                .WithMessage("Hasło powinno składać się z co najmniej jednej dużej litery oraz jednej cyfry");
            RuleFor(m => m.PasswordRepeat)
                .NotNull()
                .WithMessage("Proszę o podanie hasła")
                .NotEmpty()
                .WithMessage("Proszę o podanie hasła")
                .Equal(m => m.Password)
                .WithMessage("Hasła powinny być takie same");
        }

        public bool IsPasswordCorrect(string password)
        {
            if (password == null)
                return false;
            return (password.Any(c => char.IsDigit(c)) && password.Any(c => char.IsUpper(c)));
        }
    }
}
