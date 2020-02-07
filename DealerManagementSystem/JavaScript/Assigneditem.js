var LoadData = ''; var Assigned = []; var Country = []; Entity = [];var searchtxt = '';var ColumnName=[]; var Items=[]; var Itemcount=1; var PartnerLocation=[];
var locationid='';var partnerid='';
jquery_1_11_3_min_p(document).ready(function () {
BindEntityForgrid();
    jquery_1_11_3_min_p("#hdnLoad").val(10);
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
     BindAssignedDataSetupGrid(searchtxt,kendo_all_min_js('#ddlgridEntity').val())
    BindEntity();
    Assigned = [];
    Assigned.push({ value: "0", text: "Select" });
    kendo_all_min_js('#ddlpartnername').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Assigned,
        change: function () {
            kendo_all_min_js('#ddlpartnername').data("kendoDropDownList").span.css('background', 'none');
        }
    });
    Items=[];
    Items.push({ value: "0", text: "Select" });
     var itemid="txtItem_"+Itemcount;
    kendo_all_min_js('#'+itemid).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Items,
        change: function () {
          kendo_all_min_js('#'+itemid).data("kendoDropDownList").span.css('background', 'none');
        }
    });
     PartnerLocation=[];
    PartnerLocation.push({ value: "0", text: "Select" });
    
    kendo_all_min_js('#ddllocation').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: PartnerLocation,
        change: function () {
          kendo_all_min_js('#ddllocation').data("kendoDropDownList").span.css('background', 'none');
        }
    });

    $(document).on("dblclick","#tblassignedpartneritem tbody tr",function() {
   var row = jquery_1_11_3_min_p(this);
   var AssignedItemid= row.find('td:nth-child(1)').text().trim();
   var entityid=row.find('td:nth-child(2)').text().trim();
   var countryid=row.find('td:nth-child(3)').text().trim();
   partnerid=row.find('td:nth-child(4)').text().trim();
   locationid=row.find('td:nth-child(5)').text().trim();
   kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value(countryid);
   kendo_all_min_js('#ddlentity').data("kendoDropDownList").value(entityid);
   BindPartnerLocation(partnerid,kendo_all_min_js('#ddlentity').val());
   BindAssigned(countryid, entityid)
   jquery_1_11_3_min_p('#PartnerItemAssignedForm').css('display', 'block');
   jquery_1_11_3_min_p('#PartnerItemAssignedGrid').css('display', 'none');
   jquery_1_11_3_min_p('#btnsubmit').css('display', 'block');
   jquery_1_11_3_min_p('#btnsubmit').prop("disabled", true);
   jquery_1_11_3_min_p('#btnback').css('display', 'block');
   jquery_1_11_3_min_p('#btnnew').css('display', 'none');
   BindItems(AssignedItemid)
   });
    jquery_1_11_3_min_p('#btnnew').click(function () {
        $("#PartnerItemAssignedForm").css('display', 'block');
        $("#PartnerItemAssignedGrid").css('display', 'none');
        jquery_1_11_3_min_p('#btnsubmit').css('display', 'block');
        //jquery_1_11_3_min_p('#btnSubmit').prop('disabled', true);
        jquery_1_11_3_min_p('#btnback').css('display', 'block');
        jquery_1_11_3_min_p('#btnnew').css('display', 'none');
          jquery_1_11_3_min_p("#txtMinQty_1").val(0);
        jquery_1_11_3_min_p("#txtMaxQty_1").val(0);
    });

    jquery_1_11_3_min_p("#btnback").click(function () {
        window.location.replace("ItemAssigned.aspx");
    });


     jquery_1_11_3_min_p('#btnDeleteLine').on("click", function (event) {
var sel = false;
var ch = jquery_1_11_3_min_p('#' + 'tblitemassigned').find('tbody input[type=checkbox]');
ch.each(function () {
var $this = jquery_1_11_3_min_p(this);
if ($this.is(':checked')) {
sel = true; //set to true if there is/are selected row
}
});
if (!sel) {
swal("No data selected","Please select data first!", "warning")
}
else {
swal({
title: "Are you sure you want to delete?",
text: "",
icon: "warning",
buttons: true,
dangerMode: true,
})
.then((willDelete) => {
if (willDelete) {
var sel = false;
var ch = jquery_1_11_3_min_p('#' + 'tblitemassigned').find('tbody input[type=checkbox]');
ch.each(function () {
var $this = jquery_1_11_3_min_p(this);
if ($this.is(':checked')) {
var DeleteRow = jquery_1_11_3_min_p(this).closest('tr');
sel = true; 
DeleteRow.remove();

}
});

swal("Deleted Successfully","Items deleted successfully!","success")
            .then((value) => {

            });
}
});
}
});




    jquery_1_11_3_min_p('#btnsubmit').click(function () {
        if (ValidateHeaderDropDown() == true) { 
         swal({
                 title: "Do you want to Proceed?",
                 text: "",
                 icon: "warning",
                 buttons: true,
                 dangerMode: true,
                 })
                 .then((willDelete) => {
                 if (willDelete) {
                 SaveAssignedItem();
               

             }
         });
        }
    });

});

