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
    [RoutePrefix("api/person")]//מקום הראשי של הפרויקט
    public class personController : ApiController
    {
        [Route("getPersonById/{id}")]//שליפה
        [HttpGet]
        public IHttpActionResult getPersonById(string id)
        {
            return Ok(personBL.getPersonById(id));//BL-שליפת הפונקציה מה
        }
        [Route("getAllpersons")]//שליפה
        [HttpGet]
        public IHttpActionResult getAllPersons()
        {
            return Ok(personBL.getAllPersons());//BL-שליפת הפונקציה מה
        }
        //הערה לשאול את המורה מה צריך לקבל בפונקציה
        [Route("addPerson")]//הוספה
        [HttpPost]
        public IHttpActionResult addPerson(personEntities p)
        {
            return Ok(personBL.addPerson(personEntities.ToPersonTbl(p)));
        }
        [Route("deletePerson/{id}")]//מחיקה
        [HttpDelete]
        public IHttpActionResult deletePerson(string id)
        {
            personBL.deletePerson(id);
            return Ok(getAllPersons());
        }
        [Route("updatePerson")]//עדכון
        [HttpPut]
        public IHttpActionResult updatePerson([FromBody] personEntities p)
        {
            if (ModelState.IsValid)
            {
                personBL.updatePerson(p);
                return Ok(getAllPersons());
            }
            else
                return NotFound();
        }
    }
}