var Country = []; var counter = 0;var LoadData=0;var searchtxt =''; TaxGroupIddblClick=0;
jquery_1_11_3_min_p(document).ready(function () {
 jquery_1_11_3_min_p("#hdnLoad").val(2);
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    jquery_1_11_3_min_p('#preloader').css('display', 'block');
    jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
    BindLegalField(searchtxt);
    
     jquery_1_11_3_min_p('#btnLoadMore').click(function () {
        LoadData = parseInt(LoadData) + 2;
        jquery_1_11_3_min_p("#hdnLoad").val(LoadData);
        jquery_1_11_3_min_p('#preloader').css('display', 'block');
        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
          BindLegalField(searchtxt);
    });
    jquery_1_11_3_min_p("#AddRow").click(function () {
        AddRow();
    });
    BindEntity();
    Country.push({ value: "0", text: "Select" });
    kendo_all_min_js('#ddlcountry').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Country,
        change: function () {
            kendo_all_min_js('#ddlcountry').data("kendoDropDownList").span.css('background', 'none');
        }
    });
     jquery_1_11_3_min_p('#btnSubmit').click(function () {
        if (ValidateFieldMasterGrid() == true) {

         swal({
                 title: "Do you want to proceed?",
                 text: "",
                 icon: "warning",
                 buttons: true,
                 dangerMode: true,
                 })
                 .then((willDelete) => {
                 if (willDelete) {
                 
                 FieldAssigned();
                  
                  }
                 });
   
            
        }
    });

     jquery_1_11_3_min_p("#btnnew").click(function () {
          $("#legalSetup").css('display', 'block');
             $("#legalSetUpGrid").css('display', 'none');
             jquery_1_11_3_min_p('#btnSubmit').css('display', 'block');
              jquery_1_11_3_min_p('#btnnew').css('display', 'none');
              jquery_1_11_3_min_p("#btnback").css('display', 'block');

            });
             jquery_1_11_3_min_p("#btnback").click(function () {
                window.location.replace("LegalFields.aspx");
                        });
jquery_1_11_3_min_p('#btnDeleteLine').on("click", function (event) {
var sel = false;
var ch = jquery_1_11_3_min_p('#' + 'tblLegalfields').find('tbody input[type=checkbox]');
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
var ch = jquery_1_11_3_min_p('#' + 'tblLegalfields').find('tbody input[type=checkbox]');
ch.each(function () {
var $this = jquery_1_11_3_min_p(this);
if ($this.is(':checked')) {
var DeleteRow = jquery_1_11_3_min_p(this).closest('tr');
var rownum=DeleteRow.index()+1;
sel = true; 
DeleteRow.remove();
}
});
swal("Deleted Successfully","Your data deleted successfully!","success")
            .then((value) => {

            });
}
});
}
});



 $(document).on("dblclick","#tblLegalSetupGrid tbody tr",function() {
             var row = jquery_1_11_3_min_p(this);
             var FieldId= row.find('td:nth-child(1)').text().trim();
             TaxGroupIddblClick=FieldId;
             $("#legalSetup").css('display', 'block');
             $("#legalSetUpGrid").css('display', 'none');
              jquery_1_11_3_min_p('#btnSubmit').css('display', 'block');
              jquery_1_11_3_min_p('#btnnew').css('display', 'none');
              jquery_1_11_3_min_p("#btnback").css('display', 'block');
             //jquery_1_11_3_min_p('#btnDeleteLine').css('display', 'none'); 
             BindDataOnbblClick(FieldId);
            });




});

function BindEntity() {
  var   Entity = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/LegalTaxField.asmx/BindEntity",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
            Entity = [];
            var i = 0;
            Entity.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {
                Entity.push({ value: jsonData.Table[i].Entityid, text: jsonData.Table[i].Entityname });
                i++;
            });
        },
        error: function (result) {
        }
    });
    kendo_all_min_js('#ddlentity').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Entity,
        change: function () {
            kendo_all_min_js('#ddlentity').data("kendoDropDownList").span.css('background', 'none');
            BindCountry(kendo_all_min_js('#ddlentity').data("kendoDropDownList").value());
        }
    });
}

