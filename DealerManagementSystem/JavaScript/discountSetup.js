
var ValueItem = [];var ValuePartner = [];var dblclickDiscGrpId=0; var dblclickFlag=0; var ddlclickAssightype=0;
jquery_1_11_3_min_p(document).ready(function () {
    jQuery('#txtdiscountvalue').keyup(function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
    jQuery('#txtfromqty').keyup(function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
    jQuery('#txttoqty').keyup(function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
    BindDiscountGrid();
    ddlBindTaxMod();
    ValueItem.push({ value: "0", text: "Select" });
    kendo_all_min_js('#ddlitemValue').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ValueItem,
        open: function () {
            if (kendo_all_min_js('#ddlentity').data("kendoDropDownList").value() == "0") {
                swal("Please select Entity");
                }
            },
        change: function () {
            kendo_all_min_js('#ddlitemValue').data("kendoDropDownList").span.css('background', 'none');
        }
    });
    ValuePartner.push({ value: "0", text: "Select" });
    kendo_all_min_js('#ddlpartnerValue').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ValuePartner,
        open: function () {
        if (kendo_all_min_js('#ddlentity').data("kendoDropDownList").value() == "0") {
                swal("Please select Entity");
                }
            },
        change: function () {
            kendo_all_min_js('#ddlpartnerValue').data("kendoDropDownList").span.css('background', 'none');
        }
    });

    jquery_1_11_3_min_p("#btnnew").click(function () {
        $("#CreateSequenceNew").css('display', 'block');
        $("#itemTaxGroupGrid").css('display', 'none');
          $("#btnback").css('display', 'block');
           $("#btnnew").css('display', 'none');
        BindEntityCountrydDetails();
    })
    jquery_1_11_3_min_p("#btnback").click(function () {
        window.location.replace("DiscountSetup.aspx");
    });
     jquery_1_11_3_min_p('#btnConfirm').click(function () {
       if (LinFormValidation()==true ) {
         swal({
                 title: "Do you want to Submit?",
                 text: "",
                 icon: "warning",
                 buttons: true,
                 dangerMode: true,
                 })
                 .then((willDelete) => {
                 if (willDelete) {
               saveTempdataLine();

            }
                 });
        }
    });
    
      jquery_1_11_3_min_p('#btnproceed').click(function () {
       if (FormValidation()==true ) {
         swal({
                 title: "Do you want to Proceed?",
                 text: "",
                 icon: "warning",
                 buttons: true,
                 dangerMode: true,
                 })
                 .then((willDelete) => {
                 if (willDelete) {
               SaveHeaderData();
             var AssignId = kendo_all_min_js('#ddlassignedTo').data("kendoDropDownList").value();
             BindPartnerType(AssignId);

            }
                 });
        }
    });

      
      jquery_1_11_3_min_p('#btndisabled').click(function () {
      if(IsChecked()==true)
      {
         swal({
                 title: "Do you want to disabled Line?",
                 text: "",
                 icon: "warning",
                 buttons: true,
                 dangerMode: true,
                 })
                 .then((willDelete) => {
                 if (willDelete) {
               DisabledLine();

            }
                 });
                 }
                 else{
                 swal("please select line");
                 }
        
    });


     $(document).on("dblclick","#Discountgrid tbody tr",function() {
   var row = jquery_1_11_3_min_p(this);
   dblclickFlag=1;
           $("#btnback").css('display', 'block');
           $("#btnnew").css('display', 'none');
         dblclickDiscGrpId= row.find('td:nth-child(1)').text().trim();
         ddlclickAssightype=row.find('td:nth-child(2)').text().trim();
         $("#CreateSequenceNew").css('display', 'block');
        $("#itemTaxGroupGrid").css('display', 'none');
        $("#txtgrpName").val(row.find('td:nth-child(5)').text());
         $("#txtdesc").val(row.find('td:nth-child(6)').text());
          $("#txthdrFromdate").val(row.find('td:nth-child(7)').text());
           $("#txthdrtodate").val(row.find('td:nth-child(8)').text());
            BindEntityCountrydDetails();
            var Entity=row.find('td:nth-child(9)').text().trim()
             var Country=row.find('td:nth-child(10)').text().trim()
       kendo_all_min_js("#ddlentity").data("kendoDropDownList").value(Entity);
      kendo_all_min_js("#ddlcountry").data("kendoDropDownList").value(Country);
          kendo_all_min_js("#ddlentity").data("kendoDropDownList").readonly();
      kendo_all_min_js("#ddlcountry").data("kendoDropDownList").readonly();
        $('.hiderow').css('display','flex');
        $("#btnproceed").css('display','none');
       $("#txtgrpName").prop('disabled','disabled');
       $("#txtdesc").prop('disabled','disabled');
      $("#txthdrFromdate").prop('disabled','disabled');
      $("#txthdrtodate").prop('disabled','disabled');
      kendo_all_min_js("#ddlentity").data("kendoDropDownList").readonly();
      kendo_all_min_js("#ddlcountry").data("kendoDropDownList").readonly();
      BindPartnerType(row.find('td:nth-child(2)').text().trim());
      kendo_all_min_js('#ddlassignedTo').data("kendoDropDownList").value(row.find('td:nth-child(2)').text().trim());
       kendo_all_min_js("#ddlassignedTo").data("kendoDropDownList").readonly();
      BindLineGrid();
      });
});




