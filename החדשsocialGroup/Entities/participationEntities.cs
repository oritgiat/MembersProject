using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace Entities
{
    public class participationEntities
    {
        public int participation_id { get; set; }
        public int member_group_id { get; set; }
        public string aproval { get; set; }
        public string reminder { get; set; }
        public string timing_reminder { get; set; }
        public string actually_participation { get; set; }
        public string person_id { get; set; }
        public int meeting_id { get; set; }
        public string name { get; set; }

        public static participationEntities ToParticipationEntities(participation_tbl p)//פונקצית המרה מאדם לאנטיטיס
        {
            participationEntities pnew = new participationEntities()
            { actually_participation = p.actually_participation,
                aproval = p.aproval,
               // member_group_id =(int) p.member_group_id,
                participation_id = p.participation_id,
                reminder = p.reminder,
                timing_reminder = p.timing_reminder,
                person_id = p.person_id,
                meeting_id=p.meeting_id,
                name= p.person_tbl.name
            };
            return pnew;
        }
        public static participation_tbl ToParticipationTbl(participationEntities p)//פונקצית המרה מאדם לטבלה
        {
            participation_tbl pnew = new participation_tbl()
            {
                person_id = p.person_id,
                meeting_id = p.meeting_id,
                actually_participation = p.actually_participation, aproval = p.aproval, member_group_id = p.member_group_id, participation_id = p.participation_id, reminder = p.reminder, timing_reminder = p.timing_reminder };
            return pnew;
        }
        public static List<participationEntities> ToListParticipationEntities(List<participation_tbl> lp)//פונקצית המרה מרשימת אנשים לרשימת אנטיטיס
        {
            List<participationEntities> lpnew = new List<participationEntities>();
            lp.ForEach(p => lpnew.Add(ToParticipationEntities(p)));
            return lpnew;
        }
        public static List<participation_tbl> ToListParticipationTbl(List<participationEntities> lp)//פונקצית המרה מרשימת אנשים לרשימת אנשים בטבלה
        {
            List<participation_tbl> lpnew = new List<participation_tbl>();
            lp.ForEach(p => lpnew.Add(ToParticipationTbl(p)));
            return lpnew;

        }
    }
}