var counter = 0;
var CopyJson=[];
var JsonAddress=[];
var JsonAddressUpdate=[];
var IsDelete=0;
var Tablename=''; var Country = [];var entityId=1;
var Tax = [];
var Address = [];
 var jsonExistingLocdata="";
 var searchtxt='';
 var  ColumnName=[];
 var dblclickFlag=0;
 var VendorIddblclick=0;
 var AddressCounter=0;
var  TaxInfoCounter=0;
var dblclickFlag=0;
var IsFirstAddress=0;
var IsFirstTax=0;
var OldAddressCounter=0;
 

jquery_1_11_3_min_p(document).ready(function () {
 BindEntity();
BindddlCountry(entityId);
  jquery_1_11_3_min_p("#proceedDiv").show();


 jquery_1_11_3_min_p("#hdnLoad").val(10);
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
     jquery_1_11_3_min_p('#preloader').css('display', 'block');
        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
     BindVendor(searchtxt);
     jquery_1_11_3_min_p('#btnLoadMore').click(function () {
         
        LoadData = parseInt(LoadData) + 10;
        jquery_1_11_3_min_p("#hdnLoad").val(LoadData);
        jquery_1_11_3_min_p('#preloader').css('display', 'block');
        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
         BindVendor(searchtxt);
    });

     jquery_1_11_3_min_p('#btntaxGrp').click(function () {
        $("#TaxGroup").modal('show');
        BindTaxGroup();

    });
         jquery_1_11_3_min_p('#btntaxgrpclose').click(function () {
       $("#TaxGroup").modal('hide');
       
    });
     jquery_1_11_3_min_p('#btnTaxgrpSubmit').click(function () {
         SaveTaxGroup();
       
    });

  
//     jquery_1_11_3_min_p("#TaxDiv").css('display', 'block');
    //====================================== start code for add new address================================\\
    jquery_1_11_3_min_p("#btnaddAddress").click(function () {
    if(IsFirstAddress==0)
    {
   if( dblclickFlag==1)
   {
   counter= AddressCounter;
   IsFirstAddress++;
   }
   }
    if (ValidateAddress() == true )
       {
        if (counter == 0) {
            counter++;
        }
        var RowId = counter + 1;
        jquery_1_11_3_min_p(".addressDiv").append("<div class='col-md-3 mb-1' id='addressdiv_"+RowId+"' ><div class='addressBg' id='AddressDiv'><div id='btnClosr_" + RowId + "' class='closeAddress pull-right' onclick='deleteAddress(this)'><i  class='fa fa-close'></i></div><div class='AllAddress form-group'> <label class='textHeader' id='lbladdress'>Address "+RowId+"</label></div><div class='form-group'> <label for='Country'>Country</label><input type='text' id='ddlCountry_" + RowId + "' autocomplete='off'  class='form-control'/> </div> <div class='form-group'> <label for='Country'>Location Name</label><input type='text'  id='txtLocation_" + RowId + "'  onkeypress='RemoveClass(this)' autocomplete='off' placeholder='Location Name' class='form-control'/> </div> <div class='form-group'> <label for='Country'>Location Code</label> <input type='text'  id='txtLocationCode_" + RowId + "' autocomplete='off' placeholder='Location Code' class='form-control' onkeypress='RemoveClass(this)'/> </div><div id='repeatArea_" + RowId + "'></div></div> </div>");

        counter = RowId;
        BindddlCountry(entityId);
    }
});
 //====================================== end code for add new address================================\\

  //====================================== start code for  New Button click================================\\

      jquery_1_11_3_min_p("#btnNew").click(function () {
       jquery_1_11_3_min_p("#btnNew").css('display', 'none');
       VendorIddblclick=0;
      jquery_1_11_3_min_p("#btnBack").css('display', 'block');
       jquery_1_11_3_min_p("#VendorGrid").hide();
      jquery_1_11_3_min_p("#vendorForm").show();
//       $("#partnerForm").css('display', 'block');
//       $("#PartnerGrid").css('display', 'none');
        BindVendorCode();
                 });
  //====================================== end code for  New Button click================================\\

  //====================================== start code for  Back Button click================================\\
       jquery_1_11_3_min_p('#btnBack').click(function () {
         window.location.replace("Vendor.aspx");
     });
 //====================================== end code for  new Button click================================\\

//====================================== start code for  Submit Button click================================\\

      jquery_1_11_3_min_p('#btnSubmit').click(function () {
       if (ValidateTaxGrid()==true ) {
         swal({
                 title: "Do you want to Submit?",
                 text: "",
                 icon: "warning",
                 buttons: true,
                 dangerMode: true,
                 })
                 .then((willDelete) => {
                 if (willDelete) {
               SaveTaxInfo();

            }
                 });
        }
    });
//====================================== End code for  Submit Button click================================\\


      $(document).on("dblclick","#vendorgrid tbody tr",function() {
       jquery_1_11_3_min_p("#btnNew").css('display', 'none');
     jquery_1_11_3_min_p("#btntaxGrp").css('display', 'block');
      jquery_1_11_3_min_p("#btnBack").css('display', 'block');
       jquery_1_11_3_min_p("#VendorGrid").hide();
      jquery_1_11_3_min_p("#vendorForm").show();
       jquery_1_11_3_min_p('#btnSubmit').css('display', 'block');
   var row = jquery_1_11_3_min_p(this);
   $("#vendorgrid tbody tr").removeClass("selectedRow"); 
    row.addClass("selectedRow");
    VendorIddblclick= row.find('td:nth-child(1)').text().trim();
    dblclickFlag=1;
   BindVendorOndblClick(VendorIddblclick);
   
   });

//====================================== start code for  Proceed Button click================================\\

   jquery_1_11_3_min_p('#btnProceed').click(function () {
    if(ValidateForm()==true && ValidateAddress() == true)
   {
   if(dblclickFlag!=1)
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
                  MakeAddressJson();
                  SaveRecord();

             }
                 });
       }
       else{
       swal({
                 title: "Do you want to update record?",
                 text: "",
                 icon: "warning",
                 buttons: true,
                 dangerMode: true,
                 })
                 .then((willDelete) => {
                 if (willDelete) {
                  MakeAddressJsonForUpdate();
                  UpdateVendor();

             }
                 });
       
       
       }
   }
  
    });
//====================================== End code for  Proceed Button click================================\\
    
});//===========end for ready function=============

