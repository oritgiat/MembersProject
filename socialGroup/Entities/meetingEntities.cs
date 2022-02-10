using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace Entities
{
    public class meetingEntities
    {
        public int meeting_id { get; set; }
        public int group_id { get; set; }
        public System.DateTime date { get; set; }
        public string purpose { get; set; }
        public string initiastor_id { get; set; }
        public string place { get; set; }
        public string done { get; set; }
        public string summary { get; set; }
        public TimeSpan time { get; set; }
        public bool aproval { get; set; }
        public bool reminder { get; set; }

        public string name { get; set; }

        public static meetingEntities ToMeetingEntities(meeting_tbl m)//פונקצית המרה מאדם לאנטיטיס
        {
            meetingEntities pnew = new meetingEntities() {
                time=new TimeSpan(m.date.Hour, m.date.Minute,m.date.Second),
                date=m.date,done=m.done,group_id=m.group_id,initiastor_id=m.initiastor_id,meeting_id=m.meeting_id,place=m.place,purpose=m.purpose,summary=m.summary,name=m.person_tbl.name};
            
            return pnew;
        }
        public static meeting_tbl ToMeetingTbl(meetingEntities m)//פונקצית המרה מאדם לטבלה
        {
            meeting_tbl mnew = new meeting_tbl() { date = m.date, done = m.done, group_id = m.group_id, initiastor_id = m.initiastor_id, meeting_id = m.meeting_id, place = m.place, purpose = m.purpose, summary = m.summary };
            return mnew;
        }
        public static List<meetingEntities> ToListMeetingEntities(List<meeting_tbl> lm)//פונקצית המרה מרשימת אנשים לרשימת אנטיטיס
        {
            List<meetingEntities> lmnew = new List<meetingEntities>();
            lm.ForEach(m => lmnew.Add(ToMeetingEntities(m)));
            return lmnew;
        }
        public static List<meeting_tbl> ToListMeetingTbl(List<meetingEntities> lm)//פונקצית המרה מרשימת אנשים לרשימת אנשים בטבלה
        {
            List<meeting_tbl> lmnew = new List<meeting_tbl>();
            lm.ForEach(m => lmnew.Add(ToMeetingTbl(m)));
            return lmnew;
        }
    }
}