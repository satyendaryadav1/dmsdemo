var Fileds = []; var jsonData = ''; var Parentfiled = []; var ParentMfiled = []; var counter = 0; var Country = []; var Entity = []; var FieldParentItems = [];
var JsonFieldParentItems = '';
var Isexistfieldid=0;var LoadData = '';
var searchFlag = '';
var searchtxt = ''
var ColumnName = [];
var FieldId=""; var counter1=0;
jquery_1_11_3_min_p(document).ready(function () {
 jquery_1_11_3_min_p("#hdnLoad").val(10);
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    
    jquery_1_11_3_min_p('#preloader').css('display', 'block');
    jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
    BindFieldSetupGrid(searchtxt);

      jquery_1_11_3_min_p('#btnLoadMore').click(function () {
        LoadData = parseInt(LoadData) + 2;
        jquery_1_11_3_min_p("#hdnLoad").val(LoadData);
        jquery_1_11_3_min_p('#preloader').css('display', 'block');
        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
        BindFieldSetupGrid(searchtxt);
    });
       //====================================start Loaddata dropdown OnChange============================
    jquery_1_11_3_min_p("#ddlLoadMore").change(function(){

        LoadData = parseInt(jquery_1_11_3_min_p("#ddlLoadMore").val());
        jquery_1_11_3_min_p("#hdnLoad").val(LoadData);
        jquery_1_11_3_min_p('#preloader').css('display', 'block');
        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
        BindFieldSetupGrid(searchtxt);
});
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

    //====================================end Loaddata dropdown OnChange============================


$(document).on("dblclick","#tblFieldSetupGrid tbody tr",function() {
   var row = jquery_1_11_3_min_p(this);
   var SetupId= row.find('td:nth-child(1)').text().trim();
    counter = 0;
        Fileds = [];
        Fileds.push({ value: "0", text: "Select" });
        kendo_all_min_js("#ddlfields").kendoDropDownList({
            filter: "contains",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: Fileds
        });
        Parentfiled = [];
        Parentfiled.push({ value: "0", text: "Select" });
//        BindAllFields();
jquery_1_11_3_min_p('#btnDeleteLine').css('display', 'none');
jquery_1_11_3_min_p('#btnAdd').css('display', 'none');
jquery_1_11_3_min_p('#btndesable').css('display', 'inline-block');
jquery_1_11_3_min_p('#btnSubmit').css('display', 'none');
       BindFieldOnRowDoubleClick(SetupId);
    
});





       jquery_1_11_3_min_p('#btnExport').click(function () {
       var grid = $("#tblFieldSetupGrid");
       //document.getElementById('partnersgrid');

                        var rows = [{
                            cells: [
            { value: "Field Name" },
            { value: "Priority " },
             { value: "Parent " }
           

          ]
                        }];
                        var row = '';
                    var ch = jquery_1_11_3_min_p('#' + 'tblFieldSetupGrid').find('tbody input[type=checkbox]');
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


       jquery_1_11_3_min_p('#dblbtnExport').click(function () {
       var grid = $("#tblfields");
       //document.getElementById('partnersgrid');

                        var rows = [{
                            cells: [
            { value: "Field Name" },
            { value: "Priority " },
             { value: "Parent " }
           

          ]
                        }];
                        var row = '';
                    var ch = jquery_1_11_3_min_p('#' + 'tblfields').find('tbody input[type=checkbox]');
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
        if(colm=="Entityname")
        {
          colm= "Tab.Entityname"
        }
        if(colm=="CountryName")
        {
          colm= "Tab.CountryName"
        }
        if(colm=="CountColumn")
        {
          colm= "Tab.CountColumn"
        }
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
        searchtxt=newquerystring.trim();
         }
       else
       {
       searchtxt='';
       }
    
        BindFieldSetupGrid(searchtxt);
         
        }

    });
    //===============================end for search========================================

    jquery_1_11_3_min_p('#btnnew').click(function () {
        jquery_1_11_3_min_p('#SetUpGrid').css('display', 'none');
        jquery_1_11_3_min_p('#NewSetup').css('display', 'block');
        jquery_1_11_3_min_p('#btnSubmit').css('display', 'block');
        jquery_1_11_3_min_p('#btnback').css('display', 'block');
        jquery_1_11_3_min_p('#btnnew').css('display', 'none');

//        jquery_1_11_3_min_p("#tblfields tbody").empty();

//        var entity  =  jquery_1_11_3_min_p('#ddlentity').data("kendoDropDownList");
//           entity.readonly(false);
// var country  =  jquery_1_11_3_min_p('#ddlcountry').data("kendoDropDownList");
//           country.readonly(false);
//jquery_1_11_3_min_p('#btnDeleteLine').css('display', 'inline-block');
        counter = 0;
       
        Fileds = [];
        Fileds.push({ value: "0", text: "Select" });
        kendo_all_min_js("#ddlfields").kendoDropDownList({
            filter: "contains",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: Fileds
        });
        Parentfiled = [];
        Parentfiled.push({ value: "0", text: "Select" });
//        kendo_all_min_js("#ddlfieldstype").kendoDropDownList({
//            filter: "contains",
//            dataTextField: "text",
//            dataValueField: "value",
//            dataSource: Parentfiled
//        });

        BindAllFields();
    });
    jquery_1_11_3_min_p('#btnback').click(function () {
//        jquery_1_11_3_min_p('#SetUpGrid').css('display', 'block');
//        jquery_1_11_3_min_p('#NewSetup').css('display', 'none');
//        jquery_1_11_3_min_p('#btnSubmit').css('display', 'none');
//        jquery_1_11_3_min_p('#btnback').css('display', 'none');
//        jquery_1_11_3_min_p('#btnnew').css('display', 'block');
        window.location.replace("AddressFieldSetup.aspx");
//         jquery_1_11_3_min_p('#preloader').css('display', 'block');
//        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
    BindFieldSetupGrid(searchtxt);


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
Parentfiled.splice(rownum,1);
ParentMfiled.splice(rownum,1);
sel = true; 
DeleteRow.remove();
//counter=counter-1;
//if(counter >1)
//{
// var kendoid="ddlfields_" + parseInt(counter-1)
//var dataSource  =  jquery_1_11_3_min_p('#'+kendoid).data("kendoDropDownList");
//     dataSource.readonly(false);
//            jquery_1_11_3_min_p("#txtpriorityorder_" + parseInt(counter-1)).attr("disabled", false); 
//            }
}
});

swal("Deleted Successfully","Your data deleted successfully!","success")
            .then((value) => {
          
BindDropdown();

            });



}
});
}
});



});

