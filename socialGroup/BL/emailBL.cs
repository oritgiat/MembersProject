using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;

using System.Net.Mail;


namespace BL
{

    public class emailBL
    {
        public static bool send(email2 email)
        {
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

               mail.From = new MailAddress("membersmember7@gmail.com","Members");
                mail.To.Add(email.email);
                mail.IsBodyHtml = false;

                mail.Subject = email.subject;
                mail.Body = email.content;

                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("membersmember7@gmail.com", "members1234");

                SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }


        }
    }
}