function BindEntityCountrydDetails() {
    var Country = []; var Entity = []; var ItemType = []; var PartnerType = [];var AssignTo = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/DiscountSetup.asmx/BindEntitydDetails",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
            var i = 0;
            jQuery.each(jsonData.Table, function (rec) {
                Country.push({ value: jsonData.Table[i].CountryId, text: jsonData.Table[i].CountryName });
                i++;
            });
            var i = 0;
            Entity.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table1, function (rec) {
                Entity.push({ value: jsonData.Table1[i].Entityid, text: jsonData.Table1[i].Entityname });
                i++;
            });
            var i = 0;
            ItemType.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table2, function (rec) {
                ItemType.push({ value: jsonData.Table2[i].ItemTypeId, text: jsonData.Table2[i].ItemtypeName });
                i++;
            });
          
             var i = 0;
            AssignTo.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table3, function (rec) {
                AssignTo.push({ value: jsonData.Table3[i].TypeId, text: jsonData.Table3[i].Typename });
                i++;
            });

        },
        error: function (result) {
        }
    });

    kendo_all_min_js('#ddlcountry').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Country,
        change: function () {
            kendo_all_min_js('#ddlcountry').data("kendoDropDownList").span.css('background', 'none');
        }
    });
    kendo_all_min_js('#ddlentity').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Entity,
        change: function () {
            kendo_all_min_js('#ddlentity').data("kendoDropDownList").span.css('background', 'none');
            var EntityId = kendo_all_min_js('#ddlentity').data("kendoDropDownList").value();

        }
    });
     kendo_all_min_js('#ddlassignedTo').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: AssignTo,
        change: function () {
            kendo_all_min_js('#ddlassignedTo').data("kendoDropDownList").span.css('background', 'none');
          
        }
    });
    kendo_all_min_js('#ddlitemtype').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ItemType,
        change: function () {
            kendo_all_min_js('#ddlitemtype').data("kendoDropDownList").span.css('background', 'none');
            var ItemType = kendo_all_min_js('#ddlitemtype').data("kendoDropDownList").value();
            if (ItemType == "3") {
                kendo_all_min_js('#ddlitemValue').data("kendoDropDownList").value(0);
                kendo_all_min_js('#ddlitemValue').data("kendoDropDownList").readonly();
            }
            else {
                kendo_all_min_js('#ddlitemValue').data("kendoDropDownList").readonly(false);
                BindItemValue(ItemType);
               
            }
        }
    });
//    kendo_all_min_js('#ddlpartnerType').kendoDropDownList({
//        filter: "contains",
//        dataTextField: "text",
//        dataValueField: "value",
//        dataSource: PartnerType,
//        change: function () {
//            kendo_all_min_js('#ddlpartnerType').data("kendoDropDownList").span.css('background', 'none');
//            var partnerType = kendo_all_min_js('#ddlpartnerType').data("kendoDropDownList").value();
//            if (partnerType == "3") {
//                kendo_all_min_js('#ddlpartnerValue').data("kendoDropDownList").value(0);
//                var datasource = kendo_all_min_js('#ddlpartnerValue').data("kendoDropDownList");
//                datasource.readonly();
//            }
//            else {
//                kendo_all_min_js('#ddlpartnerValue').data("kendoDropDownList").readonly(false);
//                BindpartnerValue(partnerType)
//            }

