var counter = 0;var ItemMaster = []; var LoadData='';
var detailcounter=1;
var ColumnName = [];var dbcolumnname=[]; var dbfinalcolumnname=[]; var SubFieldsaveflag=0;var Field=0; 
jquery_1_11_3_min_p(document).ready(function () {
jquery_1_11_3_min_p("#hdnLoad").val(50);
LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    BindDropDown();
    BindDataType()
    BindTax();
     jquery_1_11_3_min_p('#btnLoadMore').click(function () {
        LoadData = parseInt(LoadData) + 50;
        jquery_1_11_3_min_p("#hdnLoad").val(LoadData);
        jquery_1_11_3_min_p('#preloader').css('display', 'block');
        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
        BindTax();
    });

     jquery_1_11_3_min_p("#btnclosedata").click(function () {
        $("#AllLeaveRequestPopup").modal('hide');
        kendo_all_min_js("#ddlDatatype_" + counter.toString()).data("kendoDropDownList").value(0);
        $("#txtPField_1").val("");
         $("#txtPField_1").prop("disabled",false)


    });

     jquery_1_11_3_min_p("#btnsavepopupdata").click(function () {
      if(ValidateGridColumn()==true)
      {
      if(SubFieldsaveflag==1)
      {
      SaveSubField();
      }
      else{
      CreateColumn();
      }
      }

    });

     jquery_1_11_3_min_p("#btnnew").click(function () {
     SubFieldsaveflag=0;
      jquery_1_11_3_min_p("#btnnew").css('display', 'none');
      jquery_1_11_3_min_p("#btnSubmit").css('display', 'block');
      jquery_1_11_3_min_p("#btnback").css('display', 'block');

       $("#TaxSetup").css('display', 'block');
        $("#TaxSetUpGrid").css('display', 'none');
     });
     jquery_1_11_3_min_p('#btnback').click(function () {
//      jquery_1_11_3_min_p('#btnnew').css('display', 'block');
//      jquery_1_11_3_min_p('#btnSubmit').css('display', 'none');
//      jquery_1_11_3_min_p('#btnback').css('display', 'none');
//       $("#TaxSetup").css('display', 'none');
//        $("#TaxSetUpGrid").css('display', 'block');
         window.location.replace("TaxFields.aspx");
     });
    jquery_1_11_3_min_p('#btnSubmit').click(function () {
    if(ValidateGrid()==true)
    {
    swal({
                 title: "Do you want to proceed?",
                 text: "",
                 icon: "warning",
                 buttons: true,
                 dangerMode: true,
                 })
                 .then((willDelete) => {
                 if (willDelete) {
                 
                  SaveTaxFields();
                  
                  }
                 });
   
    }
    });

       jquery_1_11_3_min_p('#btndisable').click(function () {
    
    swal({
                 title: "Do you want to proceed?",
                 text: "",
                 icon: "warning",
                 buttons: true,
                 dangerMode: true,
                 })
                 .then((willDelete) => {
                 if (willDelete) {
                 
                  DisabledTaxField();
                  
                  }
                 });
    });

        jquery_1_11_3_min_p('#btnDeleteLine').on("click", function (event) {
var sel = false;
var ch = jquery_1_11_3_min_p('#' + 'tblfields').find('tbody input[type=checkbox]');
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
var ch = jquery_1_11_3_min_p('#' + 'tblfields').find('tbody input[type=checkbox]');
ch.each(function () {
var $this = jquery_1_11_3_min_p(this);
if ($this.is(':checked')) {
var DeleteRow = jquery_1_11_3_min_p(this).closest('tr');
var rownum=DeleteRow.index()+1;
//var Dfieldid=DeleteRow.find('td:nth-child(5)').text().trim();
ItemMaster.splice(rownum,1);

sel = true; 
DeleteRow.remove();

}
});

swal("Deleted Successfully","Your data deleted successfully!","success")
            .then((value) => {
          
//BindDropdown();
BindDataType();

            });



}
});
}




});

$(document).on("dblclick","#tblTaxSetupGrid tbody tr",function() {
      var row = jquery_1_11_3_min_p(this);
      var SetupId= row.find('td:nth-child(1)').text().trim();
      jquery_1_11_3_min_p("#btnnew").css('display', 'none');
      jquery_1_11_3_min_p("#btnSubmit").css('display', 'block');
      jquery_1_11_3_min_p("#btnback").css('display', 'block');
       $("#TaxSetup").css('display', 'block');
        $("#TaxSetUpGrid").css('display', 'none');
       BindFieldOnRowDoubleClick(SetupId);
    
});


