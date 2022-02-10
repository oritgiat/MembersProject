using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace Entities
{
    public class groupEntities
    {
        public int Group_id { get; set; }
        public string group_description { get; set; }
        public string manager_id { get; set; }
        public string joining { get; set; }
        public string image { get; set; }
        public string nameManager { get; set; }
        public string emailManager { get; set; }
        public string details { get; set; }

        public static groupEntities ToGroupEntities(group_tbl g)//פונקצית המרה מאדם לאנטיטיס
        {
            groupEntities gnew = new groupEntities() { group_description = g.group_description, Group_id = g.group_id, image = g.image, joining = g.joining, manager_id = g.manager_id, nameManager = g.person_tbl.name, emailManager = g.person_tbl.email, details=g.details };
            return gnew;
        }
        public static group_tbl ToGroupTbl(groupEntities g)//פונקצית המרה מאדם לטבלה
        {
            group_tbl gnew = new group_tbl() { group_description = g.group_description, group_id = g.Group_id, image = g.image, joining = g.joining, manager_id = g.manager_id, details = g.details };
            return gnew;
        }
        public static List<groupEntities> ToListGroupEntities(List<group_tbl> lg)//פונקצית המרה מרשימת אנשים לרשימת אנטיטיס
        {
            List<groupEntities> lgnew = new List<groupEntities>();
            lg.ForEach(g=> lgnew.Add(ToGroupEntities(g)));
            return lgnew;
        }
        public static List<group_tbl> ToListGroupTbl(List<groupEntities> lg)//פונקצית המרה מרשימת אנשים לרשימת אנשים בטבלה
        {
            List<group_tbl> lgnew = new List<group_tbl>();
            lg.ForEach(g => lgnew.Add(ToGroupTbl(g)));
            return lgnew;
        }
    }
}