//====================================== start code for BindAddress Fields================================\\
function BindAddressFields(entityId, countryId) {

if(counter==0) {
    counter++;
}
    var FieldName = '';
    var entityId = entityId;
    var Data = [];
    var tableCount = 1;
    var countryId = countryId;
    var ColumnName = [];
    var Tables = [];
    
    jquery_1_11_3_min_p("#repeatArea_" + counter).empty();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Customer.asmx/BindPAddressFields",
        data: "{'EntityId':'" + entityId + "','CountryId':'" + countryId + "'}",
        dataType: "json",
        async:false,
        success: function (result) {

            var i = 0;
            var jsonData = result.d;
            CopyJson = jsonData;
            var a = 0;

            jQuery.each(jsonData.Table, function (rec) {
               var markup = "<div class='form-group'> <label id='lbl"+counter+"_" + i + "' for='Address'>" + jsonData.Table[i].FieldName + "</label><input type='text'  id='txt_" +   jsonData.Table[i].FieldName + counter + "' autocomplete='off'  class='form-control' onkeypress='RemoveClass(this)' placeholder=' Enter " + jsonData.Table[i].FieldName + "'/></div>";
          jquery_1_11_3_min_p("#repeatArea_" + counter).append(markup);
                if (jsonData.Table[i].FieldDataType == "2") {
                    var TableName = jsonData.Table1[a].TablesName;
                    a = a + 1;
                    var ddlId = jsonData.Table[i].FieldName + counter;
                    BindFieldsddl(TableName, ddlId);

                }
                i++;
            });

        }
    });

}
//====================================== end code for BindAddress Fields================================\\

//====================================== start code for Bind All Dropdowns  ================================\\
function BindddlCountry(entityId) {
    if (counter == 0) {
        counter++;
    }
    
    var Entity = [];
    var PGroup = [];
    var PType = [];
    var PStatus = [];

    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Customer.asmx/BindVendorDropDown",
        data: "{'entity':'"+entityId+"'}",
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

            var i = 0;
            PGroup.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table2, function (rec) {
                PGroup.push({ value: jsonData.Table2[i].Groupid, text: jsonData.Table2[i].GroupName });
                i++;
            });
            var i = 0;
            PType.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table3, function (rec) {
                PType.push({ value: jsonData.Table3[i].PartnerTypeId, text: jsonData.Table3[i].PartnerType });
                i++;
            });
            var i = 0;
          //  PStatus.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table4, function (rec) {
                PStatus.push({ value: jsonData.Table4[i].StatusId, text: jsonData.Table4[i].Status });
                i++;
            });

        },
        error: function (result) {
        }
    });


    kendo_all_min_js('#ddlCountry_' + counter).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Country,
        change: function () {
            var entityId = kendo_all_min_js('#ddlentity').val();
            var countryId = kendo_all_min_js('#ddlCountry_' + counter).val();
            kendo_all_min_js('#ddlCountry_' + counter).data("kendoDropDownList").span.css('background', 'none');
            BindAddressFields(entityId, countryId);
        }
    });

    kendo_all_min_js('#ddlVendorgroup').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: PGroup,
        change: function () {
            kendo_all_min_js('#ddlVendorgroup').data("kendoDropDownList").span.css('background', 'none');
         
        }
    });
    kendo_all_min_js('#ddlVendorType').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: PType,
        change: function () {
            kendo_all_min_js('#ddlVendorType').data("kendoDropDownList").span.css('background', 'none');

        }
    });
    kendo_all_min_js('#ddlVendorStatus').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: PStatus,
        change: function () {
            kendo_all_min_js('#ddlVendorStatus').data("kendoDropDownList").span.css('background', 'none');

        }
    });
    kendo_all_min_js('#ddlEntityCountry').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Country,
        change: function () {
            kendo_all_min_js('#ddlEntityCountry').data("kendoDropDownList").span.css('background', 'none');
        }
    });
}
//====================================== end code for Bind All Dropdowns ================================\\
//====================================== start code for Bind Fields Dropdowns  ================================\\
function BindFieldsddl(TableName, ddlId) {
    var data = [];
    var ColumnName = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Customer.asmx/BindFieldsddl",
        data: "{'TableName':'" + TableName + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
            var i = 0;
            var k = 0;
            if (jsonData.Table.length > 0) {
                var columnsIn = jsonData.Table[0]; for (var key in columnsIn) {
                    ColumnName.push(key);
                }
            }

            
            var TaxtField = ''; var concatdata = '';
            data = [];
            data.push({ value: "0", text: "Select" });
            var x = 0;
            jQuery.each(jsonData.Table, function (rec) {
                TaxtField = jsonData.Table[x][jsonData.Table1[0].COLUMN_NAME];
                for (var i = 1; i < jsonData.Table1.length - 8; i++) {


                    concatdata += jsonData.Table[x][jsonData.Table1[i].COLUMN_NAME] + '-';


                }
               var TextFields= concatdata.slice(0, -1);
                data.push({ value: TaxtField, text: TextFields });
                concatdata = '';
                x++;

            });
        },
        error: function (result) {
        }
    });


  
    kendo_all_min_js('#txt_' + ddlId).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        change: function () {
            kendo_all_min_js('#txt_' + ddlId).data("kendoDropDownList").span.css('background', 'none');
        }
    });
}

//====================================== end code for Bind Fields Dropdowns ================================\\

//====================================== start code for ValidateAddress Box ================================\\
function ValidateAddress() {
    var allow = true;
    var i = 0;
    if (kendo_all_min_js("#ddlCountry_" + counter ).val() == 0) {
        kendo_all_min_js("#ddlCountry_" + counter).data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
    }
      if (jquery_1_11_3_min_p("#txtLocation_" + counter).val() == "") {
                jquery_1_11_3_min_p("#txtLocation_" + counter).addClass('validate');
                jquery_1_11_3_min_p("#txtLocation_" + counter).attr("placeholder", "Enter Location Name!");
                allow = false;
            }
              if (jquery_1_11_3_min_p("#txtLocationCode_" +counter).val() == "") {
                jquery_1_11_3_min_p("#txtLocationCode_" +counter).addClass('validate');
                jquery_1_11_3_min_p("#txtLocationCode_" +counter).attr("placeholder", "Enter Location Code!");
                allow = false;
            }
  if (CopyJson.Table.length > 0) {
        jquery_1_11_3_min_p("#repeatArea_" + counter).find('div').each(function () {
            if (jquery_1_11_3_min_p("#txt_" + CopyJson.Table[i].FieldName + counter).val() == "") {
                jquery_1_11_3_min_p("#txt_" + CopyJson.Table[i].FieldName + counter).addClass('validate');
                jquery_1_11_3_min_p("#txt_" + CopyJson.Table[i].FieldName + counter).attr("placeholder", "Enter Field value!");
                allow = false;
            }
            if (CopyJson.Table[i].FieldDataType == "2") {
                if (kendo_all_min_js("#txt_" + CopyJson.Table[i].FieldName + counter).val() == 0) {
                    kendo_all_min_js("#txt_" + CopyJson.Table[i].FieldName + counter).data("kendoDropDownList").span.css('background', '#f9e5e5');
                    allow = false;
                }
            }
            i++;
        });
    }
    else {
        allow = false;
        swal("Entity Not Exist In This Country");
    }
    return allow;
}