jquery_1_11_3_min_p('#btnpopupdeleteline').on("click", function (event) {
var sel1 = false;
var ch1 = jquery_1_11_3_min_p('#' + 'tblpopupdata').find('tbody input[type=checkbox]');
ch1.each(function () {
var $this = jquery_1_11_3_min_p(this);
if ($this.is(':checked')) {
sel1 = true; //set to true if there is/are selected row
}
});
if (!sel1) {
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
var sel1 = false;
var ch1 = jquery_1_11_3_min_p('#' + 'tblpopupdata').find('tbody input[type=checkbox]');
ch1.each(function () {
var $this = jquery_1_11_3_min_p(this);
if ($this.is(':checked')) {
var DeleteRow1 = jquery_1_11_3_min_p(this).closest('tr');
sel1 = true; 
DeleteRow1.remove();
}
});
swal("Deleted Successfully","Your data deleted successfully!","success")
}
});
}
});




});




function ValidateGridColumn() {
    var allow = true;
    var i = 1;
    jquery_1_11_3_min_p('#tblpopupdata tbody').find('tr').each(function () {
        var row = jquery_1_11_3_min_p(this);
        var rowid=row.find('td:nth-child(3)').text().trim();
        if (jquery_1_11_3_min_p("#txtPField_" + rowid).val() == "") {
            jquery_1_11_3_min_p("#txtPField_" + rowid).addClass("validate");
            jquery_1_11_3_min_p("#txtPField_" + rowid).attr("placeholder", "Enter Field!");
            allow = false;
        }
       
        i++;
    });
    return allow;
}

function RemoveClassItemMaster(data) {
    var id = data.id;
    var arr = id.split('_');
    var id = arr[1];
    if (jquery_1_11_3_min_p('#txtPField_' + id).val() != '') {
        jquery_1_11_3_min_p("#txtPField_" + id).removeClass('validate');
    }
}


function Comparevalue1(data) {
    var id = data.id;
    var val = jquery_1_11_3_min_p('#' + id).val();
   var table = document.getElementById('tblpopupdata');
  var rowlength = jquery_1_11_3_min_p("#tblpopupdata tr").not("thead tr").length;
  if(rowlength>1)
  {
  var i;
  for (i = 1; i <= parseInt(rowlength-1); i++) {
  var existfieldid1 = jquery_1_11_3_min_p(table.rows[i].cells[2]).text().trim();
   var newid="txtPField_"+existfieldid1;
    var existfieldid=jquery_1_11_3_min_p('#'+newid).val().trim();
  if(val==existfieldid)
  {
   swal("Column name already exists","Please enter column!","info")
              .then((value) => {
             jquery_1_11_3_min_p('#' + id).val('');
            
                });
  }
  }
  }

}

function Addpopuprow() {
    if (jquery_1_11_3_min_p("#txtPField_" + detailcounter).val() != "") {
        var rowID = detailcounter + 1;
        var markup = "<tr><td><input type='checkbox' class='chk_PAll' id='chkP_" +rowID+"'></td><td ><input type='text' class='' id='txtPField_" + rowID + "'  onchange='RemoveClassItemMaster(this)' onkeyup='Comparevalue1(this)'   autocomplete='off' placeholder='Enter Column Name' /></td><td style='display:none'>" + rowID + "</td></tr>";
        jquery_1_11_3_min_p("#tblpopupdata tbody").append(markup);


       // kendo_all_min_js("#ddlDatatype_" + rowID).focus();
        detailcounter = rowID;
            jquery_1_11_3_min_p("#txtPField_" + parseInt(detailcounter-1)).attr('disabled', 'disabled');
        
       
    }
    else {
       

        if (jquery_1_11_3_min_p("#txtPField_" + detailcounter).val() == "") {
            jquery_1_11_3_min_p("#txtPField_" + detailcounter).addClass("validate");
            jquery_1_11_3_min_p("#txtPField_" + detailcounter).attr("placeholder", "Enter Field!");
           
        }
    }
}



