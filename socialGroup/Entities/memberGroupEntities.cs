using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace Entities
{
    public class memberGroupEntities
    {
        public int member_group_id { get; set; }
        public string GroupName { get; set; }
        public string GroupImage { get; set; }
    public string person_id { get; set; }
        public int group_id { get; set; }
        public Nullable<System.DateTime> joining_date { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public Nullable<int> member_status { get; set; }

        public static memberGroupEntities ToMemberGroupEntities(member_group_tbl m)//פונקצית המרה מאדם לאנטיטיס
        {
            memberGroupEntities pnew = new memberGroupEntities() {group_id=m.group_id,joining_date=m.joining_date,member_group_id=m.member_group_id,person_id=m.person_id, name=m.person_tbl.name,email=m.person_tbl.email,member_status=m.member_status};
            return pnew;
        }
        public static member_group_tbl ToMemberGroupTbl(memberGroupEntities m)//פונקצית המרה מאדם לטבלה
        {
            member_group_tbl pnew = new member_group_tbl() { group_id = m.group_id, joining_date = m.joining_date, member_group_id = m.member_group_id, person_id = m.person_id, member_status=m.member_status };
            return pnew;
        }
        public static List<memberGroupEntities> ToListMemberGroupEntities(List<member_group_tbl> lp)//פונקצית המרה מרשימת אנשים לרשימת אנטיטיס
        {
            List<memberGroupEntities> lpnew = new List<memberGroupEntities>();
            lp.ForEach(p => lpnew.Add(ToMemberGroupEntities(p)));
            return lpnew;
        }
        public static List<member_group_tbl> ToListMemberGroupTbl(List<memberGroupEntities> lp)//פונקצית המרה מרשימת אנשים לרשימת אנשים בטבלה
        {
            List<member_group_tbl> lpnew = new List<member_group_tbl>();
            lp.ForEach(p => lpnew.Add(ToMemberGroupTbl(p)));
            return lpnew;
        }
    }
}