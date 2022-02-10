using DAL;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
   public class participationBL
    {
        public static groupDBEntities db = new groupDBEntities();//יצירת מופע מהDB
        public static participationEntities getParticipationById(int id)//פונקצית שליפת על ידי קוד
        {
            participation_tbl p = (participation_tbl)db.participation_tbl.Where(y => y.meeting_id== id);
            return participationEntities.ToParticipationEntities(p);
        }
        public static List<participationEntities> getAllParticipations()//פונקצית שליפת כל השתתפויות מהטבלה
        {
            return participationEntities.ToListParticipationEntities(db.participation_tbl.ToList());
        }
        public static List<participationEntities> getMemberParticipationGroupId(int id)//פונקצית שליפת כל החברים על ידי קבוצה
        {
            List<participationEntities> lp = participationEntities.ToListParticipationEntities(db.participation_tbl.Where(i => i.meeting_id == id ).ToList());
            return lp;
        }
        public static bool addParticipation(participation_tbl p)//הוספת השתתפות 
        {
            participation_tbl par = db.participation_tbl.FirstOrDefault(x => x.meeting_id == p.meeting_id && x.person_id == p.person_id);
            if(par==null)
            {
                db.participation_tbl.Add(p);//הוספה לטבלה
                db.SaveChanges();//שמירת כל הנתונים בטבלה
            }
            else
            {
                par.reminder = p.reminder;
                par.aproval = p.aproval;
                db.SaveChanges();
            }
           
            return true;//החזרת כל הנתונים שבטבלה
        }
        public static void deletParticipation(int id)// פונקצית למחיקת השתתפות  מהרשימה לפי מס השתתפות בקבוצה
        {
            db.participation_tbl.Remove(db.participation_tbl.First(i => i.participation_id == id));//מחיקת השתתפות לפי השתתפות בקבוצה
            db.SaveChanges();//שמירה על הנתונים
        }
        public static void updateParticipation(participationEntities p)//עדכון השתתפות בטבלה
        {
            //השואת מס השתתפות בקבוצה כדי לראות איזה השתתפות הוא מעדכן ואז מעדכן את שאר השדות בטבלה
            //אין צורך לעדכן מס השתתפות כיון מס השתתפות אי אפשר לשנות 
            db.participation_tbl.First(i => i.participation_id == p.participation_id).aproval = p.aproval;
            db.participation_tbl.First(i => i.participation_id == p.participation_id).reminder = p.reminder;
            db.participation_tbl.First(i => i.participation_id == p.participation_id).timing_reminder = p.timing_reminder;
            db.participation_tbl.First(i => i.participation_id == p.participation_id).actually_participation = p.actually_participation;

            db.SaveChanges();
        }
    }
}
