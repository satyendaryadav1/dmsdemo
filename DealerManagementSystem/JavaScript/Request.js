var itemexist = 0; var rowlength = 0; var jsonRecallData = ''; var BindRecallHistory = '';var Xmlrequestheader = ''; var jsonItemMasterDetails = []; var oldexistitemid='';var ItemMasterSku=[];
jquery_1_11_3_min_p(document).ready(function () {
var LoadData = '';
jquery_1_11_3_min_p("#hdnLoad").val(10);
LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
jquery_1_11_3_min_p('#btnLoadMore').click(function () {
 LoadData = parseInt(LoadData) + 10;
 jquery_1_11_3_min_p("#hdnLoad").val(LoadData);      
BindRequestHeader();
 });

BindRequestNumber();
counter = 0;
BindLocation();

jquery_1_11_3_min_p('#preloader').css('display', 'block');
jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
jquery_1_11_3_min_p('#btnship').prop("disabled", true);
jquery_1_11_3_min_p('#btnreturn').prop("disabled", true);
BindRequestHeader();
var d = new Date(),
date = (d.getDate()) + '/' + ((d.getMonth() + 1) + '/' + d.getFullYear());
jquery_1_11_3_min_p('#txtRequestedDate').val(date);
jquery_1_11_3_min_p('#txtCreatedBy').val(jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserName').text());
jquery_1_11_3_min_p('#txtCreatedBy').attr('readonly', 'true');
jquery_1_11_3_min_p('#txtRequestedDate').attr('readonly', 'true');
  ItemMasterSku.push({ value: "0", text: "Select" });
 kendo_all_min_js('#ddlItemSku_' + counter.toString()).kendoDropDownList({
        filter: "contains",
        // optionLabel: "Select",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ItemMasterSku,
        change: function () {
           kendo_all_min_js("#ddlItemSku_" + counter.toString()).data("kendoDropDownList").span.css('background', 'none');
        }
    });
  ItemMaster.push({ value: "0", text: "Select" });
  kendo_all_min_js('#ddlItem_' + counter.toString()).kendoDropDownList({
        filter: "contains",
        // optionLabel: "Select",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ItemMaster,
        change: function () {
           kendo_all_min_js("#ddlItemS_" + counter.toString()).data("kendoDropDownList").span.css('background', 'none');
        }
    });

jquery_1_11_3_min_p('#select_all').on('click', function () {
if (this.checked) {
jquery_1_11_3_min_p('.checkbox').each(function () {
this.checked = true;
});
} else {
jquery_1_11_3_min_p('.checkbox').each(function () {
this.checked = false;
});
}
});
   
jquery_1_11_3_min_p('.checkbox').on('click', function () {
if (jquery_1_11_3_min_p('.checkbox:checked').length == jquery_1_11_3_min_p('.checkbox').length) {
jquery_1_11_3_min_p('#select_all').prop('checked', true);
} else {
jquery_1_11_3_min_p('#select_all').prop('checked', false);
}
});

jquery_1_11_3_min_p('#btnconfirm').on("click", function (event) {
bootstrap_min_js("#summery").modal('hide');
window.location.replace("AllRequisition.aspx");
});

$("#btnprint").click(function () {
  //  $("#summery").print();
  //   $("#summery").show();
   // window.print();
 //  $("#summery").printThis();
 printFunc();
});

jquery_1_11_3_min_p('#btnDeleteLine').on("click", function (event) {
var sel = false;
var ch = jquery_1_11_3_min_p('#' + 'tblRequisitionDetail').find('tbody input[type=checkbox]');
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
var ch = jquery_1_11_3_min_p('#' + 'tblRequisitionDetail').find('tbody input[type=checkbox]');
ch.each(function () {
var $this = jquery_1_11_3_min_p(this);
if ($this.is(':checked')) {
var DeleteRow = jquery_1_11_3_min_p(this).closest('tr');
sel = true; 
DeleteRow.remove();
}
});
swal("Deleted Successfully","Your data deleted successfully!","success")
}
});
}
});

jquery_1_11_3_min_p('#btnNew').on("click", function (event) {
jquery_1_11_3_min_p('#newheader').css('display', 'block');
jquery_1_11_3_min_p('#createNewItem').css('display', 'block');
jquery_1_11_3_min_p('#divGrid').css('display', 'none');
jquery_1_11_3_min_p('#btnSubmit').css('display', 'block');
jquery_1_11_3_min_p('#btnedit').css('display', 'block');
jquery_1_11_3_min_p('#btnDelete').css('display', 'block');
jquery_1_11_3_min_p('#btnback').css('display', 'block');
jquery_1_11_3_min_p('#btnNew').css('display', 'none');
jquery_1_11_3_min_p('#RequestControlDetail').css('display', 'none');
jquery_1_11_3_min_p('#Kendorequestdetail').css('display', 'none');
jquery_1_11_3_min_p('#btnRecallHistory').css('display', 'none');
jquery_1_11_3_min_p('#btnedit').prop("disabled", true);
jquery_1_11_3_min_p('#btnDelete').prop("disabled", true);
jquery_1_11_3_min_p('#btnSubmit').prop("disabled", false);
jquery_1_11_3_min_p('#RequisitionForm').css('display', 'block');
jquery_1_11_3_min_p('#AllRequisition').css('display', 'none');
BindWareHouse();
});

jquery_1_11_3_min_p("#btnback").click(function () {
window.location.replace("AllRequisition.aspx");
});


  $(document).on("dblclick","#itemRequestList tbody tr",function() {
   var row = jquery_1_11_3_min_p(this);
   $("#itemRequestList tbody tr").removeClass("selectedRow"); 
    row.addClass("selectedRow");
   var RequisitionId= row.find('td:nth-child(1)').text().trim();
                        jquery_1_11_3_min_p('#btnNew').css('display', 'none');
                        jquery_1_11_3_min_p('#newheader').css('display', 'none');
                        jquery_1_11_3_min_p('#createNewItem').css('display', 'none');
                        jquery_1_11_3_min_p('#divGrid').css('display', 'none');
                        jquery_1_11_3_min_p('#btnSubmit').css('display', 'block');
                        jquery_1_11_3_min_p("#btnSubmit").prop("disabled", true);
                        jquery_1_11_3_min_p('#btnedit').css('display', 'block');
                        jquery_1_11_3_min_p('#btnDelete').css('display', 'block');
                        jquery_1_11_3_min_p('#btnback').css('display', 'block');
                        jquery_1_11_3_min_p('#btnNew').css('display', 'none');
                        jquery_1_11_3_min_p('#preloader').css('display', 'block');
                        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
                        jquery_1_11_3_min_p('#RequestControlDetail').css('display', 'block');
                        jquery_1_11_3_min_p('#Kendorequestdetail').css('display', 'block');
                        jquery_1_11_3_min_p('#btnedit').prop("disabled", false);
                        jquery_1_11_3_min_p('#btnDelete').prop("disabled", false);
                        BindRequestDetails(RequisitionId);
   });

