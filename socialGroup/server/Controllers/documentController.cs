using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.IO;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using BL;
using Entities;

namespace server.Controllers
{
    [RoutePrefix("api/document")]

    public class documentController : ApiController
    {
        //[Route("SaveFileByBase64")]
        //[HttpPost]
        //public void SaveFileByBase64([FromBody] global::document d)
        //{

        //    String fileName = FileBL.SaveFileByBase64(d.Base64, d.FileName);
        //    return fileName;
        //}


        [HttpPost]
        [Route("UploadImage")]
        public IHttpActionResult UploadImage()
        {
            string imageName = null;
            var httpRequest = HttpContext.Current.Request;
            //Upload Image
            var postedFile = httpRequest.Files["img"];
            //Create custom filename
            if (postedFile != null)
            {
                imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
                imageName = imageName + Path.GetExtension(postedFile.FileName);
                var filePath = HttpContext.Current.Server.MapPath("~/img/" + imageName);
                postedFile.SaveAs(filePath);
            }
            return Ok();
        }
    }
}


