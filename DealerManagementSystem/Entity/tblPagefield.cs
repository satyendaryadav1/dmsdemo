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
    
    public partial class tblPagefield
    {
        public int Fieldid { get; set; }
        public Nullable<int> Pageid { get; set; }
        public string FieldName { get; set; }
        public Nullable<int> Status { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public string UpdatedOn { get; set; }
        public Nullable<long> CreatedBy { get; set; }
        public Nullable<int> UpdatedBy { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
    }
}