jquery_1_11_3_min_p("#btnedit").click(function () {
Recall();
jquery_1_11_3_min_p("#btnedit").prop("disabled", true);
jquery_1_11_3_min_p("#btnDelete").prop("disabled", true);
});

jquery_1_11_3_min_p("#btnDelete").click(function () {
swal({
title: "Do you want to proceed?",
text: "",
icon: "warning",
buttons: true,
dangerMode: true,
})
.then((willDelete) => {
if (willDelete) {
var RequisitionId = jquery_1_11_3_min_p('#lblRequisitionId').text();
CancelRequisition(RequisitionId);
}
});
});

jquery_1_11_3_min_p("#btnSubmit").click(function () {
if (jquery_1_11_3_min_p('#lblRequisitionId').text() == '') {
if (ValideRequisition() == true) {
if (ValidateItemMasterGrid() == true) {
swal({
title: "Do you want to proceed?",
text: "",
icon: "warning",
buttons: true,
dangerMode: true,
})
.then((willDelete) => {
if (willDelete) {
if (jquery_1_11_3_min_p('#lblRequisitionId').text() == '') {
SaveRequisition();
}
else {
var RequistionId = jquery_1_11_3_min_p('#lblRequisitionId').text();
UpdateItemRequisition(RequistionId);
}
} else {
}
});
}
}
}
else {
if (ValidateItemMasterGrid() == true) {
swal({
title: "Do you want to proceed?",
text: "",
icon: "warning",
buttons: true,
dangerMode: true,
})
.then((willDelete) => {
if (willDelete) {
var RequistionId = jquery_1_11_3_min_p('#lblRequisitionId').text();
UpdateItemRequisition(RequistionId);
}
});
}
}
});
});

function SaveRequisition() {
    var RequestNum = jquery_1_11_3_min_p('#txtRequestNum').val();
    var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
    var RequestedDate = jquery_1_11_3_min_p('#txtRequestedDate').val();
    jquery_1_11_3_min_p('#txtSubmittedDate').val(RequestedDate);
    var Warehouse = jquery_1_11_3_min_p("#ddlWarehouse").val();
    var Status = 1;
    var RequestionItems = [];
    var JsonRequestionItems = '';
    var i = 1;
    jquery_1_11_3_min_p('#tblRequisitionDetail tbody').find('tr').each(function () {
    var row = jquery_1_11_3_min_p(this);
    var itemid=kendo_all_min_js("#ddlItem_" + row.find('td:nth-child(9)').text().trim()).val().trim();
     var SkuId=kendo_all_min_js("#ddlItemSku_" + row.find('td:nth-child(9)').text().trim()).val().trim();
       var LocationId=kendo_all_min_js("#ddlLocation_" + row.find('td:nth-child(9)').text().trim()).val().trim();
    var  splititemid=itemid.split('_');
    RequestionItems.push({ ItemId: splititemid[0],SKUId:SkuId,LocationId:LocationId,
    ReqQTY: kendo_all_min_js("#txtRequestedQTY_" + row.find('td:nth-child(9)').text().trim()).val().trim(), Remarks: escape(kendo_all_min_js("#txtRemark_"    + row.find('td:nth-child(9)').text().trim()).val().trim())
    });
    i++;
    });
    JsonRequestionItems = JSON.stringify(RequestionItems);
    jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/ItemRequisition.asmx/SaveRequisition",
    data: "{'RequestNumber':'" + RequestNum + "','RequestedDate':'" + RequestedDate + "','Status':'" + Status + "','CreatedBy':'" + CreatedBy +               "','JsonRequestionItems':'" + JsonRequestionItems + "','WareHouseId':'" + Warehouse + "'}",
    dataType: "json",
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
            if (jsonData.Table[0].Column1 == '1') {
                jquery_1_11_3_min_p('#lblRequestNum').text("Request number already exist");
            }
            else {
            swal("Saved Successfully","Your data saved successfully!","success")
            .then((value) => {
             $("#summery").modal('show');
            jquery_1_11_3_min_p('#lblSReqNum').text(jsonData.Table1[0].RequestNumber);
            jquery_1_11_3_min_p('#lblSCreatedBy').text(jsonData.Table1[0].CreatedBy);
            jquery_1_11_3_min_p('#lblSReqDate').text(jsonData.Table1[0].RequestedDate);
            jQuery.each(jsonData.Table2, function (rec) {
        var markup = "<tr><td> "+jsonData.Table2[i].AXitemId+"</td><td>"+jsonData.Table2[i].itemname+"</td><td>"+jsonData.Table2[i].RequestedQty+"</td> <td >"+jsonData.Table2[i].Remarks+"</td></tr>";
        jquery_1_11_3_min_p("#tblrowappend tbody").append(markup);
        i++;
         });
             
            
          
            });
             
            }
        }
    });

}