//        }
//    });
}


function BindItemValue(ItemType) {
    var EntityId = kendo_all_min_js('#ddlentity').data("kendoDropDownList").value(); 
    var CountryId = kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value(); 
    
     jquery_1_11_3_min_p.ajax({
         type: "POST",
         contentType: "application/json; charset=utf-8",
         url: "../WebServices/DiscountSetup.asmx/BindItemValue",
         data: "{'EntityId':'" + EntityId + "','CountryId':'" + CountryId + "','ItemType':'" + ItemType + "'}",
         dataType: "json",
         async: false,
         success: function (result) {
           var  jsonData = eval(result.d);
             var i = 0;
             ValueItem = [];
             ValueItem.push({ value: "0", text: "Select" });
             jQuery.each(jsonData.Table, function (rec) {
                 ValueItem.push({ value: jsonData.Table[i].Itemid, text: jsonData.Table[i].ItemName });
                 i++;
             });
         },
         error: function (result) {
         }
     });

    kendo_all_min_js('#ddlitemValue').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ValueItem,
           open: function () {
            if (kendo_all_min_js('#ddlentity').data("kendoDropDownList").value() == "0") {
                swal("Please select Entity");
                }
            },
        change: function () {
            kendo_all_min_js('#ddlitemValue').data("kendoDropDownList").span.css('background', 'none');
        }
    });
    kendo_all_min_js('#ddlitemValue').data("kendoDropDownList").value(0);
}

function BindPartnerType(TypeFlag) {
    var EntityId = kendo_all_min_js('#ddlentity').data("kendoDropDownList").value();
    var CountryId = kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value();
    var Partnertype=[]
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/DiscountSetup.asmx/BindPartnerType",
        data: "{'EntityId':'" + EntityId + "','CountryId':'" + CountryId + "','TypeFlag':'" + TypeFlag + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var jsonData = eval(result.d);
            var i = 0;
            Partnertype = [];
            Partnertype.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {
                Partnertype.push({ value: jsonData.Table[i].PartnerTypeId, text: jsonData.Table[i].PartnerTypeName });
                i++;
            });
        },
        error: function (result) {
        }
    });

    kendo_all_min_js('#ddlpartnerType').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Partnertype,
        open: function () {
            if (kendo_all_min_js('#ddlentity').data("kendoDropDownList").value() == "0") {
                swal("Please select Entity");
            }
        },
        change: function () {
              kendo_all_min_js('#ddlpartnerType').data("kendoDropDownList").span.css('background', 'none');
            var partnerType = kendo_all_min_js('#ddlpartnerType').data("kendoDropDownList").value();
            if (partnerType == "3") {
                kendo_all_min_js('#ddlpartnerValue').data("kendoDropDownList").value(0);
                var datasource = kendo_all_min_js('#ddlpartnerValue').data("kendoDropDownList");
                datasource.readonly();
            }
            else {
                kendo_all_min_js('#ddlpartnerValue').data("kendoDropDownList").readonly(false);
                BindpartnerValue(partnerType)
            }
        }
    });
   // kendo_all_min_js('#ddlpartnerValue').data("kendoDropDownList").value(0);
}

function BindpartnerValue(partnerType) {
    var EntityId = kendo_all_min_js('#ddlentity').data("kendoDropDownList").value();
    var CountryId = kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value();

    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/DiscountSetup.asmx/BindPartnerValue",
        data: "{'EntityId':'" + EntityId + "','CountryId':'" + CountryId + "','partnerType':'" + partnerType + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var jsonData = eval(result.d);
            var i = 0;
            ValuePartner = [];
            ValuePartner.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {
                ValuePartner.push({ value: jsonData.Table[i].PartnerId, text: jsonData.Table[i].PartnerName });
                i++;
            });
        },
        error: function (result) {
        }
    });

    kendo_all_min_js('#ddlpartnerValue').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ValuePartner,
        open: function () {
            if (kendo_all_min_js('#ddlentity').data("kendoDropDownList").value() == "0") {
                swal("Please select Entity");
            }
        },
        change: function () {
            kendo_all_min_js('#ddlpartnerValue').data("kendoDropDownList").span.css('background', 'none');
        }
    });
    kendo_all_min_js('#ddlpartnerValue').data("kendoDropDownList").value(0);
}