//====================================== end code for ValidateAddress Box ================================\\
//====================================== start code for ValidateForm ================================\\
function ValidateForm() {
    var allow = true;
    var i = 0;
  if (kendo_all_min_js("#ddlEntityCountry").val() == 0) {
        kendo_all_min_js("#ddlEntityCountry").data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
          }
      if (kendo_all_min_js("#ddlentity" + counter ).val() == 0) {
        kendo_all_min_js("#ddlentity" + counter).data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
          }
     if (jquery_1_11_3_min_p("#txtVendorname").val() == "") {
                jquery_1_11_3_min_p("#txtVendorname").addClass('validate');
                jquery_1_11_3_min_p("#txtVendorname").attr("placeholder", "Enter Vendor Name!");
                allow = false;
            }
            if (jquery_1_11_3_min_p("#ddlVendorgroup").val() == 0) {
                jquery_1_11_3_min_p("#ddlVendorgroup").data("kendoDropDownList").span.css('background', '#f9e5e5');
                allow = false;
            }
            if (jquery_1_11_3_min_p("#ddlVendorType").val() == 0) {
                jquery_1_11_3_min_p("#ddlVendorType").data("kendoDropDownList").span.css('background', '#f9e5e5');
                allow = false;
            }
             if (jquery_1_11_3_min_p("#txtdesc").val() == "") {
                jquery_1_11_3_min_p("#txtdesc").addClass('validate');
                jquery_1_11_3_min_p("#txtdesc").attr("placeholder", "Enter Description!");
                allow = false;
            }
            if (jquery_1_11_3_min_p("#txtrepresentative").val() == "") {
                jquery_1_11_3_min_p("#txtrepresentative").addClass('validate');
                jquery_1_11_3_min_p("#txtrepresentative").attr("placeholder", "Enter Description!");
                allow = false;
            }
            if (jquery_1_11_3_min_p("#ddlVendorStatus").val() == 0) {
                jquery_1_11_3_min_p("#ddlVendorStatus").data("kendoDropDownList").span.css('background', '#f9e5e5');
                allow = false;
            }
     
        
  
    return allow;
}
//====================================== end code for ValidateForm ================================\\

//====================================== start code for Delete Address Box ================================\\
function  deleteAddress(ele) { 

var id=ele.id;
var arr=[];
arr=id.split('_');
 swal({
       title: "Do you want to delete?",
       text: "",
       icon: "warning",
        buttons: true,
        dangerMode: true,
         })
       .then((willDelete) => {
        if (willDelete) {  
         jquery_1_11_3_min_p("#addressdiv_"+arr[1]).remove();
        IsDelete++;
         
          }
                 });
}
//====================================== end code for Delete Address Box ================================\\
//====================================== start code for BindVendorCode ================================\\
function BindVendorCode() {

    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Customer.asmx/BindVendorCode",
        data: "{}",
        dataType: "json",
        success: function (result) {
            var i = 0;
           var Vcode = eval(result.d);
            jQuery.each(Vcode.Table, function (rec) {
                jquery_1_11_3_min_p('#txtVendorCode').val(Vcode.Table[i].VendorCode);
                jquery_1_11_3_min_p('#txtVendorCode').prop("disabled",true);
            });
        }
    });
}

//====================================== end code for BindVendorCode ================================\\

//====================================== start code for Remove validate Class ================================\\
function RemoveClass(data) {
    var id = data.id;
    var arr = id.split('_');
    var id = arr[1];
   
    if (jquery_1_11_3_min_p("#txtVendorname").val() != "") {
        jquery_1_11_3_min_p("#txtVendorname").removeClass('validate');
        }
     if (jquery_1_11_3_min_p("#txtdesc").val() != "") {
        jquery_1_11_3_min_p("#txtdesc").removeClass('validate');
        }
            if (jquery_1_11_3_min_p("#txtrepresentative").val() != "") {
        jquery_1_11_3_min_p("#txtrepresentative").removeClass('validate');
        }
         if (jquery_1_11_3_min_p("#txtLocation_"+counter).val() != "") {
        jquery_1_11_3_min_p("#txtLocation_"+counter).removeClass('validate');
        }
     if (jquery_1_11_3_min_p("#txtLocationCode_"+counter).val() != "") {
        jquery_1_11_3_min_p("#txtLocationCode_"+counter).removeClass('validate');
        }
         
        jquery_1_11_3_min_p("#repeatArea_" + counter).find('div').each(function () {
            if (jquery_1_11_3_min_p("#txt_" +id).val() != "") {
                jquery_1_11_3_min_p("#txt_" +id).removeClass('validate');   
            }
        });
        
}

//====================================== end code for Remove validate Class ================================\\


//====================================== start code for Create Json Of Address Data ================================\\
function MakeAddressJson() {
    
     var id=counter;
     var AddressData=[];
     JsonAddress=[];
     var tempJson="";
    if (CopyJson.Table.length > 0) {
     for(var j=1;j<=counter;j++ )
     {
       
          var  columnName1='';
         var  columnName='';
          var i = 0;
         columnName1 +='[{';
        var LocationName= jquery_1_11_3_min_p("#txtLocation_" +j).val(); 
        var LocationCode= jquery_1_11_3_min_p("#txtLocationCode_" +j).val();
        var AutiId= jquery_1_11_3_min_p("#lblAutoId_" +j).text();
        
       var LocationDescription= "";
        
          columnName1 += '" LocationCode "' + ':' + '"' + LocationCode + '"," LocationName "' + ':' + '"' + LocationName + '"," LocationDescription "' + ':' + '"' + LocationDescription + '",';
        
        jquery_1_11_3_min_p("#repeatArea_" + j).find('div :text').each(function (){
            var fieldValue =$(this).val();
            columnName=jquery_1_11_3_min_p("#lbl"+j+"_"+i).text();
            columnName1 += '"' + columnName + '"' + ':' + '"' + fieldValue + '",';
            i++;   
        });
         var newcol = columnName1.slice(0, -1);
          columnName1 = '';
          columnName1 += newcol+'}]';
          var arrkey=kendo_all_min_js("#ddlCountry_" + j ).val();
          var Countryname=kendo_all_min_js("#ddlCountry_" + j).data("kendoDropDownList").text();
          var cName=Countryname.split(' ');
           var EntityName=kendo_all_min_js("#ddlentity").data("kendoDropDownList").text();
           var EName=EntityName.split(' ');
           Tablename='tblVendor'+EName[0]+'Address'+cName[0];          
          if(arrkey!=undefined)
          {
          if(dblclickFlag!=1)
          {
         JsonAddress.push(Tablename+' '+arrkey+'&'+columnName1);
         }
         else
         {
         JsonAddress.push(Tablename+' '+arrkey+'&'+columnName1+'#'+AutiId);
         }
         }
         }
    }
}
//====================================== end code for Create Json Of Address Data ================================\\


