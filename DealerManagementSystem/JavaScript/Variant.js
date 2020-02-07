var groupcount = 1; var searchtxt = '';var ColumnName = [];var  editjsondata='';
jquery_1_11_3_min_p(document).ready(function () {
 jquery_1_11_3_min_p("#hdnLoad").val(10);
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
     jquery_1_11_3_min_p('#preloader').css('display', 'block');
        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
     BindFieldGroupGrid(searchtxt);
     jquery_1_11_3_min_p('#btnLoadMore').click(function () {
        LoadData = parseInt(LoadData) + 2;
        jquery_1_11_3_min_p("#hdnLoad").val(LoadData);
        jquery_1_11_3_min_p('#preloader').css('display', 'block');
        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
         BindFieldGroupGrid(searchtxt);
    });
    //============================================================New Item Group===========================================
    jquery_1_11_3_min_p('#btnnew').click(function () {
        jquery_1_11_3_min_p('#variantForm').css('display', 'block');
        jquery_1_11_3_min_p('#variantGrid').css('display', 'none');
        jquery_1_11_3_min_p('#btnSubmit').css('display', 'block');
        jquery_1_11_3_min_p('#btnback').css('display', 'block');
        jquery_1_11_3_min_p('#btnnew').css('display', 'none');
        BindFormdetails();
    });
    //=========================================================End Item Group==============================================
    //=========================================================Back Button click===========================================
    jquery_1_11_3_min_p('#btnback').click(function () {
        window.location.replace("variantSetup.aspx");
    });
    //=========================================================End click===================================================
    //=========================================================Line Delete=================================================
    jquery_1_11_3_min_p('#btnDeleteLine').on("click", function (event) {
var sel = false;
var ch = jquery_1_11_3_min_p('#' + 'tblgroups').find('tbody input[type=checkbox]');
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
var ch = jquery_1_11_3_min_p('#' + 'tblgroups').find('tbody input[type=checkbox]');
ch.each(function () {
var $this = jquery_1_11_3_min_p(this);
if ($this.is(':checked')) {
var DeleteRow = jquery_1_11_3_min_p(this).closest('tr');
sel = true; 
DeleteRow.remove();
}
});
swal("Deleted Successfully","Data deleted successfully!","success")
}
});
}
});
    //=========================================================End Del Line====================================================
    //=========================================================Submit Click====================================================
     jquery_1_11_3_min_p('#btnSubmit').click(function () {
        if (ValidateGroupMasterGrid() == true) {
         swal({
                 title: "Do you want to proceed?",
                 text: "",
                 icon: "warning",
                 buttons: true,
                 dangerMode: true,
                 })
                 .then((willDelete) => {
                 if (willDelete) {
                    FieldgroupAssigned();

             }
                 });
        }
    });
    //=========================================================End Click=======================================================
    //=========================================================Double Click Value==============================================
     $(document).on("dblclick","#partnersgrid tbody tr",function() {
   var row = jquery_1_11_3_min_p(this);
   var entityid= row.find('td:nth-child(5)').text().trim();
   var countryid= row.find('td:nth-child(6)').text().trim();
  
        jquery_1_11_3_min_p('#variantForm').css('display', 'block');
        jquery_1_11_3_min_p('#variantGrid').css('display', 'none');
        jquery_1_11_3_min_p('#btnSubmit').css('display', 'none');
        jquery_1_11_3_min_p('#btnback').css('display', 'block');
        jquery_1_11_3_min_p('#btnnew').css('display', 'none');
        jquery_1_11_3_min_p('#btnAdd').css('display', 'none');
        jquery_1_11_3_min_p('#btndesable').css('display', 'inline-block');
//        if(editjsondata.Table2[i].Isdisable==1)
//        {
//        jquery_1_11_3_min_p('#btndesable').css('display', 'block');
//         jquery_1_11_3_min_p('#btndesable').attr('disabled', 'disabled');
//        }
//        else
//        {
//           jquery_1_11_3_min_p('#btndesable').css('display', 'block');
//         jquery_1_11_3_min_p('#btndesable').attr('disabled', false);
//        }

        jquery_1_11_3_min_p('#btnDeleteLine').css('display', 'none');
         $('#chkAll').prop('checked', false);
        BindFormdetails();
        editFlag=0;
    kendo_all_min_js("#ddlcountry").data("kendoDropDownList").value(countryid);
    kendo_all_min_js("#ddlentity").data("kendoDropDownList").value(entityid);
jquery_1_11_3_min_p("#tblgroups tbody").empty();
var counter=0; var i=0;
    jQuery.each(editjsondata.Table2, function (rec) {
        if(editjsondata.Table2[i].CountryId==countryid && editjsondata.Table2[i].EntityId==entityid)
          {
          var rowID = counter + 1;
     var markup = "<tr><td><input type='checkbox' id='chk_" + rowID + "' class='checkbox'/></td><td ><input type='text' id='txtvariant_" + rowID + "' onkeyup='Comparevalue(this)' class='fieldName' placeholder='Enter Item Group' autocomplete='off'/></td><td ><input type='text' placeholder='Enter Description' class='fieldName' id='txtdescription_" + rowID + "' autocomplete='off' /></td><td  style='opacity: 0;'>" + rowID + "</td></tr>";

        jquery_1_11_3_min_p("#tblgroups tbody").append(markup);
        counter = rowID;
         //jquery_1_11_3_min_p('#chkAll').css('display', 'table-cell');
          
//         var groupcode="txtvariant_"+rowID;
//         jquery_1_11_3_min_p('#'+groupcode).val(editjsondata.Table2[i].GroupCode);
//         jquery_1_11_3_min_p('#'+groupcode).attr('disabled', 'disabled');
          var gropname="txtvariant_"+rowID;
         jquery_1_11_3_min_p('#'+gropname).val(editjsondata.Table2[i].VarinatName);
         jquery_1_11_3_min_p('#'+gropname).attr('disabled', 'disabled');
          var groupdesc="txtdescription_"+rowID;
         jquery_1_11_3_min_p('#'+groupdesc).val(editjsondata.Table2[i].Description);
         jquery_1_11_3_min_p('#'+groupdesc).attr('disabled', 'disabled');
      
      }
      i++;
      });
    
});

    //=========================================================End Click=======================================================
    //=========================================================Desable Button Click============================================
    jquery_1_11_3_min_p("#btndesable").click(function(){
swal({
title: "Your all data dependency will lost do you want to proceed?",
text: "",
icon: "warning",
buttons: true,
dangerMode: true,
})
.then((willDelete) => {
if (willDelete) {
var country = kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value();
var entity=kendo_all_min_js('#ddlentity').data("kendoDropDownList").value();
 Deleteentity(country,entity);
}
});
});
    //========================================================End Button======================================================
});