function ValidateItemMasterGrid() {
    var allow = true;
    var i = 1;
    jquery_1_11_3_min_p('#tblRequisitionDetail tbody').find('tr').each(function () {
        var row = jquery_1_11_3_min_p(this);
        if ((jquery_1_11_3_min_p("#txtRequestedQTY_" + row.find('td:nth-child(9)').text().trim()).val().trim() == "") || (jquery_1_11_3_min_p("#txtRequestedQTY_" + row.find('td:nth-child(9)').text().trim()).val().trim() == 0)) {
            jquery_1_11_3_min_p("#txtRequestedQTY_" + row.find('td:nth-child(9)').text().trim()).addClass('validate');
            jquery_1_11_3_min_p("#txtRequestedQTY_" + row.find('td:nth-child(9)').text().trim()).attr("placeholder", "Enter req qty!");
            allow = false;
        }
        if (kendo_all_min_js("#ddlItem_" + row.find('td:nth-child(9)').text().trim()).data("kendoDropDownList").value() == 0) {
            kendo_all_min_js("#ddlItem_" + row.find('td:nth-child(9)').text().trim()).data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
        i++;
    });
    return allow;
}


function ValideRequisition() {
    var flag = 0;

    if (jquery_1_11_3_min_p('#txtRequestNum').val() == '') {
        jquery_1_11_3_min_p('#txtRequestNum').addClass('validate');
        flag = 1;
    }
    if (jquery_1_11_3_min_p('#txtCreatedBy').val() == '') {
        jquery_1_11_3_min_p('#txtCreatedBy').addClass('validate');
        flag = 1;
    }

    if (jquery_1_11_3_min_p('#txtRequestedDate').val() == '') {
        jquery_1_11_3_min_p('#txtRequestedDate').addClass('validate');
        flag = 1;
    }

    if (flag == 1) {
        return false;
    }
    else {
        return true;
    }

}

function Comparevalue(data) {
    var id = data.id;
    var val = jquery_1_11_3_min_p('#' + id).val();
    var re = /^([0-9]+[\.]?[0-9]?[0-9]?[0-9]?|[0-9]+)$/g;
    var re1 = /^([0-9]+[\.]?[0-9]?[0-9]?[0-9]?|[0-9]+)/g;
    if (re.test(val)) {
        //do something here

    } else {
        val = re1.exec(val);
        if (val) {
            jquery_1_11_3_min_p('#' + id).val(val[0]);
        } else {
            jquery_1_11_3_min_p('#' + id).val('');
        }
    }

    var Arr = id.split('_');
    var val = jquery_1_11_3_min_p('#' + id).val();
    if (val == '') {
        jquery_1_11_3_min_p('#' + Arr[1]).prop("disabled", true);
    }
    else {
        // Below Validation of Putting Requested Quantity With Out Selected Item ****************************************************************************
        if (kendo_all_min_js("#ddlItem_" + Arr[1]).data("kendoDropDownList").value() == 0) {
            kendo_all_min_js("#ddlItem_" + Arr[1]).data("kendoDropDownList").span.css('background', '#f9e5e5');
            //            allow = false;
            jquery_1_11_3_min_p('#' + id).val('');
        }
        else {

           
        }
    }

}

function RemoveClassItemMaster(data) {
      //  alert('aaa');
    var id = data.id;
    var arr = id.split('_');
    var id = arr[1];
    if (jquery_1_11_3_min_p('#txtRequestedQTY_' + id).val() != '') {
        jquery_1_11_3_min_p("#txtRequestedQTY_" + id).removeClass('validate');
    }

    if (kendo_all_min_js("#ddlItem_" + id).val() != '0') {
        jquery_1_11_3_min_p("#ddlItem_" + id).removeClass('validate');
    }

}

function NumericAllow(data) {
    var id = data.id;
    var row = kendo_all_min_js('#' + id).closest("tr");
    if (event.keyCode == 13) {
        if (kendo_all_min_js("#ddlItem_" + row.find('td:nth-child(9)').text().trim()).data("kendoDropDownList").value() == 0) {
            kendo_all_min_js("#ddlItem_" + row.find('td:nth-child(9)').text().trim()).data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
            event.preventDefault();
        }
        if ((jquery_1_11_3_min_p("#txtRequestedQTY_" + row.find('td:nth-child(9)').text().trim()).val().trim() == "") || (jquery_1_11_3_min_p("#txtRequestedQTY_" + row.find('td:nth-child(9)').text().trim()).val().trim() == 0)) {
            jquery_1_11_3_min_p("#txtRequestedQTY_" + row.find('td:nth-child(9)').text().trim()).addClass('validate');
            jquery_1_11_3_min_p("#txtRequestedQTY_" + row.find('td:nth-child(9)').text().trim()).attr("placeholder", "Enter req qty!");
            allow = false;
            event.preventDefault();
        }
        else {
            event.preventDefault();
            var kendoid="ddlItem_" + row.find('td:nth-child(9)').text().trim();
            var dataSource  =  jquery_1_11_3_min_p('#'+kendoid).data("kendoDropDownList");
            dataSource.readonly();
            AddRow();
        }
    }
}


function AddRow() {
    if (kendo_all_min_js("#ddlLocation_" + counter).val() != "0" && kendo_all_min_js("#ddlItem_" + counter).val() != "0" && ((jquery_1_11_3_min_p("#txtRequestedQTY_" + counter).val() != "") || (jquery_1_11_3_min_p("#txtRequestedQTY_" + counter).val() != 0))) {
        var rowID = counter + 1;
        var markup = "<tr><td style='display:table-cell'><input type='checkbox' id='cb_" + rowID + "' class='checkbox'/></td><td ><input type='text' id='ddlLocation_" + rowID + "' class='' onkeyup='RemoveClassItemMaster(this)' onchange='' autocomplete='off'/></td><td ><input type='text' id='ddlItem_" + rowID + "' class='' onkeyup='RemoveClassItemMaster(this)' onchange='ItemChange(this)' autocomplete='off'/></td><td ><label id='lblItemName_" + rowID + "'></label></td><td ><input type='text' id='ddlItemSku_" + rowID + "' class='' onkeyup='RemoveClassItemMaster(this)'  autocomplete='off'/></td><td ><label id='lblItemOnhand_" + rowID + "'></label></td> <td ><input type='text' placeholder='' class='ReqQTY' id='txtRequestedQTY_" + rowID + "' autocomplete='off' onkeypress='NumericAllow(this)' onchange='RemoveClassItemMaster(this)' onkeyup='Comparevalue(this)' /></td><td ><input type='text' class='' id='txtRemark_" + rowID + "' autocomplete='off' placeholder=''  onkeypress='NumericAllow(this)'/></td><td  style='display:none'>" + rowID + "</td></tr>";
        jquery_1_11_3_min_p("#tblRequisitionDetail tbody").append(markup);


        kendo_all_min_js("#ddlItem_" + rowID).focus();
        counter = rowID;
        BindLocation();
        BindItemMasterDetails();
        ItemMasterSku=[];
         ItemMasterSku.push({ value: "0", text: "Select" });
         kendo_all_min_js('#ddlItemSku_' + counter.toString()).kendoDropDownList({
        filter: "contains",
        // optionLabel: "Select",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ItemMasterSku,
        change: function () {
           kendo_all_min_js("#ddlItemSku_" + counter.toString()).data("kendoDropDownList").span.css('background', 'none');
        }
    });
    }
    else {
        // alert('');

        if (kendo_all_min_js("#ddlItem_" + counter).val() == "0") {
            kendo_all_min_js("#ddlItem_" + counter).data("kendoDropDownList").span.css('background', '#f9e5e5');
            //allow = false;
        }

        if ((jquery_1_11_3_min_p("#txtRequestedQTY_" + counter).val() == "") || (jquery_1_11_3_min_p("#txtRequestedQTY_" + counter).val() == 0)) {
            jquery_1_11_3_min_p("#txtRequestedQTY_" + counter).addClass("validate");
            jquery_1_11_3_min_p("#txtRequestedQTY_" + counter).attr("placeholder", "Enter req qty!");
            // allow = false;
        }
    }
}

function BindItemMasterDetails() {
ItemMaster=[];
 ItemMaster.push({ value: "0", text: "Select" });
    kendo_all_min_js('#ddlItem_' + counter.toString()).kendoDropDownList({
        filter: "contains",
        // optionLabel: "Select",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ItemMaster,
        change: function () {
            kendo_all_min_js("#ddlItem_" + counter.toString()).data("kendoDropDownList").span.css('background', 'none');
             var  itemId=kendo_all_min_js("#ddlItem_" + counter.toString()).val();
           
           BindItemSku(itemId);
            jquery_1_11_3_min_p("#lblItemOnhand_" + counter).text(0);
            
        }
    });

}



var counter = 0;
var ItemMaster = [];

function ItemChange(Dis) {
    itemexist = 0;
    var ddlId = Dis.id;
    var arr = ddlId.split('_');
    var itemid = kendo_all_min_js("#" + Dis.id).val();
     var item = kendo_all_min_js("#" + Dis.id).data("kendoDropDownList").text();
    var  splititemid=itemid.split('_');
    var table = document.getElementById('tblRequisitionDetail');
    var rowlength = jquery_1_11_3_min_p("#tblRequisitionDetail tr").not("thead tr").length;
    rowlength = rowlength;
    var i;
    for (i = 1; i < parseInt(rowlength); i++) {
        var existitemid = jquery_1_11_3_min_p(table.rows[i].cells[2]).text().trim();
        var existitemname=jquery_1_11_3_min_p(table.rows[i].cells[3]).text().trim();
        var newitemid = item + "select";
//        if(oldexistitemid =="")
//        {
        if (newitemid == existitemid) {
            itemexist = 1;
        }
//        }
//        else
//        {
//         if (newitemid == oldexistitemid) {
//            itemexist = 1;
//        }
      //  }
    }

    if (itemexist == 1) {
      oldexistitemid=itemid;
       swal("Item already selected","Please choose another item!","info")
              .then((value) => {
              kendo_all_min_js("#" + Dis.id).data("kendoDropDownList").value(0);
            
                });
        
    }
    else {
       oldexistitemid='';
        jquery_1_11_3_min_p.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../WebServices/ItemRequisition.asmx/BindItemWiseData",
            data: "{'Itemid':'" + splititemid[0] + "'}",
            dataType: "json",
            async: false,
            success: function (result) {
                var checkbranchwisedata = eval(result.d);
                if (checkbranchwisedata.Table.length > 0) {
                    var i = 0;
                    jquery_1_11_3_min_p('#hideselect_all').css('display', 'table-cell');
                    jquery_1_11_3_min_p('#chktd').css('display', 'table-cell');
                    jquery_1_11_3_min_p("#lblItemName_" + arr[1]).text(checkbranchwisedata.Table[i].ItemName);
                   // jquery_1_11_3_min_p("#lblItmOnhand_" + arr[1]).text(checkbranchwisedata.Table[i].Onhand);
                    var checkvalue = kendo_all_min_js("#" + Dis.id).val();
                }
                else {
                    var i = 0;

                    jQuery.each(jsonItemMasterDetails.Table, function (rec) {
                        if (jsonItemMasterDetails.Table[i].splititemid[0] == kendo_all_min_js("#" + Dis.id).val()) {
                            jquery_1_11_3_min_p('#hideselect_all').css('display', 'inline-block');
                            jquery_1_11_3_min_p('#chktd').css('display', 'inline-block');
                            jquery_1_11_3_min_p("#lblItemName_" + arr[1]).text(jsonItemMasterDetails.Table[i].ItemName);
                           // jquery_1_11_3_min_p("#lblItmOnhand_" + arr[1]).text(jsonItemMasterDetails.Table[i].Onhand);
                        }

                        i++;
                    });
                }
            },
            error: function (result) {
            }
        });
    }
 
}
function BindLocation() {
 if(counter==0)
 {
    counter++;
    }
    var Location=[];
   
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/ItemRequisition.asmx/BindLocation",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
          var  JsonLocation = eval(result.d);
          
            Location.push({ value: "0", text: "Select" });
            jQuery.each(JsonLocation.Table, function (rec) {
                Location.push({ value: JsonLocation.Table[i].Auto, text: JsonLocation.Table[i].ParterAddress });
                i++;
            });
        },
        error: function (result) {
        }
    });
    kendo_all_min_js('#ddlLocation_' + counter.toString()).kendoDropDownList({
        filter: "contains",
        // optionLabel: "Select",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Location,
        change: function () {
           kendo_all_min_js("#ddlLocation_" + counter.toString()).data("kendoDropDownList").span.css('background', 'none');
           var  LocationId=kendo_all_min_js("#ddlLocation_" + counter.toString()).val();
           BindItemMaster(LocationId)
          // BindItemSku(itemId);
           //  jquery_1_11_3_min_p("#lblItemOnhand_" + counter).text(0);
        }
    });
}