function MakeAddressJsonForUpdate() {
    if(counter>OldAddressCounter)
    {
    
     var id=counter;
     var AddressData=[];
     JsonAddress=[];
     var tempJson="";
    if (CopyJson.Table.length > 0) {
     for(var j=OldAddressCounter+1;j<=counter;j++ )
     {
       
          var  columnName1='';
         var  columnName='';
          var i = 0;
         columnName1 +='[{';
        var LocationName= jquery_1_11_3_min_p("#txtLocation_" +j).val(); 
        var LocationCode= jquery_1_11_3_min_p("#txtLocationCode_" +j).val();
        var AutiId= jquery_1_11_3_min_p("#lblAutoId_" +j).text();
        
       var LocationDescription= "";
        
          columnName1 += '" LocationCode "' + ':' + '"' + LocationCode + '"," LocationName "' + ':' + '"' + LocationName + '"," LocationDescription "' + ':' + '"' + LocationDescription + '",';
        
        jquery_1_11_3_min_p("#repeatArea_" + j).find('div :text').each(function (){
            var fieldValue =$(this).val();
            columnName=jquery_1_11_3_min_p("#lbl"+j+"_"+i).text();
            columnName1 += '"' + columnName + '"' + ':' + '"' + fieldValue + '",';
            i++;   
        });
         var newcol = columnName1.slice(0, -1);
          columnName1 = '';
          columnName1 += newcol+'}]';
          var arrkey=kendo_all_min_js("#ddlCountry_" + j ).val();
          var Countryname=kendo_all_min_js("#ddlCountry_" + j).data("kendoDropDownList").text();
          var cName=Countryname.split(' ');
           var EntityName=kendo_all_min_js("#ddlentity").data("kendoDropDownList").text();
           var EName=EntityName.split(' ');
           Tablename='tblVendor'+EName[0]+'Address'+cName[0];          
          if(arrkey!=undefined)
          {
         JsonAddress.push(Tablename+' '+arrkey+'&'+columnName1);
         }
         }
    }
    }
   // for old address json
     counter=OldAddressCounter;
     var id=counter;
     var AddressDataUpdate=[];
     JsonAddressUpdate=[];
     var tempJsonUpdate="";
    if (CopyJson.Table.length > 0) {
     for(var j=1;j<=counter;j++ )
     {
       
          var  columnName1='';
         var  columnName='';
          var i = 0;
         columnName1 +='[{';
        var LocationName= jquery_1_11_3_min_p("#txtLocation_" +j).val(); 
        var LocationCode= jquery_1_11_3_min_p("#txtLocationCode_" +j).val();
        var AutiId= jquery_1_11_3_min_p("#lblAutoId_" +j).text();
        
       var LocationDescription= "";
        
          columnName1 += '" LocationCode "' + ':' + '"' + LocationCode + '"," LocationName "' + ':' + '"' + LocationName + '"," LocationDescription "' + ':' + '"' + LocationDescription + '",';
        
        jquery_1_11_3_min_p("#repeatArea_" + j).find('div :text').each(function (){
            var fieldValue =$(this).val();
            columnName=jquery_1_11_3_min_p("#lbl"+j+"_"+i).text();
            columnName1 += '"' + columnName + '"' + ':' + '"' + fieldValue + '",';
            i++;   
        });
         var newcol = columnName1.slice(0, -1);
          columnName1 = '';
          columnName1 += newcol+'}]';
          var arrkey=kendo_all_min_js("#ddlCountry_" + j ).val();
          var Countryname=kendo_all_min_js("#ddlCountry_" + j).data("kendoDropDownList").text();
          var cName=Countryname.split(' ');
           var EntityName=kendo_all_min_js("#ddlentity").data("kendoDropDownList").text();
           var EName=EntityName.split(' ');
           Tablename='tblVendor'+EName[0]+'Address'+cName[0];          
          if(arrkey!=undefined)
          {
          if(dblclickFlag!=1)
          {
         JsonAddressUpdate.push(Tablename+' '+arrkey+'&'+columnName1);
         }
         else
         {
         JsonAddressUpdate.push(Tablename+' '+arrkey+'&'+columnName1+'#'+AutiId);
         }
         }
         }
    }



    
}

//====================================== start code for Save Vendor Record ================================\\
function SaveRecord(){
   // var CountryId=0;
    var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text();
     var entityid=kendo_all_min_js("#ddlentity").data("kendoDropDownList").value();
     var PCode=jquery_1_11_3_min_p("#txtVendorCode").val();
     var PName=jquery_1_11_3_min_p("#txtVendorname").val();
     var PGroup=kendo_all_min_js("#ddlVendorgroup").data("kendoDropDownList").value();
     var PType=kendo_all_min_js("#ddlVendorType").data("kendoDropDownList").value();
     var PDescription=jquery_1_11_3_min_p("#txtdesc").val();
     var Status=kendo_all_min_js("#ddlVendorStatus").data("kendoDropDownList").value();
      var PRepresetative=jquery_1_11_3_min_p("#txtrepresentative").val();
      var CountryId=kendo_all_min_js("#ddlEntityCountry").data("kendoDropDownList").value();
     var a = JSON.stringify(JsonAddress);
    jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Customer.asmx/SaveVendor",
    data: "{'AddressJson':"+ a+",'PGroup':'" + PGroup + "','PType':'" + PType + "','PDescription':'" + PDescription + "','Status':'" + Status + "','CreatedBy':'" + CreatedBy + "','entityid':'" + entityid +"','PCode':'" + PCode +"','PName':'" + PName + "','PRepresetative':'" + PRepresetative + "','EntityCountryId':'" + CountryId +"'}",
    dataType: "json",
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
             if (jsonData.Table.length > 0) {
           jquery_1_11_3_min_p('#btnSubmit').css('display', 'block');
          jquery_1_11_3_min_p("#pCode").css('display', 'block');
          jquery_1_11_3_min_p("#pName").css('display', 'block');
           jquery_1_11_3_min_p("#lblVendorId").text(jsonData.Table[0].VendorId);
          jquery_1_11_3_min_p("#lblPCode").text(jsonData.Table[0].VendorCode);
          jquery_1_11_3_min_p("#lblPName").text(jsonData.Table[0].VendorName);
          jquery_1_11_3_min_p('#btnaddAddress').css('display', 'none');
          jquery_1_11_3_min_p('#btnProceed').css('display', 'none');
          jquery_1_11_3_min_p("#TaxDiv").css('display', 'block');
           counter=0;
              jquery_1_11_3_min_p('.ExistingCheck').prop('disabled', true);
          jquery_1_11_3_min_p('.checkLocation').prop('disabled', true);
           BindCountryforTax();
        }
        }
    });

}

//====================================== end code for Save Partner Record ================================\\



function UpdateVendor(){
     var VendorId=VendorIddblclick;
    var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text();
     var entityid=kendo_all_min_js("#ddlentity").data("kendoDropDownList").value();
     var PCode=jquery_1_11_3_min_p("#txtVendorCode").val();
     var PName=jquery_1_11_3_min_p("#txtVendorname").val();
     var PGroup=kendo_all_min_js("#ddlVendorgroup").data("kendoDropDownList").value();
     var PType=kendo_all_min_js("#ddlVendorType").data("kendoDropDownList").value();
     var PDescription=jquery_1_11_3_min_p("#txtdesc").val();
     var Status=kendo_all_min_js("#ddlVendorStatus").data("kendoDropDownList").value();
      var PRepresetative=jquery_1_11_3_min_p("#txtrepresentative").val();
      var CountryId=kendo_all_min_js("#ddlEntityCountry").data("kendoDropDownList").value();
     var a = JSON.stringify(JsonAddress);
     var b = JSON.stringify(JsonAddressUpdate);
    jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Customer.asmx/UpdateVendor",
    data: "{'AddressJson':"+ a+",'AddressJsonUpdate':"+ b+",'PGroup':'" + PGroup + "','PType':'" + PType + "','PDescription':'" + PDescription + "','Status':'" + Status + "','CreatedBy':'" + CreatedBy + "','entityid':'" + entityid +"','PCode':'" + PCode +"','PName':'" + PName + "','PRepresetative':'" + PRepresetative + "','EntityCountryId':'" + CountryId +"','VendorId':'" + VendorId +"'}",
    dataType: "json",
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
             if (jsonData.Table.length > 0) {
            window.location.replace("Vendor.aspx");

        }
        }
    });

}



