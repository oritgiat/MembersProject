//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class meeting_tbl
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public meeting_tbl()
        {
            this.participation_tbl = new HashSet<participation_tbl>();
        }
    
        public int meeting_id { get; set; }
        public int group_id { get; set; }
        public System.DateTime date { get; set; }
        public string purpose { get; set; }
        public string initiastor_id { get; set; }
        public string place { get; set; }
        public string done { get; set; }
        public string summary { get; set; }
    
        public virtual group_tbl group_tbl { get; set; }
        public virtual person_tbl person_tbl { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<participation_tbl> participation_tbl { get; set; }
    }
}