function BindDropDown() {
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/TaxSetup.asmx/BindDropDown",
        //        data: "{'jsonItem':'" + jsonItem + "','UpdatedBy':'" + UpdatedBy + "'}",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
            TaxType = [];
            var i = 0;
            TaxType.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {
                TaxType.push({ value: jsonData.Table[i].TaxTypeId, text: jsonData.Table[i].TaxType });
                i++;
            });
            Country = [];
            var i = 0;
           // Country.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table1, function (rec) {
                Country.push({ value: jsonData.Table1[i].CountryId, text: jsonData.Table1[i].CountryName });
                i++;
            });
//            Entity = [];
//            var i = 0;
//           Entity.push({ value: "0", text: "Select" });
//            jQuery.each(jsonData.Table2, function (rec) {
//                Entity.push({ value: jsonData.Table2[i].Entityid, text: jsonData.Table2[i].Entityname });
//                i++;
//            });
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

//    kendo_all_min_js('#ddlentity').kendoDropDownList({
//        filter: "contains",
//        dataTextField: "text",
//        dataValueField: "value",
//        dataSource: Entity,
//        change: function () {
//            kendo_all_min_js('#ddlentity').data("kendoDropDownList").span.css('background', 'none');
//        }
//    });
    kendo_all_min_js('#ddlTaxType').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: TaxType,
        change: function () {
            kendo_all_min_js('#ddlTaxType').data("kendoDropDownList").span.css('background', 'none');
           
            if (kendo_all_min_js("#ddlTaxType" + counter.toString()).val()== 1) {

            }
            else {

            }

        }
    });
}



function CreateColumn() {
detailcounter=1;
columnname=[];
columnname +=tablename.replace(/\s+/g, '')+',';
columnname +=colname.replace(/\s+/g, '')+','; 
jquery_1_11_3_min_p('#tblpopupdata tbody tr').each(function () {
var row = jquery_1_11_3_min_p(this);

 var id= "txtPField_"+row.find('td:nth-child(3)').text().trim();
 var columnnameval=jquery_1_11_3_min_p('#'+id).val().replace(/\s+/g, ''); 
  columnname += columnnameval+',';
});
dbcolumnname.push(columnname);
dbfinalcolumnname.push(columnname);
$("#AllLeaveRequestPopup").modal('hide');

var kendoid="ddlDatatype_" + parseInt(counter);
            var dataSource  =  jquery_1_11_3_min_p('#'+kendoid).data("kendoDropDownList");
            dataSource.readonly();
            jquery_1_11_3_min_p("#txtField_" + parseInt(counter)).attr('disabled', 'disabled');
}


function BindDataType() {
    if (counter == 0) {
        counter++;
    }

   ItemMaster = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/TaxSetup.asmx/BindDataType",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
          var  jsonItemMasterDetails = eval(result.d);
            ItemMaster.push({ value: "0", text: "Select" });
            jQuery.each(jsonItemMasterDetails.Table, function (rec) {
                ItemMaster.push({ value: jsonItemMasterDetails.Table[i].Fielddatatypid, text: jsonItemMasterDetails.Table[i].Datatypename });
                i++;
            });
        },
        error: function (result) {
        }
    });
    kendo_all_min_js('#ddlDatatype_' + counter.toString()).kendoDropDownList({
        filter: "contains",
        // optionLabel: "Select",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ItemMaster,
        change: function () {
            if (kendo_all_min_js("#ddlDatatype_" + counter.toString()).data("kendoDropDownList").value() == 2) {
               BindColumns();
            }
            else {
            $("#AllLeaveRequestPopup").modal('hide');
            detailcounter=1; ColumnName=[];dbcolumnname=[];
            }
            kendo_all_min_js("#ddlDatatype_" + counter.toString()).data("kendoDropDownList").span.css('background', 'none');
        }
    });
     var dataSource  =  jquery_1_11_3_min_p('#ddlDatatype_'+ counter.toString()).data("kendoDropDownList");
            dataSource.readonly();
}