function BindEntity() {
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/BindFieldDetails",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
            Country = [];
            var i = 0;
            // Country.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table1, function (rec) {
                Country.push({ value: jsonData.Table1[i].CountryId, text: jsonData.Table1[i].CountryName });
                i++;
            });
            Entity = [];
            var i = 0;
            Entity.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table2, function (rec) {
                Entity.push({ value: jsonData.Table2[i].Entityid, text: jsonData.Table2[i].Entityname });
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
            var EntityId = kendo_all_min_js('#ddlentity').val();
            var CountryId = kendo_all_min_js('#ddlcountry').val();
            Assigned = [];
            Assigned.push({ value: "0", text: "Select" });
            kendo_all_min_js('#ddlpartnername').kendoDropDownList({
                filter: "contains",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: Assigned,
                change: function () {
                    kendo_all_min_js('#ddlpartnername').data("kendoDropDownList").span.css('background', 'none');
                }
            });
           
            BindAssigned(CountryId, EntityId)
        }
    });

    kendo_all_min_js('#ddlentity').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Entity,
        change: function () {
            kendo_all_min_js('#ddlentity').data("kendoDropDownList").span.css('background', 'none');
            Assigned = [];
            Assigned.push({ value: "0", text: "Select" });
            kendo_all_min_js('#ddlpartnername').kendoDropDownList({
                filter: "contains",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: Assigned,
                change: function () {
                    kendo_all_min_js('#ddlpartnername').data("kendoDropDownList").span.css('background', 'none');
                }
            });
            var EntityId = kendo_all_min_js('#ddlentity').val();
           var CountryId = kendo_all_min_js('#ddlcountry').val();
          BindAssigned(CountryId, EntityId)
           
        }
    });
}


function BindAssigned(CountryId, EntityId) {
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/BindAssigneditem",
        data: "{'CountryId':'" + CountryId + "','EntityId':'" + EntityId + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
            Parameter = [];
            var i = 0;
            Parameter.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {
                Parameter.push({ value: jsonData.Table[i].PartnerId, text: jsonData.Table[i].PartnerName });
                i++;
            });

              Items = [];
            var i = 0;
            Items.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table1, function (rec) {
                Items.push({ value: jsonData.Table1[i].Itemid, text: jsonData.Table1[i].ItemName });
                i++;
            });

        },
        error: function (result) {
        }
    });
    var itemid="txtItem_"+Itemcount;
    kendo_all_min_js('#'+itemid).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Items,
        change: function () {
          kendo_all_min_js('#'+itemid).data("kendoDropDownList").span.css('background', 'none');
        }
    });

      kendo_all_min_js('#ddlpartnername').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Parameter,
        change: function () {
          kendo_all_min_js('#ddlpartnername').data("kendoDropDownList").span.css('background', 'none');
           kendo_all_min_js('#'+itemid)
          BindPartnerLocation(kendo_all_min_js('#ddlpartnername').val(),kendo_all_min_js('#ddlentity').val());
        }
    });

    if(partnerid !='')
    {
    kendo_all_min_js('#ddlpartnername').data("kendoDropDownList").value(partnerid);
    }
}


