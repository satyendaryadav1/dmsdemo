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
    
    public partial class tblRequisition
    {
        public int RequisitionId { get; set; }
        public string RequestNumber { get; set; }
        public Nullable<int> WareHouseId { get; set; }
        public Nullable<byte> Status { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public Nullable<long> CreatedBy { get; set; }
        public Nullable<long> UpdatedBy { get; set; }
        public Nullable<bool> IsSubmitted { get; set; }
        public Nullable<System.DateTime> RequestedDate { get; set; }
        public Nullable<System.DateTime> SubmittedDate { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public Nullable<System.DateTime> UpdatedOn { get; set; }
    }
}
