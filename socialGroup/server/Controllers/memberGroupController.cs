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
    [RoutePrefix("api/memberGroup")]//מקום הראשי של הפרויקט
    public class memberGroupController : ApiController
    {
        [Route("getMemberGroupById/{id}")]//שליפה
        [HttpGet]
        public IHttpActionResult getMemberGroupById(int id)
        {
            return Ok(memberGroupBL.getMemberGroupById(id));//BL-שליפת הפונקציה מה
        }
        [Route("getAllMemberGroups")]//שליפה
        [HttpGet]
        public IHttpActionResult getAllMemberGroups()
        {
            return Ok(memberGroupBL.getAllMemberGroups());//BL-שליפת הפונקציה מה
        }
        //הערה לשאול את המורה מה צריך לקבל בפונקציה
        [Route("addMemberGroup")]//הוספה
        [HttpPost]
        public IHttpActionResult addMemberGroup([FromBody] memberGroupEntities m)
        {
            var m1= memberGroupEntities.ToMemberGroupTbl(m);
            //המרת האדם שקיבל לטבלה
            return Ok(memberGroupBL.addMemberGroup(m1));
        }
        [Route("deleteMemberGroup/{id}")]//מחיקה
        [HttpDelete]
        public IHttpActionResult deleteMemberGroup(int id)
        {
            memberGroupBL.deleteMemberGroup(id);
            return Ok(getAllMemberGroups());
        }
        [Route("getMemberGroupByGroupId/{id}")]
        [HttpGet]
        public IHttpActionResult getMemberGroupByGroupId(int id)
        {
            return Ok(memberGroupBL.getMemberGroupByGroupId(id));
        }
        
        [Route("updateMemberGroup")]
        [HttpPut]
        public IHttpActionResult updateMemberGroup(personEntities p)
        {
            return Ok(memberGroupBL.updateMemberGroup(p));
        }
        [Route("updateMemberGroupToRefuse")]
        [HttpPut]
        public IHttpActionResult updateMemberGroupToRefuse(personEntities p)
        {
            return Ok(memberGroupBL.updateMemberGroupToRefuse(p));
        }
        [Route("getGroupOfMemberAwait/{id}")]
        [HttpGet]
        public IHttpActionResult getGroupOfMemberAwait(string id)
        {
            return Ok(memberGroupBL.getGroupOfMemberAwait(id));
        }

    }
}