function BindItemMaster(LocationId) {
 if(counter==0)
 {
    counter++;
    }
    ItemMaster = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/ItemRequisition.asmx/BindItemMaster",
        data: "{'LocationId':'"+LocationId+"'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            jsonItemMasterDetails = eval(result.d);
            ItemMaster.push({ value: "0", text: "Select" });
            jQuery.each(jsonItemMasterDetails.Table, function (rec) {
                ItemMaster.push({ value: jsonItemMasterDetails.Table[i].Itemid, text: jsonItemMasterDetails.Table[i].ItemName });
                i++;
            });
        },
        error: function (result) {
        }
    });
    kendo_all_min_js('#ddlItem_' + counter.toString()).kendoDropDownList({
        filter: "contains",
        // optionLabel: "Select",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ItemMaster,
        change: function () {
           kendo_all_min_js("#ddlItem_" + counter.toString()).data("kendoDropDownList").span.css('background', 'none');
           var  itemId=kendo_all_min_js("#ddlItem_" + counter.toString()).val();
           
           BindItemSku(itemId);
             jquery_1_11_3_min_p("#lblItemOnhand_" + counter).text(0);
        }
    });
}

function BindItemSku(itemId) {
 if(counter==0)
 {
    counter++;
    }
    ItemMasterSku = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/ItemRequisition.asmx/BindItemSku",
        data: "{'ItemId':'"+itemId+"'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
           var jsonItemMasterDetails = eval(result.d);
            ItemMasterSku.push({ value: "0", text: "Select" });
            jQuery.each(jsonItemMasterDetails.Table, function (rec) {
                ItemMasterSku.push({ value: jsonItemMasterDetails.Table[i].Skuid, text: jsonItemMasterDetails.Table[i].Skuname });
                i++;
            });
        },
        error: function (result) {
        }
    });
    kendo_all_min_js('#ddlItemSku_' + counter.toString()).kendoDropDownList({
        filter: "contains",
        // optionLabel: "Select",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ItemMasterSku,
        change: function () {
           kendo_all_min_js("#ddlItemSku_" + counter.toString()).data("kendoDropDownList").span.css('background', 'none');
           var SKUId=kendo_all_min_js("#ddlItemSku_" + counter.toString()).val();
           var ItemId=kendo_all_min_js("#ddlItem_" + counter.toString()).val();
           BindOnhandSkuWise(ItemId,SKUId);
        }
    });
}

function BindOnhandSkuWise(itemId,SkuId ) {
itemexist = 0;
   var table = document.getElementById('tblRequisitionDetail');
    var rowlength = jquery_1_11_3_min_p("#tblRequisitionDetail tr").not("thead tr").length;
    rowlength = rowlength;
    var i;
    for (i = 1; i < parseInt(rowlength); i++) {
        var existitemid = jquery_1_11_3_min_p(table.rows[i].cells[1]).text().trim();
        var ExistingskuName=jquery_1_11_3_min_p(table.rows[i].cells[3]).text().trim();
         var NewSKUName=kendo_all_min_js("#ddlItemSku_" + counter.toString()).data("kendoDropDownList").text()+'select';
           var NewItemId=kendo_all_min_js("#ddlItem_" + counter.toString()).data("kendoDropDownList").text()+'select';

        if (existitemid == NewItemId && ExistingskuName==NewSKUName) {
            itemexist = 1;
        }

    }

    if (itemexist == 1) {
       swal("Item  already selected","Please choose another item!","info")
              .then((value) => {
              kendo_all_min_js("#ddlItemSku_" + counter.toString()).data("kendoDropDownList").value(0);
            
                });
        
    }
    else{
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/ItemRequisition.asmx/BindOnhandSkuWise",
        data: "{'itemId':'" + itemId + "','SkuId':'" + SkuId + "'}",
        dataType: "json",
        async:false,
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
            if(jsonData.Table.length>0)
            {
            jquery_1_11_3_min_p("#lblItemOnhand_" + counter).text(jsonData.Table[0].Onhand);
            }
            else
            {
            jquery_1_11_3_min_p("#lblItemOnhand_" + counter).text(0);
            }
            }
    });
    }
}


