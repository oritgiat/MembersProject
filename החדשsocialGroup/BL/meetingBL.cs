using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Entities;
using System.Data.Entity;
using System.Threading;

namespace BL
{
    public class meetingBL
    {
        public static groupDBEntities db = new groupDBEntities();//יצירת מופע מהDB
        public static List<meetingEntities> getMeetingById(int id)//פונקצית שליפת על ידי קוד
        {
           List<meetingEntities> m =meetingEntities.ToListMeetingEntities(db.meeting_tbl.Include(x=>x.participation_tbl).Where(p => p.group_id == id).ToList());
            return m;
        }
        public static List<meetingEntities> getAllMeeting()//פונקצית שליפת כל הפגישות  מהטבלה
        {
            return meetingEntities.ToListMeetingEntities(db.meeting_tbl.ToList());
        }
        public static meetingEntities addMeeting(meeting_tbl m)//הוספת פגישה 
        {

            //m.meeting_id = db.meeting_tbl.Count() + 1;//identity-מספור אוטומטי 
            db.meeting_tbl.Add(m);//הוספה לטבלה
            db.SaveChanges();//שמירת כל הנתונים בטבלה
            return Entities.meetingEntities.ToMeetingEntities(m);//החזרת כל הנתונים שבטבלה
        }
        public static bool deleteMeeting(int id)// פונקצית למחיקת פגישה למחיקת אדם  bvc לפי מספר פגישה
        {
            db.meeting_tbl.Remove(db.meeting_tbl.First(i => i.meeting_id == id));//מחיקת אדם לפי התעודת זהות
            db.SaveChanges();//שמירה על הנתונים
            return true;
        }
        public static void updateMeeting(meetingEntities m)//עדכון פגישה בטבלה
        {
            //השואת מספר פגישה כדי לראות איזה פגישה הוא מעדכן ואז מעדכן את שאר השדות בטבלה
            //אין צורך לעדכן מספר פגישה כיון שמספר פגישה אי אפשר לשנות 
            db.meeting_tbl.First(i => i.meeting_id == m.meeting_id).place = m.place;
            db.meeting_tbl.First(i => i.meeting_id == m.meeting_id).purpose = m.purpose;
            db.meeting_tbl.First(i => i.meeting_id == m.meeting_id).place = m.place;
            db.meeting_tbl.First(i => i.meeting_id == m.meeting_id).done = m.done;
            db.meeting_tbl.First(i => i.meeting_id == m.meeting_id).summary = m.summary;
            db.SaveChanges();
        }
        public static List<meetingEntities> getMeetingByGroupId(int idM, string idP)//פונקצית שליפת כל הפגישות על ידי קבוצה
        {
            List<meetingEntities> lm = meetingEntities.ToListMeetingEntities(db.meeting_tbl.Where(i => i.group_id == idM).ToList());
            for (int i = 0; i < lm.Count(); i++)
            {
                int id = (Int32)lm[i].meeting_id;
                List<participation_tbl> par = db.participation_tbl.Where(x =>x.meeting_id ==id).ToList();
                participation_tbl p = par.FirstOrDefault(x => x.person_id == idP);
                if (p==null)
                {
                    lm[i].aproval = false;
                    lm[i].reminder = false;
                }
                else
                {
                    if(p.aproval=="1")
                       lm[i].aproval = true;
                    else
                        lm[i].aproval = false;
                    if(p.reminder=="1")
                        lm[i].reminder = true;
                    else
                       lm[i].reminder = false;
                }
            }
            return lm;
        }

        
        static CancellationTokenSource m_ctSource;
        public static void RunPrepareDaily(DateTime date)//מקבלת תאריך מדויק
        {
            m_ctSource = new CancellationTokenSource();
            var dateNow = DateTime.Now;
            TimeSpan ts;//אובייקט שמייצג את מרווח הזמן שנותר עד להפעלת התהליך
            if (date > dateNow)
                ts = date - dateNow;
            else//אם התאריך המבוקש עבר כבר-מקדם אותו למועד הבא
            {
                date = date.AddDays(1);//במקרה שלנו- קידום התאריך ביום(יכול להיות גם הוספת דקות/שעות)
                ts = date - dateNow;
            }
            //שימתין את פרק הזמן שנקבע, ואח"כ יקרא לפונקציה שרצינו שתופעל פעם ב... threadהפעלת ה 
            Task.Delay(ts).ContinueWith((x) =>
            {
                //קריאה לפונקציה המבוקשת
                getMeetingOfReminder();
                RunPrepareDaily(date);//קריאה חוזרת לפונקציה...
            }, m_ctSource.Token);
            

        }

        public static void getMeetingOfReminder()
        {
            try
            {
                var datomarrow = DateTime.Now;
                datomarrow = datomarrow.AddDays(1);
                List<meetingEntities> v = meetingEntities.ToListMeetingEntities(db.meeting_tbl.Where(i => i.date.Year == datomarrow.Year && i.date.Month == datomarrow.Month && i.date.Day == datomarrow.Day).ToList());
                for (int i = 0; i < v.Count(); i++)
                {
                    int idMeet = v[i].meeting_id;
                    List<participationEntities> z = participationEntities.ToListParticipationEntities(db.participation_tbl.Where(x => (Int32)x.meeting_id == idMeet).ToList());
                    for (int j = 0; j < z.Count(); j++)
                    {
                        participationEntities partication = z[j];
                        if (partication.reminder == "1")
                        {
                            person_tbl p = db.person_tbl.FirstOrDefault(n => n.person_id == partication.person_id);
                            email2 emailR = new email2();
                            emailR.subject = "תזכורת";
                            emailR.content = "מחר תתקים פגישה: מטרת הפגישה" +" "+ v[i].purpose;
                            emailR.email = p.email;
                            emailBL.send(emailR);
                        }
                    }
                }
            }
            catch(Exception e)
            {

            }
          
        }
    }
    }