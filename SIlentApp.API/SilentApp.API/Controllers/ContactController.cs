using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SilentApp.API.Contracts;
using SilentApp.API.Extensions;
using SilentApp.API.Models.AppWebsite.Request;
using SilentApp.API.Models.ServiceModels;
using System;
using static SilentApp.API.Data.Procedures;

namespace SilentApp.API.Controllers
{
    public class ContactController : BaseController
    {
        private readonly IProcedures _procedures;
        private readonly IEmailService _emailService;

        public ContactController(IProcedures procedures, IEmailService emailService)
        {
            _procedures = procedures;
            _emailService = emailService;
        }
        //Dodać dodatkowy endpoing na strone internetowa dla niezalogowanych i zmienic model contactRequest, wywalic email, może wywalić source

        [HttpPost]
        public IActionResult AddMessage([FromBody]ContactRequest contactRequest)
        {
            EmailModel result = _procedures.Execute<EmailModel>("AW_MESSAGE_ADD", new
            {
                USER_ID = User.GetUser(),
                TITLE = contactRequest.Title,
                MESSAGE_TEXT = contactRequest.MessageText,
                EMAIL = contactRequest.Email,
                SOURCE = contactRequest.SourceId
            }, Convert.ToInt32(this.Request.Headers["ApplicationType"]));
            if (result.StatusCode == 500)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            _emailService.SendEmailAsync(result, null);

            return StatusCode(StatusCodes.Status201Created, result);
        }
    }
}