function BindRequestNumber() {
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/ItemRequisition.asmx/BindRequestNumber",
        dataType: "json",
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
            jQuery.each(jsonData.Table, function (rec) {
                jquery_1_11_3_min_p('#txtRequestNum').attr('disabled', 'disabled');
                jquery_1_11_3_min_p('#txtRequestNum').val(jsonData.Table[i].RequestNum);
                i++;
            });

        }
    });
}


function BindWareHouse() {
var Warehousedata = [];
var userid=jquery_1_11_3_min_p('#ContentPlaceHolder1_lblwarehouseid').text();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/ItemRequisition.asmx/BindRequestWarehouse",
        data: "{'UserType':'" + userid + "'}",
        dataType: "json",
         async: false,
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
          //  Warehousedata.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {
                Warehousedata.push({ value: jsonData.Table[i].WareHouseId, text: jsonData.Table[i].WareHouseName });
                i++;
           });
        }
    });

       kendo_all_min_js('#ddlWarehouse').kendoDropDownList({
        filter: "contains",
        // optionLabel: "Select",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Warehousedata,
        change: function () {
         //  kendo_all_min_js("#ddlItem_" + counter.toString()).data("kendoDropDownList").span.css('background', 'none');
        }
    });
}

function printFunc() {
    var divToPrint = document.getElementById('summery');
    var htmlToPrint = '' +
        '<style type="text/css">' +
        'table th, table td {' +
        'border:1px solid #000;' +
        'padding;0.5em;' +
        '}' +
        '</style>';
    htmlToPrint += divToPrint.outerHTML;
    newWin = window.open("");
    newWin.document.write("<h3 align='center'>Print Page</h3>");
    newWin.document.write(htmlToPrint);
    newWin.print();
    newWin.close();
    }



    function BindRequestHeader() {
   
   var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 270;
    var dataRequestHeader = [];
    var LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/ItemRequisition.asmx/BindRequestHeader",
       data: "{'LoadData':'" + LoadData + "'}",
        dataType: "json",
        success: function (result) {
            var i = 0;
            var jsonData = result.d;
                 jquery_1_11_3_min_p('#preloader').css('display', 'none');
             jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');

            jquery_1_11_3_min_p("#itemRequestList tbody").empty();
            jQuery.each(jsonData.Table, function (rec) {
            var markup = "<tr><td style='display:none'> "+jsonData.Table[i].RequisitionId+"</td><td> <input id='chkbox' type='checkbox' class='checkboxcls' onclick='' /></td> <td >"+jsonData.Table[i].RequestNumber+"</td> <td >"+jsonData.Table[i].WareHouseName+"</td> <td >"+jsonData.Table[i].CreatedBy+"</td> <td >"+jsonData.Table[i].CreatedOn+"</td>  <td >"+jsonData.Table[i].SubmittedDate+"</td>  <td >"+jsonData.Table[i].Status+"</td>   <td >"+jsonData.Table[i].LastActivtityBy+"</td><td >"+jsonData.Table[i].LastActivtityDate+"</td> </tr>";

            jquery_1_11_3_min_p("#itemRequestList tbody").append(markup);
       
            //=========================== start for PDF===================================

//             var pdftable = "<tr><td>"+jsonData.Table[i].PartnerType+"</td> <td >"+jsonData.Table[i].PartnerName+"</td> <td >"+jsonData.Table[i].ContactNo+"</td></tr>";
//  jquery_1_11_3_min_p("#pdftable tbody").append(pdftable);

             //==============================end for PFD=================================
              
                i++;
            });
         
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

//function BindRequestHeader() {
//var wh = jquery_1_11_3_min_p(document).height();
//var gh = wh - 270;
//var dataRequestHeader = [];
//var LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
//jquery_1_11_3_min_p.ajax({
//    type: "POST",
//    contentType: "application/json; charset=utf-8",
//    url: "../WebServices/ItemRequisition.asmx/BindRequestHeader",
//    data: "{'LoadData':'" + LoadData + "'}",
//    //  data: "{}",
//    dataType: "json",
//    success: function (result) {
//        var i = 0;
//        var jsonData = result.d;
//        jQuery.each(jsonData.Table, function (rec) {
//            dataRequestHeader.push({ RequisitionId: jsonData.Table[i].RequisitionId, RequestNumber: jsonData.Table[i].RequestNumber, CreatedBy: jsonData.Table[i].CreatedBy, CreatedOn: jsonData.Table[i].CreatedOn, SubmittedDate: jsonData.Table[i].SubmittedDate, Status: jsonData.Table[i].Status, WarehouseName: jsonData.Table[i].WarehouseName, LastActivtityBy: jsonData.Table[i].LastActivtityBy, LastActivtityDate: jsonData.Table[i].LastActivtityDate,WareHouseName: jsonData.Table[i].WareHouseName});
//            i++;
//        });
//        jquery_1_11_3_min_p('#preloader').css('display', 'none');
//        jquery_1_11_3_min_p('#Overlay_Load').css('display','none');

//        kendo_all_min_js("#itemRequestList").kendoGrid({
//            toolbar: ['Export'],
////                excel: {
////                    fileName: "Book1.xlsx",
////                    filterable: true,
////                    allPages: true
////                },
//            dataSource: {
//                data: dataRequestHeader,
//                schema: {
//                    model: {
//                        id: "RequisitionId",
//                        fields: {
//                            RequestNumber: { type: "string" },
//                            CreatedBy: { type: "string" },
//                            CreatedOn: { type: "string" },
//                            SubmittedDate: { type: "string" },
//                            Status: { type: "string" },
//                            LastActivtityBy: { type: "string" },
//                            LastActivtityDate: { type: "string" },
//                            WareHouseName: { type: "string" }
//                        }
//                    }
//                }
//            },

//            selectable: "single",
//            height: 250,
//            scrollable: true,
//            sortable: true,
//            reorderable: true,
//            persistSelection: true,
//            resizable: true,
//            groupable: false,
//            filterable: true,
//            dataBound: function (e) {
//                jquery_1_11_3_min_p(".k-grid-Export").click(function () {
//            var grid = kendo_all_min_js("#itemRequestList").getKendoGrid();
//             
//    var rows = [{
//        cells: [
//        { value: "RequestNumber" },
//        { value: "WarehouseName" },
//            { value: "CreatedBy" },
//        { value: "CreatedOn" },
//        { value: "SubmittedDate" },
//        { value: "Status" },
//            { value: "LastActivtityBy" },
//        { value: "LastActivtityDate" }

//        ]
//    }];
//    var trs = $("#itemRequestList").find('tr');
//    for (var i = 0; i < trs.length; i++) {
//        if ($(trs[i]).find(":checkbox").is(":checked")) {
//        var dataItem = grid.dataItem(trs[i]);
//        rows.push({
//            cells: [
//            { value: dataItem.RequestNumber },
//            { value: dataItem.WarehouseName },
//            { value: dataItem.CreatedBy },
//            { value: dataItem.CreatedOn },
//            { value: dataItem.SubmittedDate },
//            { value: dataItem.Status },
//            { value: dataItem.LastActivtityBy },
//            { value: dataItem.LastActivtityDate },
//            ]
//        })
//        }
//    }
//    excelExport(rows)
//    });

//                var grid = this;

//                grid.tbody.find("tr").dblclick(function (e) {
//                        var dataItem = grid.dataItem(this);
//                        jquery_1_11_3_min_p('#btnNew').css('display', 'none');
//                        jquery_1_11_3_min_p('#newheader').css('display', 'none');
//                        jquery_1_11_3_min_p('#createNewItem').css('display', 'none');
//                        jquery_1_11_3_min_p('#divGrid').css('display', 'none');
//                        jquery_1_11_3_min_p('#btnSubmit').css('display', 'block');
//                        jquery_1_11_3_min_p("#btnSubmit").prop("disabled", true);
//                        jquery_1_11_3_min_p('#btnedit').css('display', 'block');
//                        jquery_1_11_3_min_p('#btnDelete').css('display', 'block');
//                        jquery_1_11_3_min_p('#btnback').css('display', 'block');
//                        jquery_1_11_3_min_p('#btnNew').css('display', 'none');
//                        jquery_1_11_3_min_p('#preloader').css('display', 'block');
//                        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
//                        jquery_1_11_3_min_p('#RequestControlDetail').css('display', 'block');
//                        jquery_1_11_3_min_p('#Kendorequestdetail').css('display', 'block');
//                        jquery_1_11_3_min_p('#btnedit').prop("disabled", false);
//                        jquery_1_11_3_min_p('#btnDelete').prop("disabled", false);
//                        BindRequestDetails(dataItem.RequisitionId);


//                });

//                grid.tbody.find("tr").click(function (e) {
//                });
//            },
//            pageable: false,
//            columns: [
//                        { hidden: true, field: "RequisitionId", title: "RequisitionId", width: "10px" },
//                        { title: " <input id='chkall' type='checkbox' class='checkboxcls' onclick='checkAllHeaderGrid(this)' /> All", template: " <input id='chk_#=RequisitionId#' class='checkAllHeader' type='checkbox'/>", filtrable: false, width: "40px" },
//                        { field: "RequestNumber", title: "Request No.", width: "100px" },
//                        { field: "WareHouseName", title: "Warehouse", width: "100px" },
//                        { field: "CreatedBy", title: "Created By", width: "100px" },
//                        { field: "CreatedOn", title: "Created On", width: "100px" },
//                        { field: "SubmittedDate", title: "Submitted Date", width: "100px" },
//                        { field: "Status", title: "Status", width: "100px" },
//                        { field: "LastActivtityBy", title: "Last Activity By", width: "100px" },
//                        { field: "LastActivtityDate", title: "Last Activity Date", width: "100px" }

//                        ]
//        });
//        kendo_all_min_js(".k-grid-content").css('max-height', gh);
//        if (jsonData.Table.length >= jsonData.Table1[0].Totalcount) {
//            jquery_1_11_3_min_p('#lblRowCount').text(jsonData.Table1[0].Totalcount);
//            jquery_1_11_3_min_p('#lblTotalCount').text(jsonData.Table1[0].Totalcount);
//            jquery_1_11_3_min_p('#btnLoadMore').css('visibility', 'hidden');
//        }
//        else {
//            jquery_1_11_3_min_p('#lblRowCount').text(jsonData.Table.length);
//            jquery_1_11_3_min_p('#lblTotalCount').text(jsonData.Table1[0].Totalcount);
//            jquery_1_11_3_min_p('#btnLoadMore').css('visibility', 'visible');
//        }
//    },
//    error: function () {
//    }
//});
//}


function BindRequestDetails(RequisitionId) {
var wh = jquery_1_11_3_min_p(document).height();
    var ah = wh - 270;
    var RequestDetails = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/ItemRequisition.asmx/BindRequestOwnDetails",
        data: "{RequisitionId:'" + RequisitionId + "',Recallstatus:'" + jquery_1_11_3_min_p('#ContentPlaceHolder1_lblrecallvalue').text() + "'}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
            jquery_1_11_3_min_p('#btnship').css('display', 'block');
            jquery_1_11_3_min_p('#btnreturn').css('display', 'block');
            var i = 0;
            var jsonData = result.d;

            jsonRecallData = result.d;
            BindRecallHistory = eval(result.d);
//            if (BindRecallHistory.Table2.length > 0) {
//                jquery_1_11_3_min_p('#btnRecallHistory').css('display', 'inline-block');
//                jquery_1_11_3_min_p('#btnRecallHistory').prop("disabled", false);
//               // BindRecalldata();
//            }
//            else {
//                jquery_1_11_3_min_p('#btnRecallHistory').css('display', 'inline-block');
//                jquery_1_11_3_min_p('#btnRecallHistory').prop("disabled", true);
//            }
                jquery_1_11_3_min_p('#btnRecallHistory').css('display', 'none');
              //  jquery_1_11_3_min_p('#btnRecallHistory').prop("disabled", true);
            if (jsonData.Table[0].Status == 'Cancelled' || jsonData.Table[0].Status == 'Approved') {
                jquery_1_11_3_min_p("#btnDelete").prop("disabled", true);
                jquery_1_11_3_min_p("#btnedit").prop("disabled", true);
            }
            else {
                jquery_1_11_3_min_p("#btnDelete").prop("disabled", false);
                jquery_1_11_3_min_p("#btnedit").prop("disabled", false);
            }

            jquery_1_11_3_min_p('#lblRequisitionId').text(jsonData.Table[0].RequisitionId);
            jquery_1_11_3_min_p('#lblReqNum').text(jsonData.Table[0].RequestNumber);
            jquery_1_11_3_min_p('#lblCreatedBy').text(jsonData.Table[0].CreatedBy);
            jquery_1_11_3_min_p('#lblReqDate').text(jsonData.Table[0].RequestedDate);
            jquery_1_11_3_min_p('#lblSubmittedDate').text(jsonData.Table[0].SubmittedDate);
            jquery_1_11_3_min_p('#lblrequestedwarehouse').text(jsonData.Table[0].WareHouseName);
             jquery_1_11_3_min_p('#lblrequestedwarehouse').attr("title",jsonData.Table[0].WareHouseName);
            jquery_1_11_3_min_p('#lblStatus').text(jsonData.Table[0].Status);
            jquery_1_11_3_min_p("#DivRequestKendo tbody").empty();
            jQuery.each(jsonData.Table1, function (rec) {
            var markup = "<tr><td style='display:none'> "+jsonData.Table1[i].RequestDetId+"</td><td style='display:none'> "+jsonData.Table1[i].RequisitionId+"</td><td> <input id='chkbox' type='checkbox' class='checkboxcls' onclick='' /></td> <td >"+jsonData.Table1[i].ParterAddress+"</td> <td >"+jsonData.Table1[i].AXitemId+"</td>  <td >"+jsonData.Table1[i].ItemName+"</td> <td >"+jsonData.Table1[i].Unitname+"</td>  <td >"+jsonData.Table1[i].Onhand+"</td>  <td >"+jsonData.Table1[i].RequestedQty+"</td>  <td >"+jsonData.Table1[i].ReceivedQty+"</td> <td >"+jsonData.Table1[i].TransferOrder+"</td><td >"+jsonData.Table1[i].ShipingReason+"</td><td >"+jsonData.Table1[i].Remarks+"</td><td >"+jsonData.Table1[i].LineStatus+"</td></tr>";

            jquery_1_11_3_min_p("#DivRequestKendo tbody").append(markup);


//                RequestDetails.push({ RequestDetId: jsonData.Table1[i].RequestDetId, RequisitionId: jsonData.Table1[i].RequisitionId, AXitemId: jsonData.Table1[i].AXitemId, itemname: jsonData.Table1[i].itemname, ItemUnit: jsonData.Table1[i].ItemUnit,
//                    RequestedQty: jsonData.Table1[i].RequestedQty, Remarks: unescape(jsonData.Table1[i].Remarks),ReceivedQty: jsonData.Table1[i].ReceivedQty, TransferOrder: jsonData.Table1[i].TransferOrder, LineStatus: jsonData.Table1[i].LineStatus, ShipingReason: jsonData.Table1[i].ShipingReason,Status: jsonData.Table1[i].Status,branchonhand: jsonData.Table1[i].branchonhand
 i++;
                });
               
            }

//            kendo_all_min_js("#DivRequestKendo").kendoGrid({
////                toolbar: ["excel"],
////                excel: {
////                    fileName: "Book1.xlsx",
////                    filterable: true,
////                    allPages: true
////                },
//                dataSource: {
//                    data: RequestDetails,
//                    schema: {
//                        model: {
//                            //                                Sno: "Sno",
//                            fields: {
//                                AXitemId: { type: "string" },
//                                itemname: { type: "string" },
//                                ItemUnit: { type: "string" },
//                                RequestedQty: { type: "string" },
//                                Remarks: { type: "string" },
//                                ReceivedQty: { type: "string" },
//                                TransferOrder: { type: "string" },
//                                LineStatus: { type: "string" },
//                                ShipingReason: { type: "string" },
//                                RequestDetId: { type: "string" },
//                                branchonhand: { type: "string" }
//                                

//                            }
//                        }
//                    }
//                },
//                selectable: "single",
//                height: 250,
//                scrollable: true,
//                sortable: true,
//                reorderable: true,
//                persistSelection: true,
//                resizable: true,
//                groupable: false,
//                //                    filterable: true,
//                dataBound: function (e) {
//                    var grid = this;

//                     var i = 0;
////                      jQuery.each(RequestDetails, function () {
////                            var row = jquery_1_11_3_min_p(this);
////                            var id=RequestDetails[i]["RequestDetId"];
////                            if (parseFloat(RequestDetails[i]["Status"]) == 3)
////                            {
////                            var id='btn_'+parseInt(RequestDetails[i]["RequestDetId"]);
////                             jquery_1_11_3_min_p('#' +   id).prop("disabled", false);
////                            }
////                            else
////                            {
////                             var id='btn_'+parseInt(RequestDetails[i]["RequestDetId"]);
////                             jquery_1_11_3_min_p('#' +   id).prop("disabled", true);
////                            }
////                            i++;
////                            });

//                    grid.tbody.find("tr").dblclick(function (e) {
//                        var dataItem = grid.dataItem(this);

//                    });

//                    grid.tbody.find("tr").click(function (e) {


//                    });
//                },
//                pageable: false,
//                columns: [
//                                { hidden: true, field: "RequestDetId", title: "RequestDetId", width: "10px" },
//                                { hidden: true, field: "RequisitionId", title: "RequisitionId", width: "10px" },
//                                { field: "AXitemId", title: "Item No.", width: "100px" },
//                                { field: "itemname", title: "Item Name", width: "100px" },
//                                { field: "ItemUnit", title: "Inventory Unit", width: "100px" },
//                                { field: "branchonhand", title: "Onhand", width: "100px" },
//                                
//                                { field: "RequestedQty", title: "Requested Qty", width: "100px" },
//                                { field: "ReceivedQty", title: "Received Qty", width: "100px" },
//                                { field: "TransferOrder", title: "Transfer Order", width: "100px" },
//                                { field: "ShipingReason", title: "Shipping Reason", width: "100px" },
//                                { field: "Remarks", title: "Remarks", width: "100px" },
//                                { field: "LineStatus", title: "Line Status", width: "100px" },
////                                { width: "100px", title: "", template: "<button type='button' id='btn_#=RequestDetId#' class='btn btn-primary gridbtn' onclick='showPopup(this)'>Receive</button>", filterable: false },

//                                ]

//            });
//            kendo_all_min_js(".k-grid-content").css('max-height', ah);
//        },
//        error: function () {

//        }
  });
}


 function showPopup(DATA) {
    var ReceiveData = DATA.id;
//    var row = kendo_all_min_js('#' + ReceiveData).closest("tr");
//    var POID = row.find('td:nth-child(2)').text();
   
    }