function BindColumns()
{
 jquery_1_11_3_min_p("#tblpopupdata").find("tr:gt(1)").remove();
 var id="txtFieldName_"+counter.toString();
 jquery_1_11_3_min_p('#ColumnName').text(jquery_1_11_3_min_p('#' + id).val());
 var columnvalue=kendo_all_min_js("#ddlDatatype_" + counter.toString()).data("kendoDropDownList").value();
 colname=jquery_1_11_3_min_p('#' + id).val();
 var coutryname=kendo_all_min_js("#ddlcountry").data("kendoDropDownList").text();
 //var entityname=kendo_all_min_js("#ddlentity").data("kendoDropDownList").text();
 //var entityfirst=entityname.split(' ');
 tablename="tbl"+coutryname+"_"+colname;
 var popval="txtPField_"+detailcounter.toString();
 jquery_1_11_3_min_p('#' + popval).val('');
 jquery_1_11_3_min_p("#txtPField_" + parseInt(detailcounter)).attr('disabled', false);
 $("#AllLeaveRequestPopup").modal('show');

}
function AddRow() {
    if (counter == 0) {
        counter++;
    }
    if ((jquery_1_11_3_min_p("#txtFieldName_" + counter).val() != "") && (jquery_1_11_3_min_p("#txtPriority_" + counter).val() != "") && (kendo_all_min_js("#ddlDatatype_" + counter).val() != "0")) {
        var rowID = counter + 1;
        var markup = "<tr><td style='display:none'>" + rowID + "</td><td><input type='checkbox' class='chk_All' id='chk_" + rowID + "'></td><td ><input type='text' class='' id='txtFieldName_" + rowID + "' onkeypress='RemoveClass(this)' onkeyup='Enablebutton(this)' autocomplete='off' placeholder='' /></td><td ><input type='text' class='' id='txtPriority_" + rowID + "' onkeypress='RemoveClass(this)' onkeyup='Comparevalue(this)' autocomplete='off' placeholder='' /></td><td ><input type='text' id='ddlDatatype_" + rowID + "' class='' readonly='readonly'   autocomplete='off'/></td></tr>";
        jquery_1_11_3_min_p("#tblfields tbody").append(markup);


        jquery_1_11_3_min_p("#txtFieldName_" + rowID).focus();
        counter = rowID;
        jquery_1_11_3_min_p("#txtFieldName_" + parseInt(counter - 1)).attr('disabled', 'disabled');
        jquery_1_11_3_min_p("#txtPriority_" + parseInt(counter - 1)).attr('disabled', 'disabled');
        var kendoid = "ddlDatatype_" + parseInt(counter - 1);
        var dataSource = jquery_1_11_3_min_p('#' + kendoid).data("kendoDropDownList");
       
        dataSource.readonly();
        
        BindDataType();



    }
    else {


        if (kendo_all_min_js("#ddlDatatype_" + counter).val() == "0") {
            kendo_all_min_js("#ddlDatatype_" + counter).data("kendoDropDownList").span.css('background', '#f9e5e5');

        }

        if (jquery_1_11_3_min_p("#txtFieldName_" + counter).val() == "") {
            jquery_1_11_3_min_p("#txtFieldName_" + counter).addClass("validate");
            jquery_1_11_3_min_p("#txtFieldName_" + counter).attr("placeholder", "Enter Field!");

        }
        if (jquery_1_11_3_min_p("#txtPriority_" + counter).val() == "") {
            jquery_1_11_3_min_p("#txtPriority_" + counter).addClass("validate");
            jquery_1_11_3_min_p("#txtPriority_" + counter).attr("placeholder", "Enter Priority!");

        }
    }
}


function RemoveClass(data) {

    var id = data.id;
    var arr = id.split('_');
    var id = arr[1];
    if (jquery_1_11_3_min_p('#txtFieldName_' + id).val() != '') {
        jquery_1_11_3_min_p("#txtFieldName_" + id).removeClass('validate');
    }
    if (jquery_1_11_3_min_p('#txtPriority_' + id).val() != '') {
        jquery_1_11_3_min_p("#txtPriority_" + id).removeClass('validate');
    }

    if (kendo_all_min_js("#ddlDatatype_" + id).val() != '0') {
        jquery_1_11_3_min_p("#ddlDatatype_" + id).removeClass('validate');
    }
}

