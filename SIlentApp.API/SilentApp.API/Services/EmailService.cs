using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MimeKit.Utils;
using SilentApp.API.Contracts;
using SilentApp.API.Models.ServiceModels;
using System;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SilentApp.API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
       public async Task SendEmailAsync(EmailModel emailModel, string imageId)
       {
            var mailMessage = CreateEmailMessage(emailModel, imageId);

            SmtpModel smtpModel = new SmtpModel()
            {
                Host = emailModel.Host,
                Port = emailModel.Port,
                User = emailModel.User,
                Secret = emailModel.Secret
            };

            await SendAsync(mailMessage, smtpModel);
        }

        private async Task SendAsync(MimeMessage mailMessage, SmtpModel smtpModel)
        {
            using var client = new SmtpClient();

            try
            {
                client.Connect(smtpModel.Host, smtpModel.Port, SecureSocketOptions.StartTls);
                client.Authenticate(smtpModel.User, smtpModel.Secret);
                client.Timeout = 10000;
                

                await client.SendAsync(mailMessage);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            finally
            {
                client.Disconnect(true);
            }

        }

        private MimeMessage CreateEmailMessage(EmailModel emailModel, string imageId)
        {
            MimeMessage mailMessage = new MimeMessage();
            mailMessage.From.Add(MailboxAddress.Parse(emailModel.SenderEmail));
            mailMessage.To.Add(MailboxAddress.Parse(emailModel.RecipientEmails));
            if (emailModel.CcRecipentEmails != null && emailModel.CcRecipentEmails != "")
            {
                mailMessage.Cc.Add(MailboxAddress.Parse(emailModel.CcRecipentEmails));
            }
            if (emailModel.BccRecipentEmails != null && emailModel.BccRecipentEmails != "")
            {
                mailMessage.Bcc.Add(MailboxAddress.Parse(emailModel.BccRecipentEmails));
            }
            mailMessage.Subject = emailModel.Subject;

            var builder = new BodyBuilder
            {
                TextBody = HTMLToText(emailModel.Body)
            };
            if(imageId == null)
            {
                builder.HtmlBody = emailModel.Body;

                mailMessage.Body = builder.ToMessageBody();

                return mailMessage;
            }
            var image = builder.LinkedResources.Add(Environment.CurrentDirectory + _configuration.GetSection("ImagePath").Value + imageId);
            image.ContentId = MimeUtils.GenerateMessageId();
            builder.HtmlBody = emailModel.Body.Replace("{0}", image.ContentId);

            mailMessage.Body = builder.ToMessageBody();

            return mailMessage;
        }

        //private static string HtmlToPlainText(string html)
        //{
        //    const string tagWhiteSpace = @"(>|$)(\W|\n|\r)+<";//matches one or more (white space or line breaks) between '>' and '<'
        //    const string stripFormatting = @"<[^>]*(>|$)";//match any character between '<' and '>', even when end tag is missing
        //    const string lineBreak = @"<(br|BR)\s{0,1}\/{0,1}>";//matches: <br>,<br/>,<br />,<BR>,<BR/>,<BR />
        //    var lineBreakRegex = new Regex(lineBreak, RegexOptions.Multiline);
        //    var stripFormattingRegex = new Regex(stripFormatting, RegexOptions.Multiline);
        //    var tagWhiteSpaceRegex = new Regex(tagWhiteSpace, RegexOptions.Multiline);

        //    var text = html;
        //    //Decode html specific characters
        //    text = System.Net.WebUtility.HtmlDecode(text);
        //    //Remove tag whitespace/line breaks
        //    text = tagWhiteSpaceRegex.Replace(text, "><");
        //    //Replace <br /> with line breaks
        //    text = lineBreakRegex.Replace(text, Environment.NewLine);
        //    //Strip formatting
        //    text = stripFormattingRegex.Replace(text, string.Empty);

        //    return text;
        //}
        public static string HTMLToText(string HTMLCode)
        {
            // Remove new lines since they are not visible in HTML
            HTMLCode = HTMLCode.Replace("\n", " ");

            // Remove tab spaces
            HTMLCode = HTMLCode.Replace("\t", " ");

            // Remove multiple white spaces from HTML
            HTMLCode = Regex.Replace(HTMLCode, "\\s+", " ");

            // Remove HEAD tag
            HTMLCode = Regex.Replace(HTMLCode, "<head.*?</head>", ""
                                , RegexOptions.IgnoreCase | RegexOptions.Singleline);

            // Remove any JavaScript
            HTMLCode = Regex.Replace(HTMLCode, "<script.*?</script>", ""
              , RegexOptions.IgnoreCase | RegexOptions.Singleline);

            // Replace special characters like &, <, >, " etc.
            StringBuilder sbHTML = new StringBuilder(HTMLCode);
            // Note: There are many more special characters, these are just
            // most common. You can add new characters in this arrays if needed
            string[] OldWords = {"&nbsp;", "&amp;", "&quot;", "&lt;",
   "&gt;", "&reg;", "&copy;", "&bull;", "&trade;","&#39;"};
            string[] NewWords = { " ", "&", "\"", "<", ">", "Â®", "Â©", "â€¢", "â„¢", "\'" };
            for (int i = 0; i < OldWords.Length; i++)
            {
                sbHTML.Replace(OldWords[i], NewWords[i]);
            }

            // Check if there are line breaks (<br>) or paragraph (<p>)
            sbHTML.Replace("<br>", "\n<br>");
            sbHTML.Replace("<br ", "\n<br ");
            sbHTML.Replace("<p ", "\n<p ");

            // Finally, remove all HTML tags and return plain text
            return System.Text.RegularExpressions.Regex.Replace(
              sbHTML.ToString(), "<[^>]*>", "");
        }
    }
}