function NumericAllow(data) {
    var value = data.id;
    jquery_1_11_3_min_p('#' + value).keypress(function (e) {
    
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            jquery_1_11_3_min_p("#" + value).val('');
            return false;

        }
    });
}
function AddRow() {
    if (kendo_all_min_js("#ddlfields_" + counter).val() != "0" && ((jquery_1_11_3_min_p("#txtpriorityorder_" + counter).val() != "") || (jquery_1_11_3_min_p("#txtpriorityorder_" + counter).val() != 0))) {
        var rowID = counter + 1;
        var markup = "<tr><td style='display:table-cell'><input type='checkbox' id='cb_" + rowID + "' class='checkbox'/></td><td ><input type='text' id='ddlfields_" + rowID + "' class='form-control' onchange='FieldChange(this)'  onkeyup='RemoveClassItemMaster(this)' autocomplete='off'/></td><td ><input type='text' placeholder='Enter Priority Order' class='fieldName' id='txtpriorityorder_" + rowID + "' autocomplete='off' onchange='RemoveClassItemMaster(this)' onkeypress='NumericAllow(this)' onkeyup='Comparevalue(this)' /></td><td ><input type='text' id='ddlfieldstype_" + rowID + "' class='form-control'  onkeyup='RemoveClassItemMaster(this)' autocomplete='off'/></td><td  style='display:none'>" + rowID + "</td></tr>";
        jquery_1_11_3_min_p("#tblfields tbody").append(markup);

        kendo_all_min_js("#ddlfields_" + rowID).focus();
        counter = rowID;
       
         jquery_1_11_3_min_p('#hideselect_all').css('display', 'table-cell');
                  jquery_1_11_3_min_p('#chktd').css('display', 'table-cell');
                    var kendoid="ddlfields_" + parseInt(counter-1);
            var dataSource  =  jquery_1_11_3_min_p('#'+kendoid).data("kendoDropDownList");
            dataSource.readonly();
            jquery_1_11_3_min_p("#txtpriorityorder_" + parseInt(counter-1)).attr('disabled', 'disabled');

            Parentfiled.push({ value: jquery_1_11_3_min_p('#'+kendoid).data("kendoDropDownList").value(), text: jquery_1_11_3_min_p('#'+kendoid).data("kendoDropDownList").text()});
             BindDropdown();
    }
    else {
        if (kendo_all_min_js("#ddlfields_" + counter).val() == "0") {
            kendo_all_min_js("#ddlfields_" + counter).data("kendoDropDownList").span.css('background', '#f9e5e5');
        }
        if ((jquery_1_11_3_min_p("#txtpriorityorder_" + counter).val() == "") || (jquery_1_11_3_min_p("#txtpriorityorder_" + counter).val() == 0)) {
            jquery_1_11_3_min_p("#txtpriorityorder_" + counter).addClass("validate");
            jquery_1_11_3_min_p("#txtpriorityorder_" + counter).attr("placeholder", "Enter Field Order!");
        }
    }
}

