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
    [RoutePrefix("api/meeting")]
    public class meetingController : ApiController
    {
        [Route("getMeetingById/{id}")]//שליפה
        [HttpGet]
        public IHttpActionResult getMeetingById(int id)
        {
            return Ok(meetingBL.getMeetingById(id));//BL-שליפת הפונקציה מה
        }
        [Route("getAllMeeting")]//שליפה
        [HttpGet]
        public IHttpActionResult getAllMeeting()
        {
            return Ok(meetingBL.getAllMeeting());
        }
        [Route("addMeeting")]//הוספה
        [HttpPost]
        public IHttpActionResult addMeeting([FromBody] meetingEntities m)
        {
            DateTime d =new DateTime(m.date.Year, m.date.Month, m.date.Day, m.time.Hours, m.time.Minutes,0);
            m.date = d;
            return Ok(meetingBL.addMeeting(meetingEntities.ToMeetingTbl(m)));
        }
        [Route("deleteMeeting/{id}")]//מחיקה
        [HttpDelete]
        public IHttpActionResult deleteMeeting(int id)
        {            
            return Ok(meetingBL.deleteMeeting(id));
        }
        [Route("updateMeeting")]//עדכון
        [HttpPut]
        public IHttpActionResult updateMeeting([FromBody] meetingEntities m)
        {
            if (ModelState.IsValid)
            {
                meetingBL.updateMeeting(m);
                return Ok(getAllMeeting());
            }
            else
                return NotFound();
        }
        [Route("getMeetingByGroupId/{idM}/{idP}")]//מחיקה
        [HttpGet]
        public IHttpActionResult getMeetingByGroupId(int idM,string idP)
        {
            List<meetingEntities> lm = meetingBL.getMeetingByGroupId(idM, idP);
            return Ok(lm);
        }
    }
}