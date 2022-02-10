using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Entities;

namespace BL
{
    public class personBL
    {
        public static groupDBEntities db = new groupDBEntities();//יצירת מופע מהDB
        public static personEntities getPersonById(string id)//פונקצית שליפת על ידי קוד
        {
            person_tbl p = (person_tbl)db.person_tbl.Where(y => y.person_id == id);
            return personEntities.ToPersonEntities(p);
        }
        public static List<personEntities> getAllPersons()//פונקצית שליפת כל האנשים מהטבלה
        {
            return personEntities.ToListPersonEntities(db.person_tbl.ToList());
        }
        public static personEntities addPerson(person_tbl p) 
        {
            db.person_tbl.Add(p);
            db.SaveChanges();
            return personEntities.ToPersonEntities(p);
        }
        public static void deletePerson(string id)// פונקצית למחיקת אדם למחיקת אדם מהרשימה לפי תעודת זהות
        {
            db.person_tbl.Remove(db.person_tbl.First(i => i.person_id==id));//מחיקת אדם לפי התעודת זהות
            db.SaveChanges();//שמירה על הנתונים
        }
        public static void updatePerson(personEntities p)//עדכון אדם בטבלה
        {
             
            db.person_tbl.First(i => i.person_id== p.person_id).name = p.name;
            db.person_tbl.First(i => i.person_id == p.person_id).email = p.email;
            db.person_tbl.First(i => i.person_id == p.person_id).password = p.password;
            db.SaveChanges();
        }
        
    }
}