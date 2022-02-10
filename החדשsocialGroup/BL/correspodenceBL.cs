using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Entities;

namespace BL
{
    public class correspodenceBL
    {
        public static groupDBEntities db = new groupDBEntities();//יצירת מופע מהDB
        public static correspodenceEntities getCorrespodenceById(int id)//פונקצית שליפת על ידי קוד
        {
            correspodence_tbl c = (correspodence_tbl)db.correspodence_tbl.Where(p => p.correspodence_id == id);
            return correspodenceEntities.ToCorrespodenceEntities(c);
        }
        public static List<correspodenceEntities> getAllCorrespodence()//פונקצית שליפת כל האנשים מהטבלה
        {
            return correspodenceEntities.ToListCorrespodenceEntities(db.correspodence_tbl.ToList());
        }
        public static List<correspodenceEntities> addCorrespodence(correspodence_tbl c)//הוספת אדם 
        {

            c.correspodence_id = db.correspodence_tbl.Max(x => x.correspodence_id) + 1;
            c.date = DateTime.Now;
            db.correspodence_tbl.Add(c);//הוספה לטבלה
            db.SaveChanges();//שמירת כל הנתונים בטבלה
            return getAllCorrespodence();//החזרת כל הנתונים שבטבלה
        }
        public static void deleteCorrespodence(int id)// פונקצית  למחיקת התכתבות מהרשימה לפי מס התכתבות
        {
            db.correspodence_tbl.Remove(db.correspodence_tbl.First(i => i.correspodence_id == id));//מחיקת התכתבות לפי מס התכתבות
            db.SaveChanges();//שמירה על הנתונים
        }
        public static void updateCorrespodence(correspodenceEntities c)//עדכון התכתבות בטבלה
        {
            //השואת מס התכתבות כדי לראות איזה התכתבות הוא מעדכן ואז מעדכן את שאר השדות בטבלה
            //אין צורך לעדכן תעודת זהות כיון שתעודת זהות אי אפשר לשנות 
            db.correspodence_tbl.First(i => i.correspodence_id == c.correspodence_id).group_id = c.group_id;
            db.correspodence_tbl.First(i => i.correspodence_id == c.correspodence_id).contents = c.contents;
            db.correspodence_tbl.First(i => i.correspodence_id == c.correspodence_id).addressee = c.addressee;
            db.SaveChanges();
        }
        public static List<correspodenceEntities> getCorrespodenceByGroupId(int id)//פונקצית שליפת כל ההודעות על ידי קבוצה
        {
            List<correspodenceEntities> lc = correspodenceEntities.ToListCorrespodenceEntities(db.correspodence_tbl.Where(i => i.group_id == id).ToList());
            return lc;
        }
        public static List<correspodenceEntities> getCorrespodenceByGroupId2(int id)//פונקצית שליפת כל ההודעות ללא הודעות למנהל
        {
            List<correspodenceEntities> lc2 = correspodenceEntities.ToListCorrespodenceEntities(db.correspodence_tbl.Where(i => i.group_id == id && i.addressee == "1").ToList());
            return lc2;
        }



    }
}