function Deleteentity(country,entity)
{
  jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Variant.asmx/DeleteEntity",
        data: "{'Country':'" + country + "','Entity':'" + entity + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
        swal("Disabled Successfully","Your all dependecy has been lost!","success")
         .then((value) => {
             window.location.replace("VariantSetup.aspx");
            });
        }
        });
}


function BindFieldGroupGrid(searchtxt) {
 jquery_1_11_3_min_p("#partnersgrid tbody").empty();
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
    var FieldGroup = [];

    var SearchValue = searchtxt;

    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Variant.asmx/BindFieldGroupGrid",
        data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue + "'}",
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
                var markup = "<tr><td><input type='checkbox' class='chk_All' id='chk_" +checkcount+"'></td><td>" + jsonData.Table[i].Entityname + "</td> <td> " + jsonData.Table[i].CountryName + "</td><td> " + jsonData.Table[i].ColCount + "</td><td style='display:none'> " + jsonData.Table[i].Entityid + "</td> <td style='display:none'> " + jsonData.Table[i].Countryid + "</td></tr>";

                jquery_1_11_3_min_p("#partnersgrid tbody").append(markup);

                //=========================== start for PDF===================================

//                var pdftable = "<tr><td>" + jsonData.Table[i].PartnerType + "</td> <td >" + jsonData.Table[i].PartnerName + "</td> <td >" + jsonData.Table[i].ContactNo + "</td></tr>";
//                jquery_1_11_3_min_p("#pdftable tbody").append(pdftable);

                //==============================end for PFD=================================
                checkcount++;
                i++;
            });
            var k = 0; 
            if (jsonData.Table.length > 0) { var columnsIn = jsonData.Table[0]; for (var key in columnsIn) { if (k > 0) { ColumnName.push(key); } k++; } } else {
                ColumnName.push(k); k++;
            }
            var j = 0; jquery_1_11_3_min_p("#DivSearch").empty();
            jquery_1_11_3_min_p('#partnersgrid thead tr th').each(function () {
                if (j > 0) {

                var id1='chk_'+ ColumnName[j - 1];
                this.id=id1;
                    var SearchDiv = "<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='searchcheckAll' id='chk_" + ColumnName[j - 1] + "' onclick='Addclasstocolumn(this)'><label for='check3' class='coldata'>" + $(this).text() + "</label></span></div>";
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

function searchcheckAll() {
$('.searchcheckAll').prop('checked', true);

};
function searchUncheckAll() {
$('.searchcheckAll').prop('checked', false);

};

function Addclasstocolumn(Data) {
var state = $(Data).is(':checked');
   // var grid = $('#tblFields').data('kendoGrid');
    if (state == true) {
     var checkid= '#'+ Data.id;
 jquery_1_11_3_min_p('#partnersgrid thead tr ' +checkid).addClass('filter');
    }
    else
    {
     var checkid= '#'+ Data.id;
 jquery_1_11_3_min_p('#partnersgrid thead tr ' +checkid).removeClass('filter');
    }

}


//function BindGroupCode() {
// var Entityid=kendo_all_min_js('#ddlentity').val();
// var Countryid= kendo_all_min_js('#ddlcountry').val();
//    jquery_1_11_3_min_p.ajax({
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        url: "../WebServices/Variant.asmx/BindGroupcode",
//        data: "{'EntityId':'" + Entityid + "','CountryId':'" + Countryid + "'}",
//        dataType: "json",
//        success: function (result) {
//            var i = 0;
//           var ItemGroupJson = eval(result.d);
//            jQuery.each(ItemGroupJson.Table, function (rec) {
//                jquery_1_11_3_min_p('#txtgroupcode_1').val(ItemGroupJson.Table[i].GroupCode);
//                i++;
//            });
//        }
//    });
//}


function FieldgroupAssigned()
{
    var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
    var countryid=kendo_all_min_js("#ddlcountry").data("kendoDropDownList").value();
     var entityid=kendo_all_min_js("#ddlentity").data("kendoDropDownList").value();
    var FieldGroup = [];
    var JsonFieldGroup = '';
    var i = 1;
    jquery_1_11_3_min_p('#tblgroups tbody').find('tr').each(function () {
    var row = jquery_1_11_3_min_p(this);
    FieldGroup.push({VariantName: jquery_1_11_3_min_p("#txtvariant_" + row.find('td:nth-child(4)').text().trim()).val(), Description: jquery_1_11_3_min_p("#txtdescription_" + row.find('td:nth-child(4)').text().trim()).val(),Entityid: entityid,Countryid: countryid,CreatedBy: CreatedBy });
     i++;
    });
    JsonFieldGroup = JSON.stringify(FieldGroup);
    jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Variant.asmx/SaveGroupFields",
    data: "{'JsonFields':'" + JsonFieldGroup + "','EntityId':" + entityid + ",'CountryId':" + countryid + ",'CreatedBy':" + CreatedBy + "}",
    dataType: "json",
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
            if(jsonData.Table[0].Response=="1")
            {
       swal("Saved Successfully","Data Saved successfully!","success")
            .then((value) => {
             window.location.replace("VariantSetup.aspx");
            });
            }
//            else
//            {
//             swal("Updated Successfully","Data Updated successfully!","success")
//            .then((value) => {
//             window.location.replace("ItemGroupSetup.aspx");
//            });
//            }
        }
    });
}