function FieldAssigned()
{
var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
var countryid=kendo_all_min_js("#ddlcountry").data("kendoDropDownList").value();
var entityid=kendo_all_min_js("#ddlentity").data("kendoDropDownList").value();
  
  var FieldItems = [];
    var JsonFieldItems = '';
    var i = 1;
    jquery_1_11_3_min_p('#tblfields tbody').find('tr').each(function () {
    var row = jquery_1_11_3_min_p(this);
    var fieldid=kendo_all_min_js("#ddlfields_" + row.find('td:nth-child(5)').text().trim()).val().trim();
    var parentid=kendo_all_min_js("#ddlfieldstype_" + row.find('td:nth-child(5)').text().trim()).val().trim();
    FieldItems.push({ fieldid: fieldid,priorityoreder: jquery_1_11_3_min_p("#txtpriorityorder_" + row.find('td:nth-child(5)').text().trim()).val().trim(),parentid: parentid
    });



    i++;
    });
    JsonFieldItems = JSON.stringify(FieldItems);



     jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Setup.asmx/SaveFieldAssigned",
    data: "{'JsonFieldItems':'" + JsonFieldItems + "','countryid':'" + countryid + "','entityid':'" + entityid + "','CreatedBy':'" + CreatedBy + "'}",
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
             window.location.replace("AddressFieldSetup.aspx");
            });
        }
        }
    });
}

function FieldChange(Dis) {
 Isexistfieldid=0;
  var ddlId = Dis.id;
  var fieldid=jquery_1_11_3_min_p('#'+ddlId).data("kendoDropDownList").text().trim();
 var table = document.getElementById('tblfields');
  var rowlength = jquery_1_11_3_min_p("#tblfields tr").not("thead tr").length;
  var i;
  for (i = 1; i < parseInt(rowlength); i++) {
  var existfieldid = jquery_1_11_3_min_p(table.rows[i].cells[1]).text().trim();
  var newfieldidd = fieldid + "select";
   if(existfieldid==newfieldidd)
   {
   Isexistfieldid=1;
   }
   
  }
  if(Isexistfieldid==1)
  {
   swal("Field already selected","Please choose another Field!","info")
              .then((value) => {
              kendo_all_min_js("#" + Dis.id).data("kendoDropDownList").value(0);
            
                });
  }
 

}