function ddlBindTaxMod() {
    var ModeArray = [];
    ModeArray.push({ value: "1", text: "Discount in Rs" });
    ModeArray.push({ value: "2", text: "Discount in %" });
    kendo_all_min_js('#ddldiscountMode').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ModeArray,
        change: function () {
            kendo_all_min_js('#ddldiscountMode').data("kendoDropDownList").span.css('background', 'none');
        }
    });
}



 function saveTempdataLine() {
 var DGrpId=0;
 if(dblclickFlag==1)
 {
 DGrpId=dblclickDiscGrpId;
 }
 else{
DGrpId= $('#DiscGrpId').text();
 }
        var DiscountData = [];
        var DiscountDatajson = '';
        var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
        DiscountData.push({ ItemType:kendo_all_min_js('#ddlitemtype').data("kendoDropDownList").value(), Itemvalue: kendo_all_min_js('#ddlitemValue').data("kendoDropDownList").value(), PartnerType: kendo_all_min_js('#ddlpartnerType').data("kendoDropDownList").value(), PartnerValue: kendo_all_min_js('#ddlpartnerValue').data("kendoDropDownList").value(), FromQty: $('#txtfromqty').val(), ToQty: kendo_all_min_js('#txttoqty').val(), DiscMode: kendo_all_min_js('#ddldiscountMode').val(), DiscValue: $("#txtdiscountvalue").val(), EntityId: kendo_all_min_js('#ddlentity').data("kendoDropDownList").value(), CountryId: kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value(), CreatedBy: CreatedBy,Fromdate: jquery_1_11_3_min_p("#txtFromDate").val(),Todate: jquery_1_11_3_min_p("#txtTodate").val(),DiscountgroupId: DGrpId  })
// DiscountData.push({ DiscountTypeId:kendo_all_min_js('#ddlitemtype').data("kendoDropDownList").value(), DiscountTypeValue: kendo_all_min_js('#ddlitemValue').data("kendoDropDownList").value(), DiscountFlag:"1",FromQty: $('#txtfromqty').val(), ToQty: kendo_all_min_js('#txttoqty').val(), DiscMode: kendo_all_min_js('#ddldiscountMode').val(), DiscValue: $("#txtdiscountvalue").val(), EntityId: kendo_all_min_js('#ddlentity').data("kendoDropDownList").value(), CountryId: kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value(), CreatedBy: CreatedBy,Fromdate: jquery_1_11_3_min_p("#txtFromDate").val(),Todate: jquery_1_11_3_min_p("#txtTodate").val()  });
//  DiscountData.push({ DiscountTypeId: kendo_all_min_js('#ddlpartnerType').data("kendoDropDownList").value(), DiscountTypeValue: kendo_all_min_js('#ddlpartnerValue').data("kendoDropDownList").value(), DiscountFlag:"2", FromQty: $('#txtfromqty').val(), ToQty: kendo_all_min_js('#txttoqty').val(), DiscMode: kendo_all_min_js('#ddldiscountMode').val(), DiscValue: $("#txtdiscountvalue").val(), EntityId: kendo_all_min_js('#ddlentity').data("kendoDropDownList").value(), CountryId: kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value(), CreatedBy: CreatedBy,Fromdate: jquery_1_11_3_min_p("#txtFromDate").val(),Todate: jquery_1_11_3_min_p("#txtTodate").val()  });
      
        DiscountDatajson = JSON.stringify(DiscountData);
      
        DiscountGroupId=DGrpId;
        jquery_1_11_3_min_p.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../WebServices/DiscountSetup.asmx/SaveTempData",
            data: "{'LineJson':'" + DiscountDatajson + "','DiscountGroupId':'" + DiscountGroupId + "'}",
            dataType: "json",
            async: false,
            success: function (result) {
                jsonData = eval(result.d);
                if(jsonData.Table[0].Response=="-1")
                {
                  swal("Invalid Date","From date not allow ","warning");
                    BindLineGrid() ;
                }
                else{
                swal("Saved Successfully","Your data Saved successfully!","success")
            .then((value) => {
            BindLineGrid() ;
            });
            }
            }
        });
   
                  }

 function FormValidation() {
    var allow = true;
    var i = 0;
    if (kendo_all_min_js("#ddlEntityCountry").val() == 0) {
        kendo_all_min_js("#ddlEntityCountry").data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
          }
           if (kendo_all_min_js("#ddlassignedTo").val() == 0) {
        kendo_all_min_js("#ddlassignedTo").data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
          }
      if (kendo_all_min_js("#ddlentity").val() == 0) {
        kendo_all_min_js("#ddlentity").data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
          }
  
         if (jquery_1_11_3_min_p("#txthdrFromdate").val() == "") {
                jquery_1_11_3_min_p("#txthdrFromdate").addClass('validate');
                jquery_1_11_3_min_p("#txthdrFromdate").attr("placeholder", "From Date");
                allow = false;
            }
            if (jquery_1_11_3_min_p("#txthdrtodate").val() == 0) {
                jquery_1_11_3_min_p("#txthdrtodate").addClass('validate');
                jquery_1_11_3_min_p("#txthdrtodate").attr("placeholder", "To Date");
                allow = false;
            }
            if (jquery_1_11_3_min_p("#txtgrpName").val() == "") {
                jquery_1_11_3_min_p("#txtgrpName").addClass('validate');
                jquery_1_11_3_min_p("#txtgrpName").attr("placeholder", "Enter Groupname!");
                allow = false;
            }
    return allow;
}

  function LinFormValidation() {
    var allow = true;
    var i = 0;
  if (kendo_all_min_js("#ddlEntityCountry").val() == 0) {
        kendo_all_min_js("#ddlEntityCountry").data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
          }
      if (kendo_all_min_js("#ddlentity").val() == 0) {
        kendo_all_min_js("#ddlentity").data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
          }
       if (kendo_all_min_js("#ddlitemtype" ).val() == 0) {
        kendo_all_min_js("#ddlitemtype").data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
          }
           if (kendo_all_min_js("#ddlitemtype" ).val() != 3) {
          if (kendo_all_min_js("#ddlitemValue" ).val() == 0) {
        kendo_all_min_js("#ddlitemValue").data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
          }
          }
          if (kendo_all_min_js("#ddlpartnerType" ).val() == 0) {
        kendo_all_min_js("#ddlpartnerType").data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
          }
           if (kendo_all_min_js("#ddlpartnerType" ).val() != 3) {
           if (kendo_all_min_js("#ddlpartnerValue" ).val() == 0) {
        kendo_all_min_js("#ddlpartnerValue").data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
          }
          }
         if (jquery_1_11_3_min_p("#txtFromDate").val() == "") {
                jquery_1_11_3_min_p("#txtFromDate").addClass('validate');
                jquery_1_11_3_min_p("#txtFromDate").attr("placeholder", "From Date");
                allow = false;
            }
            if (jquery_1_11_3_min_p("#txtTodate").val() == 0) {
                jquery_1_11_3_min_p("#txtTodate").addClass('validate');
                jquery_1_11_3_min_p("#txtTodate").attr("placeholder", "To Date");
                allow = false;
            }
//            if (jquery_1_11_3_min_p("#txtfromqty").val() == "") {
//                jquery_1_11_3_min_p("#txtfromqty").addClass('validate');
//                jquery_1_11_3_min_p("#txtfromqty").attr("placeholder", "From Qty!");
//                allow = false;
//            }
//             if (jquery_1_11_3_min_p("#txttoqty").val() == "") {
//                jquery_1_11_3_min_p("#txttoqty").addClass('validate');
//                jquery_1_11_3_min_p("#txttoqty").attr("placeholder", "To Qty!");
//                allow = false;
//            }
            if (jquery_1_11_3_min_p("#txtdiscountvalue").val() == "") {
                jquery_1_11_3_min_p("#txtdiscountvalue").addClass('validate');
                jquery_1_11_3_min_p("#txtdiscountvalue").attr("placeholder", "");
                allow = false;
            }

    return allow;
}