function BindEntity() {
   
    var Entity = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Customer.asmx/BindEntity",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);

            var i = 0;
           // Entity.push({ value: "0", text: "Select" });
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
           var entity = kendo_all_min_js('#ddlentity').val();
           Country=[];
        kendo_all_min_js('#ddlCountryExsingAdd').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Country,
        change: function () {

        }});
           BindddlCountry(entity);
      

        }
    });
}

function BindCountryforTax() {
if(counter==0)
{
counter++;
}
     
    kendo_all_min_js('#ddlTaxCountry_'+counter).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Country,
        change: function () {
            kendo_all_min_js('#ddlTaxCountry_'+counter).data("kendoDropDownList").span.css('background', 'none');
           var entity = kendo_all_min_js('#ddlentity').val();
           var countryId = kendo_all_min_js('#ddlTaxCountry_' + counter).val();
           BindTaxDropDowns(entity,countryId);
        }
    });

     Tax.push({ value: "0", text: "Select" });
     kendo_all_min_js('#ddlTax_' + counter).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Tax,
        change: function () {
         
            kendo_all_min_js('#ddlTax_' + counter).data("kendoDropDownList").span.css('background', 'none');
        }
    });
     Address.push({ value: "0", text: "Select" });
     kendo_all_min_js("#ddlAddress_" + counter).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Address,
        change: function () {
         kendo_all_min_js('#ddlAddress_' + counter).data("kendoDropDownList").span.css('background', 'none');
        }
    });
   
  
   
}


function BindTaxDropDowns(entityId,CountryId) {
   if(counter==0)
     {
    counter++;
     }
      var VendorId=0;
     if(dblclickFlag==1)
     {
     VendorId=VendorIddblclick;
     }else{
     VendorId= jquery_1_11_3_min_p("#lblVendorId").text();
     }
      Tax = [];
       Address = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Customer.asmx/BindTaxDropDownsForVendor",
        data: "{'entityId':'"+entityId+"','CountryId':'"+CountryId+"','VendorId':'"+VendorId+"'}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);

            var i = 0;
            Tax.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {
                Tax.push({ value: jsonData.Table[i].TaxSetupInfoId, text: jsonData.Table[i].FieldName });
                i++;
            });
             var i = 0;
            Address.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table1, function (rec) {
                Address.push({ value: jsonData.Table1[i].AutoId, text: jsonData.Table1[i].ParterAddress });
                i++;
            });
        },
        error: function (result) {
        }
    });
    kendo_all_min_js('#ddlTax_' + counter).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Tax,
        change: function () {
         
            kendo_all_min_js('#ddlTax_' + counter).data("kendoDropDownList").span.css('background', 'none');
        }
    });
     kendo_all_min_js("#ddlAddress_" + counter).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Address,
        change: function () {
         kendo_all_min_js('#ddlAddress_' + counter).data("kendoDropDownList").span.css('background', 'none');
        }
    });
}


function SaveTaxInfo() {
var PartnerId=0;
    if(dblclickFlag==1)
    {
    PartnerId=VendorIddblclick;
    }
    else{
      PartnerId= jquery_1_11_3_min_p("#lblVendorId").text();
    }
    var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
   
    var entityid=kendo_all_min_js("#ddlentity").data("kendoDropDownList").value();
    var Status = 1;
    var tax = [];
    var TaxData = '';
    var i = 1;
    jquery_1_11_3_min_p('#tblTaxInfo tbody').find('tr').each(function () {
     var row = jquery_1_11_3_min_p(this);
    var CountryId=kendo_all_min_js("#ddlTaxCountry_" + row.find('td:nth-child(1)').text().trim()).val();
    var TaxType= jquery_1_11_3_min_p("#ddlTax_" + row.find('td:nth-child(1)').text().trim()).val();
    var Address= jquery_1_11_3_min_p("#ddlAddress_" + row.find('td:nth-child(1)').text().trim()).val();
    var TaxPercent= jquery_1_11_3_min_p("#txtamt_" + row.find('td:nth-child(1)').text().trim()).val();
     tax.push({ CountryId: CountryId, TaxType: TaxType, Address: Address,CreatedBy: CreatedBy,VendorId: PartnerId,entityid: entityid,TaxPercent: TaxPercent});
    i++;
    });
    TaxData = JSON.stringify(tax);
    jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Customer.asmx/saveTaxInfoVendor",
    data: "{'TaxData':'" + TaxData + "'}",
    dataType: "json",
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
            if(jsonData.Table[0].Response=="1")
            {
         swal("Saved Successfully","Your data Saved successfully!","success")
            .then((value) => {
             window.location.replace("Vendor.aspx");
            });
            }
           
        }
    });

}


