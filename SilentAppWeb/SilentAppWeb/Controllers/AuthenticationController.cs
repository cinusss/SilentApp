using Microsoft.AspNetCore.Mvc;
using SilentAppWeb.Contracts;
using SilentAppWeb.Models.Request;
using SilentAppWeb.ViewModels;
using System;
using System.Threading.Tasks;

namespace SilentAppWeb.Controllers
{
    public class AuthenticationController : Controller
    {
        private readonly IAuthentication _authentication;
        public AuthenticationController(IAuthentication authentication)
        {
            _authentication = authentication;       
        }
        public IActionResult ChangePasswordConfirmation()
        {
            return View("ChangePasswordConfirmation");
        }
        public IActionResult ChangePassword(string id)
        {
            ViewBag.Guid = id;
            return View("ChangePassword");
        }

        [HttpGet]
        public async Task<IActionResult> ActivationConfirmation(string id)
        {
            Guid _guid = new Guid();
            if (!Guid.TryParse(id, out _guid))
            {
                return View("ActivationConfirmation", new ActivationConfirmationModel() { 
                    StatusCode = 400,
                    Message = "Nieprawidłowy link. Upewnij się, że link aktywacyjny został poprawnie skopiowany."
                });
            }

            var result = await _authentication.ActivationConfirmation(new ActivationConfirmationRequest()
            {
                Guid = id
            });

            return View("ActivationConfirmation", new ActivationConfirmationModel());
        }

        [HttpPost]
        public async Task<IActionResult> ChangePasswordConfirmation(ResetPasswordViewModel resetPasswordViewModel)
        {
            if(ModelState.IsValid)
            {
                var result = await _authentication.ChangePasswordConfirmation(new ChangePasswordConfirmationRequest
                {
                    Guid = resetPasswordViewModel.Guid,
                    Password = resetPasswordViewModel.Password
                });
                if(result != null)
                {
                    resetPasswordViewModel.ValidationMessage = result.ReturnMessage;
                    return PartialView("_ChangePasswordForm", resetPasswordViewModel);
                }
                return Json(new { status = true, url = Url.Action("ChangePasswordConfirmation", "Authentication") });
            }
            return PartialView("_ChangePasswordForm", resetPasswordViewModel);
        }
    }
}