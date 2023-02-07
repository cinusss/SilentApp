using Microsoft.AspNetCore.Mvc;
using static SilentApp.API.Data.Procedures;
using static SilentApp.API.Models.App.Response.UserInformationResponse;
using SilentApp.API.Models.App.Request;
using SilentApp.API.Models.App.Response;
using SilentApp.API.Contracts;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using SilentApp.API.Models.AppWebsite.Request;
using Microsoft.AspNetCore.Authorization;
using SilentApp.API.Extensions;

namespace SilentApp.API.Controllers
{
    public class SettingsController : BaseController
    {
        private readonly IProcedures _procedures;

        public SettingsController(IProcedures procedures)
        {
            _procedures = procedures;
        }

        [HttpGet]
        public IActionResult GetUserInformation()
        {
            UserInformationResponse result = _procedures.GetCollection<UserInformationResponse, UserInformationData>("A_ACCOUNT_INFORMATION_GET", new
            {
                USER_ID = User.GetUser()
            }, Convert.ToInt32(this.Request.Headers["ApplicationType"]), out List<UserInformationData> userInformationData);
            result.UserInformationDatas = userInformationData;

            if (result.StatusCode == 404)
            {
                return NotFound(result);
            }
            else if (result.StatusCode == 500)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok(result);
        }

        //[HttpPut]
        //public IActionResult AddSecondAccount([FromBody]AddSecondAccountRequest addSecondAccountRequest)
        //{
        //    SecondAccountResponse result = _procedures.Execute<SecondAccountResponse>("A_ACCOUNT_SECOND_ADD", new {
        //        USER_ID = User.GetUser(),
        //        INSTAGRAM_NAME_UPGRADE_IN = addSecondAccountRequest.InstagramNameUpgrade }, Convert.ToInt32(this.Request.Headers["ApplicationType"]));
        //    return Ok(result);
        //}

        //[HttpPut]
        //public IActionResult ChangeAccountType([FromBody]ChangeAccountTypeRequest changeAccountTypeRequest)
        //{
        //    DatabaseResult result = _procedures.Execute<DatabaseResult>("A_ACCOUNT_TYPE_UPDATE", new
        //    {
        //        USER_ID = User.GetUser(),
        //        ACCOUNT_TYPE = changeAccountTypeRequest.AccountType
        //    }, Convert.ToInt32(this.Request.Headers["ApplicationType"]));
        //    return Ok(result);
        //}

        [HttpDelete]
        public IActionResult DeleteAccount([FromBody] DeleteRequest deleteRequest)
        {
            DatabaseResult result = _procedures.Execute<DatabaseResult>("A_ACCOUNT_DELETE", new
            {
                USER_ID = User.GetUser(),
                PASSWORD = deleteRequest.Password
            }, Convert.ToInt32(this.Request.Headers["ApplicationType"]));
            if (result.StatusCode == 404)
            {
                return NotFound(result);
            }
            else if (result.StatusCode == 500)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok(result);
        }
    }
}