function Recall() {
    jquery_1_11_3_min_p("#btnSubmit").prop("disabled", false);
    var RequisitionId = jquery_1_11_3_min_p('#lblRequisitionId').text();
    jquery_1_11_3_min_p('#ContentPlaceHolder1_lblrecallvalue').text(1);
   jquery_1_11_3_min_p('#RequestControlDetail').css('display', 'block');
     jquery_1_11_3_min_p('#createNewItem').css('display', 'block');
     jquery_1_11_3_min_p('#Divnewrequest').css('display', 'none');
     jquery_1_11_3_min_p('#Kendorecall').css('display', 'none');
      jquery_1_11_3_min_p('#Kendorequestdetail').css('display', 'block');
     GetRequisitionDetailRecall(RequisitionId);

}

function GetRequisitionDetailRecall(RequisitionId) {
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/ItemRequisition.asmx/BindRequestOwnDetails",
        data: "{RequisitionId:'" + RequisitionId + "',Recallstatus:'" + jquery_1_11_3_min_p('#ContentPlaceHolder1_lblrecallvalue').text() + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
           
            counter = 0;
            var BatchNo = [];
            var i = 0;
            var rowID = 0;
            var jsonData = eval(result.d);
            jquery_1_11_3_min_p('#tblRequisitionDetail > tbody').empty();
            counter = jquery_1_11_3_min_p("#tblRequisitionDetail > tbody > tr").length;
            jQuery.each(jsonData.Table1, function (rec) {

                var rowID = jquery_1_11_3_min_p("#tblRequisitionDetail > tbody > tr").length + 1;
                jquery_1_11_3_min_p('#hideselect_all').css('display', 'table-cell');
                jquery_1_11_3_min_p('#chktd').css('display', 'table-cell');
                var markup = "<tr><td style='display:table-cell'><input type='checkbox' id='cb_" + rowID + "' class='checkbox'/></td><td ><input type='text' id='ddlLocation_" + rowID + "' class='' onkeyup='RemoveClassItemMaster(this)' onchange='' autocomplete='off'/></td><td ><input type='text' id='ddlItem_" + rowID + "' class='' onkeyup='RemoveClassItemMaster(this)' onchange='ItemChange(this)' autocomplete='off'/></td><td ><label id='lblItemName_" + rowID + "'></label></td><td ><input type='text' id='ddlItemSku_" + rowID + "' class='' onkeyup='RemoveClassItemMaster(this)'  autocomplete='off'/></td><td ><label id='lblItemOnhand_" + rowID + "'></label></td> <td ><input type='text' placeholder='' class='ReqQTY' id='txtRequestedQTY_" + rowID + "' autocomplete='off' onkeypress='NumericAllow(this)' onchange='RemoveClassItemMaster(this)' onkeyup='Comparevalue(this)' /></td><td ><input type='text' class='' id='txtRemark_" + rowID + "' autocomplete='off' placeholder=''  onkeypress='NumericAllow(this)'/></td><td  style='display:none'>" + rowID + "</td></tr>";
        jquery_1_11_3_min_p("#tblRequisitionDetail tbody").append(markup);
               counter=rowID;
               BindLocation();
                kendo_all_min_js("#ddlLocation_" + rowID).data("kendoDropDownList").value(jsonData.Table1[i].LocationId);
                var LocationId=$("#ddlLocation_" + rowID).val();
               
                BindItemMaster(LocationId);
                kendo_all_min_js("#ddlItem_" + rowID).data("kendoDropDownList").value(jsonData.Table1[i].itemId);
                var itemId=$("#ddlItem_" + rowID).val();
                 BindItemSku(itemId);
                kendo_all_min_js("#ddlItemSku_" + rowID).data("kendoDropDownList").value(jsonData.Table1[i].ItemSKUId);
                $("#lblItemName_" + rowID).text(jsonData.Table1[i].ItemName);
                 $("#lblItemOnhand_" + rowID).text(jsonData.Table1[i].Onhand);
                $("#txtRemark_" + rowID).val(unescape(jsonData.Table1[i].Remarks));
                $("#txtRequestedQTY_" + rowID).val(jsonData.Table1[i].RequestedQty);
                var kendoid="ddlItem_" + rowID;
                var kendoid1 ="ddlItemSku_"+ rowID;
                var dataSource  =  jquery_1_11_3_min_p('#'+kendoid).data("kendoDropDownList");
                var dataSource1  =  jquery_1_11_3_min_p('#'+kendoid1).data("kendoDropDownList");
                dataSource.readonly();
                 dataSource1.readonly();
                i++;
                
            });
        },
        error: function (result) {
        }
    });
}

