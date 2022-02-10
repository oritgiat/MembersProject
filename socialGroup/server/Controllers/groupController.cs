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
    [RoutePrefix("api/group")]
    public class groupController : ApiController
    {
        [Route("getGroupById/{id}")]//שליפה
        [HttpGet]
        public IHttpActionResult getGroupById(int id)
        {
            var h = groupBL.getGroupById(id);
            return Ok(h);//BL-שליפת הפונקציה מה
        }
        [Route("getAllGroups")]//שליפה
        [HttpGet]
        public IHttpActionResult getAllGroups()
        {
            return Ok(groupBL.getAllGroups());
        }
        [Route("addGroup")]//הוספה
        [HttpPost]
        public IHttpActionResult addGroup([FromBody] groupEntities g)
        {
            
            return Ok(groupBL.addGroup(groupEntities.ToGroupTbl(g)));
        }
        [Route("deleteGroup/{id}")]//מחיקה
        [HttpDelete]
        public IHttpActionResult deleteGroup(int id)
        {
            groupBL.deleteGroup(id);
            return Ok(getAllGroups());
        }
        [Route("updateGroup")]//עדכון
        [HttpPut]
        public IHttpActionResult updateGroup([FromBody] groupEntities g)
        {
            if (ModelState.IsValid)
            {
                groupBL.updateGroup(g);
                return Ok(true);
            }
            else
                return Ok(false);
        }
        [Route("getStatus")]//קבלת סטטוס המשתמש
        [HttpPost]
        public IHttpActionResult getStatus([FromBody] personEntities p)
        {
            var a = groupBL.getStatus(p.email, p.password);
            return Ok(a);
        }
        [Route("retrievalPerson")]//שליפת אדם מהבסיס נתונים
        [HttpPost]
        public IHttpActionResult retrievalPerson([FromBody] personEntities p)
        {
            return Ok(groupBL.retrievalPerson(p.email, p.password));
        }
        [Route("getGroupOfMember/{id}")]
        [HttpGet]
        public IHttpActionResult getGroupOfMember(string id)
        {
            return Ok(groupBL.getGroupOfMember(id));
        }
        [Route("getGroupOfManager/{id}")]
        [HttpGet]
        public IHttpActionResult getGroupOfManager(string id)
        {
            return Ok(groupBL.getGroupOfManager(id));
        }
        [Route("getGroupWaitOfPerson/{id}")]
        [HttpGet]
        public IHttpActionResult getGroupWaitOfPerson(string id)
        {
            return Ok(groupBL.getGroupWaitOfPerson(id));
        }
    }
}