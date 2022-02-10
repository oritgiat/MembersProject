using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace Entities
{
    public class personEntities
    {
        public string person_id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public int password { get; set; }
        public int GruopId { get; set; }
        public string img { get; set; }

        public static personEntities ToPersonEntities(person_tbl p)//פונקצית המרה מאדם לאנטיטיס
        {
            personEntities pnew = new personEntities() { email = p.email, name = p.name, password = p.password, person_id = p.person_id };
            return pnew;
        }
        public static person_tbl ToPersonTbl(personEntities p)//פונקצית המרה מאדם לטבלה
        {
            person_tbl pnew = new person_tbl() { email = p.email, name = p.name, password = p.password, person_id = p.person_id};
            return pnew;
        }
        public static List<personEntities> ToListPersonEntities(List<person_tbl> lp)//פונקצית המרה מרשימת אנשים לרשימת אנטיטיס
        {
            List<personEntities> lpnew = new List<personEntities>();
            lp.ForEach(p => lpnew.Add(ToPersonEntities(p)));
            return lpnew;
        }
        public static List<person_tbl> ToListPersonTbl(List<personEntities> lp)//פונקצית המרה מרשימת אנשים לרשימת אנשים בטבלה
        {
            List<person_tbl> lpnew = new List<person_tbl>();
            lp.ForEach(p => lpnew.Add(ToPersonTbl(p)));
            return lpnew;
        }
    }
}