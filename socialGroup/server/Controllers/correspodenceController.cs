using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BL;
using Entities;

namespace server.Controllers
{
    [RoutePrefix("api/correspodence")]//מקום הראשי של הפרויקט
    public class correspodenceController : ApiController
    {
        [Route("getCorrespodenceById/{id}")]//שליפה
        [HttpGet]
        public IHttpActionResult getCorrespodenceById(int id)
        {
            return Ok(correspodenceBL.getCorrespodenceById(id));//BL-שליפת הפונקציה מה
        }
        [Route("getAllCorrespodence")]//שליפה
        [HttpGet]
        public IHttpActionResult getAllCorrespodence()
        {
            return Ok(correspodenceBL.getAllCorrespodence());//BL-שליפת הפונקציה מה
        }
        //הערה לשאול את המורה מה צריך לקבל בפונקציה
        [Route("addCorrespodence")]//הוספה
        [HttpPost]
        public IHttpActionResult addCorrespodence([FromBody] correspodenceEntities c)
        {
            return Ok(correspodenceBL.addCorrespodence(correspodenceEntities.ToCorrespodenceTbl(c)));
        }
        [Route("deleteCorrespodence/{id}")]//מחיקה
        [HttpDelete]
        public IHttpActionResult deleteCorrespodence(int id)
        {
            correspodenceBL.deleteCorrespodence(id);
            return Ok(getAllCorrespodence());
        }
        [Route("updateCorrespodence")]//עדכון
        [HttpPut]
        public IHttpActionResult updateCorrespodence([FromBody] correspodenceEntities c)
        {
            if (ModelState.IsValid)
            {
                correspodenceBL.updateCorrespodence(c);
                return Ok(getAllCorrespodence());
            }
            else
                return NotFound();
        }
        [Route("getCorrespodenceByGroupId/{id}")]
        [HttpGet]
        public IHttpActionResult getCorrespodenceByGroupId(int id)
        {
            return Ok(correspodenceBL.getCorrespodenceByGroupId(id));
        }
        [Route("getCorrespodenceByGroupId2/{id}")]
        [HttpGet]
        public IHttpActionResult getCorrespodenceByGroupId2(int id)
        {
            return Ok(correspodenceBL.getCorrespodenceByGroupId2(id));
        }
    }
}