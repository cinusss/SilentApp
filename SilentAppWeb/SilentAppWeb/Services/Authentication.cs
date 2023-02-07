using Microsoft.Extensions.Configuration;
using SilentAppWeb.Constants;
using SilentAppWeb.Contracts;
using SilentAppWeb.Models;
using SilentAppWeb.Models.Request;
using SilentAppWeb.Models.Response;
using System;
using System.Threading.Tasks;

namespace SilentAppWeb.Services
{
    public class Authentication : IAuthentication
    {
        private readonly IGenericRepository _genericRepository;
        private readonly IConfiguration _configuration;
        private string _apiUrl;
        public Authentication(IGenericRepository genericRepository, IConfiguration configuration)
        {
            _genericRepository = genericRepository;
            _configuration = configuration;
            _apiUrl = _configuration.GetSection("api").Value;
        }

        public async Task<ActivationConfirmationResponse> ActivationConfirmation(ActivationConfirmationRequest activationConfirmationRequest)
        {
            UriBuilder builder = new UriBuilder(_apiUrl)
            {
                Path = string.Format(ApiConstants.AccountVerificationEndpoint, activationConfirmationRequest.Guid)
            };

            return await _genericRepository.PutAsync<ActivationConfirmationRequest, ActivationConfirmationResponse>(builder.ToString(), activationConfirmationRequest);
        }

        public async Task<ModelBase> ChangePasswordConfirmation(ChangePasswordConfirmationRequest changePasswordConfirmationRequest)
        {
            UriBuilder builder = new UriBuilder(_apiUrl)
            {
                Path = ApiConstants.ChangePasswordEndpoint
            };

            return await _genericRepository.PostAsync<ChangePasswordConfirmationRequest, ModelBase>(builder.ToString(), changePasswordConfirmationRequest);
        }
    }
}