function RemoveClass()
{
           if (jquery_1_11_3_min_p("#txtFromDate").val() != "") {
                jquery_1_11_3_min_p("#txtFromDate").removeClass('validate');
               
            }
            if (jquery_1_11_3_min_p("#txtTodate").val() != 0) {
                jquery_1_11_3_min_p("#txtTodate").removeClass('validate');
                
            }
            if (jquery_1_11_3_min_p("#txtfromqty").val() != "") {
                jquery_1_11_3_min_p("#txtfromqty").removeClass('validate');
                
            }
             if (jquery_1_11_3_min_p("#txttoqty").val() != "") {
                jquery_1_11_3_min_p("#txttoqty").removeClass('validate');
                
            }
            if (jquery_1_11_3_min_p("#txtdiscountvalue").val() != "") {
                jquery_1_11_3_min_p("#txtdiscountvalue").removeClass('validate');
               
            }
              if (jquery_1_11_3_min_p("#txtgrpName").val() != "") {
                jquery_1_11_3_min_p("#txtgrpName").removeClass('validate');
               
            }
              if (jquery_1_11_3_min_p("#txthdrtodate").val() != "") {
                jquery_1_11_3_min_p("#txthdrtodate").removeClass('validate');
               
            }
              if (jquery_1_11_3_min_p("#txthdrFromdate").val() != "") {
                jquery_1_11_3_min_p("#txthdrFromdate").removeClass('validate');
               
            }
}


 function SaveHeaderData() {
        var DiscountDataHeader = [];
      var  DiscountDataHeaderJson='';
        var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
  DiscountDataHeader.push({ DiscountGroupName: $('#txtgrpName').val(), discription: $('#txtdesc').val(), EntityId: kendo_all_min_js('#ddlentity').data("kendoDropDownList").value(), CountryId: kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value(), CreatedBy: CreatedBy,Fromdate: jquery_1_11_3_min_p("#txthdrFromdate").val(),Todate: jquery_1_11_3_min_p("#txthdrtodate").val() ,AssignedFlag:kendo_all_min_js('#ddlassignedTo').data("kendoDropDownList").value() });
      
        DiscountDataHeaderJson = JSON.stringify(DiscountDataHeader);
        jquery_1_11_3_min_p.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../WebServices/DiscountSetup.asmx/SaveHeaderData",
            data: "{'LineJson':'" + DiscountDataHeaderJson + "'}",
            dataType: "json",
            async: false,
            success: function (result) {
                jsonData = eval(result.d);
               
                if(jsonData.Table[0].Response=="0")
                {
                 jquery_1_11_3_min_p("#txtgrpName").val("");
                 jquery_1_11_3_min_p("#txtgrpName").attr("placeholder", "GroupName already Exists.");
                }
               else if(jsonData.Table[0].Response=="-1")
                {
                 swal("Invalid Date","From date not allow ","warning")
                }
                else
                {
                $('#DiscGrpId').text(jsonData.Table[0].Response);
                $('.hiderow').css('display','flex');
                $("#btnproceed").css('display','none');
                $("#txtgrpName").prop('disabled','disabled');
                 $("#txtdesc").prop('disabled','disabled');
                  $("#txthdrFromdate").prop('disabled','disabled');
                   $("#txthdrtodate").prop('disabled','disabled');
                    kendo_all_min_js("#ddlentity").data("kendoDropDownList").readonly();
                     kendo_all_min_js("#ddlcountry").data("kendoDropDownList").readonly();
                     kendo_all_min_js("#ddlassignedTo").data("kendoDropDownList").readonly();
            }
            }
        });
   
                  }


