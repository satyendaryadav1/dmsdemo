//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DealerManagementSystem.Entity
{
    using System;
    using System.Collections.Generic;
    
    public partial class tblYoekisoftIndia_City
    {
        public int CityAutoid { get; set; }
        public string CityName { get; set; }
        public string CityCode { get; set; }
        public Nullable<long> ParentValue { get; set; }
        public Nullable<long> EntityId { get; set; }
        public Nullable<long> ParentId { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public string UpdatedOn { get; set; }
        public Nullable<long> CreatedBy { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
    }
}