function BindItems(Assigned) {
Itemcount=0;
jquery_1_11_3_min_p("#tblitemassigned tbody").empty();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/Binditems",
        data: "{'Assignedid':'" + Assigned + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
           var i=0;
            jQuery.each(jsonData.Table, function (rec) {
                  var rowID = Itemcount + 1;
//        var markup = "<tr><td><input type='checkbox' class='chk_All' id='chk_" + rowID + "'></td><td ><input type='text' class='fieldName' id='txtItem_" + rowID + "' onkeypress='RemoveClass(this)' autocomplete='off' onchange='Comparevalue(this)' placeholder='Enter tem' /></td><td style='opacity:0'>" + rowID + "</td></tr>";
  var markup = "<tr><td><input type='checkbox' class='chk_All' id='chk_" + rowID + "'></td><td ><input type='text' class='fieldName' id='txtItem_" + rowID + "' onkeypress='RemoveClass(this)' autocomplete='off' onchange='Comparevalue(this)' placeholder='Enter tem' /> <td ><span class='customer'> <input type='text' id='txtMinQty_"+rowID+"' placeholder='Enter Qty' onkeyup='RemoveClass(this)' class='fieldName' /></span></td><td ><span class='customer'> <input type='text' id='txtMaxQty_"+rowID+"'  placeholder='Enter Qty' onkeyup='RemoveClass(this)' class='fieldName'/></span></td></td><td style='opacity:0'>" + rowID + "</td></tr>";
        jquery_1_11_3_min_p("#tblitemassigned tbody").append(markup);
      //  kendo_all_min_js("#txtItem_" + rowID).focus();
        Itemcount = rowID;

           var itemid="txtItem_"+Itemcount;
         kendo_all_min_js('#'+itemid).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Items,
        change: function () {
          kendo_all_min_js('#'+itemid).data("kendoDropDownList").span.css('background', 'none');
        }
    });
     kendo_all_min_js('#'+itemid).data("kendoDropDownList").value(jsonData.Table[i].Itemid);
              var kendoid="txtItem_" + parseInt(Itemcount);
            var dataSource  =  jquery_1_11_3_min_p('#'+kendoid).data("kendoDropDownList");
            dataSource.readonly();
            jquery_1_11_3_min_p('#txtMinQty_'+Itemcount).val(jsonData.Table[i].minItemQty);
             jquery_1_11_3_min_p('#txtMaxQty_'+Itemcount).val(jsonData.Table[i].MaxItemQty);
             jquery_1_11_3_min_p('#txtMinQty_'+Itemcount).prop("disabled",true);
             jquery_1_11_3_min_p('#txtMaxQty_'+Itemcount).prop("disabled",true);
                i++;
            });

            
        },
        error: function (result) {
        }
    });
   
}





function BindPartnerLocation(Partnerid ,Entityid) {
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/BindPartnerLocation",
        data: "{'PartnerId':'" + Partnerid + "','Entityid':'" + Entityid + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
            PartnerLocation = [];
            var i = 0;
            PartnerLocation.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {
                PartnerLocation.push({ value: jsonData.Table[i].AutoId, text: jsonData.Table[i].Locationname });
                i++;
            });

             
        },
        error: function (result) {
        }
    });
   
      kendo_all_min_js('#ddllocation').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: PartnerLocation,
        change: function () {
          kendo_all_min_js('#ddllocation').data("kendoDropDownList").span.css('background', 'none');
        }
    });

     if(locationid !='')
    {
    kendo_all_min_js('#ddllocation').data("kendoDropDownList").value(locationid);
    }
}