function ValidateGroupMasterGrid() {
    var allow = true;
    var i = 1;
     if (kendo_all_min_js("#ddlentity").data("kendoDropDownList").value() == 0) {
            kendo_all_min_js("#ddlentity").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
    jquery_1_11_3_min_p('#tblgroups tbody').find('tr').each(function () {
        var row = jquery_1_11_3_min_p(this);
        if (jquery_1_11_3_min_p("#txtvariant_" + row.find('td:nth-child(4)').text().trim()).val() == "") {
            jquery_1_11_3_min_p("#txtvariant_" + row.find('td:nth-child(4)').text().trim()).addClass('validate');
            jquery_1_11_3_min_p("#txtvariant_" + row.find('td:nth-child(4)').text().trim()).attr("placeholder", "Enter Variant!");
            allow = false;
        }

//        if(jquery_1_11_3_min_p("#txtgroupname_" + row.find('td:nth-child(4)').text().trim()).val() == 0)
//        {
//          jquery_1_11_3_min_p("#txtgroupname_" + row.find('td:nth-child(4)').text().trim()).addClass('validate');
//            jquery_1_11_3_min_p("#txtgroupname_" + row.find('td:nth-child(4)').text().trim()).attr("placeholder", "Enter Description!");
//            allow = false;
//        }
       
        i++;
    });
    return allow;
}

function AddRow() {

         if (kendo_all_min_js("#ddlentity").data("kendoDropDownList").value() == 0) {
            kendo_all_min_js("#ddlentity").data("kendoDropDownList").span.css('background', '#f9e5e5');
        }
        else
        {
    if (jquery_1_11_3_min_p("#txtvariant_" + groupcount).val() != '') {
        var rowID = groupcount + 1;
        var markup = "<tr><td style='opacity: 1;'><input type='checkbox' id='chk_" + rowID + "' class='checkbox'/></td><td ><input type='text' id='txtvariant_" + rowID + "' onkeyup='Comparevalue(this)' class='fieldName' placeholder='Enter Item Group' autocomplete='off'/></td><td ><input type='text' placeholder='Enter Description' class='fieldName' id='txtdescription_" + rowID + "' autocomplete='off' /></td><td  style='opacity: 0;'>" + rowID + "</td></tr>";
        jquery_1_11_3_min_p("#tblgroups tbody").append(markup);
        jquery_1_11_3_min_p("#txtvariant_" + rowID).focus();
        groupcount = rowID;
        jquery_1_11_3_min_p("#txtvariant_" + parseInt(groupcount - 1)).attr('disabled', 'disabled');
//        jquery_1_11_3_min_p("#txtgroupname_" + parseInt(groupcount - 1)).attr('disabled', 'disabled');
//        jquery_1_11_3_min_p("#txtvariant_" + parseInt(groupcount - 1)).attr('disabled', 'disabled');
//        jquery_1_11_3_min_p("#txtvariant_" + parseInt(groupcount)).attr('disabled', 'disabled');
       // var groupcode=jquery_1_11_3_min_p("#txtvariant_" + parseInt(groupcount - 1)).val().split('-');
       // var newgroupcode= AdditionValue(parseInt(groupcode[1]));
       // jquery_1_11_3_min_p("#txtgroupcode_" + parseInt(groupcount)).val(groupcode[0]+'-'+newgroupcode);
       //alert(newgroupcode);

    }
    else {
     if (jquery_1_11_3_min_p("#txtvariant_" + groupcount).val() == '') {
            jquery_1_11_3_min_p("#txtvariant_" + groupcount).addClass("validate");
            jquery_1_11_3_min_p("#txtvariant_" + groupcount).attr("placeholder", "Enter Item Variant!");
        }
      
       
    }
    }

}

function Comparevalue(data) {
    var id = data.id;
    var val = jquery_1_11_3_min_p('#' + id).val();
   var table = document.getElementById('tblgroups');
  var rowlength = jquery_1_11_3_min_p("#tblgroups tr").not("thead tr").length;
  if(rowlength>1)
  {
  var i;
  for (i = 1; i <= parseInt(rowlength-1); i++) {
  var existfieldid1 = jquery_1_11_3_min_p(table.rows[i].cells[3]).text();
  
   var newid="txtgroup_"+existfieldid1;
    var existfieldid=jquery_1_11_3_min_p('#'+newid).val().trim();
  if(val==existfieldid)
  {
   swal("Group name already exists","Please enter another variant!","info")
              .then((value) => {
             jquery_1_11_3_min_p('#' + id).val('');
            
                });
  }
  }
  }

}



function BindFormdetails() {
    var Country = []; var Entity = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Variant.asmx/BindEntitydDetails",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
          var  jsonData = eval(result.d);
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
            // BindGroupCode();
        }
    });
}
