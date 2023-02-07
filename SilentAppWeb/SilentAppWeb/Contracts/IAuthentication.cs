using SilentAppWeb.Models;
using SilentAppWeb.Models.Request;
using SilentAppWeb.Models.Response;
using System.Threading.Tasks;

namespace SilentAppWeb.Contracts
{
    public interface IAuthentication
    {
        Task<ActivationConfirmationResponse> ActivationConfirmation(ActivationConfirmationRequest activationConfirmationRequest);
        Task<ModelBase> ChangePasswordConfirmation(ChangePasswordConfirmationRequest changePasswordConfirmationRequest);
    }
}
