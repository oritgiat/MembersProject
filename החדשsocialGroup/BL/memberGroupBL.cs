using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Entities;
using System.Data.Entity;
namespace BL
{
    public class memberGroupBL
    {
        public static groupDBEntities db = new groupDBEntities();//יצירת מופע מהDB
        public static memberGroupEntities getMemberGroupById(int id)//פונקצית שליפת על ידי קוד
        {
            member_group_tbl m = (member_group_tbl)db.member_group_tbl.Where(p => p.member_group_id == id);
            return memberGroupEntities.ToMemberGroupEntities(m);
        }
        public static List<memberGroupEntities> getAllMemberGroups()//פונקצית שליפת כל חברי הקבוצה מהטבלה
        {
            return memberGroupEntities.ToListMemberGroupEntities(db.member_group_tbl.ToList());
        }
        public static memberGroupEntities addMemberGroup(member_group_tbl p)//הוספת חבר בקבוצה
        {
            if (db.member_group_tbl.FirstOrDefault(x => x.person_id == p.person_id &&x.group_id==p.group_id) == null)
            {
                p.joining_date = DateTime.Now;
                db.member_group_tbl.Add(p);//הוספה לטבלה
                db.SaveChanges();//שמירת כל הנתונים בטבלה
                return memberGroupEntities.ToMemberGroupEntities(db.member_group_tbl.Include(j=>j.person_tbl).FirstOrDefault(x => x.person_id == p.person_id && x.group_id == p.group_id));//החזרת כל הנתונים שבטבלהוצה 
            
            }
            else { return null; }
        }
        public static void deleteMemberGroup(int id)// פונקצית למחיקת חבר בקבוצה  לפי מס חבר בקבוצה
        {
            db.member_group_tbl.Remove(db.member_group_tbl.First(i => i.member_group_id == id));//מחיקת חבר בקבוצה לפי מס חבר בקבוצה
            db.SaveChanges();//שמירה על הנתונים
        }
        public static List<personEntities> updateMemberGroup(personEntities p)//עדכון קבוצה בטבלה
        {
            string tz =db.group_tbl.First(i => i.group_id == p.GruopId).manager_id;
            db.member_group_tbl.First(i => i.group_id == p.GruopId&& i.person_id==p.person_id).member_status =2;
            db.SaveChanges();
          return  getGroupOfMemberAwait(tz);

        }
        public static List<personEntities> updateMemberGroupToRefuse(personEntities p)//עדכון קבוצה בטבלה
        {
            string tz = db.group_tbl.First(i => i.group_id == p.GruopId).manager_id;
            db.member_group_tbl.First(i => i.group_id == p.GruopId && i.person_id == p.person_id).member_status = 0;
            db.SaveChanges();
            return getGroupOfMemberAwait(tz);

        }
        


        public static List<memberGroupEntities> getMemberGroupByGroupId(int id)//פונקצית שליפת כל החברים על ידי קבוצה
        {
            List<memberGroupEntities> lm = memberGroupEntities.ToListMemberGroupEntities(db.member_group_tbl.Where(i => i.group_id == id&&i.member_status==2).ToList());
            return lm;
        }


        public static List<personEntities> getGroupOfMemberAwait(string id)//שליפה של חברי בקבוצות שאני שאני מנהל 
        {
            List<group_tbl> l = db.group_tbl.ToList();
            List<int> idG = new List<int>();
            foreach (var item in l)
            {
                if (item.manager_id == id)
                {
                    idG.Add(item.group_id);
                }
            }
            List<member_group_tbl> m = db.member_group_tbl.ToList();
            List<personEntities> lp = new List<personEntities>();
            person_tbl p = new person_tbl();
            personEntities p1 = new personEntities();

            foreach (var item in m)
            {
                if (item.member_status == 1)
                {
                    foreach (var num in idG)
                    {
                     if( item.group_id == num)
                        {
                            p = db.person_tbl.FirstOrDefault(x => x.person_id == item.person_id);
                            p1 = personEntities.ToPersonEntities(p);
                            p1.GruopId = num;
                            p1.img = db.group_tbl.First(x => x.group_id == num).image;
                            lp.Add(p1);

                        }
                    }
                }
               
                
            }

            return lp;
        }

    }
}