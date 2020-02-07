var LoadData = ''; var Parameter = []; var Country = []; Entity = [];var searchtxt = '';var ColumnName=[];
jquery_1_11_3_min_p(document).ready(function () {

    jquery_1_11_3_min_p("#hdnLoad").val(10);
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
     BindOrgDataSetupGrid(searchtxt);
    BindEntity();
    Parameter = [];
    Parameter.push({ value: "0", text: "Select" });
    kendo_all_min_js('#ddlOrgPara').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Parameter,
        change: function () {
            kendo_all_min_js('#ddlOrgPara').data("kendoDropDownList").span.css('background', 'none');
        }
    });

    $(document).on("dblclick","#ParameterSetupTable tbody tr",function() {
   var row = jquery_1_11_3_min_p(this);
   var SetupId= row.find('td:nth-child(1)').text().trim();
    $("#SystemParameterSetupForm").css('display', 'block');
        $("#SystemParameterSetupGrid").css('display', 'none');
        jquery_1_11_3_min_p('#btnSubmit').css('display', 'none');
        //jquery_1_11_3_min_p('#btnSubmit').prop('disabled', true);
        jquery_1_11_3_min_p('#btnback').css('display', 'block');
        jquery_1_11_3_min_p('#btnnew').css('display', 'none');
       BindDataOndblClick(SetupId);

});


    jquery_1_11_3_min_p('#btnnew').click(function () {
        $("#SystemParameterSetupForm").css('display', 'block');
        $("#SystemParameterSetupGrid").css('display', 'none');
        jquery_1_11_3_min_p('#btnSubmit').css('display', 'none');
        //jquery_1_11_3_min_p('#btnSubmit').prop('disabled', true);
        jquery_1_11_3_min_p('#btnback').css('display', 'block');
        jquery_1_11_3_min_p('#btnnew').css('display', 'none');

    });

    jquery_1_11_3_min_p("#btnback").click(function () {
        window.location.replace("PartnerDataSetup.aspx");
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
                 SaveLocation();
               

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
            Parameter = [];
            Parameter.push({ value: "0", text: "Select" });
            kendo_all_min_js('#ddlOrgPara').kendoDropDownList({
                filter: "contains",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: Parameter,
                change: function () {
                    kendo_all_min_js('#ddlOrgPara').data("kendoDropDownList").span.css('background', 'none');
                }
            });
           
            BindOrgParaddl(CountryId, EntityId)
        }
    });

    kendo_all_min_js('#ddlentity').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Entity,
        change: function () {
            kendo_all_min_js('#ddlentity').data("kendoDropDownList").span.css('background', 'none');
            Parameter = [];
            Parameter.push({ value: "0", text: "Select" });
            kendo_all_min_js('#ddlOrgPara').kendoDropDownList({
                filter: "contains",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: Parameter,
                change: function () {
                    kendo_all_min_js('#ddlOrgPara').data("kendoDropDownList").span.css('background', 'none');
                }
            });
            var EntityId = kendo_all_min_js('#ddlentity').val();
            var CountryId = kendo_all_min_js('#ddlcountry').val();
            BindOrgParaddl(CountryId, EntityId)
        }
    });
}


function BindOrgParaddl(CountryId, EntityId) {
    var Countryname = kendo_all_min_js("#ddlcountry").data("kendoDropDownList").text();
    var cName = Countryname.split(' ');
    var EntityName = kendo_all_min_js("#ddlentity").data("kendoDropDownList").text();
    var EName = EntityName.split(' ');
    var Tabname = 'tbl' + EName[0] + 'Location' + cName[0];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/BindParaParaddl",
        data: "{'CountryId':'" + CountryId + "','EntityId':'" + EntityId + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
            Parameter = [];
            var i = 0;
            Parameter.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {
                Parameter.push({ value: jsonData.Table[i].fieldId, text: jsonData.Table[i].FieldName });
                i++;
            });

        },
        error: function (result) {
        }
    });

    kendo_all_min_js('#ddlOrgPara').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Parameter,
        change: function () {
          kendo_all_min_js('#ddlOrgPara').data("kendoDropDownList").span.css('background', 'none');
        }
    });
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
    if (kendo_all_min_js("#ddlOrgPara").val() == 0) {
        kendo_all_min_js("#ddlOrgPara").data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
    }
    if( jquery_1_11_3_min_p('#chkselfmanaged').is(':checked') || jquery_1_11_3_min_p('#chkentitymanaged').is(':checked'))
    {
    
    }
    else
    {
     jquery_1_11_3_min_p('#chkselfmanaged').addClass("validate");
     jquery_1_11_3_min_p('#chkentitymanaged').addClass("validate")
     allow = false;
     swal("Please select parameter type");
    }

    return allow;
}