function ValidateTaxGrid() {
    var allow = true;
    var i = 1;
    jquery_1_11_3_min_p('#tblTaxInfo tbody').find('tr').each(function () {
        var row = jquery_1_11_3_min_p(this);
        if (kendo_all_min_js("#ddlTaxCountry_" + counter).val()=="0") {
             kendo_all_min_js("#ddlTaxCountry_" +counter).data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
         if (kendo_all_min_js("#ddlTax_" + counter).val()=="0") {
             kendo_all_min_js("#ddlTax_" +counter).data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
         if (kendo_all_min_js("#ddlAddress_" + counter).val()=="0") {
             kendo_all_min_js("#ddlAddress_" +counter).data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
        if (jquery_1_11_3_min_p("#txtField_" + counter).val() == "") {
            jquery_1_11_3_min_p("#txtField_" + counter).addClass("validate");
            jquery_1_11_3_min_p("#txtField_" + counter).attr("placeholder", "Enter Field!");
            allow = false;
        }
       
        i++;
    });
    return allow;
}



// function valueChanged() {
//        if ($('.ExistingCheck').is(":checked")) {
//            $("#newLocations").show();
//            $("#proceedDiv").show();
//          jquery_1_11_3_min_p("#AppendLocations").empty();
//         kendo_all_min_js('#ddlCountryExsingAdd').data("kendoDropDownList").value(0);
//        }
//        else {
//            $("#newLocations").hide();
//            $("#proceedDiv").hide();
//              if ($('.checkLocation').is(":checked")) {
//              $("#proceedDiv").show();
//            }
//        }
//    }
    
    function ExistingLocation() {
        if ($('.checkLocation').is(":checked")){
            $("#existingAddress").show();
              $("#proceedDiv").show();
              }
        else{
            $("#existingAddress").hide();
          $("#proceedDiv").hide();
            if ($('.ExistingCheck').is(":checked")) {
              $("#proceedDiv").show();
            }
          
          }
    }


//    function BindExistingLocation(entityId,CountryId) {
//   var counter=0;
//   jquery_1_11_3_min_p("#AppendLocations").empty();
//    var Entity = entityId;
//    jquery_1_11_3_min_p.ajax({
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        url: "../WebServices/Customer.asmx/BindExistingLocation",
//        data: "{'Entity':'"+Entity+"','Country':'"+CountryId+"'}",
//        dataType: "json",
//        async: false,
//        success: function (result) {
//            jsonData = eval(result.d);
//             var i = 0;
//             var markup="";
//             jQuery.each(jsonData.Table, function (rec) {
//             var id=counter+1;
//             markup="<div class='col-md-3'><div class='form-group'><input type='checkbox'  class='Location' id='chkLoc_"+id+"' ><label id='lbloc_"+id+"' for='Self'>"+jsonData.Table[i].EntityAddress+"</label><label id='lblId_"+id+"' for='Self' style='display:none'>"+jsonData.Table[i].AutoId+"</label><label id='lblECID_"+id+"' for='Self' style='display:none'>"+jsonData.Table[i].ECID+"</label></div></div>";
//            jquery_1_11_3_min_p("#AppendLocations").append(markup);
//            counter=id;
//            i++;
//              });
//        }
//    });
//    counter=0;
//}

//function getExistingAddress()
//{
// var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
//          var jsonArray=[];
//           jsonExistingLocdata="";
//            var i=1;
//          jquery_1_11_3_min_p("#AppendLocations").find('div :checkbox').each(function (){
//            var fieldValue =$(this).val();
//           if( $(this).is(":checked"))
//           {
//           var LocationId=$("#lblId_"+i).text();
//           var ECId=$("#lblECID_"+i).text();
//           var ids=ECId.split('-');
//           var EntityId=ids[0];
//           var countryid=ids[1];
//           jsonArray.push({LocationId:LocationId,EntityId:EntityId,countryid:countryid,CreatedBy:CreatedBy})
//           }
//            i++;   
//        });
//        jsonExistingLocdata=JSON.stringify(jsonArray); 
//        
//}

//function getExistingAddressValidation()
//{  var allow =false;
//          if(kendo_all_min_js('#ddlCountryExsingAdd').data("kendoDropDownList").value()=="0")
//          {
//           allow=false;
//           kendo_all_min_js("#ddlCountryExsingAdd").data("kendoDropDownList").span.css('background', '#f9e5e5');
//          }
//          jquery_1_11_3_min_p("#AppendLocations").find('div :checkbox').each(function (){
//           if( $(this).is(":checked"))
//           {
//            allow=true;
//           }
//           if(allow==false)
//          {
//           alert("Check Value");
//          } 
//});
// return allow; 
//}


//function ValidateOnProceed()
//{
//var allow=false;
// if ($('.checkLocation').prop("checked") == true && $('.ExistingCheck').prop("checked") == false){
//          if(ValidateForm()==true && ValidateAddress() == true)
//          {
//           allow=true;
//         }
//    }
//     if ($('.checkLocation').prop("checked") == false && $('.ExistingCheck').prop("checked") == true){
//          if(ValidateForm()==true && getExistingAddressValidation() == true)
//          {
//            allow=true;
//         }
//    }
//     if ($('.checkLocation').prop("checked") == true && $('.ExistingCheck').prop("checked") == true){
//          if(ValidateForm()==true && ValidateAddress() == true && getExistingAddressValidation()==true)
//          {
//           allow=true;
//         }
//    }

//    return allow;
//}


function BindVendor(searchtxt) {
 jquery_1_11_3_min_p("#vendorgrid tbody").empty();
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
    var FieldGroup = [];

    var SearchValue = searchtxt;

    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Customer.asmx/BindVendor",
        data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue + "'}",
        dataType: "json",
        async:false,
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
            //jquery_1_11_3_min_p('#divGrid').css('display', 'block');
            var i = 0;
            var jsonData = result.d;
            editjsondata= result.d;
            var checkcount=1;
            jQuery.each(jsonData.Table, function (rec) {
                var markup = "<tr><td style='display:none'>" + jsonData.Table[i].VendorId + "</td><td><input type='checkbox' class='chk_All' id='chk_" +checkcount+"'></td><td>" + jsonData.Table[i].VendorName + "</td><td> " + jsonData.Table[i].VendorCode + "</td><td> " + jsonData.Table[i].VGroup + "</td><td> " + jsonData.Table[i].VType + "</td> </tr>";

                jquery_1_11_3_min_p("#vendorgrid tbody").append(markup);

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
            jquery_1_11_3_min_p('#vendorgrid thead tr th').each(function () {
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

function BindVendorOndblClick(PartnerId){
   dblclickFlag=1;
   var Tabs=[];
    jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Customer.asmx/BindVendorOndblClick",
    data: "{'VendorId':'" + PartnerId +"'}",
    dataType: "json",
    async:false,
    success: function (result) {
   
            var i = 0;
              var jsonData = eval(result.d);
              $.each(result.d,function (index,value){
               Tabs.push(index);
              });
      jquery_1_11_3_min_p("#btnNew").css('display', 'none');
      jquery_1_11_3_min_p("#btnBack").css('display', 'block');
       $("#partnerForm").css('display', 'block');
       $("#PartnerGrid").css('display', 'none');
          if (jsonData.Table.length > 0) {
           kendo_all_min_js('#ddlentity').data("kendoDropDownList").value(jsonData.Table[0].EntityId);
           kendo_all_min_js('#ddlEntityCountry').data("kendoDropDownList").value(jsonData.Table[0].CountryId);
           jquery_1_11_3_min_p("#txtVendorCode").val(jsonData.Table[0].VendorCode);
           jquery_1_11_3_min_p("#txtVendorCode").prop("disabled",true);
          jquery_1_11_3_min_p("#txtVendorname").val(jsonData.Table[0].VendorName);
          kendo_all_min_js('#ddlVendorgroup').data("kendoDropDownList").value(jsonData.Table[0].VendorGroup);
           kendo_all_min_js('#ddlVendorType').data("kendoDropDownList").value(jsonData.Table[0].VendorType);
          jquery_1_11_3_min_p("#txtdesc").val(jsonData.Table[0].Description);
          jquery_1_11_3_min_p("#txtrepresentative").val(jsonData.Table[0].VendorRepresentative);
          kendo_all_min_js('#ddlVendorStatus').data("kendoDropDownList").value(jsonData.Table[0].VendorStatus);
          BindEntity();
          BindddlCountry(entityId);

              }
             var TabsCount=Object.keys(jsonData).length;
              var Counterflag=0;
             for(var j=2;j<TabsCount;j++)
             {
        if (jsonData[Tabs[j]].length > 0) {
        var i=0;
        var id=1;
         jQuery.each(jsonData[Tabs[j]], function (rec) {
         if (jsonData[Tabs[j]][i].LocationFlag=="2") {
               $('.checkLocation').prop("checked",true)
               $("#existingAddress").show();
               $("#proceedDiv").show();
               Counterflag++;
               if(Counterflag==1)
               {
               kendo_all_min_js('#ddlCountry_'+Counterflag).data("kendoDropDownList").value(jsonData[Tabs[j]][i].CountryId);
               jquery_1_11_3_min_p("#txtLocation_"+Counterflag).val(jsonData[Tabs[j]][i].LocationName);
               jquery_1_11_3_min_p("#txtLocationCode_"+Counterflag).val(jsonData[Tabs[j]][i].LocationCode);
               jquery_1_11_3_min_p("#lblAutoId_"+Counterflag).text(jsonData[Tabs[j]][i].AutoId);
                var EntityId = kendo_all_min_js('#ddlentity').val();
                var CountryId = kendo_all_min_js('#ddlCountry_'+Counterflag).val();
                kendo_all_min_js('#ddlCountry_'+Counterflag).data("kendoDropDownList").readonly();
                BindAddressFields(EntityId,CountryId);
    if (CopyJson.Table.length > 0) {
    var l=0
             jquery_1_11_3_min_p("#repeatArea_" + counter).find('div').each(function () {
             jquery_1_11_3_min_p("#txt_" + CopyJson.Table[l].FieldName + Counterflag).val(jsonData[Tabs[j]][i][ CopyJson.Table[l].FieldName]);
             if (CopyJson.Table[l].FieldDataType == "2") {
           //  kendo_all_min_js("#txt_" + CopyJson.Table[i].FieldName + counter).val()
             kendo_all_min_js("#txt_" + CopyJson.Table[l].FieldName+Counterflag).data("kendoDropDownList").value(jsonData[Tabs[j]][i][ CopyJson.Table[l].FieldName]); 
            }
            l++;
        });
    }

               }
            else{
              if (counter == 0) {
                counter++;
                 }
         
            var RowId = counter + 1;
 jquery_1_11_3_min_p(".addressDiv").append(" <label id='lblAutoId_"+RowId+"' style='display:none'></label><div class='col-md-3 mb-1' id='addressdiv_"+RowId+"' ><div class='addressBg' id='AddressDiv'><div id='btnClosr_" + RowId + "' class='closeAddress pull-right' onclick='deleteAddress(this)'><i  class='fa fa-close'></i></div><div class='AllAddress form-group'> <label class='textHeader' id='lbladdress'>Address "+RowId+"</label></div><div class='form-group'> <label for='Country'>Country</label><input type='text' id='ddlCountry_" + RowId + "' autocomplete='off'  class='form-control'/> </div> <div class='form-group'> <label for='Country'>Location Name</label><input type='text'  id='txtLocation_" + RowId + "' autocomplete='off' placeholder='Location Name' class='form-control'/> </div> <div class='form-group'> <label for='Country'>Location Code</label> <input type='text'  id='txtLocationCode_" + RowId + "' autocomplete='off' placeholder='Location Code' class='form-control'/> </div><div id='repeatArea_" + RowId + "'></div></div></div>");
                 var EntityId = kendo_all_min_js('#ddlentity').val();
                  counter = RowId;
                  // flag for dblclick
                  AddressCounter=counter;
                  BindddlCountry(EntityId);
                  kendo_all_min_js('#ddlCountry_'+counter).data("kendoDropDownList").value(jsonData[Tabs[j]][i].CountryId);
                 var CountryId = kendo_all_min_js('#ddlCountry_'+counter).val();
                  kendo_all_min_js('#ddlCountry_'+counter).data("kendoDropDownList").readonly();
                BindAddressFields(EntityId,CountryId);
               jquery_1_11_3_min_p("#txtLocation_"+counter).val(jsonData[Tabs[j]][i].LocationName);
               jquery_1_11_3_min_p("#txtLocationCode_"+counter).val(jsonData[Tabs[j]][i].LocationCode);
               jquery_1_11_3_min_p("#lblAutoId_"+counter).text(jsonData[Tabs[j]][i].AutoId);
                if (CopyJson.Table.length > 0) {
    var l=0
             jquery_1_11_3_min_p("#repeatArea_" + counter).find('div').each(function () {
             jquery_1_11_3_min_p("#txt_" + CopyJson.Table[l].FieldName + counter).val(jsonData[Tabs[j]][i][ CopyJson.Table[l].FieldName]);
             if (CopyJson.Table[l].FieldDataType == "2") {
             kendo_all_min_js("#txt_" + CopyJson.Table[l].FieldName+counter).data("kendoDropDownList").value(jsonData[Tabs[j]][i][ CopyJson.Table[l].FieldName]); 
            }
            l++;
        });
    }
             
         } 
               }
//=====================code for bind existing Location==========================
//           if (jsonData[Tabs[j]][i].LocationFlag=="1") {
//            $('.ExistingCheck').prop("checked",true)
//            $("#newLocations").show();
//            $("#proceedDiv").show();
//             kendo_all_min_js('#ddlCountryExsingAdd').data("kendoDropDownList").value(jsonData[Tabs[j]][i].CountryId);
//        
//             markup="<div class='col-md-3'><div class='form-group'><input type='checkbox'  class='Location' id='chkLoc_"+id+"' ><label id='lbloc_"+id+"' for='Self'>"+jsonData[Tabs[j]][i].ParterAddress+"</label><label id='lblId_"+id+"' for='Self' style='display:none'>"+jsonData[Tabs[j]][i].Auto+"</label><label id='lblECID_"+id+"' for='Self' style='display:none'>"+jsonData[Tabs[j]][i].CountryId+"</label></div></div>";
//            jquery_1_11_3_min_p("#AppendLocations").append(markup);
//             $('#chkLoc_'+id).prop("checked",true)
//         
//            }
          i++;
            id++;
                });
               }

               }
                OldAddressCounter=counter;
                //=====================code for bind Tax Information==========================
               if(jsonData.Table1.length>0)
               {
               counter=0;
              jquery_1_11_3_min_p("#TaxDiv").css('display', 'block');
             jquery_1_11_3_min_p("#btnSubmit").css('display', 'block');
               var i=0;
               var a=1;
              jQuery.each(jsonData.Table1, function (rec) {
               a=i+a;
               if(a==1)
               {
                   BindCountryforTax();
                 var entity = kendo_all_min_js('#ddlentity').val();
                  kendo_all_min_js('#ddlTaxCountry_'+a).data("kendoDropDownList").value(jsonData.Table1[i].Countryid);
                var countryId = kendo_all_min_js('#ddlTaxCountry_' + a).val();
                BindTaxDropDowns(entity,countryId);
                kendo_all_min_js('#ddlTax_'+a).data("kendoDropDownList").value(jsonData.Table1[i].TaxTypeId);
                 kendo_all_min_js('#ddlAddress_'+a).data("kendoDropDownList").value(jsonData.Table1[i].AddressId);
                  jquery_1_11_3_min_p("#txtamt_"+a).val(jsonData.Table1[i].Fieldvalue);
                  
               }
               else{
               var markup = "<tr><td style='display:none'>"+a+"</td><td><input type='checkbox' id='cb_" + a + "' class='checkbox'/></td><td ><input type='text' id='ddlTaxCountry_" + a + "' class='fieldName' onchange=''  onkeyup='' autocomplete='off'/></td><td ><input type='text' placeholder='' class='fieldName' id='ddlTax_" + a + "' autocomplete='off' onchange='' onkeypress='' onkeyup='' /></td><td ><input type='text' id='ddlAddress_" + a + "' class='fieldName'  onkeyup='' autocomplete='off'/></td><td><input type='text' id='txtamt_" + a + "' class='fieldName' onchange=''  onkeyup='AllowNumeric(this)' autocomplete='off'/></td></tr>";
        jquery_1_11_3_min_p("#tblTaxInfo tbody").append(markup);
           counter=a;
           TaxInfoCounter=counter;
                BindCountryforTax();
             
                  kendo_all_min_js('#ddlTaxCountry_'+a).data("kendoDropDownList").value(jsonData.Table1[i].Countryid);
                 var entity = kendo_all_min_js('#ddlentity').val();
           var countryId = kendo_all_min_js('#ddlTaxCountry_' + a).val();
           BindTaxDropDowns(entity,countryId);
                kendo_all_min_js('#ddlTax_'+a).data("kendoDropDownList").value(jsonData.Table1[i].TaxTypeId);
                 kendo_all_min_js('#ddlAddress_'+a).data("kendoDropDownList").value(jsonData.Table1[i].AddressId);
                  jquery_1_11_3_min_p("#txtamt_"+a).val(jsonData.Table1[i].Fieldvalue);
                 
                  }
             i++
               });
            
               }
        }
    });
   counter=OldAddressCounter;

}

//function AllowNumeric(Data){
//            var val = Data.value;
//       var re = /^([0-9]+[\.]?[0-9]?[0-9]?[0-9]?|[0-9]+)$/g;
//       var re1 = /^([0-9]+[\.]?[0-9]?[0-9]?[0-9]?|[0-9]+)/g;
//       if(val>0)
//       {
//     if (re1.test(val)) {
//     } else {
//            val = re1.exec(val);
//            if (val) {
//                jquery_1_11_3_min_p('#' + Data.id).val(val[0]);
//            } else {
//                jquery_1_11_3_min_p('#' + Data.id).val('');
//            }
//        }
//        }
//        else
//        {
//        jquery_1_11_3_min_p('#' + Data.id).val('');
//        }
//}



function BindTaxGroup() {
    var countryid = kendo_all_min_js("#ddlEntityCountry").data("kendoDropDownList").value();
    var entityid = kendo_all_min_js("#ddlentity").data("kendoDropDownList").value();
    jquery_1_11_3_min_p("#divTaxGroup").empty();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Customer.asmx/BindTaxGroupVendor",
        data: "{'EntityId':'" + entityid + "','CountryId':'" + countryid + "','VendorId':'" + VendorIddblclick + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
            jQuery.each(jsonData.Table, function (rec) {
                var markup = "<div class='col-md-4 '><div class='taxGroup'><input type='checkbox' id='chkTaxgrp_" + jsonData.Table[i].TaxGroupId + "' ><label id='lblTaxgrp_" + jsonData.Table[i].TaxGroupId + "' class=''>" + jsonData.Table[i].TaxGroupName + "</label></div></div>";
                jquery_1_11_3_min_p("#divTaxGroup").append(markup);
                i++;
            });
            var ch = jquery_1_11_3_min_p('#' + 'divTaxGroup').find('input[type=checkbox]');
            ch.each(function () {
                var check = jquery_1_11_3_min_p(this);
                id = check.attr("id");
                var grpId = id.split("_");
                var TaxGroupId = grpId[1];
                var j = 0;
                jQuery.each(jsonData.Table1, function (rec) {
                    if (TaxGroupId == jsonData.Table1[j].TaxGroupId) {
                        $("#" + id).prop("checked", true);
                    }
                    j++;
                });
            });

        }
    });
}

function SaveTaxGroup() {
  var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
     var countryid = kendo_all_min_js("#ddlEntityCountry").data("kendoDropDownList").value();
    var entityid = kendo_all_min_js("#ddlentity").data("kendoDropDownList").value();
var TaxGrp=[];
var ch = jquery_1_11_3_min_p('#' + 'divTaxGroup').find('input[type=checkbox]');
var validateFlag=0;
ch.each(function () {
var check = jquery_1_11_3_min_p(this);
if (check.is(':checked')) {
validateFlag=1;
id=check.attr("id");
var grpId=id.split("_");
var TaxGroupId=grpId[1];
var ItemCode=$("#txtitemcode").val();
TaxGrp.push({PartnerId:VendorIddblclick,AssignGrpTypeFlag:"3",TaxGrpId:TaxGroupId,CountryId:countryid,EntityId:entityid,CreatedBy:CreatedBy})

}
});
if(validateFlag==1)
{
var TaxGrpjson=JSON.stringify(TaxGrp);

  jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Customer.asmx/SaveTaxGroupVendor",
    data: "{'TaxGrpjson':'" + TaxGrpjson + "'}",
    dataType: "json",
    async: false,
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
            $("#TaxGroup").modal('hide');
        }
    });

    }
    else{
    alert("select TaxGroup");
    }
}

