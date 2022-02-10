using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Entities;

namespace BL
{
    public class groupBL
    {
        public static groupDBEntities db = new groupDBEntities();//יצירת מופע מהDB
        public static groupEntities getGroupById(int id)//פונקצית שליפת על ידי קוד
        {
            group_tbl g = db.group_tbl.Include(h=>h.person_tbl).FirstOrDefault(p => p.group_id == id);
            return groupEntities.ToGroupEntities(g);
        }
        public static List<groupEntities> getAllGroups()//פונקצית שליפת כל הטבלאות מהטבלה
        {
            return groupEntities.ToListGroupEntities(db.group_tbl.Include(j => j.person_tbl). ToList());
        }
        public static List<groupEntities> addGroup(group_tbl g) 
        {
            g.group_id = db.group_tbl.Count() + 1; 
            db.group_tbl.Add(g);
            member_group_tbl m = new member_group_tbl();
            m.group_id = g.group_id;
            m.person_id = g.manager_id;
            m.joining_date = DateTime.Now;
            m.member_status = 2;
            db.member_group_tbl.Add(m);
            db.SaveChanges();
            return getAllGroups();
        }
        public static void deleteGroup(int id)// פונקצית למחיקת קבוצה מהרשימה לפי מספר קבוצה
        {
            db.group_tbl.Remove(db.group_tbl.First(i => i.group_id == id));//מחיקת קבוצה לפי מספר מזהה
            db.SaveChanges();//שמירה על הנתונים
            
        }
        public static void updateGroup(groupEntities g)//עדכון קבוצה בטבלה
        {
            //השואת מספר מזהה כדי לראות איזה קבוצה הוא מעדכן ואז מעדכן את שאר השדות בטבלה
           
            db.group_tbl.First(i => i.group_id == g.Group_id).joining = g.joining;
          db.SaveChanges();

        }
        //פונקציה שבודקת את סטטוס המשתמש כדי לבצע הרשאות לפי הסטטוס שלו
        public static int getStatus(string email, int password)
        {
            person_tbl p = db.person_tbl.FirstOrDefault(n => n.email == email && n.password == password); 
            if (p == null)
                return 0;
            member_group_tbl j = db.member_group_tbl.FirstOrDefault(k => k.person_id == p.person_id&&k.member_status==2 );
            var y = db.group_tbl.FirstOrDefault(x => x.manager_id == p.person_id);

            if (j == null &&y==null)
                return 1;//אורח
            if (y!=null && j!=null)
            {
                return 2;//מנהל וחבר 
            }
            if (y!=null)
                return 3;//מנהל
            return 4;//חבר
        }
        //שליפה של קבוצות לפי סטטוס
        public static List<groupEntities> getGroupOfMember(string id)//שליפה של הקבוצות שאני מנהל
        {
            var list = db.member_group_tbl.Where(x => x.person_id == id&&x.member_status==2).ToList();
            List<group_tbl> l = new List<group_tbl>();
            foreach (var item in list)
            {
                
                    if (item.group_tbl.manager_id != item.person_id)
                    {
                        var g = db.group_tbl.Where(x => x.group_id == item.group_id).First();
                        l.Add(g);
                    
                }
            }
            if (l != null)
                return groupEntities.ToListGroupEntities(l);
            else
                return null;
        }
        public static List<groupEntities> getGroupOfManager(string id)//שליפה של הקבוצות שאני מנהל 
        {
            var list = db.member_group_tbl.Where(x => x.person_id == id).ToList();
            List<group_tbl> l = new List<group_tbl>();
            foreach (var item in list)
            {
                if (item.group_tbl.manager_id == item.person_id)
                {
                    var g = db.group_tbl.Where(x => x.group_id == item.group_id).First();

                    l.Add(g);
                }
            }


            return groupEntities.ToListGroupEntities(l);
        }


        //שליפת הבן אדם על פי שם משתמש וסיסמא
        //retrieval-שליפה
       

        public static personEntities retrievalPerson(string id,int password)
        {
            person_tbl p = db.person_tbl.FirstOrDefault(n => n.email==id&&n.password==password);//שולפת את האדם אם התעודת זהות והסיסמא שווים
            if (p == null)//אם לא מצאת את האדם
                return null;
            return personEntities.ToPersonEntities( p);//תחזיר את האדם
        }

        public static List<groupEntities> getGroupWaitOfPerson(string id)
        {
            List< groupEntities> lg = new List<groupEntities>();

            List<member_group_tbl> mg = db.member_group_tbl.ToList();
            foreach (var item in mg)
            {
                if (item.person_id == id && item.member_status==1)
                    lg.Add(groupEntities.ToGroupEntities(db.group_tbl.First(x => x.group_id == item.group_id)));
            }
            return lg;
        }

    }
}