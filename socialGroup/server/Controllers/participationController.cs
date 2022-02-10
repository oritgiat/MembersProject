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
    [RoutePrefix("api/participation")]//מקום הראשי של הפרויקט
    public class participationController : ApiController
    {
        [Route("getParticipationById/{id}")]//שליפה
        [HttpGet]
        public IHttpActionResult getParticipationById(int id)
        {
            return Ok(participationBL.getParticipationById(id));//BL-שליפת הפונקציה מה
        }
        [Route("getAllParticipations")]//שליפה
        [HttpGet]
        public IHttpActionResult getAllParticipations()
        {
            return Ok(participationBL.getAllParticipations());//BL-שליפת הפונקציה מה
        }
        //הערה לשאול את המורה מה צריך לקבל בפונקציה
        [Route("addParticipation")]//הוספה
        [HttpPost]
        public IHttpActionResult addParticipation(participationEntities p)
        {
            participationBL.addParticipation(participationEntities.ToParticipationTbl(p));//המרת האדם שקיבל לטבלה
            return Ok(getAllParticipations());
        }
        [Route("deleteParticipation/{id}")]//מחיקה
        [HttpDelete]

        public IHttpActionResult deleteParticipation(int id)
        {
            participationBL.deletParticipation(id);
            return Ok(getAllParticipations());
        }
        [Route("getMemberParticipationGroupId/{id}")]
        [HttpGet]
        public IHttpActionResult getMemberParticipationGroupId(int id)
        {
            return Ok(participationBL.getMemberParticipationGroupId(id));
        }
        [Route("updateParticipation")]//עדכון
        [HttpPut]
        public IHttpActionResult updateParticipation([FromBody] participationEntities p)
        {
            if (ModelState.IsValid)
            {
                participationBL.updateParticipation(p);
                return Ok(getAllParticipations());
            }
            else
                return NotFound();
        }
    }
}