function ValidateHeaderDropDown() {
    var allow = true;
    var i = 0;
    if (kendo_all_min_js("#ddlcountry").val() == 0) {
        kendo_all_min_js("#ddlcountry").data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
    }
    if (kendo_all_min_js("#ddlentity").val() == 0) {
        kendo_all_min_js("#ddlentity").data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
    }
    if (kendo_all_min_js("#ddlpartnername").val() == 0) {
        kendo_all_min_js("#ddlpartnername").data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
    }

     if (kendo_all_min_js("#ddllocation").val() == 0) {
        kendo_all_min_js("#ddllocation").data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
    }
    if (kendo_all_min_js("#txtItem_" + Itemcount).val() == 0) {
           
           kendo_all_min_js("#txtItem_" + Itemcount).data("kendoDropDownList").span.css('background', '#f9e5e5');
           allow = false;
        }

    return allow;
}




function SaveAssignedItem(){
var jsonfield=[];var Jsonfdata=''; 
    
     jsonfield.push({CountryId: kendo_all_min_js("#ddlcountry").val(),EntityId: kendo_all_min_js("#ddlentity").val(),CreatedBy: jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim(),Partnerid: kendo_all_min_js("#ddlpartnername").val(),Locationid: kendo_all_min_js("#ddllocation").val()});
     Jsonfdata = JSON.stringify(jsonfield);
     var Items=[];var Jsonitems='';
     var i=0;
    jquery_1_11_3_min_p('#tblitemassigned tbody').find('tr').each(function () {
    var row = jquery_1_11_3_min_p(this);
    var itemid=kendo_all_min_js("#txtItem_" + row.find('td:nth-child(5)').text().trim()).val().trim();
     var MinimumQty=jquery_1_11_3_min_p("#txtMinQty_" + row.find('td:nth-child(5)').text().trim()).val().trim();
     var MaximumQty=jquery_1_11_3_min_p("#txtMaxQty_" + row.find('td:nth-child(5)').text().trim()).val().trim();

    Items.push({ ItemId: itemid,CreatedBy: jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim(),MinimumQty:MinimumQty,MaximumQty:MaximumQty })
    i++;
    });
     Jsonitems = JSON.stringify(Items);
    
    jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Setup.asmx/SaveAssigneditem",
    data: "{'Jsondata':'"+ Jsonfdata+"','Jsonitems':'"+ Jsonitems+"'}",
    dataType: "json",
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
            if(jsonData.Table1[0].Response==1)
            {
             swal("Saved Successfully","Items Saved successfully!","success")
            .then((value) => {
             window.location.replace("ItemAssigned.aspx");
            });
            }
        }
    });

}