function BindCountry(EntityId) {
  
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/LegalTaxField.asmx/BindCountry",
        data: "{'EntityId':'" + EntityId + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
            Country = [];
            var i = 0;
            Country.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {
                Country.push({ value: jsonData.Table[i].CountryId, text: jsonData.Table[i].CountryName });
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

function Enablebutton(data) {
//    var id = data.id;
//    var val = jquery_1_11_3_min_p('#' + id).val();
//    if (kendo_all_min_js("#ddlentity").data("kendoDropDownList").value() == 0) {

//        var fieldid = 'txtFieldName_' + id.split('_')[1];
//        jquery_1_11_3_min_p('#' + fieldid).val('');
//        swal("Select entity", "Please select entity first!", "warning")
//    }
//    else {
//        if (val == '') {
//            var datasourceid = 'ddlDatatype_' + id.split('_')[1];
//            var datasource = jquery_1_11_3_min_p('#' + datasourceid).data("kendoDropDownList");
//            datasource.readonly();

//        }
//        else {
//            var datasourceid = 'ddlDatatype_' + id.split('_')[1];
//            var datasource = jquery_1_11_3_min_p('#' + datasourceid).data("kendoDropDownList");
//            datasource.readonly(false);
//        }
//    }

}

function RemoveClass(data) {

    var id = data.id;
    var arr = id.split('_');
    var id = arr[1];
    if (jquery_1_11_3_min_p('#txtFieldName_' + id).val() != '') {
        jquery_1_11_3_min_p("#txtFieldName_" + id).removeClass('validate');
    }

    if (jquery_1_11_3_min_p("#txtPriority_" + id).val() != '') {
        jquery_1_11_3_min_p("#txtPriority_" + id).removeClass('validate');
    }
}

function AddRow() {
    if (counter == 0) {
        counter++;
    }
    if ((jquery_1_11_3_min_p("#txtFieldName_" + counter).val() != "") && (jquery_1_11_3_min_p("#txtPriority_" + counter).val() != "")) {
        var rowID = counter + 1;
        var markup = "<tr><td style='display:none'>" + rowID + "</td><td><input type='checkbox' class='chk_All' id='chk_" + rowID + "'></td><td ><input type='text' class='' id='txtFieldName_" + rowID + "' placeholder='Enter Field Name' onkeypress='RemoveClass(this)' onkeyup='Enablebutton(this)' autocomplete='off' placeholder='' /></td><td ><input type='text'  onkeypress='NumericAllow(this)' id='txtPriority_" + rowID + "'  onkeyup='Comparevalue(this)'  placeholder='Enter Priority Order' onchange='RemoveClass(this)'class=''  autocomplete='off'/></td></tr>";
        jquery_1_11_3_min_p("#tblLegalfields tbody").append(markup);


        kendo_all_min_js("#txtFieldName_" + rowID).focus();
        counter = rowID;

        jquery_1_11_3_min_p("#txtFieldName_" + parseInt(counter - 1)).attr('disabled', 'disabled');
        jquery_1_11_3_min_p("#txtPriority_" + parseInt(counter - 1)).attr('disabled', 'disabled');
    }
    else {

        if (jquery_1_11_3_min_p("#txtFieldName_" + counter).val() == "") {
            jquery_1_11_3_min_p("#txtFieldName_" + counter).addClass("validate");
            jquery_1_11_3_min_p("#txtFieldName_" + counter).attr("placeholder", "Enter Field!");

        }

        if (jquery_1_11_3_min_p("#txtPriority_" + counter).val() == "") {
            jquery_1_11_3_min_p("#txtPriority_" + counter).addClass("validate");
            jquery_1_11_3_min_p("#txtPriority_" + counter).attr("placeholder", "Enter Field priority!");

        }
    }
}

function ValidateFieldMasterGrid() {
    var allow = true;
    var i = 1;
     if (kendo_all_min_js("#ddlentity").data("kendoDropDownList").value() == 0) {
            kendo_all_min_js("#ddlentity").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
        if (kendo_all_min_js("#ddlcountry").data("kendoDropDownList").value() == 0) {
            kendo_all_min_js("#ddlcountry").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
    jquery_1_11_3_min_p('#tblLegalfields tbody').find('tr').each(function () {
        var row = jquery_1_11_3_min_p(this);
        if ((jquery_1_11_3_min_p("#txtPriority_" + row.find('td:nth-child(1)').text().trim()).val().trim() == "") || (jquery_1_11_3_min_p("#txtPriority_" + row.find('td:nth-child(1)').text().trim()).val().trim() == 0)) {
            jquery_1_11_3_min_p("#txtPriority_" + row.find('td:nth-child(1)').text().trim()).addClass('validate');
            jquery_1_11_3_min_p("#txtPriority_" + row.find('td:nth-child(1)').text().trim()).attr("placeholder", "Enter Field order!");
            allow = false;
        }
        if (jquery_1_11_3_min_p("#txtFieldName_" + row.find('td:nth-child(1)').text().trim()).val() == 0) {
            kendo_all_min_js("#txtFieldName_" + row.find('td:nth-child(1)').text().trim()).addClass('validate');
            allow = false;
        }
        i++;
    });
    return allow;
}

function FieldAssigned()
{
var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
var countryid=kendo_all_min_js("#ddlcountry").data("kendoDropDownList").value();
var entityid=kendo_all_min_js("#ddlentity").data("kendoDropDownList").value();
  var FieldItems = [];
    var JsonFieldItems = '';
    var i = 1;
    jquery_1_11_3_min_p('#tblLegalfields tbody').find('tr').each(function () {
    var row = jquery_1_11_3_min_p(this);
    var FieldName=jquery_1_11_3_min_p("#txtFieldName_" + row.find('td:nth-child(1)').text().trim()).val().trim();
    var Pariority=jquery_1_11_3_min_p("#txtPriority_" + row.find('td:nth-child(1)').text().trim()).val().trim()
    FieldItems.push({ FieldName: FieldName,Pariority:Pariority,countryid: countryid,entityid:entityid,CreatedBy:CreatedBy
    });
    i++;
    });
    JsonFieldItems = JSON.stringify(FieldItems);
     jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
     url: "../WebServices/LegalTaxField.asmx/SaveLegalTaxField",
    data: "{'jsondata':'" + JsonFieldItems + "','countryid':'" + countryid + "','entityid':'" + entityid + "','CreatedBy':'" + CreatedBy + "','TaxGroupIddblClick':'" + TaxGroupIddblClick + "'}",
    dataType: "json",
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
            if(jsonData.Table[0].Response==0)
            {
             swal("Already Exists!","This Entity Already Exists !","info")
            
            }
            else{
       swal("Saved Successfully","Your data Saved successfully!","success")
            .then((value) => {
             window.location.replace("LegalFields.aspx");
            });
        }
        }
    });
}


function BindLegalField(searchtxt) {
 jquery_1_11_3_min_p("#tblLegalSetupGrid tbody").empty();
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
    var Fields = [];

    var SearchValue = searchtxt;

    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/LegalTaxField.asmx/BindGrid",
        data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
            jquery_1_11_3_min_p('#divGrid').css('display', 'block');
            var i = 0;
            var jsonData = result.d;
            editjsondata= result.d;
            if(jsonData.Table.length>0)
            {
            editjson=result.d;
            jquery_1_11_3_min_p('#btnUpdate').prop("disabled", false);
            }
            else
            {
            jquery_1_11_3_min_p('#btnUpdate').prop("disabled", true);
            }
            
            jQuery.each(jsonData.Table, function (rec) {
//            <td style='display:none'> " + jsonData.Table[i].FieldId + "</td>
                var markup = "<tr> <td style='display:none'> " + jsonData.Table[i].LegalTaxHeadId + "</td>  <td> <input id='chkbox' type='checkbox' class='checkAll'  /></td><td>" + jsonData.Table[i].Entityname + "</td> <td >" + jsonData.Table[i].CountryName + "</td> <td >" + jsonData.Table[i].columnCount + "</td></tr>";

                jquery_1_11_3_min_p("#tblLegalSetupGrid tbody").append(markup);

                //=========================== start for PDF===================================

//                var pdftable = "<tr><td>" + jsonData.Table[i].PartnerType + "</td> <td >" + jsonData.Table[i].PartnerName + "</td> <td >" + jsonData.Table[i].ContactNo + "</td></tr>";
//                jquery_1_11_3_min_p("#pdftable tbody").append(pdftable);

                //==============================end for PFD=================================

                i++;
            });
//            var k = 0;
//            if (jsonData.Table.length > 0) { var columnsIn = jsonData.Table[0]; for (var key in columnsIn) { if (k > 0) { ColumnName.push(key); } k++; } } else {
//                ColumnName.push(k); k++;
//            }
//            var j = 0; jquery_1_11_3_min_p("#DivSearch").empty();
//            var SearchDiv1 = "<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='checkAll' id='chk_" + ColumnName[j - 1] + "' onclick='checkAll(this)'><label for='check3' class='coldata'>All</label></span></div>";
//            jquery_1_11_3_min_p("#DivSearch").append(SearchDiv1);
//            jquery_1_11_3_min_p('#tblLegalSetupGrid thead tr th').each(function () {
//                if (j > 1) {

//                var id1='chk_'+ ColumnName[j - 2];
//                this.id=id1;
//                    var SearchDiv = "<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='searchcheckAll' id='chk_" + ColumnName[j - 2] + "' onclick='Addclasstocolumn(this)'><label for='check3' class='coldata'>" + $(this).text() + "</label></span></div>";
//                    jquery_1_11_3_min_p("#DivSearch").append(SearchDiv);

//                     var table = document.getElementById('tblfields');
//  var i;
//  for (i = 0; i < 1; i++) {
//  var findth = jquery_1_11_3_min_p(table.rows[i].cells[1]).text().trim();
//  alert(findth);
//  }

//                }
//                j++;

//            });
//            var Searchfinaldiv="<div class='dropdownBottom'><label class='pull-left' id='selectall' onclick='searchcheckAll()' >Select All</label><label class='pull-right' id='reset' onclick='searchUncheckAll()' >Reset</label></div>";
//jquery_1_11_3_min_p("#DivSearch").append(Searchfinaldiv);
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


function BindDataOnbblClick(FieldId)
{
     jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/LegalTaxField.asmx/BindDataOnbblClick",
    data: "{'FieldId':'" + FieldId + "'}",
    dataType: "json",
    async: false,
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
            if(jsonData.Table.length>0)
            {
          BindEntity();
         kendo_all_min_js("#ddlentity").data("kendoDropDownList").value(jsonData.Table[0].EntityId);
         BindCountry(kendo_all_min_js('#ddlentity').data("kendoDropDownList").value());
         kendo_all_min_js("#ddlcountry").data("kendoDropDownList").value(jsonData.Table[0].CountryId);
         kendo_all_min_js('#ddlentity').data("kendoDropDownList").readonly();
         kendo_all_min_js('#ddlcountry').data("kendoDropDownList").readonly();
       
       }
        if(jsonData.Table1.length>0)
            {
            var j=0;
            jQuery.each(jsonData.Table1, function (rec) {
                 var rowID = counter + 1;
        var markup = "<tr><td style='display:none'>" + rowID + "</td><td><input type='checkbox' class='chk_All' id='chk_" + rowID + "'></td><td ><input type='text' class='' id='txtFieldName_" + rowID + "' placeholder='Enter Field Name' onkeypress='RemoveClass(this)' onkeyup='Enablebutton(this)' autocomplete='off' placeholder='' /></td><td ><input type='text'  onkeypress='NumericAllow(this)' id='txtPriority_" + rowID + "'   placeholder='Enter Priority Order' onchange='RemoveClass(this)'class=''  autocomplete='off'/></td></tr>";
        if(j!=0)
        {
        jquery_1_11_3_min_p("#tblLegalfields tbody").append(markup);
        }
        $("#txtFieldName_"+rowID).val(jsonData.Table1[j].FieldName);
         $("#txtPriority_"+rowID).val(jsonData.Table1[j].FieldPriority);
         $("#txtFieldName_"+rowID).prop("disabled",true);
          $("#txtPriority_"+rowID).prop("disabled",true);
        counter=rowID;
                j++;
            });
            }
           
        }
    });
}


function Comparevalue(data) {
    var id = data.id;
    var val = jquery_1_11_3_min_p('#' + id).val();
    var re = /^([0-9]+[\.]?[0-9]?[0-9]?[0-9]?|[0-9]+)$/g;
    var re1 = /^([0-9]+[\.]?[0-9]?[0-9]?[0-9]?|[0-9]+)/g;
    if (re.test(val)) {
   var table = document.getElementById('tblLegalfields');
  var rowlength = jquery_1_11_3_min_p("#tblLegalfields tr").not("thead tr").length;
  if(rowlength>1)
  {
  var i;
  for (i = 1; i <= parseInt(rowlength-1); i++) {
  var existfieldid1 = $(table.rows[i].cells[0]).text().trim();
   var newid="txtPriority_"+existfieldid1;
    var existfieldid=jquery_1_11_3_min_p('#'+newid).val().trim();
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

