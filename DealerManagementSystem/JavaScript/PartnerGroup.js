
var LoadData = '';
var searchFlag='';
var ColumnName=[];
var jsonval=[];
var Querystring='';
var searchtxt=''; var Searchcondition='';
var counter=0;
var Country=[];
var Account=[];
var dblclickflag=0;
var dblclickGroupId=0;
jquery_1_11_3_min_p(document).ready(function () {
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
    Account.push({ value: "0", text: "Select" });
      kendo_all_min_js('#ddlAccount_1').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Account,
        change: function () {
            kendo_all_min_js('#ddlAccount_1').data("kendoDropDownList").span.css('background', 'none');
        }
    });
   
  
    jquery_1_11_3_min_p("#hdnLoad").val(2);
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
   jquery_1_11_3_min_p('#preloader').css('display', 'block');
   jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
    BindPartnerGroup(searchtxt);
  
    jquery_1_11_3_min_p('#btnLoadMore').click(function () {
        LoadData = parseInt(LoadData) + 2;
        jquery_1_11_3_min_p("#hdnLoad").val(LoadData);
//        jquery_1_11_3_min_p('#preloader').css('display', 'block');
//        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
        BindPartnerGroup(searchtxt);
    });


 jquery_1_11_3_min_p('#btnDeleteLine').on("click", function (event) {
var sel = false;
var ch = jquery_1_11_3_min_p('#' + 'tblPartnergroup').find('tbody input[type=checkbox]');
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
var ch = jquery_1_11_3_min_p('#' + 'tblPartnergroup').find('tbody input[type=checkbox]');
ch.each(function () {
var $this = jquery_1_11_3_min_p(this);
if ($this.is(':checked')) {
var DeleteRow = jquery_1_11_3_min_p(this).closest('tr');
var rownum=DeleteRow.index()+1;
//var Dfieldid=DeleteRow.find('td:nth-child(5)').text().trim();
//ItemMaster.splice(rownum,1);

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

  $(document).on("dblclick","#partnersgGrouprid tbody tr",function() {
      var row = jquery_1_11_3_min_p(this);
      dblclickflag=1;
      dblclickGroupId= row.find('td:nth-child(1)').text().trim();
      var entityid= row.find('td:nth-child(2)').text().trim();
      var countryid= row.find('td:nth-child(3)').text().trim();
       var AccountId= row.find('td:nth-child(4)').text().trim();
        $("#partnerGroupForm").css('display', 'block');
        $("#PartnerGroupGrid").css('display', 'none');
        jquery_1_11_3_min_p('#btnSubmit').css('display', 'block');
        jquery_1_11_3_min_p('#btnBack').css('display', 'block');
        jquery_1_11_3_min_p('#btnNew').css('display', 'none');
        jquery_1_11_3_min_p('#searchText').val("");
        BindEntity();
         kendo_all_min_js('#ddlentity').data("kendoDropDownList").value(entityid);
          kendo_all_min_js('#ddlentity').data("kendoDropDownList").readonly();
         BindCountry(entityid)
         kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value(countryid);
          kendo_all_min_js('#ddlcountry').data("kendoDropDownList").readonly();
         $("#txtPartnerType_1").val( row.find('td:nth-child(6)').text().trim());
          $("#txtDescription_1").val( row.find('td:nth-child(7)').text().trim());
          BindAccount();
          kendo_all_min_js('#ddlAccount_1').data("kendoDropDownList").value(AccountId);
          $("#btnAdd").css("display", "none");
          $("#btnDeleteLine").css("display", "none");

   });



    // =================================== start for search===========================
    jquery_1_11_3_min_p('#searchText').keypress(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
       
         Querystring='';Searchcondition='';
         var flag="";
        $('#DivSearch input:checked').each(function()
        {
        flag=1;
        var columname1=this.id;
       var splitval=columname1.split('_');
        var colm=splitval[1];
        if(columname1 !='chk_undefined')
        {
         var len='';
         var searchvalue=jquery_1_11_3_min_p('#searchText').val().trim();
        var  searchval=searchvalue.split('*');
        
        var FirstChar=searchvalue.substring(0,1);
        var lastChar = searchvalue[searchvalue.length -1];
       
         if(FirstChar !='*' && lastChar=='*')
        {
        //start with value
       
        var dd=searchval[0];
        Querystring += colm +' like '+ "$"+ dd+'%'+"$"+ ' '+ 'or' +' ';
        }
         if(FirstChar=='*' && lastChar=='*')
        {
         //end with value
         var dd=searchval[1];
         Querystring += colm +' like '+"$"+'%'+ dd +'%'+"$"+ ' ' + ' '+ 'or' +' ';
        }
        if(FirstChar=='*' && lastChar!='*')
        {
        //between with value
        var dd=searchval[1];
       Querystring += colm +' like '+"$"+'%'+ dd +"$" + ' ' + ' '+ 'or' +' ';
      
        }
        else
        {
        // search for exact value
        var dd=searchval[0];
          Querystring += colm +'='+"$"+dd+"$"+ ' ' + ' '+ 'or' +' ';
        }
         }
        });
        if(flag==1)
        {
        var newquerystring=Querystring.substring(0,Querystring.length-3);
        searchtxt=' and '+ newquerystring.trim();
         }
       else
       {
       searchtxt='';
       }
    
    
         
        }

    });
    //===============================end for search========================================
   
  


    jquery_1_11_3_min_p('#btnNew').click(function () {
        searchFlag = 1;
          $("#partnerGroupForm").css('display', 'block');
          $("#PartnerGroupGrid").css('display', 'none');
        jquery_1_11_3_min_p('#btnSubmit').css('display', 'block');
        jquery_1_11_3_min_p('#btnBack').css('display', 'block');
        jquery_1_11_3_min_p('#btnNew').css('display', 'none');
       jquery_1_11_3_min_p('#searchText').val("");
//       kendo_all_min_js("#ddlCustType").data("kendoDropDownList").value(0);
     
       
    });

    jquery_1_11_3_min_p('#search').click(function () {

    });

    jquery_1_11_3_min_p('#btnSubmit').click(function () {
    if(ValidateGrid()==true)
    {
    if(dblclickflag==1)
    {
     swal({
                 title: "Do you want to Update?",
                 text: "",
                 icon: "warning",
                 buttons: true,
                 dangerMode: true,
                 })
                 .then((willDelete) => {
                 if (willDelete) {
                 UpdatePartnerGroup();
                  }
                 });
    }
    else{
    swal({
                 title: "Do you want to proceed?",
                 text: "",
                 icon: "warning",
                 buttons: true,
                 dangerMode: true,
                 })
                 .then((willDelete) => {
                 if (willDelete) {
                 SavePartnerGroup();
                  }
                 });
   
    }
    }
    });
   
    jquery_1_11_3_min_p('#btnBack').click(function () {
     window.location.replace("PartnerGroup.aspx"); 
    });

      jquery_1_11_3_min_p('#btnExcel').click(function () {
       var grid = $("#partnersgrid");
     
                        var rows = [{
                            cells: [
            { value: "Partner Type" },
            { value: "Partner Name" },
             { value: "Contact" }
           

          ]
                        }];
                        var row = '';
                    var ch = jquery_1_11_3_min_p('#' + 'partnersgrid').find('tbody input[type=checkbox]');
                     ch.each(function () {
            var $this = jquery_1_11_3_min_p(this);
            if ($this.is(':checked')) {
            row = jquery_1_11_3_min_p(this).closest('tr')[0];
            rows.push({
                                    cells: [
                { value: row.cells[2].innerHTML },
                { value: row.cells[3].innerHTML },
                { value: row.cells[4].innerHTML }
                

              ]
                                })
                              
            }
            });
     excelExport(rows)
    });

      jquery_1_11_3_min_p('#btnexportpdf').click(function () {

        
       var grid = $("#partnersgrid");
       
        kendo.drawing.drawDOM(grid)
        .then(function(group) {
            // Render the result as a PDF file
            return kendo.drawing.exportPDF(group, {
                paperSize: "auto",
                margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" }
            });
        })
        .done(function(data) {
            // Save the PDF file
            kendo.saveAs({
                dataURI: data,
                fileName: "Partner.pdf",
                proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
            });
             
        });
//       //document.getElementById('partnersgrid');

//                        var rows = [{
//                            cells: [
//            { value: "Partner Type" },
//            { value: "Partner Name" },
//             { value: "Contact" }
//           

//          ]
//                        }];
//                        var row = '';
//                    var ch = jquery_1_11_3_min_p('#' + 'partnersgrid').find('tbody input[type=checkbox]');
//                     ch.each(function () {
//            var $this = jquery_1_11_3_min_p(this);
//            if ($this.is(':checked')) {
//            row = jquery_1_11_3_min_p(this).closest('tr')[0];
//            rows.push({
//                                    cells: [
//                { value: row.cells[2].innerHTML },
//                { value: row.cells[3].innerHTML },
//                { value: row.cells[4].innerHTML }
//                

//              ]
//                                })
//                              
//            }
//            });
//     excelExport(rows)
    });



}); 

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
    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Book1.xlsx" });
}