function BindLineGrid() {
 jquery_1_11_3_min_p("#discontHistorygrd tbody").empty();
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
    var FieldGroup = [];
   var LoadData = 100;
   var DiscountGId=0;
   var Assignflag=0;
   if(dblclickFlag==1)
   {
   DiscountGId=dblclickDiscGrpId;
   Assignflag=ddlclickAssightype
   }
   else{
   Assignflag=kendo_all_min_js("#ddlassignedTo").data("kendoDropDownList").value();
  DiscountGId=  $('#DiscGrpId').text();
  }
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/DiscountSetup.asmx/BindLine",
        data: "{'LoadData':'" + LoadData + "','DiscountGId':'" + DiscountGId + "','Assignflag':'" + Assignflag + "'}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
            //jquery_1_11_3_min_p('#divGrid').css('display', 'block');
            var i = 0;
            var jsonData = result.d;
            editjsondata= result.d;
            var checkcount=1;
            jQuery.each(jsonData.Table, function (rec) {
            var discmode=''
            if(jsonData.Table[i].discountMode=="1")
            {
            discmode='Rupees'
            }
            else{  discmode='Percent'}
                var markup = "<tr><td style='display:none'> " + jsonData.Table[i].DisLineid + "</td><td><input type='checkbox' class='chk_All' id='chk_" +checkcount+"'></td><td>" + jsonData.Table[i].Fromdate + "</td> <td> " + jsonData.Table[i].Todate + "</td><td>" + jsonData.Table[i].ItemType + "</td> <td> " + jsonData.Table[i].itemTypeValue + "</td><td> " + jsonData.Table[i].PartnerType + "</td><td> " + jsonData.Table[i].PartnerTypeValue + "</td> <td> " + jsonData.Table[i].Qtyrange + "</td><td> " + jsonData.Table[i].discountvalue + "</td><td> " + discmode + "</td></tr>";

                jquery_1_11_3_min_p("#discontHistorygrd tbody").append(markup);

                //=========================== start for PDF===================================

//                var pdftable = "<tr><td>" + jsonData.Table[i].PartnerType + "</td> <td >" + jsonData.Table[i].PartnerName + "</td> <td >" + jsonData.Table[i].ContactNo + "</td></tr>";
//                jquery_1_11_3_min_p("#pdftable tbody").append(pdftable);

                //==============================end for PFD=================================
                checkcount++;
                i++;
            });
//            var k = 0; 
//            if (jsonData.Table.length > 0) { var columnsIn = jsonData.Table[0]; for (var key in columnsIn) { if (k > 0) { ColumnName.push(key); } k++; } } else {
//                ColumnName.push(k); k++;
//            }
//            var j = 0; jquery_1_11_3_min_p("#DivSearch").empty();
//            jquery_1_11_3_min_p('#partnersgrid thead tr th').each(function () {
//                if (j > 0) {

//                var id1='chk_'+ ColumnName[j - 1];
//                this.id=id1;
//                    var SearchDiv = "<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='searchcheckAll' id='chk_" + ColumnName[j - 1] + "' onclick='Addclasstocolumn(this)'><label for='check3' class='coldata'>" + $(this).text() + "</label></span></div>";
//                    jquery_1_11_3_min_p("#DivSearch").append(SearchDiv);
//                }
//                j++;

//            });
            var Searchfinaldiv="<div class='dropdownBottom'><label class='pull-left' id='selectall' onclick='searchcheckAll()' >Select All</label><label class='pull-right' id='reset' onclick='searchUncheckAll()' >Reset</label></div>";
jquery_1_11_3_min_p("#DivSearch").append(Searchfinaldiv);
            if (jsonData.Table.length >= jsonData.Table1[0].Totalcount) {
               jquery_1_11_3_min_p('#lblRowCount1').text(jsonData.Table.length);
                jquery_1_11_3_min_p('#lblTotalCount1').text(jsonData.Table1[0].Totalcount);
                jquery_1_11_3_min_p('#btnLoadMore1').css('visibility', 'hidden');
            }
            else {
                jquery_1_11_3_min_p('#lblRowCount1').text(jsonData.Table.length);
                jquery_1_11_3_min_p('#lblTotalCount1').text(jsonData.Table1[0].Totalcount);
                jquery_1_11_3_min_p('#btnLoadMore1').css('visibility', 'visible');
            }


        }


    });

}