function BindAssignedDataSetupGrid(searchtxt,entityid) {
 jquery_1_11_3_min_p("#tblassignedpartneritem tbody").empty();
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
    var Partners = [];

    var SearchValue = searchtxt;

    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/BindAssignedDataSetupGrid",
        data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue + "','EntityId':'" + entityid + "'}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
            jquery_1_11_3_min_p('#divGrid').css('display', 'block');
            var i = 0;
            var jsonData = result.d;
            editjsondata= result.d;
//            if(jsonData.Table.length>0)
//            {
//            editjson=result.d;
//            jquery_1_11_3_min_p('#btnUpdate').prop("disabled", false);
//            }
//            else
//            {
//            jquery_1_11_3_min_p('#btnUpdate').prop("disabled", true);
//            }
            
            jQuery.each(jsonData.Table, function (rec) {

                var markup = "<tr> <td style='display:none'> " + jsonData.Table[i].Assignedid + "</td> <td style='display:none'> " + jsonData.Table[i].EntityId + "</td> <td style='display:none'> " + jsonData.Table[i].Countryid + "</td> <td style='display:none'> " + jsonData.Table[i].PartnerId + "</td> <td style='display:none'> " + jsonData.Table[i].Locationid + "</td> <td> <input id='chkbox' type='checkbox' class='checkAll'  /></td><td>" + jsonData.Table[i].Entityname + "</td> <td >" + jsonData.Table[i].CountryName + "</td> <td >" + jsonData.Table[i].PartnerName + "</td><td >" + jsonData.Table[i].Locationname + "</td></tr>";

                jquery_1_11_3_min_p("#tblassignedpartneritem tbody").append(markup);

                //=========================== start for PDF===================================
                
//                var pdftable = "<tr><td>" + jsonData.Table[i].PartnerType + "</td> <td >" + jsonData.Table[i].PartnerName + "</td> <td >" + jsonData.Table[i].ContactNo + "</td></tr>";
//                jquery_1_11_3_min_p("#pdftable tbody").append(pdftable);

                //==============================end for PFD=================================

                i++;
            });
            var k = 0;
            if (jsonData.Table.length > 0) { var columnsIn = jsonData.Table[0]; for (var key in columnsIn) { if (k > 0) { ColumnName.push(key); } k++; } } else {
                ColumnName.push(k); k++;
            }
            var j = 0; jquery_1_11_3_min_p("#DivSearch").empty();
//            var SearchDiv1 = "<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='checkAll' id='chk_" + ColumnName[j - 1] + "' onclick='checkAll(this)'><label for='check3' class='coldata'>All</label></span></div>";
//            jquery_1_11_3_min_p("#DivSearch").append(SearchDiv1);
            jquery_1_11_3_min_p('#tblassignedpartneritem thead tr th').each(function () {
                if (j > 1) {

                var id1='chk_'+ ColumnName[j - 2];
                this.id=id1;
                    var SearchDiv = "<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='searchcheckAll' id='chk_" + ColumnName[j - 2] + "' onclick='Addclasstocolumn(this)'><label for='check3' class='coldata'>" + $(this).text() + "</label></span></div>";
                    jquery_1_11_3_min_p("#DivSearch").append(SearchDiv);

                }
                j++;

            });
            var Searchfinaldiv="<div class='dropdownBottom'><label class='pull-left' id='selectall' onclick='searchcheckAll()' >Select All</label><label class='pull-right' id='reset' onclick='searchUncheckAll()' >Reset</label></div>";
jquery_1_11_3_min_p("#DivSearch").append(Searchfinaldiv);
            if (jsonData.Table.length >= jsonData.Table1[0].Totalcount) {
                jquery_1_11_3_min_p('#lblRowCount').text(jsonData.Table1[0].Totalcount);
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

function AddRow() {
 
    if (kendo_all_min_js("#txtItem_" + Itemcount).val() != 0 && jquery_1_11_3_min_p("#txtMinQty_" + Itemcount).val() !="" && jquery_1_11_3_min_p("#txtMaxQty_" + Itemcount).val() !="" ) {
        var rowID = Itemcount + 1;
        var markup = "<tr><td><input type='checkbox' class='chk_All' id='chk_" + rowID + "'></td><td ><input type='text' class='fieldName' id='txtItem_" + rowID + "' onkeypress='RemoveClass(this)' autocomplete='off' onchange='Comparevalue(this)' placeholder='Enter tem' /> <td ><span class='customer'> <input type='text' id='txtMinQty_"+rowID+"' placeholder='Enter Minimum Qty' onkeyup='RemoveClass(this)' class='fieldName' /></span></td><td ><span class='customer'> <input type='text' id='txtMaxQty_"+rowID+"'  placeholder='Enter Maximum Qty' onkeyup='RemoveClass(this)' class='fieldName'/></span></td></td><td style='opacity:0'>" + rowID + "</td></tr>";
        jquery_1_11_3_min_p("#tblitemassigned tbody").append(markup);
        kendo_all_min_js("#txtItem_" + rowID).focus();
        Itemcount = rowID;
        jquery_1_11_3_min_p("#txtMinQty_" + Itemcount).val(0);
        jquery_1_11_3_min_p("#txtMaxQty_" + Itemcount).val(0);
         var kendoid="txtItem_" + parseInt(Itemcount-1);
            var dataSource  =  jquery_1_11_3_min_p('#'+kendoid).data("kendoDropDownList");
            dataSource.readonly();
             jquery_1_11_3_min_p("#txtMinQty_"+parseInt(Itemcount-1)).prop('disabled', true);
             jquery_1_11_3_min_p("#txtMaxQty_"+parseInt(Itemcount-1)).prop('disabled', true);

         var itemid="txtItem_"+Itemcount;
         kendo_all_min_js('#'+itemid).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Items,
        change: function () {
          kendo_all_min_js('#'+itemid).data("kendoDropDownList").span.css('background', 'none');
        }
    });
        
    }
    else {

        if (kendo_all_min_js("#txtItem_" + Itemcount).val() == 0) {
           
           kendo_all_min_js("#txtItem_" + Itemcount).data("kendoDropDownList").span.css('background', '#f9e5e5');
        }
         if (jquery_1_11_3_min_p("#txtMinQty_" + Itemcount).val() =="") {
           
           jquery_1_11_3_min_p("#txtMinQty_" + Itemcount).addClass('validate');
        }
         if (jquery_1_11_3_min_p("#txtMaxQty_" + Itemcount).val() =="") {
           
           jquery_1_11_3_min_p("#txtMaxQty_" + Itemcount).addClass('validate');
        }

      
    }
}