function BindPartnerGroup(searchtxt) {

    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
    var Partners = [];
  
 var SearchValue=searchtxt;
 var EntityId='1';
 var CountryId='1';
 
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Customer.asmx/BindPartnerGroup",
        data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue + "','CountryId':'" + CountryId + "','EntityId':'" + EntityId + "'}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
            jquery_1_11_3_min_p('#divGrid').css('display', 'block');
            var i = 0;
            var jsonData = result.d;
            jquery_1_11_3_min_p("#partnersgGrouprid tbody").empty();
            jQuery.each(jsonData.Table, function (rec) {
            var markup = "<tr><td style='display:none'> "+jsonData.Table[i].PartnerTypeId+"</td><td style='display:none'> "+jsonData.Table[i].EntityId+"</td><td style='display:none'> "+jsonData.Table[i].CountryId+"</td><td style='display:none'> "+jsonData.Table[i].AccountId+"</td><td> <input id='chkbox' type='checkbox' class='checkboxcls' onclick='checkAll(this)' /></td><td>"+jsonData.Table[i].PartnerType+"</td> <td >"+jsonData.Table[i].Description+"</td><td >"+jsonData.Table[i].AccountName+"</td> </tr>";

            jquery_1_11_3_min_p("#partnersgGrouprid tbody").append(markup);

            //=========================== start for PDF===================================

//             var pdftable = "<tr><td>"+jsonData.Table[i].PartnerType+"</td> <td >"+jsonData.Table[i].PartnerName+"</td> <td >"+jsonData.Table[i].ContactNo+"</td></tr>";
//  jquery_1_11_3_min_p("#pdftable tbody").append(pdftable);

             //==============================end for PFD=================================
              
                i++;
            });
             var k=0;
            if (jsonData.Table.length > 0){var columnsIn = jsonData.Table[0];for(var key in columnsIn){if(k>0){ColumnName.push(key);}k++;}}else{ColumnName.push(k); k++;
             }
             var j=0;jquery_1_11_3_min_p("#DivSearch").empty();
//             var SearchDiv1="<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='chk_All' id='chk_"+ColumnName[j-1]+"' onclick='searchcheckAll(this)'><label for='check3' class='coldata'>All</label></span></div>";
//            jquery_1_11_3_min_p("#DivSearch").append(SearchDiv1);
             jquery_1_11_3_min_p('#partnersgGrouprid thead tr th').each(function() {
            if(j>0)
            {
            

            var SearchDiv="<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='searchcheckAll' id='chk_"+ColumnName[j-2]+"' ><label for='check3' class='coldata'>"+$(this).text()+"</label></span></div>";
            jquery_1_11_3_min_p("#DivSearch").append(SearchDiv);
            
            
            }
            j++;
       
});
var Searchfinaldiv="<div class='dropdownBottom'><label class='pull-left' id='selectall'>Select All</label><label class='pull-right' id='reset'>Reset</label></div>";
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

function SavePartnerGroup() {
    var EntityId=kendo_all_min_js("#ddlentity").data("kendoDropDownList").value()
    var CountryId=kendo_all_min_js("#ddlcountry").data("kendoDropDownList").value()
    var CreatedBy=jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text();
      var Fields = [];
    var JsonFields = '';
    var i = 1;
    jquery_1_11_3_min_p('#tblPartnergroup tbody').find('tr').each(function () {
    var row = jquery_1_11_3_min_p(this);
    var PartnerType=kendo_all_min_js("#txtPartnerType_" + row.find('td:nth-child(1)').text().trim()).val();
    var PartnerDescription= jquery_1_11_3_min_p("#txtDescription_" + row.find('td:nth-child(1)').text().trim()).val();
    var AccountId= kendo_all_min_js("#ddlAccount_" + row.find('td:nth-child(1)').text().trim()).val();
    
    Fields.push({ PartnerType: PartnerType, PartnerDescription: PartnerDescription, EntityId: EntityId,CountryId: CountryId,CreatedBy:CreatedBy ,AccountId:AccountId});
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
       
       jquery_1_11_3_min_p.ajax({
           type: "POST",
           contentType: "application/json; charset=utf-8",
           url: "../WebServices/Customer.asmx/SavePartnerGroup",
           data: "{'JsonFields':'" + JsonFields + "','EntityId':'" + EntityId + "','CountryId':'" + CountryId + "'}",
           dataType: "json",
           async: false,
           success: function (result) {
               var i = 0;
               var jsondata = eval(result.d);
                if (jsondata.Table[0].Response == '1') {
              swal("Saved Successfully"," Data saved successfully!","success")
            .then((value) => {
             window.location.replace("PartnerGroup.aspx");
            });
            }
             
            else
            {
             swal("updated Successfully"," Data updated successfully!","success")
            .then((value) => {
             window.location.replace("PartnerGroup.aspx");
            });
            }
           }
       });
}


function checkAll(ele) {
    debugger;
    var state = $(ele).is(':checked');
    var grid = $('#partnersgrid').data('kendoGrid');
    if (state == true) {

        $('.checkAll').prop('checked', true);
    }
    else {

        $('.checkAll').prop('checked', false);
    }
};

function searchcheckAll(ele1) {
var state1 = $(ele1).is(':checked');
if (state1 == true) {
 $('.searchcheckAll').prop('checked', true);
 }
 else {
        $('.searchcheckAll').prop('checked', false);
    }
};


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
    kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Book1.xlsx" });
}


function RemoveClass(data) {

    var id = data.id;
    var arr = id.split('_');
    var id = arr[1];
    if (jquery_1_11_3_min_p('#txtPartnerType_' + id).val() != '') {
        jquery_1_11_3_min_p("#txtPartnerType_" + id).removeClass('validate');
    }
    if (jquery_1_11_3_min_p('#txtDescription_' + id).val() != '') {
        jquery_1_11_3_min_p("#txtDescription_" + id).removeClass('validate');
    }
}

function UpdatePartnerGroup() {
    var PartnerType=kendo_all_min_js("#txtPartnerType_1").val();
    var PartnerDescription= jquery_1_11_3_min_p("#txtDescription_1").val();
    var AccountId= kendo_all_min_js("#ddlAccount_1").val();
    var userId=jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Customer.asmx/UpdatePartnerGroup",
        data: "{'PartnerType':'"+PartnerType+"','PartnerDescription':'"+PartnerDescription+"','AccountId':'"+AccountId+"','dblclickGroupId':'"+dblclickGroupId+"','userId':'"+userId+"'}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
             swal("updated Successfully"," Data updated successfully!","success")
            .then((value) => {
             window.location.replace("PartnerGroup.aspx");
            });
        },
        error: function (result) {
        }
    });


}