function BindDiscountGrid() {
 jquery_1_11_3_min_p("#Discountgrid tbody").empty();
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
    var FieldGroup = [];
   var LoadData = 100;
   var txtSearchvalue=""
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/DiscountSetup.asmx/BinddiscGrid",
        data: "{'LoadData':'" + LoadData + "','txtSearchvalue':'" + txtSearchvalue + "'}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
            //jquery_1_11_3_min_p('#divGrid').css('display', 'block');
            var i = 0;
            var jsonData = result.d;
            editjsondata= result.d;
            var checkcount=1;
            jQuery.each(jsonData.Table, function (rec) {
                var markup = "<tr><td style='display:none'> " +  jsonData.Table[i].DiscountGroupId  + "</td><td style='display:none'> " +  jsonData.Table[i].AssignedFlag  + "</td><td><input type='checkbox' class='chk_All' id='chk_" +checkcount+"'></td><td>" + jsonData.Table[i].DiscountGroupcode + "</td> <td> " + jsonData.Table[i].DiscountGroupName + "</td><td> " + jsonData.Table[i].description + "</td><td>" + jsonData.Table[i].Fromdate + "</td> <td> " + jsonData.Table[i].Todate + "</td><td style='display:none'> " + jsonData.Table[i].EntityId + "</td><td style='display:none'> " + jsonData.Table[i].CountryId + "</td></tr>";

                jquery_1_11_3_min_p("#Discountgrid tbody").append(markup);

                //=========================== start for PDF===================================

//                var pdftable = "<tr><td>" + jsonData.Table[i].PartnerType + "</td> <td >" + jsonData.Table[i].PartnerName + "</td> <td >" + jsonData.Table[i].ContactNo + "</td></tr>";
//                jquery_1_11_3_min_p("#pdftable tbody").append(pdftable);

                //==============================end for PFD=================================
                checkcount++;
                i++;
            });
//            var k = 0; 
//            if (jsonData.Table.length > 0) { var columnsIn = jsonData.Table[0]; for (var key in columnsIn) { if (k > 0) { ColumnName.push(key); } k++; } } else {
//                ColumnName.push(k); k++;
//            }
//            var j = 0; jquery_1_11_3_min_p("#DivSearch").empty();
//            jquery_1_11_3_min_p('#partnersgrid thead tr th').each(function () {
//                if (j > 0) {

//                var id1='chk_'+ ColumnName[j - 1];
//                this.id=id1;
//                    var SearchDiv = "<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='searchcheckAll' id='chk_" + ColumnName[j - 1] + "' onclick='Addclasstocolumn(this)'><label for='check3' class='coldata'>" + $(this).text() + "</label></span></div>";
//                    jquery_1_11_3_min_p("#DivSearch").append(SearchDiv);
//                }
//                j++;

//            });
            var Searchfinaldiv="<div class='dropdownBottom'><label class='pull-left' id='selectall' onclick='searchcheckAll()' >Select All</label><label class='pull-right' id='reset' onclick='searchUncheckAll()' >Reset</label></div>";
jquery_1_11_3_min_p("#DivSearch").append(Searchfinaldiv);
            if (jsonData.Table.length >= jsonData.Table1[0].Totalcount) {
               jquery_1_11_3_min_p('#lblRowCount').text(jsonData.Table.length);
                jquery_1_11_3_min_p('#lblTotalCount').text(jsonData.Table1[0].Totalcount);
                jquery_1_11_3_min_p('#btnLoadMore').css('visibility', 'hidden');
            }
            else {
                jquery_1_11_3_min_p('#lblRowCount').text(jsonData.Table.length);
                jquery_1_11_3_min_p('#lblTotalCount').text(jsonData.Table1[0].Totalcount);
                jquery_1_11_3_min_p('#btnLoadMore').css('visibility', 'visible');
            }


        }


    });

}