function RemoveVaidation()
{
 if( jquery_1_11_3_min_p('#chkselfmanaged').is(':checked') || jquery_1_11_3_min_p('#chkentitymanaged').is(':checked'))
    {
     jquery_1_11_3_min_p('#chkselfmanaged').removeClass('validate');
     jquery_1_11_3_min_p('#chkentitymanaged').addClass("validate")
     
    }
}

function SaveLocation(){
var jsonfield=[];var Jsonfdata=''; var selfmanage=0;var entitymanage=0;
    if(jquery_1_11_3_min_p('#chkselfmanaged').is(':checked'))
    {
    selfmanage=1;
    }
    if(jquery_1_11_3_min_p('#chkentitymanaged').is(':checked'))
    {
    entitymanage=2;
    }
     jsonfield.push({CountryId: kendo_all_min_js("#ddlcountry").val(),EntityId: kendo_all_min_js("#ddlentity").val(),CreatedBy: jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim(),Locationid: kendo_all_min_js("#ddlOrgPara").val(),SelfManage: selfmanage,EntityManage: entitymanage});
           
     Jsonfdata = JSON.stringify(jsonfield);
     
    jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Setup.asmx/SaveParaLocation",
    data: "{'Jsondata':'"+ Jsonfdata+"'}",
    dataType: "json",
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
            if(jsonData.Table[0].Response==1)
            {
             swal("Saved Successfully","Data Saved successfully!","success")
            .then((value) => {
             window.location.replace("PartnerDataSetup.aspx");
            });
            }
        }
    });

}


function BindOrgDataSetupGrid(searchtxt) {
 jquery_1_11_3_min_p("#ParameterSetupTable tbody").empty();
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
    var Partners = [];

    var SearchValue = searchtxt;

    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/BindParaDataSetupGrid",
        data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue + "'}",
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

                var markup = "<tr> <td style='display:none'> " + jsonData.Table[i].FieldId + "</td> <td style='display:none'> " + jsonData.Table[i].EntityId + "</td> <td style='display:none'> " + jsonData.Table[i].CountryId + "</td> <td> <input id='chkbox' type='checkbox' class='checkAll'  /></td><td>" + jsonData.Table[i].Entityname + "</td> <td >" + jsonData.Table[i].CountryName + "</td> <td >" + jsonData.Table[i].FieldName + "</td></tr>";

                jquery_1_11_3_min_p("#ParameterSetupTable tbody").append(markup);

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
            jquery_1_11_3_min_p('#ParameterSetupTable thead tr th').each(function () {
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


function BindDataOndblClick(FieldId) {
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/BindParaOndblClick",
        data: "{'FieldId':'" + FieldId + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
           var jsonData = eval(result.d);
            var i = 0;
            jQuery.each(jsonData.Table, function (rec) {
               
                  kendo_all_min_js('#ddlentity').data("kendoDropDownList").value(jsonData.Table[i].EntityId);
                  kendo_all_min_js('#ddlentity').data("kendoDropDownList").readonly();
             kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value(jsonData.Table[i].CountryId);
               kendo_all_min_js('#ddlcountry').data("kendoDropDownList").readonly();
             BindOrgParaddl(kendo_all_min_js('#ddlcountry').val(), kendo_all_min_js('#ddlentity').val());
             kendo_all_min_js('#ddlOrgPara').data("kendoDropDownList").value(jsonData.Table[i].PartnerLocation);
              kendo_all_min_js('#ddlOrgPara').data("kendoDropDownList").readonly();
             if(jsonData.Table[i].SelfManaged=="1")
             {
             $("#chkselfmanaged").prop('checked', true);
             }
             if(jsonData.Table[i].EntityManaged=="2")
             {
             $("#chkentitymanaged").prop('checked', true);
             }

                i++;
            });

        },
        error: function (result) {
        }
    });
}