function BindCountry(entity) {
 Country=[];
var Entity=[];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Customer.asmx/BindCountry",
        data: "{'entity':'"+entity+"'}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);

           
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
              BindAccount();
        }
    });

}

function BindAccount() {
if(counter==0)
{counter++;}
var EntityId=kendo_all_min_js("#ddlentity").val() ;
var CountryId=kendo_all_min_js("#ddlcountry").val() ;
 Account=[];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Customer.asmx/BindAccount",
        data: "{'EntityId':'"+EntityId+"','CountryId':'"+CountryId+"'}",
        dataType: "json",
        async: false,
        success: function (result) {
           var jsonData = eval(result.d);

           
            var i = 0;
           Account.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {
                Account.push({ value: jsonData.Table[i].AccountId, text: jsonData.Table[i].Accountname });
                i++;
            });
       
        },
        error: function (result) {
        }
    });
  

    kendo_all_min_js('#ddlAccount_'+counter).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Account,
        change: function () {
            kendo_all_min_js('#ddlAccount_'+counter).data("kendoDropDownList").span.css('background', 'none');
        }
    });

}


function BindEntity() {
var Country=[];
var Entity=[];
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
          var entity=   kendo_all_min_js('#ddlentity').val();
            BindCountry(entity)
            BindAccount();
        }
    });

}


