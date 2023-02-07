using SilentApp.API.Models.ServiceModels;
using System.Threading.Tasks;

namespace SilentApp.API.Contracts
{
    public interface IEmailService
    {
        Task SendEmailAsync(EmailModel emailModel, string imageId);
    }
}