function ValidateFieldMasterGrid() {
    var allow = true;
    var i = 1;
     if (kendo_all_min_js("#ddlentity").data("kendoDropDownList").value() == 0) {
            kendo_all_min_js("#ddlentity").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
    jquery_1_11_3_min_p('#tblfields tbody').find('tr').each(function () {
        var row = jquery_1_11_3_min_p(this);
        if ((jquery_1_11_3_min_p("#txtpriorityorder_" + row.find('td:nth-child(5)').text().trim()).val().trim() == "") || (jquery_1_11_3_min_p("#txtpriorityorder_" + row.find('td:nth-child(5)').text().trim()).val().trim() == 0)) {
            jquery_1_11_3_min_p("#txtpriorityorder_" + row.find('td:nth-child(5)').text().trim()).addClass('validate');
            jquery_1_11_3_min_p("#txtpriorityorder_" + row.find('td:nth-child(5)').text().trim()).attr("placeholder", "Enter Field order!");
            allow = false;
        }
        if (kendo_all_min_js("#ddlfields_" + row.find('td:nth-child(5)').text().trim()).data("kendoDropDownList").value() == 0) {
            kendo_all_min_js("#ddlfields_" + row.find('td:nth-child(5)').text().trim()).data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
//        if (kendo_all_min_js("#ddlfieldstype_" + row.find('td:nth-child(5)').text().trim()).data("kendoDropDownList").value() == 0) {
//            kendo_all_min_js("#ddlfieldstype_" + row.find('td:nth-child(5)').text().trim()).data("kendoDropDownList").span.css('background', '#f9e5e5');
//            allow = false;
//        }
        i++;
    });
    return allow;
}

function BindAllFields() {
    Fileds = []; 
    counter++;
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/BindFieldDetails",
        //        data: "{'jsonItem':'" + jsonItem + "','UpdatedBy':'" + UpdatedBy + "'}",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);

            var i = 0;
            Fileds = []; Fileds.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {
                Fileds.push({ value: jsonData.Table[i].FieldId, text: jsonData.Table[i].FieldName });
                i++;
            });
//            Parentfiled = [];
//            var i = 0;
//            Parentfiled.push({ value: "0", text: "Select" });
//            jQuery.each(jsonData.Table, function (rec) {
//                Parentfiled.push({ value: jsonData.Table[i].FieldId, text: jsonData.Table[i].FieldName });
//                i++;
//            });
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

    kendo_all_min_js('#ddlfields_' + counter.toString()).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Fileds,
        change: function () {
            kendo_all_min_js("#ddlfields_" + counter.toString()).data("kendoDropDownList").span.css('background', 'none');
        }
    });
    var kendoid="ddlfields_" + counter.toString();
    
    var dataSource  =  jquery_1_11_3_min_p('#'+kendoid).data("kendoDropDownList");
   dataSource.readonly();
    kendo_all_min_js('#ddlfieldstype_' + counter.toString()).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Parentfiled,
        change: function () {
           // kendo_all_min_js("#ddlfieldstype_" + counter.toString()).data("kendoDropDownList").span.css('background', 'none');
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
             var kendoid="ddlfields_" + counter.toString();
    var dataSource  =  jquery_1_11_3_min_p('#'+kendoid).data("kendoDropDownList");
   dataSource.readonly(false);
            var entityidval=kendo_all_min_js('#ddlentity').val();
            var countryidval= kendo_all_min_js('#ddlcountry').val();
            var i=0;
            Fileds = []; Fileds.push({ value: "0", text: "Select" });
             jQuery.each(jsonData.Table, function (rec) {
                if(jsonData.Table[i].EntityId==entityidval && jsonData.Table[i].CountryId==countryidval)
                {
                Fileds.push({ value: jsonData.Table[i].FieldId, text: jsonData.Table[i].FieldName });
                }
                i++;
            });
            counter=1;
         kendo_all_min_js('#ddlfields_' + counter.toString()).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Fileds,
        change: function () {
            kendo_all_min_js("#ddlfields_" + counter.toString()).data("kendoDropDownList").span.css('background', 'none');
             
        }
    });

        }
    });
}