function Enablebutton(data) {
    var id = data.id;
    var val = jquery_1_11_3_min_p('#' + id).val();
   
//    if (kendo_all_min_js("#ddlentity").data("kendoDropDownList").value() == 0) {

//        var fieldid = 'txtFieldName_' + id.split('_')[1];
//        var priority = 'txtPriority_' + id.split('_')[1];
//        jquery_1_11_3_min_p('#' + fieldid).val('');
//        jquery_1_11_3_min_p('#' + priority).val('');
//        swal("Select entity", "Please select entity first!", "warning")
//    }
    if (kendo_all_min_js("#ddlTaxType").data("kendoDropDownList").value() == 0) {

        var fieldid = 'txtFieldName_' + id.split('_')[1];
        var priority = 'txtPriority_' + id.split('_')[1];
        jquery_1_11_3_min_p('#' + fieldid).val('');
        jquery_1_11_3_min_p('#' + priority).val('');
        swal("Select entity", "Please select TaxType first!", "warning")
    }
    else {
        if (val == '') {
            var datasourceid = 'ddlDatatype_' + id.split('_')[1];
            var datasource = jquery_1_11_3_min_p('#' + datasourceid).data("kendoDropDownList");
            datasource.readonly();

        }
        else {
            var datasourceid = 'ddlDatatype_' + id.split('_')[1];
            var datasource = jquery_1_11_3_min_p('#' + datasourceid).data("kendoDropDownList");
                datasource.readonly(false);
        }
    }

}


function NumericAllow(data) {
    var value = data.id;
    jquery_1_11_3_min_p('#' + value).keypress(function (e) {

        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            jquery_1_11_3_min_p("#" + value).val('');
            return false;

        }
    });
}


function SaveTaxFields() {
    
    var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
    var countryid=kendo_all_min_js("#ddlcountry").val();
     var TaxTypeId=kendo_all_min_js("#ddlTaxType").val();
    var Status = 1;
    var Fields = [];
    var JsonFields = '';
    var i = 1;
    jquery_1_11_3_min_p('#tblfields tbody').find('tr').each(function () {
    var row = jquery_1_11_3_min_p(this);
  // var  FieldId= row.find('td:nth-child(5)').text().trim();
    var DatatypeId=kendo_all_min_js("#ddlDatatype_" + row.find('td:nth-child(1)').text().trim()).val();
    var FieldName= jquery_1_11_3_min_p("#txtFieldName_" + row.find('td:nth-child(1)').text().trim()).val();
    var priority= jquery_1_11_3_min_p("#txtPriority_" + row.find('td:nth-child(1)').text().trim()).val();
    Fields.push({ DatatypeId: DatatypeId, FieldName: FieldName, priority: priority,TaxType: TaxTypeId });
//    if(editFlag==0)
//    {
//    Fields.push({ DatatypeId: DatatypeId, FieldName: FieldName, CreatedBy: CreatedBy });
//   }
//   else{
//    Fields.push({FieldId:FieldId, DatatypeId: DatatypeId, FieldName: FieldName, CreatedBy: CreatedBy });
//   }
    i++;
    });
    JsonFields = JSON.stringify(Fields);
    var dbcolumns=JSON.stringify(dbfinalcolumnname);
    jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/TaxSetup.asmx/SaveTaxFields",
    data: "{'JsonFields':'" + JsonFields + "','countryid':" + countryid + ",'CreatedBy':" + CreatedBy + ",'TaxType':" + TaxTypeId + ",'dbcolumns':" + dbcolumns + "}",
    dataType: "json",
    async: false,
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
//            if(jsonData.Table[0].Response=="0")
//            {
//           swal("Warning","Country Already exists!","Warning")
//            .then((value) => {
//             window.location.replace("TaxFields.aspx");
//            });
//            }
//            else
//            {
             swal("Saved Successfully","Your data Saved successfully!","success")
            .then((value) => {
             window.location.replace("TaxFields.aspx");
            });
            //}
        }
    });

}



