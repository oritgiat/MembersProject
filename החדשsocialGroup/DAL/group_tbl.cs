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
    
    public partial class group_tbl
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public group_tbl()
        {
            this.correspodence_tbl = new HashSet<correspodence_tbl>();
            this.meeting_tbl = new HashSet<meeting_tbl>();
            this.member_group_tbl = new HashSet<member_group_tbl>();
        }
    
        public int group_id { get; set; }
        public string group_description { get; set; }
        public string manager_id { get; set; }
        public string joining { get; set; }
        public string image { get; set; }
        public string details { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<correspodence_tbl> correspodence_tbl { get; set; }
        public virtual person_tbl person_tbl { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<meeting_tbl> meeting_tbl { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<member_group_tbl> member_group_tbl { get; set; }
    }
}