function EditBindDropdown(counter,fieldvalue,fieldprioriry,Fieldparent)
{
 kendo_all_min_js('#ddlfields_' + counter.toString()).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Fileds,
        change: function () {
          //  kendo_all_min_js("#ddlfields_" + counter.toString()).data("kendoDropDownList").span.css('background', 'none');
        }
    });

    kendo_all_min_js('#ddlfields_' + counter.toString()).data("kendoDropDownList").value(fieldvalue);
    var id="txtpriorityorder_"+counter;
    jquery_1_11_3_min_p('#'+id).val(fieldprioriry);


     kendo_all_min_js('#ddlfieldstype_' + counter.toString()).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Fileds,
        change: function () {
          //  kendo_all_min_js("#ddlfields_" + counter.toString()).data("kendoDropDownList").span.css('background', 'none');
        }
    });
    kendo_all_min_js('#ddlfieldstype_' + counter.toString()).data("kendoDropDownList").value(Fieldparent);


            var fieldid="ddlfields_" + parseInt(counter);
            var fieldtype="ddlfieldstype_" + parseInt(counter);
            var dataSource  =  jquery_1_11_3_min_p('#'+fieldid).data("kendoDropDownList");
            dataSource.readonly();
            jquery_1_11_3_min_p("#txtpriorityorder_" + parseInt(counter)).attr('disabled', 'disabled');
            var dataSource1  =  jquery_1_11_3_min_p('#'+fieldtype).data("kendoDropDownList");
            dataSource1.readonly();
          //  counter=counter;
          
    }

function BindDropdown()
{
 kendo_all_min_js('#ddlfields_' + counter.toString()).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Fileds,
        change: function () {
            kendo_all_min_js("#ddlfields_" + counter.toString()).data("kendoDropDownList").span.css('background', 'none');
        }
    });
   ParentMfiled=[];
   if(counter>2)
   {
    for(var x=1;x<=counter;x++)
     {
     ParentMfiled=[];
      ParentMfiled.push({ value: "0", text: "Select" });
     var fieldid= kendo_all_min_js("#ddlfields_" + x).val();
     for(var i=1;i<Parentfiled.length;i++)
     {
     var Pfieldvalue=Parentfiled[i].value;
     var Pfieldtext=Parentfiled[i].text;
      if(fieldid !=Pfieldvalue)
      {
       ParentMfiled.push({ value: Pfieldvalue, text: Pfieldtext});
       
      }
      
     }
     
     
      kendo_all_min_js('#ddlfieldstype_' + x.toString()).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ParentMfiled,
        change: function () {
           // kendo_all_min_js("#ddlfieldstype_" + x.toString()).data("kendoDropDownList").span.css('background', 'none');
        }
    });
     
     }


     
   }
   else
   {
    for(var i=1;i<Parentfiled.length;i++)
     {
     var Pfieldvalue=Parentfiled[i].value;
     var Pfieldtext=Parentfiled[i].text;
     FieldParentItems.push({ value: Pfieldvalue, text: Pfieldtext});
     }
    kendo_all_min_js('#ddlfieldstype_' + counter.toString()).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Parentfiled,
        change: function () {
          //  kendo_all_min_js("#ddlfieldstype_" + counter.toString()).data("kendoDropDownList").span.css('background', 'none');
        }
    });

   }

//        JsonFieldParentItems = JSON.stringify(FieldParentItems);

//   alert(JsonFieldParentItems);
}

