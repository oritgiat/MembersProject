using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace Entities
{
    public class correspodenceEntities
    {
        public int correspodence_id { get; set; }
        public int group_id { get; set; }
        public System.DateTime date { get; set; }
        public string sending_id { get; set; }
        public string contents { get; set; }
        public string addressee { get; set; }
        public string name { get; set; }

        public static correspodenceEntities ToCorrespodenceEntities(correspodence_tbl c)//פונקצית המרה מאדם לאנטיטיס
        {
            correspodenceEntities cnew = new correspodenceEntities() {addressee=c.addressee,correspodence_id=c.correspodence_id,contents=c.contents, group_id = c.group_id, date=c.date,sending_id=c.sending_id,name=c.person_tbl.name };
            return cnew;
        }
        public static correspodence_tbl ToCorrespodenceTbl(correspodenceEntities c)//פונקצית המרה מאדם לטבלה
        {
            correspodence_tbl cnew = new correspodence_tbl() { addressee = c.addressee, correspodence_id = c.correspodence_id, contents = c.contents, group_id = c.group_id, date = c.date, sending_id = c.sending_id };
            return cnew;
        }
        public static List<correspodenceEntities> ToListCorrespodenceEntities(List<correspodence_tbl> lp)//פונקצית המרה מרשימת אנשים לרשימת אנטיטיס
        {
            List<correspodenceEntities> lcnew = new List<correspodenceEntities>();
            lp.ForEach(c => lcnew.Add(ToCorrespodenceEntities(c)));
            return lcnew;
        }
        public static List<correspodence_tbl> ToListCorrespodenceTbl(List<correspodenceEntities> lc)//פונקצית המרה מרשימת אנשים לרשימת אנשים בטבלה
        {
            List<correspodence_tbl> lcnew = new List<correspodence_tbl>();
            lc.ForEach(c => lcnew.Add(ToCorrespodenceTbl(c)));
            return lcnew;
        }
    }
}