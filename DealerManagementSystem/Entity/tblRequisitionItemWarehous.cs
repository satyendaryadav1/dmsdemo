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
    
    public partial class tblRequisitionItemWarehous
    {
        public long RequisitionWareHouseDetID { get; set; }
        public int RequestDetId { get; set; }
        public string AXitemId { get; set; }
        public int RequisitionId { get; set; }
        public string RequestedWareHouse { get; set; }
        public Nullable<decimal> ApproveQty { get; set; }
        public string TransferOrder { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public Nullable<System.DateTime> UpdatedOn { get; set; }
        public Nullable<int> ShipFlag { get; set; }
    }
}