function ValidateGrid() {
    var allow = true;
    var i = 1;
     if (kendo_all_min_js("#ddlTaxType").val() == 0) {
            kendo_all_min_js("#ddlTaxType").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
         
    jquery_1_11_3_min_p('#tblfields tbody').find('tr').each(function () {
        var row = jquery_1_11_3_min_p(this);
        if ((jquery_1_11_3_min_p("#txtPriority_" + row.find('td:nth-child(1)').text().trim()).val() == "") || (jquery_1_11_3_min_p("#txtPriority_" + row.find('td:nth-child(1)').text().trim()).val() == 0)) {
            jquery_1_11_3_min_p("#txtPriority_" + row.find('td:nth-child(1)').text().trim()).addClass('validate');
            jquery_1_11_3_min_p("#txtPriority_" + row.find('td:nth-child(1)').text().trim()).attr("placeholder", "Enter Field order!");
            allow = false;
        }
         if (jquery_1_11_3_min_p("#txtFieldName_" + row.find('td:nth-child(1)').text().trim()).val() == "") {
            jquery_1_11_3_min_p("#txtFieldName_" + row.find('td:nth-child(1)').text().trim()).addClass('validate');
            jquery_1_11_3_min_p("#txtFieldName_" + row.find('td:nth-child(1)').text().trim()).attr("placeholder", "Enter Field Name!");
            allow = false;
        }
        if (kendo_all_min_js("#ddlDatatype_" + row.find('td:nth-child(1)').text().trim()).val() == 0) {
            kendo_all_min_js("#ddlDatatype_" + row.find('td:nth-child(1)').text().trim()).data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }

        i++;
    });
    return allow;
}


function Comparevalue(data) {
    var id = data.id;
    var val = jquery_1_11_3_min_p('#' + id).val();
    var re = /^([0-9]+[\.]?[0-9]?[0-9]?[0-9]?|[0-9]+)$/g;
    var re1 = /^([0-9]+[\.]?[0-9]?[0-9]?[0-9]?|[0-9]+)/g;
    if (re.test(val)) {
      //  do something here
   var table = document.getElementById('tblfields');
  var rowlength = jquery_1_11_3_min_p("#tblfields tr").not("thead tr").length;
  if(rowlength>1)
  {
  var i;
  for (i = 1; i <= parseInt(rowlength-1); i++) {
  var existfieldid1 = jquery_1_11_3_min_p(table.rows[i].cells[0]).text().trim();
   var newid="txtPriority_"+existfieldid1;
    var existfieldid=jquery_1_11_3_min_p('#'+newid).val();
  if(val==existfieldid)
  {
   swal("This priority already assigned to field","Please choose order!","info")
              .then((value) => {
             jquery_1_11_3_min_p('#' + id).val('');
            
                });
  }
  }
  }

        
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
      
    }

    if(val==0)
    {
     jquery_1_11_3_min_p("#" + id).val('');
    }

}



function BindTax() {
   
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
    var Partners = [];
     var LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
  
 var SearchValue='';
 
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/TaxSetup.asmx/BindTax",
        data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue + "'}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
            jquery_1_11_3_min_p('#divGrid').css('display', 'block');
            var i = 0;
            var jsonData = result.d;
            jquery_1_11_3_min_p("#tblTaxSetupGrid tbody").empty();
            jQuery.each(jsonData.Table, function (rec) {
            var markup = "<tr><td style='display:none'> "+jsonData.Table[i].TaxSetupId+"</td><td> <input id='chkbox' type='checkbox' class='checkboxcls' onclick='checkAll(this)' /></td> <td >"+jsonData.Table[i].CountryName+"</td>  <td >"+jsonData.Table[i].TaxType+"</td> </tr>";

            jquery_1_11_3_min_p("#tblTaxSetupGrid tbody").append(markup);

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


function BindFieldOnRowDoubleClick(FieldId) {
    var FieldId = FieldId;
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/TaxSetup.asmx/BindFieldOnRowDoubleClick",
        data: "{'TaxSetupId':'" + FieldId + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
      var  jsonData = eval(result.d);
        BindDropDown();
jquery_1_11_3_min_p('#lblTaxSetupId').text(jsonData.Table1[0].TaxSetupId);
    kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value(jsonData.Table1[0].CountryId);
    kendo_all_min_js('#ddlcountry').data("kendoDropDownList").readonly();
    kendo_all_min_js('#ddlTaxType').data("kendoDropDownList").value(jsonData.Table1[0].TaxType);
    kendo_all_min_js('#ddlTaxType').data("kendoDropDownList").readonly();
    
    jquery_1_11_3_min_p("#tblfields tbody").empty();
    var i=0;
    counter=0;
    jQuery.each(jsonData.Table, function (rec) {

     var rowID = counter+1;
         var markup = "<tr><td style='display:none'>" + rowID + "</td><td><input type='checkbox' class='chk_All' id='chk_" + rowID + "'></td><td ><input type='text' class='' id='txtFieldName_" + rowID + "' onkeypress='RemoveClass(this)' onkeyup='Enablebutton(this)' autocomplete='off' placeholder='' /></td><td ><input type='text' class='' id='txtPriority_" + rowID + "' onkeypress='RemoveClass(this)' onkeyup='Comparevalue(this)' autocomplete='off' placeholder='' /></td><td ><input type='text' id='ddlDatatype_" + rowID + "' class='' readonly='readonly'   autocomplete='off'/></td><td><button type='button' id='"+jsonData.Table[i].TaxSetupInfoId+"'  style='display:none' class='btn btn-primary' onclick='BindSubField(this)'><i class='fa fa-eye'></i> View Subfields</button></td></tr>";
        jquery_1_11_3_min_p("#tblfields tbody").append(markup);
       jquery_1_11_3_min_p("#txtFieldName_" + rowID).val(jsonData.Table[i].fieldname);
       jquery_1_11_3_min_p("#txtFieldName_" + rowID).prop("disabled",true)
       jquery_1_11_3_min_p("#txtPriority_" +rowID).val(jsonData.Table[i].priority);
        jquery_1_11_3_min_p("#txtPriority_" + rowID).prop("disabled",true)
        jquery_1_11_3_min_p("#btnSubmit").css("display","none");
        jquery_1_11_3_min_p("#btnDeleteLine").css("display","none");
        jquery_1_11_3_min_p("#btnAdd").css("display","none");
        jquery_1_11_3_min_p("#btndisable").css("display","block");

        counter = rowID;
         BindDataType();
      kendo_all_min_js("#ddlDatatype_" + rowID).data("kendoDropDownList").value(jsonData.Table[i].TaxDataType);
      if(jsonData.Table[i].TaxDataType==2)
      {
      $('#'+jsonData.Table[i].TaxSetupInfoId).css('display','block')
      }

    i++;
    
    });


       }
        
   });

   
   
}


function DisabledTaxField() {
     var taxtSetupIs =jquery_1_11_3_min_p('#lblTaxSetupId').text();
     var UpdatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/TaxSetup.asmx/DisabledTaxField",
        data: "{'TaxSetupId':'" + taxtSetupIs + "','UpdatedBy':'" + UpdatedBy + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
      var  jsonData = eval(result.d);
      if(jsonData.Table[0].Response=="1")
      {
      swal("Tax Field Disabled");
      }


       }
        
   });

   
   
}