function AddRow() {
    if (counter == 0) {
        counter++;
    }
    if ((jquery_1_11_3_min_p("#txtPartnerType_" + counter).val() != "") && (jquery_1_11_3_min_p("#txtDescription_" + counter).val() != "")) {
        var rowID = counter + 1;
        var markup = "<tr><td style='display:none'>" + rowID + "</td><td><input type='checkbox' class='chk_All' id='chk_" + rowID + "'></td><td ><input type='text' class='' id='txtPartnerType_" + rowID + "' onkeypress='' onkeyup='RemoveClass(this)' autocomplete='off' placeholder='Enter Parner Type' /></td><td ><input type='text' class='' id='txtDescription_" + rowID + "' onkeypress='' onkeyup='RemoveClass(this)' autocomplete='off' placeholder='Enter Description' /></td> <td > <input type='text' id='ddlAccount_"+rowID+"' placeholder=''   class='fieldName'  autocomplete='off'/> </td></tr>";
        jquery_1_11_3_min_p("#tblPartnergroup tbody").append(markup);
          jquery_1_11_3_min_p("#txtFieldName_" + rowID).focus();
        counter = rowID;
        jquery_1_11_3_min_p("#txtPartnerType_" + parseInt(counter - 1)).attr('disabled', 'disabled');
        jquery_1_11_3_min_p("#txtDescription_" + parseInt(counter - 1)).attr('disabled', 'disabled');
        kendo_all_min_js("#ddlAccount_" + parseInt(counter - 1)).data("kendoDropDownList").readonly();
        BindAccount();
        
       
    }
    else {



        if (jquery_1_11_3_min_p("#txtPartnerType_" + counter).val() == "") {
            jquery_1_11_3_min_p("#txtPartnerType_" + counter).addClass("validate");
            jquery_1_11_3_min_p("#txtPartnerType_" + counter).attr("placeholder", "Enter PartnerType!");

        }
        if (jquery_1_11_3_min_p("#txtDescription_" + counter).val() == "") {
            jquery_1_11_3_min_p("#txtDescription_" + counter).addClass("validate");
            jquery_1_11_3_min_p("#txtDescription_" + counter).attr("placeholder", "Enter Description!");

        }
    }
}

