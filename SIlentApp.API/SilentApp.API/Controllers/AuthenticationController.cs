using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SilentApp.API.Auth;
using SilentApp.API.Contracts;
using SilentApp.API.Enumerators;
using SilentApp.API.Extensions;
using SilentApp.API.Helpers;
using SilentApp.API.Models.App.Response;
using SilentApp.API.Models.AppWebsite.Request;
using SilentApp.API.Models.AppWebsite.Response;
using SilentApp.API.Models.ServiceModels;
using SilentApp.API.Models.Website.Request;
using SilentApp.API.Models.Website.Response;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static SilentApp.API.Data.Procedures;

namespace SilentApp.API.Controllers
{
    public class AuthenticationController : BaseController
    {
        private readonly IProcedures _procedures;
        private readonly JwtSettings _jwtSettings;
        private readonly IEmailService _emailService;

        public AuthenticationController(IProcedures procedures, IOptionsSnapshot<JwtSettings> jwtSettings, IEmailService emailService)
        {
            _procedures = procedures;
            _jwtSettings = jwtSettings.Value;
            _emailService = emailService;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody]LoginRequest loginRequest)
        {
            LoginResponse result = _procedures.Execute<LoginResponse>("AW_LOGIN", new {
                ACCOUNT_NAME = loginRequest.AccountName,
                PASSWORD = loginRequest.Password,
                APPLICATION_TYPE = Convert.ToInt32(this.Request.Headers["ApplicationType"])
            }, Convert.ToInt32(this.Request.Headers["ApplicationType"]));
            if (result.StatusCode == 500)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            if (result.StatusCode == 401)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, result);
            }

            result.Token = GenerateJwt(new User() { UserId = result.UserId });
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Register([FromBody]RegisterRequest registerRequest)
        {
            RegisterResponse result = _procedures.Execute<RegisterResponse>("AW_ACCOUNT_REGISTER", new {
                ACCOUNT_NAME = registerRequest.AccountName,
                PASSWORD = registerRequest.Password,
                EMAIL = registerRequest.Email,
                APPLICATION_TYPE = Convert.ToInt32(this.Request.Headers["ApplicationType"])
                //TERMS_CONSENT = registerRequest.TermsConsent,
                //MARKETING_CONSENT = registerRequest.MarketingConsent
            }, Convert.ToInt32(this.Request.Headers["ApplicationType"]));
            if (result.StatusCode == 500)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            if (result.StatusCode == 400)   
            {
                return BadRequest(result);
            }
            result.Token = GenerateJwt(new User() { UserId = result.UserId });
            return StatusCode(StatusCodes.Status201Created, result);
        }

        [HttpPost]
        public IActionResult RegisterDetailed([FromBody]RegisterDetailedRequest registerDetailedRequest)
        {
            DatabaseResult result = _procedures.Execute<DatabaseResult>("AW_ACCOUNT_DETAILED_INFO_ADD", new
            {
                USER_ID = User.GetUser(),
                INSTAGRAM_NAME = registerDetailedRequest.InstagramName,
                NATIONALITY = NationalityMapper.MapNationality((Nationality) Enum.Parse(typeof(Nationality), registerDetailedRequest.Nationality)),
                GENDER = GenderMapper.MapGender((Gender) Enum.Parse(typeof(Gender), registerDetailedRequest.Gender)),
                BIRTHDAY_YEAR = registerDetailedRequest.BirthYear,
            }, Convert.ToInt32(this.Request.Headers["ApplicationType"]));
            if (result.StatusCode == 404)
            {
                return NotFound(result);
            }
            if (result.StatusCode == 500)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            if (result.StatusCode == 400)
            {
                return BadRequest(result);
            }
            return StatusCode(StatusCodes.Status201Created, result);
        }

        [HttpGet]
        public IActionResult CheckVerifcationStatus()
        {
            VerifactionStatusResponse result = _procedures.Execute<VerifactionStatusResponse>("A_VERIFICATION_STATUS_GET", new {
                USER_ID = User.GetUser(),
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

        [HttpPost]
        public IActionResult ResetPassword([FromBody]ResetPasswordRequest resetPasswordRequest)
        {
            ResetPasswordResponse result = _procedures.Execute<ResetPasswordResponse>("AW_ACCOUNT_PASSWORD_RESET", new {
                USER_ID = User.GetUser(),
                OLD_PASSWORD = resetPasswordRequest.OldPassword,
                NEW_PASSWORD = resetPasswordRequest.NewPassword,
                APPLICATION_TYPE = Convert.ToInt32(this.Request.Headers["ApplicationType"])
            }, Convert.ToInt32(this.Request.Headers["ApplicationType"]));

            if (result.StatusCode == 404)
            {
                return NotFound(result);
            }
            if (result.StatusCode == 500)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            if (result.StatusCode == 400)
            {
                return BadRequest(result);
            }
            result.Token = GenerateJwt(new User() { UserId = (int)User.GetUser() });
            return StatusCode(StatusCodes.Status201Created, result);
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult ForgottenResetPassword([FromBody] ForgottenResetPasswordRequest forgottenResetPasswordRequest)
        {
            Guid _guid;
            if (!Guid.TryParse(forgottenResetPasswordRequest.Guid, out _guid))
            {
                return BadRequest(new DatabaseResult()
                {
                    ReturnMessage = "Link do zmiany hasła jest nieprawidłowy. Upewnij się czy został poprawnie skopiowany.",
                    StatusCode = 400
                });
            }

            DatabaseResult result = _procedures.Execute<DatabaseResult>("W_ACCOUNT_FORGOTTEN_PASSWORD_RESET", new
            {
                GUID = _guid,
                PASSWORD = forgottenResetPasswordRequest.Password
            }, Convert.ToInt32(this.Request.Headers["ApplicationType"]));

            if (result.StatusCode == 404)
            {
                return NotFound(result);
            }
            if (result.StatusCode == 500)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

           

            return StatusCode(StatusCodes.Status204NoContent);
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult ForgottenPassword([FromBody]ForgottenPasswordRequest forgottenPasswordRequest)
        {
            EmailModel result = _procedures.Execute<EmailModel>("AW_ACCOUNT_PASSWORD_FORGOTTEN", new
            {
                EMAIL = forgottenPasswordRequest.Email
            }, Convert.ToInt32(this.Request.Headers["ApplicationType"]));
            if (result.StatusCode == 500)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            _emailService.SendEmailAsync(result, "SilentApp.PNG");

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPut("{guid}")]
        public IActionResult AccountVerification(string guid)
        {
            Guid _guid = new Guid();
            if(!Guid.TryParse(guid, out _guid))
            {
                return BadRequest(new AccountVerificationResponse()
                {
                    Message = "Nieprawidłowy link",
                    StatusCode = 400
                });;
            }

            AccountVerificationResponse result = _procedures.Execute<AccountVerificationResponse>("W_ACCOUNT_VERIFCATION", new
            {
                GUID = _guid
            }, Convert.ToInt32(this.Request.Headers["ApplicationType"]));
            if (result.StatusCode == 500)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            if (result.StatusCode == 400)
            {
                return BadRequest(result);
            }
            return StatusCode(StatusCodes.Status204NoContent);
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Refresh([FromBody] RefreshRequest refreshRequest)
        {
            RefreshResponse result = _procedures.Execute<RefreshResponse>("AW_REFRESH", new
            {
                USER_ID = refreshRequest.UserId,
                REFRESH = this.Request.Headers["Refresh"].ToString(),
                APPLICATION_TYPE = Convert.ToInt32(this.Request.Headers["ApplicationType"])
            }, Convert.ToInt32(this.Request.Headers["ApplicationType"]));
            if (result.StatusCode == 500)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            if (result.StatusCode == 401)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, result);
            }
            result.Token = GenerateJwt(new User() { UserId = refreshRequest.UserId });
            return StatusCode(StatusCodes.Status202Accepted, result);
        }

        private string GenerateJwt(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_jwtSettings.ExpirationInDays));

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Issuer,
                claims,
                expires: expires,
                signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
