var counter = 0;var editFlag=0; var ColumnName=[]; var LoadData=0; var UnitClassId=0; var ColumnName=[];
jquery_1_11_3_min_p(document).ready(function () {

 jquery_1_11_3_min_p("#hdnLoad").val(10);
       LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
       jquery_1_11_3_min_p('#btnLoadMore1').click(function () {
        LoadData = parseInt(LoadData) + 10;
        jquery_1_11_3_min_p("#hdnLoad").val(LoadData);
        jquery_1_11_3_min_p('#preloader').css('display', 'block');
        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
         BindUnitGrid();
    });
    BindUnitGrid();
    BindUnitClass();



 $("#UnitClass").on('click','li',function(){
    $('#stndUnit tbody').empty();
    var currentelemnt=$(this).text().split(' ');
    var ele=currentelemnt[0];
    BindUnitGridclassWise(ele);
    UnitClassId=ele;
});

 jquery_1_11_3_min_p('#btnShowUnitConv').click(function () {
 $("#conversionpopup").modal('show');
 BindUnitClassConversion(UnitClassId);
 });
  jquery_1_11_3_min_p('#btnclose').click(function () {
 $("#conversionpopup").modal('hide');
 return false;
 });


 jquery_1_11_3_min_p('#btnsubmit').click(function () {
 if(ValidateUnitGrid()==true)
 {
 SaveUnit();
 }
 });

    jquery_1_11_3_min_p("#btnnew").click(function () {
          jquery_1_11_3_min_p("#unitForm").css('display', 'block');
         jquery_1_11_3_min_p("#unitGrid").css('display', 'none');
         jquery_1_11_3_min_p('#btnsubmit').css('display', 'block');
         jquery_1_11_3_min_p('#btnback').css('display', 'block');
         jquery_1_11_3_min_p('#btnnew').css('display', 'none');
               });
        jquery_1_11_3_min_p("#btnback").click(function () {
         jquery_1_11_3_min_p("#unitForm").css('display', 'none');
         jquery_1_11_3_min_p("#unitGrid").css('display', 'block');
          jquery_1_11_3_min_p('#btnsubmit').css('display', 'none');
         jquery_1_11_3_min_p('#btnback').css('display', 'none');
         jquery_1_11_3_min_p('#btnnew').css('display', 'block');
                                      });


 jquery_1_11_3_min_p('#btnDeleteLine').on("click", function (event) {
var sel = false;
var ch = jquery_1_11_3_min_p('#' + 'tblUnit').find('tbody input[type=checkbox]');
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
var ch = jquery_1_11_3_min_p('#' + 'tblUnit').find('tbody input[type=checkbox]');
ch.each(function () {
var $this = jquery_1_11_3_min_p(this);
if ($this.is(':checked')) {
var DeleteRow = jquery_1_11_3_min_p(this).closest('tr');
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


});

function AddRow() {
    if (counter == 0) {
        counter++;
    }
    if ((jquery_1_11_3_min_p("#txtUnit_" + counter).val() != "") && (jquery_1_11_3_min_p("#txtDesc_" + counter).val() != "")) {
        var rowID = counter + 1;
        var markup = "<tr><td style='display:none'>" + rowID + "</td><td><input type='checkbox' class='chk_All' id='chk_" + rowID + "'></td><td ><input type='text' class='' id='txtUnit_" + rowID + "' onkeypress='RemoveClass(this)' onkeyup='' autocomplete='off' placeholder='' /></td><td ><input type='text' id='txtDesc_" + rowID + "' class=''   onkeypress='RemoveClass(this)'   autocomplete='off'/></td></tr>";
        jquery_1_11_3_min_p("#tblUnit tbody").append(markup);


        kendo_all_min_js("#txtUnit_" + rowID).focus();
        counter = rowID;
         jquery_1_11_3_min_p("#txtUnit_" + parseInt(counter-1)).attr('disabled', 'disabled');
          jquery_1_11_3_min_p("#txtDesc_" + parseInt(counter-1)).attr('disabled', 'disabled');
    }
    else {
        if (jquery_1_11_3_min_p("#txtUnit_" + counter).val() == "") {
            jquery_1_11_3_min_p("#txtUnit_" + counter).addClass("validate");
            jquery_1_11_3_min_p("#txtUnit_" + counter).attr("placeholder", "Enter Unit Name!");

        }

        if (jquery_1_11_3_min_p("#txtDesc_" + counter).val() == "") {
            jquery_1_11_3_min_p("#txtDesc_" + counter).addClass("validate");
            jquery_1_11_3_min_p("#txtDesc_" + counter).attr("placeholder", "Enter Description!");

        }
    }
}

function RemoveClass(data) {

    var id = data.id;
    var arr = id.split('_');
    var id = arr[1];
    if (jquery_1_11_3_min_p('#txtUnit_' + id).val() != '') {
        jquery_1_11_3_min_p("#txtUnit_" + id).removeClass('validate');
    }
    if (jquery_1_11_3_min_p('#txtDesc_' + id).val() != '') {
        jquery_1_11_3_min_p("#txtDesc_" + id).removeClass('validate');
    }
}

function SaveUnit() {
    var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
    var UnitArr = [];
    var JsonUnit = '';
    var i = 1;
    jquery_1_11_3_min_p('#tblUnit tbody').find('tr').each(function () {
    var row = jquery_1_11_3_min_p(this);
    var  FieldId= row.find('td:nth-child(1)').text().trim();
    var Unit=jquery_1_11_3_min_p("#txtUnit_" + row.find('td:nth-child(1)').text().trim()).val();
    var Description= jquery_1_11_3_min_p("#txtDesc_" + row.find('td:nth-child(1)').text().trim()).val();
    if(editFlag==0)
    {
    UnitArr.push({ Unit: Unit, Description: Description, CreatedBy: CreatedBy });
   }
  
    i++;
    });
    JsonUnit = JSON.stringify(UnitArr);
    jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Item.asmx/saveUnits",
    data: "{'UnitJson':'" + JsonUnit + "'}",
    dataType: "json",
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
            if(jsonData.Table[0].Response=="1")
            {
       swal("Saved Successfully","Your data Saved successfully!","success")
            .then((value) => {
             window.location.replace("Unit.aspx");
            });
            }
        }
    });

}

function ValidateUnitGrid() {
    var allow = true;
    var i = 1;
     
    jquery_1_11_3_min_p('#tblUnit tbody').find('tr').each(function () {
        var row = jquery_1_11_3_min_p(this);
        if (jquery_1_11_3_min_p("#txtUnit_" + row.find('td:nth-child(1)').text().trim()).val() == "") {
            jquery_1_11_3_min_p("#txtUnit_" + row.find('td:nth-child(1)').text().trim()).addClass("validate");
            jquery_1_11_3_min_p("#txtUnit_" + row.find('td:nth-child(1)').text().trim()).attr("placeholder", "Enter Unit Name!");
            allow=false;
        }

       if (jquery_1_11_3_min_p("#txtDesc_" + row.find('td:nth-child(1)').text().trim()).val() == "") {
            jquery_1_11_3_min_p("#txtDesc_" + row.find('td:nth-child(1)').text().trim()).addClass("validate");
            jquery_1_11_3_min_p("#txtDesc_" + row.find('td:nth-child(1)').text().trim()).attr("placeholder", "Enter Description!");
            allow=false;
        }
        i++;
    });
    return allow;
}


function BindUnitGrid() {
 jquery_1_11_3_min_p("#tblUnitGrid tbody").empty();
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
    var Partners = [];

    var SearchValue = "";

  LoadData = jquery_1_11_3_min_p("#hdnLoad").val();

    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Item.asmx/BindUnits",
        data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue + "'}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
            jquery_1_11_3_min_p('#divGrid').css('display', 'block');
            var i = 0;
            var jsonData = result.d;
        jQuery.each(jsonData.Table, function (rec) {
       var markup = "<tr> <td style='display:none'> " + jsonData.Table[i].unitId + "</td> <td> <input id='chkbox' type='checkbox' class='checkAll'  /></td><td>" + jsonData.Table[i].Unitname + "</td> <td >" + jsonData.Table[i].Description + "</td></tr>";

                jquery_1_11_3_min_p("#tblUnitGrid tbody").append(markup);

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
            jquery_1_11_3_min_p('#tblFieldGrid thead tr th').each(function () {
                if (j > 1) {

                var id1='chk_'+ ColumnName[j - 2];
                this.id=id1;
                    var SearchDiv = "<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='searchcheckAll' id='chk_" + ColumnName[j - 2] + "' onclick='Addclasstocolumn(this)'><label for='check3' class='coldata'>" + $(this).text() + "</label></span></div>";
                    jquery_1_11_3_min_p("#DivSearch").append(SearchDiv);

//                     var table = document.getElementById('tblfields');
//  var i;
//  for (i = 0; i < 1; i++) {
//  var findth = jquery_1_11_3_min_p(table.rows[i].cells[1]).text().trim();
//  alert(findth);
//  }

                }
                j++;

            });
            var Searchfinaldiv="<div class='dropdownBottom'><label class='pull-left' id='selectall' onclick='searchcheckAll()' >Select All</label><label class='pull-right' id='reset' onclick='searchUncheckAll()' >Reset</label></div>";
jquery_1_11_3_min_p("#DivSearch").append(Searchfinaldiv);
            if (jsonData.Table.length >= jsonData.Table1[0].Totalcount) {
                jquery_1_11_3_min_p('#lblRowCount1').text(jsonData.Table1[0].Totalcount);
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


function BindUnitClass() {
 
    jquery_1_11_3_min_p("#UnitClass").empty();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Item.asmx/BindUnitClass",
        data: "{}",
        dataType: "json",
        success: function (result) {
            var i = 0;
            var jsonData = result.d;
            FieldNameCopyJson=jsonData;
            jQuery.each(jsonData.Table, function (rec) {


   var markup = "<li class='nav-item' ><label style='display:none'  id=lbl_" + jsonData.Table[i].UnitClassid + ">" + jsonData.Table[i].UnitClassid + "</label><a class='nav-link ' id=acr_" + jsonData.Table[i].UnitClassid + " data-toggle='tab'   href=#" + jsonData.Table[i].UnitClassid + " > " + jsonData.Table[i].UnitClassname + "</a></li>";
                jquery_1_11_3_min_p("#UnitClass").append(markup);
                i++;
            });
            jquery_1_11_3_min_p('#acr_' + jsonData.Table[0].UnitClassid).addClass('active');
            var UId=jsonData.Table[0].UnitClassid;
            
            BindUnitGridclassWise(UId);
            UnitClassId=UId;
            if (jsonData.Table.length > 0) {
                jquery_1_11_3_min_p('#UnitClass').css('display', 'block');
            }




        }
    });

}


function BindUnitGridclassWise(id) {
 jquery_1_11_3_min_p("#stndUnit tbody").empty();
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
    var Partners = [];

    var SearchValue = "";

  LoadData = jquery_1_11_3_min_p("#hdnLoad").val();

    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Item.asmx/BindUnitClassWise",
        data: "{'UnitId':'" + id + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsonData = result.d;
        jQuery.each(jsonData.Table, function (rec) {
       var markup = "<tr> <td style='display:none'> " + jsonData.Table[i].unitId + "</td> <td> <input id='chkbox' type='checkbox' class='checkAll'  /></td><td>" + jsonData.Table[i].Unitname + "</td></tr>";

                jquery_1_11_3_min_p("#stndUnit tbody").append(markup);

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
            jquery_1_11_3_min_p('#UnitClass thead tr th').each(function () {
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
                jquery_1_11_3_min_p('#lblRowCount2').text(jsonData.Table1[0].Totalcount);
                jquery_1_11_3_min_p('#lblTotalCount2').text(jsonData.Table1[0].Totalcount);
                jquery_1_11_3_min_p('#btnLoadMore2').css('visibility', 'hidden');
            }
            else {
                jquery_1_11_3_min_p('#lblRowCount2').text(jsonData.Table.length);
                jquery_1_11_3_min_p('#lblTotalCount2').text(jsonData.Table1[0].Totalcount);
                jquery_1_11_3_min_p('#btnLoadMore2').css('visibility', 'visible');
            }
}


    });
}


function BindUnitClassConversion(UnitClassId) {
 jquery_1_11_3_min_p("#tblpopunitConversion tbody").empty();
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
    var Partners = [];
    var UnitClassId=UnitClassId;
    var SearchValue = "";

  LoadData = jquery_1_11_3_min_p("#hdnLoad").val();

    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Item.asmx/BindShowUnitConversion",
        data: "{'UnitClassId':'" + UnitClassId + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsonData = result.d;
        jQuery.each(jsonData.Table, function (rec) {
       var markup = "<tr> <td> <input id='chkbox' type='checkbox' class='checkAll'  /></td><td>" + jsonData.Table[i].Quantity + "</td><td>" + jsonData.Table[i].FromUnit + "</td><td>" + jsonData.Table[i].ToUnit + "</td><td>" + jsonData.Table[i].FactorValue + "</td></tr>";

                jquery_1_11_3_min_p("#tblpopunitConversion tbody").append(markup);

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
////            var SearchDiv1 = "<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='checkAll' id='chk_" + ColumnName[j - 1] + "' onclick='checkAll(this)'><label for='check3' class='coldata'>All</label></span></div>";
////            jquery_1_11_3_min_p("#DivSearch").append(SearchDiv1);
//            jquery_1_11_3_min_p('#tblpopunitConversion thead tr th').each(function () {
//                if (j > 1) {

//                var id1='chk_'+ ColumnName[j - 2];
//                this.id=id1;
//                    var SearchDiv = "<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='searchcheckAll' id='chk_" + ColumnName[j - 2] + "' onclick='Addclasstocolumn(this)'><label for='check3' class='coldata'>" + $(this).text() + "</label></span></div>";
//                    jquery_1_11_3_min_p("#DivSearch").append(SearchDiv);

//                }
//                j++;

//            });
//            var Searchfinaldiv="<div class='dropdownBottom'><label class='pull-left' id='selectall' onclick='searchcheckAll()' >Select All</label><label class='pull-right' id='reset' onclick='searchUncheckAll()' >Reset</label></div>";
//jquery_1_11_3_min_p("#DivSearch").append(Searchfinaldiv);
//            if (jsonData.Table.length >= jsonData.Table1[0].Totalcount) {
//                jquery_1_11_3_min_p('#lblRowCount2').text(jsonData.Table1[0].Totalcount);
//                jquery_1_11_3_min_p('#lblTotalCount2').text(jsonData.Table1[0].Totalcount);
//                jquery_1_11_3_min_p('#btnLoadMore2').css('visibility', 'hidden');
//            }
//            else {
//                jquery_1_11_3_min_p('#lblRowCount2').text(jsonData.Table.length);
//                jquery_1_11_3_min_p('#lblTotalCount2').text(jsonData.Table1[0].Totalcount);
//                jquery_1_11_3_min_p('#btnLoadMore2').css('visibility', 'visible');
//            }
}


    });
}