function ValidateGrid() {
    var allow = true;
    var i = 1;
     if (kendo_all_min_js("#ddlentity").val() == 0) {
            kendo_all_min_js("#ddlentity").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
         
    jquery_1_11_3_min_p('#tblPartnergroup tbody').find('tr').each(function () {
        var row = jquery_1_11_3_min_p(this);
        if (jquery_1_11_3_min_p("#txtPartnerType_" + row.find('td:nth-child(1)').text().trim()).val() == "") {
            jquery_1_11_3_min_p("#txtPartnerType_" + row.find('td:nth-child(1)').text().trim()).addClass('validate');
            jquery_1_11_3_min_p("#txtPartnerType_" + row.find('td:nth-child(1)').text().trim()).attr("placeholder", "Enter PartnerType!");
            allow = false;
        }
         if (jquery_1_11_3_min_p("#txtDescription_" + row.find('td:nth-child(1)').text().trim()).val() == "") {
            jquery_1_11_3_min_p("#txtDescription_" + row.find('td:nth-child(1)').text().trim()).addClass('validate');
            jquery_1_11_3_min_p("#txtDescription_" + row.find('td:nth-child(1)').text().trim()).attr("placeholder", "Enter Field Name!");
            allow = false;
        }
       

        i++;
    });
    return allow;
}