function Comparevalue(data) {
    var id = data.id;
    var val = jquery_1_11_3_min_p('#' + id).val();
   var table = document.getElementById('tblitemassigned');
  var rowlength = jquery_1_11_3_min_p("#tblitemassigned tr").not("thead tr").length;
  if(rowlength>1)
  {
  var i;
  for (i = 1; i <= parseInt(rowlength-1); i++) {
  var existfieldid1 = jquery_1_11_3_min_p(table.rows[i].cells[4]).text().trim();
   var newid="txtItem_"+existfieldid1;
    var existfieldid=jquery_1_11_3_min_p('#'+newid).val().trim();
  if(val==existfieldid)
  {
   swal("Item already selected","Please choose different items!","info")
              .then((value) => {
             kendo_all_min_js('#' + id).data("kendoDropDownList").value(0);
            
                });
  }
  }
  }

}

function RemoveClass(data) {

    var id = data.id;
    var arr = id.split('_');
    var id = arr[1];
    if (jquery_1_11_3_min_p('#txtMinQty_' + id).val() != '') {
        jquery_1_11_3_min_p("#txtMinQty_" + id).removeClass('validate');
    }
    if (jquery_1_11_3_min_p('#txtMaxQty_' + id).val() != '') {
        jquery_1_11_3_min_p("#txtMaxQty_" + id).removeClass('validate');
    }
}

function BindEntityForgrid() {
    var EntityforGrid = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Transaction.asmx/BindEntityForgrid",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
            var i = 0;
            jQuery.each(jsonData.Table, function (rec) {
                EntityforGrid.push({ value: jsonData.Table[i].Entityid, text: jsonData.Table[i].Entityname });
                i++;
            });

        },
        error: function (result) {
        }
    });
    kendo_all_min_js('#ddlgridEntity').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: EntityforGrid,
        change: function () {
            kendo_all_min_js('#ddlgridEntity').data("kendoDropDownList").span.css('background', 'none');
         
           BindAssignedDataSetupGrid(searchtxt,kendo_all_min_js('#ddlgridEntity').val())

        }
    });
   
    
}