function BindSubField(data) {
jquery_1_11_3_min_p("#tblpopupdata tbody").empty();
SubFieldsaveflag=1;
     Field=data.id;
    var FieldId = data.id;
     jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/TaxSetup.asmx/BindSubField",
        data: "{'FieldId':'" + FieldId + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
      var  jsonData = eval(result.d);
      var i=0;
     detailcounter=0;
   jQuery.each(jsonData.Table, function (rec) {
  
  
  var rowID = detailcounter+1
        var markup = "<tr><td><input type='checkbox' class='chk_PAll' id='chkP_" +rowID+"'></td><td ><input type='text' class='' id='txtPField_" + rowID + "'  onchange='RemoveClassItemMaster(this)' onkeyup='Comparevalue1(this)'   autocomplete='off' placeholder='Enter Column Name' /></td><td style='display:none'>" + rowID + "</td></tr>";
        jquery_1_11_3_min_p("#tblpopupdata tbody").append(markup);

        jquery_1_11_3_min_p('#txtPField_'+rowID).val(jsonData.Table[i].SubComponentName);
        jquery_1_11_3_min_p('#txtPField_'+rowID).prop("disabled",true);
       detailcounter = rowID;
                i++;
                
            });
             $("#AllLeaveRequestPopup").modal('show');
             $("#btnpopupdeleteline").prop("disabled",true)
          


       }
        
   });

    }


    function SaveSubField()
    {
     var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
     var countryid=kendo_all_min_js("#ddlcountry").val();
     var TaxTypeId=kendo_all_min_js("#ddlTaxType").val();
     var colum=[];
     var dbcolum=[];
jquery_1_11_3_min_p('#tblpopupdata tbody tr').each(function () {
var row = jquery_1_11_3_min_p(this);
 var id= "txtPField_"+row.find('td:nth-child(3)').text().trim();
 var columnnameval=jquery_1_11_3_min_p('#'+id).val().replace(/\s+/g, ''); 
  colum.push({FIELDID:Field,SUBCOMPONENTNAME:columnnameval,COUNTRYID:countryid,TAXTYPE:TaxTypeId,CreatedBy:CreatedBy});
});

var JsonFields = JSON.stringify(colum);
   jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/TaxSetup.asmx/SaveSubField",
        data: "{'FieldId':'" + Field + "','Jsondata':'" + JsonFields + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
      var  jsonData = eval(result.d);
      var i=0;
       $("#AllLeaveRequestPopup").modal('hide');

       }
        
   });

    }