function AddRow() {

if(IsFirstTax==0)
{
if(dblclickFlag==1)
{
counter=TaxInfoCounter;
IsFirstTax++;
}
}
if(counter==0)
{
counter++;
}
    if (kendo_all_min_js("#ddlTaxCountry_" + counter).val() != "0" && kendo_all_min_js("#ddlTax_" + counter).val() != "0" && kendo_all_min_js("#ddlAddress_" + counter).val() != "0" && jquery_1_11_3_min_p("#txtamt_" + counter).val() != "") {
        var rowID = counter + 1;
        var markup = "<tr><td style='display:none'>"+rowID+"</td><td><input type='checkbox' id='cb_" + rowID + "' class='checkbox'/></td><td ><input type='text' id='ddlTaxCountry_" + rowID + "' class='fieldName' onchange=''  onkeyup='' autocomplete='off'/></td><td ><input type='text' placeholder='' class='fieldName' id='ddlTax_" + rowID + "' autocomplete='off' onchange='' onkeypress='' onkeyup='' /></td><td ><input type='text' id='ddlAddress_" + rowID + "' class='fieldName'  onkeyup='' autocomplete='off'/></td><td><input type='text' id='txtamt_" + rowID + "' class='fieldName' onchange=''   autocomplete='off'/></td></tr>";
        jquery_1_11_3_min_p("#tblTaxInfo tbody").append(markup);
        counter = rowID;
        BindCountryforTax(); 

    }
    else {
        if (kendo_all_min_js("#ddlTaxCountry_" + counter).val() == "0") {
            kendo_all_min_js("#ddlTaxCountry_" + counter).data("kendoDropDownList").span.css('background', '#f9e5e5');
        }
        if (kendo_all_min_js("#ddlTax_" + counter).val() == "0") {
            kendo_all_min_js("#ddlTax_" + counter).data("kendoDropDownList").span.css('background', '#f9e5e5');
        }
         if (kendo_all_min_js("#ddlAddress_" + counter).val() == "0") {
            kendo_all_min_js("#ddlAddress_" + counter).data("kendoDropDownList").span.css('background', '#f9e5e5');
        }
        if ((jquery_1_11_3_min_p("#txtamt_" + counter).val() == "")) {
            jquery_1_11_3_min_p("#txtamt_" + counter).addClass("validate");
            jquery_1_11_3_min_p("#txtamt_" + counter).attr("placeholder", "Enter Amount!");
        }
    }
}