function BindFieldSetupGrid(searchtxt) {
 jquery_1_11_3_min_p("#tblFieldSetupGrid tbody").empty();
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
    var SearchValue = searchtxt;
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/BindFieldSetupGrid",
        data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue + "'}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
            jquery_1_11_3_min_p('#divGrid').css('display', 'block');
            var i = 0;
            var jsonData = result.d;
            jquery_1_11_3_min_p("#tblFieldSetupGrid tbody").empty();
            jQuery.each(jsonData.Table, function (rec) {
                var markup = "<tr><td style='display:none'> " + jsonData.Table[i].Fieldsetupid + "</td><td> <input id='chkbox' type='checkbox' class='checkAll'  /></td><td>" + jsonData.Table[i].Entityname + "</td> <td >" + jsonData.Table[i].CountryName + "</td><td >" + jsonData.Table[i].CountColumn + "</td></tr>";

                jquery_1_11_3_min_p("#tblFieldSetupGrid tbody").append(markup);

         

                i++;
            });
            var k = 0;
            if (jsonData.Table.length > 0) { var columnsIn = jsonData.Table[0]; for (var key in columnsIn) { if (k > 0) { ColumnName.push(key); } k++; } } else {
                ColumnName.push(k); k++;
            }
            var j = 0; jquery_1_11_3_min_p("#DivSearch").empty();

            jquery_1_11_3_min_p('#tblFieldSetupGrid thead tr th').each(function () {
                if (j > 1) {


                    var SearchDiv = "<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='searchcheckAll' id='chk_" + ColumnName[j - 2] + "' ><label for='check3' class='coldata'>" + $(this).text() + "</label></span></div>";
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
  var existfieldid1 = jquery_1_11_3_min_p(table.rows[i].cells[4]).text().trim();
   var newid="txtpriorityorder_"+existfieldid1;
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



function RemoveClassItemMaster(data) {
    var id = data.id;
    var arr = id.split('_');
    var id = arr[1];
    if (jquery_1_11_3_min_p('#txtpriorityorder_' + id).val() != '') {
        jquery_1_11_3_min_p("#txtpriorityorder_" + id).removeClass('validate');
    }
    if (kendo_all_min_js("#ddlfields_" + id).val() != '0') {
        jquery_1_11_3_min_p("#ddlfields_" + id).removeClass('validate');
    }
    if (kendo_all_min_js("#ddlfieldstype_" + id).val() != '0') {
        jquery_1_11_3_min_p("#ddlfieldstype_" + id).removeClass('validate');
    }
}

function searchcheckAll() {
$('.searchcheckAll').prop('checked', true);

};
function searchUncheckAll() {
$('.searchcheckAll').prop('checked', false);

};

function checkAll(ele) {
    debugger;
    var state = $(ele).is(':checked');
   // var grid = $('#tblFieldGrid').data('kendoGrid');
    if (state == true) {

        $('.checkAll').prop('checked', true);
    }
    else {

        $('.checkAll').prop('checked', false);
    }
};




function BindFieldOnRowDoubleClick(FieldId) {
//counter=counter+1;
    var FieldId = FieldId;
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/BindFieldOnRowDoubleClick",
        data: "{'FieldId':'" + FieldId + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
            jquery_1_11_3_min_p('#divGrid').css('display', 'block');
             jquery_1_11_3_min_p('#SetUpGrid').css('display', 'none');
        jquery_1_11_3_min_p('#NewSetup').css('display', 'block');
      //  jquery_1_11_3_min_p('#btnSubmit').css('display', 'block');
        jquery_1_11_3_min_p('#btnback').css('display', 'block');
        jquery_1_11_3_min_p('#btnnew').css('display', 'none');
        
        jsonData = eval(result.d);
        var i = 0;
            Fileds = []; Fileds.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table1, function (rec) {
                Fileds.push({ value: jsonData.Table1[i].FieldId, text: jsonData.Table1[i].FieldName });
                i++;
            });

             Country = [];
            var i = 0;
           // Country.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table2, function (rec) {
                Country.push({ value: jsonData.Table2[i].CountryId, text: jsonData.Table2[i].CountryName });
                i++;
            });
            
             Entity = [];
            var i = 0;
            Entity.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table3, function (rec) {
                Entity.push({ value: jsonData.Table3[i].Entityid, text: jsonData.Table3[i].Entityname });
                i++;
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
           var country  =  jquery_1_11_3_min_p('#ddlcountry').data("kendoDropDownList");
           country.readonly();
     kendo_all_min_js('#ddlentity').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Entity,
        change: function () {
            kendo_all_min_js('#ddlentity').data("kendoDropDownList").span.css('background', 'none');
        }
    });
     var entity  =  jquery_1_11_3_min_p('#ddlentity').data("kendoDropDownList");
           entity.readonly();
    kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value(jsonData.Table[0].Countryid);
    kendo_all_min_js('#ddlentity').data("kendoDropDownList").value(jsonData.Table[0].Entityid);
    jquery_1_11_3_min_p("#tblfields tbody").empty();
    var counter=0; var i=0;
    jQuery.each(jsonData.Table, function (rec) {

     var rowID = counter + 1;
        var markup = "<tr><td style='display:table-cell'><input type='checkbox' id='cb_" + rowID + "' class='checkbox'/></td><td ><input type='text' id='ddlfields_" + rowID + "' class='form-control' onchange='FieldChange(this)'  onkeyup='RemoveClassItemMaster(this)' autocomplete='off'/></td><td ><input type='text' placeholder='Enter Priority Order' class='fieldName' id='txtpriorityorder_" + rowID + "' autocomplete='off' onchange='RemoveClassItemMaster(this)' onkeypress='NumericAllow(this)' onkeyup='Comparevalue(this)' /></td><td ><input type='text' id='ddlfieldstype_" + rowID + "' class='form-control'  onkeyup='RemoveClassItemMaster(this)' autocomplete='off'/></td><td  style='display:none'>" + rowID + "</td></tr>";
        jquery_1_11_3_min_p("#tblfields tbody").append(markup);

        kendo_all_min_js("#ddlfields_" + rowID).focus();
        counter = rowID;
       
         jquery_1_11_3_min_p('#hideselect_all').css('display', 'table-cell');
                  jquery_1_11_3_min_p('#chktd').css('display', 'table-cell');
                   var kendoid="ddlfields_" + parseInt(counter);
//            var dataSource  =  jquery_1_11_3_min_p('#'+kendoid).data("kendoDropDownList");
//            dataSource.readonly();
//            jquery_1_11_3_min_p("#txtpriorityorder_" + parseInt(counter-1)).attr('disabled', 'disabled');

//            Parentfiled.push({ value: jquery_1_11_3_min_p('#'+kendoid).data("kendoDropDownList").value(), text: jquery_1_11_3_min_p('#'+kendoid).data("kendoDropDownList").text()});

if(jsonData.Table[i].Isdisable==1)
        {
        jquery_1_11_3_min_p('#btndesable').css('display', 'block');
         jquery_1_11_3_min_p('#btndesable').attr('disabled', 'disabled');
        }
        else
        {
           jquery_1_11_3_min_p('#btndesable').css('display', 'block');
         jquery_1_11_3_min_p('#btndesable').attr('disabled', false);
        }
var fieldvalue=jsonData.Table[i].FieldId;
var fieldprioriry=jsonData.Table[i].Fieldpriority;
var Fieldparent= jsonData.Table[i].Fieldparent; 
             EditBindDropdown(counter,fieldvalue,fieldprioriry,Fieldparent);
    i++;
    });
   counter1 =counter;

       }
        
   });
   counter=counter1;
   
   
}



function Deleteentity(country,entity)
{
  jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/DeleteEntity",
        data: "{'Country':'" + country + "','Entity':'" + entity + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
        swal("Disabled Successfully","Your all dependecy has been lost!","success")
         .then((value) => {
             window.location.replace("AddressFieldSetup.aspx");
            });
        }
        });
}