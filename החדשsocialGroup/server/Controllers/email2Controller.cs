using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Entities;
using BL;
namespace API.Controllers
{
    [RoutePrefix("api/Email")]
    public class Email2Controller : ApiController
    {
        [HttpPost]
        [Route("sentmail")]
        public IHttpActionResult sentmail(email2 e)
        {
            return Ok(emailBL.send(e));
        }
    }
}