function UpdateItemRequisition(RequisitionId) {
    var UpdateRequestItems = [];
    var JsonUpdateRequestItems = '';
    var i = 1;
    jquery_1_11_3_min_p('#tblRequisitionDetail tbody').find('tr').each(function () {
        var row = jquery_1_11_3_min_p(this);
         var itemid=kendo_all_min_js("#ddlItem_" + row.find('td:nth-child(9)').text().trim()).val().trim();
        var  splititemid=itemid.split('_');
         var SkuId=kendo_all_min_js("#ddlItemSku_" + row.find('td:nth-child(9)').text().trim()).val().trim();
         var LocationId=kendo_all_min_js("#ddlLocation_" + row.find('td:nth-child(9)').text().trim()).val().trim();
        UpdateRequestItems.push({ RequisitionId: RequisitionId,SKUId:SkuId,LocationId:LocationId, AXitemId: splititemid[0].replace('select', ''), RequestedQty: jquery_1_11_3_min_p("#txtRequestedQTY_" + row.find('td:nth-child(9)').text().trim()).val(), Remarks: jquery_1_11_3_min_p("#txtRemark_" + row.find('td:nth-child(9)').text().trim()).val() });
        i++;
    });
    JsonUpdateRequestItems = JSON.stringify(UpdateRequestItems);
    var UpdatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text();

    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/ItemRequisition.asmx/UpdateRequest",
        data: "{'RequisitionId':'" + RequisitionId + "','JsonUpdateRequestItems':'" + JsonUpdateRequestItems + "','UpdatedBy':'" + UpdatedBy + "'}",
        dataType: "json",
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
              swal("Updated Successfully","Your data updated successfully!","success")
              .then((value) => {
                $("#summery").modal('show');
            jquery_1_11_3_min_p('#lblSReqNum').text(jsonData.Table1[0].RequestNumber);
            jquery_1_11_3_min_p('#lblSCreatedBy').text(jsonData.Table1[0].CreatedBy);
            jquery_1_11_3_min_p('#lblSReqDate').text(jsonData.Table1[0].RequestedDate);
            jQuery.each(jsonData.Table2, function (rec) {
        var markup = "<tr><td> "+jsonData.Table2[i].AXitemId+"</td><td>"+jsonData.Table2[i].itemname+"</td><td>"+jsonData.Table2[i].RequestedQty+"</td> <td >"+jsonData.Table2[i].Remarks+"</td></tr>";
        jquery_1_11_3_min_p("#tblrowappend tbody").append(markup);
        i++;
         });
             // window.location.replace("AllRequisition.aspx");
              
                });
        }
    });

}

function CancelRequisition(RequisitionId) {
    var UpdatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/ItemRequisition.asmx/CancelRequest",
        data: "{'RequisitionId':'" + RequisitionId + "','UpdatedBy':'" + UpdatedBy + "'}",
        dataType: "json",
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
            if (jsonData.Table[0].Column1 == '1') {
              swal("Cancelled Successfully","Your data cancelled successfully!","success")
              .then((value) => {
              window.location.replace("AllRequisition.aspx");
              
                });

            }
        }
    });
}





 function excelExport(rows) {
        var workbook = new kendo.ooxml.Workbook({
          sheets: [
            {
              columns: [
                { autoWidth: true },
                { autoWidth: true }
              ],
              title: "Orders",
              rows: rows
            }
          ]
        });
        kendo.saveAs({dataURI: workbook.toDataURL(), fileName: "Book1.xlsx"});
      }

       function checkAllHeaderGrid(ele) {
            debugger;
            var state = $(ele).is(':checked');
            var grid = $('#itemRequestList').data('kendoGrid');
            if (state == true) {
            
                $('.checkAllHeader').prop('checked', true);
            }
            else {
            
                $('.checkAllHeader').prop('checked', false);
            }
        };