function DisabledLine()
{
var RowNum=1;
var LineIdArray=[];
 jquery_1_11_3_min_p('#discontHistorygrd tbody').find('tr').each(function () {
    var row = jquery_1_11_3_min_p(this);
    if($("#chk_"+RowNum).prop('checked') == true){
    var Id = row.find('td:nth-child(1)').text();
    LineIdArray.push({DisLineId:Id});
       }
       RowNum++;
    });
    var LineIdJson='';
    LineIdJson=JSON.stringify(LineIdArray);
    
      jquery_1_11_3_min_p.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../WebServices/DiscountSetup.asmx/DisabledLine",
            data: "{'LineIdJson':'" + LineIdJson + "'}",
            dataType: "json",
            async: false,
            success: function (result) {
                jsonData = eval(result.d);
                swal("Saved Successfully","Your Line Disabled successfully!","success")
            .then((value) => {
            BindLineGrid() ;
            });

            }
        });
}

function IsChecked()
{
var RowNum=1;
var allow=false;
 jquery_1_11_3_min_p('#discontHistorygrd tbody').find('tr').each(function () {
    var row = jquery_1_11_3_min_p(this);
    if($("#chk_"+RowNum).prop('checked') == true){
        allow=true;
       }
       RowNum++;
    });
    return allow;
}

