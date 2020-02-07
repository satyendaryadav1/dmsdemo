var counter = 0;
var ItemMaster = [];
var LoadData = '';
var searchFlag = '';
var searchtxt = '';
var editjson='';
var editFlag=0;
var ColumnName = [];
var jsonval = [];
var Querystring = '';var tablename='';var colname='';var editjsondata='';
var detailcounter=1;var tablename='';var columnname='';var dbcolumnname=[]; var dbfinalcolumnname=[];
jquery_1_11_3_min_p(document).ready(function () {
    jquery_1_11_3_min_p("#hdnLoad").val(2);
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    jquery_1_11_3_min_p('#preloader').css('display', 'block');
    jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
    BindOrgParaGrid(searchtxt);
    BindDataType();

     jquery_1_11_3_min_p('#btnLoadMore').click(function () {
        LoadData = parseInt(LoadData) + 2;
        jquery_1_11_3_min_p("#hdnLoad").val(LoadData);
        jquery_1_11_3_min_p('#preloader').css('display', 'block');
        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
         BindOrgParaGrid(searchtxt);
    });
      //====================================start Loaddata dropdown OnChange============================
    jquery_1_11_3_min_p("#ddlLoadMore").change(function(){

        LoadData = parseInt(jquery_1_11_3_min_p("#ddlLoadMore").val());
        jquery_1_11_3_min_p("#hdnLoad").val(LoadData);
        jquery_1_11_3_min_p('#preloader').css('display', 'block');
        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
        BindOrgParaGrid(searchtxt);
 
});

    jquery_1_11_3_min_p("#btnsavepopupdata").click(function () {
      if(ValidateGridColumn()==true)
      {
      CreateColumn();
      }

    });

     jquery_1_11_3_min_p("#btnclosedata").click(function () {
        $("#AllLeaveRequestPopup").modal('hide');
        kendo_all_min_js("#ddlDatatype_" + counter.toString()).data("kendoDropDownList").value(0);

    });


     jquery_1_11_3_min_p("#AddRow").click(function () {
        AddRow()

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

    jquery_1_11_3_min_p("#btnSubmit").click(function () {
    if(ValidateAddressGrid()==true)
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
                 
                  SaveAddressFields();
                  
                  }
                 });
   
       
        }

    });



    $(document).on("dblclick","#tblFieldGrid tbody tr",function() {
   var row = jquery_1_11_3_min_p(this);
   var entityid= row.find('td:nth-child(1)').text().trim();
   var countryid= row.find('td:nth-child(2)').text().trim();
  
   jquery_1_11_3_min_p('#NewFields').css('display', 'block');
        jquery_1_11_3_min_p('#SetUpGrid').css('display', 'none');
        jquery_1_11_3_min_p('#btnSubmit').css('display', 'none');
        jquery_1_11_3_min_p('#btnback').css('display', 'block');
        jquery_1_11_3_min_p('#btnnew').css('display', 'none');
        jquery_1_11_3_min_p('#btnAdd').css('display', 'none');
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
         BindAllFields();
         editFlag=0;
    kendo_all_min_js("#ddlcountry").data("kendoDropDownList").value(countryid);
    kendo_all_min_js("#ddlentity").data("kendoDropDownList").value(entityid);
//     BindFieldOnRowDoubleClick(countryid,entityid);
jquery_1_11_3_min_p("#tblFields tbody").empty();
var counter=0; var i=0;
    jQuery.each(editjsondata.Table2, function (rec) {
        if(editjsondata.Table2[i].CountryId==countryid && editjsondata.Table2[i].EntityId==entityid)
          {
         
     var rowID = counter + 1;
        var markup = "<tr> <td  style='display:none'>" + rowID + "</td><td style='display:table-cell'><input type='checkbox' id='cb_" + rowID + "' class='checkbox'/></td><td ><input type='text' placeholder='' class='fieldName' id='txtField_" + rowID + "' autocomplete='off' /></td><td ><input type='text' id='ddlDatatype_" + rowID + "' class='fieldName' /></td></tr>";
        jquery_1_11_3_min_p("#tblFields tbody").append(markup);
        counter = rowID;
         jquery_1_11_3_min_p('#chkAll').css('display', 'table-cell');
          
         var id="txtField_"+rowID;
         jquery_1_11_3_min_p('#'+id).val(editjsondata.Table2[i].FieldName);

       jquery_1_11_3_min_p('#'+id).attr('disabled', 'disabled');
      
       ItemMaster = [];
        var x = 0;
            ItemMaster.push({ value: "0", text: "Select" });
            jQuery.each(editjsondata.Table3, function (rec) {
             if(editjsondata.Table2[i].CountryId==countryid && editjsondata.Table2[i].EntityId==entityid)
          {
                ItemMaster.push({ value: editjsondata.Table3[x].Fielddatatypid, text: editjsondata.Table3[x].Datatypename });
                }
                x++;
                
            });


       kendo_all_min_js('#ddlDatatype_' + counter.toString()).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ItemMaster,
        change: function () {
          //  kendo_all_min_js("#ddlfields_" + counter.toString()).data("kendoDropDownList").span.css('background', 'none');
        }
    });
      kendo_all_min_js("#ddlDatatype_" + counter.toString()).data("kendoDropDownList").value(editjsondata.Table2[i].FieldDataType);
      var fieldtype="ddlDatatype_" + parseInt(counter);
       var dataSource  =  jquery_1_11_3_min_p('#'+fieldtype).data("kendoDropDownList");
            dataSource.readonly();
            }
    i++;
     
    });


   

    
});



    jquery_1_11_3_min_p("#btnnew").click(function () {

        jquery_1_11_3_min_p('#NewFields').css('display', 'block');
        jquery_1_11_3_min_p('#SetUpGrid').css('display', 'none');
        jquery_1_11_3_min_p('#btnSubmit').css('display', 'block');
        jquery_1_11_3_min_p('#btnback').css('display', 'block');
        jquery_1_11_3_min_p('#btnnew').css('display', 'none');
         $('#chkAll').prop('checked', false);
         editFlag=0;
         BindAllFields();

    });
    jquery_1_11_3_min_p('#btnback').click(function () {

//        jquery_1_11_3_min_p('#NewFields').css('display', 'none');
//        jquery_1_11_3_min_p('#SetUpGrid').css('display', 'block');
//        jquery_1_11_3_min_p('#btnSubmit').css('display', 'none');
//        jquery_1_11_3_min_p('#btnback').css('display', 'none');
//        jquery_1_11_3_min_p('#btnnew').css('display', 'block');
//        $('#chkAll').prop('checked', false);
//        $('#chk_1').prop('checked', false);
      window.location.replace("PartnerPara.aspx");
         BindOrgParaGrid(searchtxt);

    });

     jquery_1_11_3_min_p('#btnUpdate').click(function () {
       jquery_1_11_3_min_p('#NewFields').css('display', 'block');
        jquery_1_11_3_min_p('#SetUpGrid').css('display', 'none');
        jquery_1_11_3_min_p('#btnSubmit').css('display', 'block');
        jquery_1_11_3_min_p('#btnback').css('display', 'block');
        jquery_1_11_3_min_p('#btnnew').css('display', 'none');
         $('#chkAll').prop('checked', false);
         jquery_1_11_3_min_p('#AddRow').css('display', 'none');
        jquery_1_11_3_min_p('#btnDeleteLine').css('display', 'none');
        editFlag=1;
          EditRow();

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
        if(colm=="Datatypename")
        {
          colm= "TFDT.Datatypename"
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
        searchtxt=' and '+ newquerystring.trim();
         }
       else
       {
       searchtxt='';
       }
    
        BindOrgParaGrid(searchtxt)
         
        }

    });
    //===============================end for search========================================


      jquery_1_11_3_min_p('#btnExport').click(function () {
       var grid = $("#tblFieldGrid");
       //document.getElementById('partnersgrid');

                        var rows = [{
                            cells: [
            { value: "Field Name" },
            { value: "DataType " }
            
           

          ]
                        }];
                        var row = '';
                    var ch = jquery_1_11_3_min_p('#' + 'tblFieldGrid').find('tbody input[type=checkbox]');
                     ch.each(function () {
            var $this = jquery_1_11_3_min_p(this);
            if ($this.is(':checked')) {
            row = jquery_1_11_3_min_p(this).closest('tr')[0];
            rows.push({
                                    cells: [
                { value: row.cells[2].innerHTML },
                { value: row.cells[3].innerHTML }
               
                

              ]
                                })
                              
            }
            });
     excelExport(rows)
    });

      jquery_1_11_3_min_p('#btnPdf').click(function () {

        
       var grid = $("#tblFieldGrid");
       
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
                fileName: "Book1.pdf",
                proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
            });
             
        });

    });

jquery_1_11_3_min_p('#btnDeleteLine').on("click", function (event) {
var sel = false;
var ch = jquery_1_11_3_min_p('#' + 'tblFields').find('tbody input[type=checkbox]');
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
var ch = jquery_1_11_3_min_p('#' + 'tblFields').find('tbody input[type=checkbox]');
ch.each(function () {
var $this = jquery_1_11_3_min_p(this);
if ($this.is(':checked')) {
var DeleteRow = jquery_1_11_3_min_p(this).closest('tr');
var rownum=DeleteRow.index();
alert(rownum);
dbfinalcolumnname.splice(rownum,1);
sel = true; 
DeleteRow.remove();
}
});
swal("Deleted Successfully","Your data deleted successfully!","success")
}
});
}
});

jquery_1_11_3_min_p('#btnpopupdeleteline').on("click", function (event) {
var sel1 = false;
var ch1 = jquery_1_11_3_min_p('#' + 'tblOrgpopupdata').find('tbody input[type=checkbox]');
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
var ch1 = jquery_1_11_3_min_p('#' + 'tblOrgpopupdata').find('tbody input[type=checkbox]');
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


//==================================================End of Document.Ready()=================================================

});







function AddRow() {
    if ((jquery_1_11_3_min_p("#txtField_" + counter).val() != "") && (kendo_all_min_js("#ddlDatatype_" + counter).val() != "0")) {
        var rowID = counter + 1;
        var markup = "<tr><td style='display:none'>" + rowID + "</td><td><input type='checkbox' class='chk_All' id='chk_" +rowID+"'></td><td ><input type='text' class='' id='txtField_" + rowID + "' onkeypress='RemoveClass(this)' onkeyup='Enablebutton(this)' autocomplete='off' placeholder='' /></td><td ><input type='text' id='ddlDatatype_" + rowID + "' class='' readonly='readonly'   autocomplete='off'/></td></tr>";
        jquery_1_11_3_min_p("#tblFields tbody").append(markup);


        kendo_all_min_js("#ddlDatatype_" + rowID).focus();
        counter = rowID;
           var kendoid="ddlDatatype_" + parseInt(counter-1);
            var dataSource  =  jquery_1_11_3_min_p('#'+kendoid).data("kendoDropDownList");
            if(dataSource!=undefined)
            {
            dataSource.readonly();
            jquery_1_11_3_min_p("#txtField_" + parseInt(counter-1)).attr('disabled', 'disabled');
            }
           BindDataType();
       
    }
    else {
       

        if (kendo_all_min_js("#ddlDatatype_" + counter).val() == "0") {
            kendo_all_min_js("#ddlDatatype_" + counter).data("kendoDropDownList").span.css('background', '#f9e5e5');
          
        }

        if (jquery_1_11_3_min_p("#txtField_" + counter).val() == "") {
            jquery_1_11_3_min_p("#txtField_" + counter).addClass("validate");
            jquery_1_11_3_min_p("#txtField_" + counter).attr("placeholder", "Enter Field!");
           
        }
    }
}

function BindDataType() {
    if (counter == 0) {
        counter++;
    }
    var orgflag=2;
    ItemMaster = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/BindDataTypeOrgParam",
        data: "{'OrgFlag':'" + orgflag + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            DataTypeJson = eval(result.d);
            ItemMaster.push({ value: "0", text: "Select" });
            jQuery.each(DataTypeJson.Table, function (rec) {
                ItemMaster.push({ value: DataTypeJson.Table[i].OrgDataTypeId, text: DataTypeJson.Table[i].DataType });
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
        if(kendo_all_min_js("#ddlDatatype_" + counter.toString()).data("kendoDropDownList").value()==2)
        {
        BindColumns();
        }
        else
        {
        
        }
            kendo_all_min_js("#ddlDatatype_" + counter.toString()).data("kendoDropDownList").span.css('background', 'none');
        }
    });
}


function BindColumns()
{

//detailcounter

 jquery_1_11_3_min_p("#tblOrgpopupdata").find("tr:gt(1)").remove();
 var id="txtField_"+counter.toString();
 jquery_1_11_3_min_p('#ColumnName').text(jquery_1_11_3_min_p('#' + id).val());
 var columnvalue=kendo_all_min_js("#ddlDatatype_" + counter.toString()).data("kendoDropDownList").value();
 colname=jquery_1_11_3_min_p('#' + id).val();
 var coutryname=kendo_all_min_js("#ddlcountry").data("kendoDropDownList").text();
 var entityname=kendo_all_min_js("#ddlentity").data("kendoDropDownList").text();
 var entityfirst=entityname.split(' ');
 tablename="tblOrg"+entityfirst[0]+coutryname+"_"+colname;
 var popval="txtPField_"+detailcounter.toString();
 jquery_1_11_3_min_p('#' + popval).val('');
 jquery_1_11_3_min_p("#txtPField_" + parseInt(detailcounter)).attr('disabled', false);
 $("#AllLeaveRequestPopup").modal('show');

}

function RemoveClass(data) {
   
    var id = data.id;
    var arr = id.split('_');
    var id = arr[1];
    if (jquery_1_11_3_min_p('#txtField_' + id).val() != '') {
        jquery_1_11_3_min_p("#txtField_" + id).removeClass('validate');
    }

    if (kendo_all_min_js("#ddlDatatype_" + id).val() != '0') {
        jquery_1_11_3_min_p("#ddlDatatype_" + id).removeClass('validate');
    }
}


function SaveAddressFields() {
    var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
    var countryid=kendo_all_min_js("#ddlcountry").data("kendoDropDownList").value();
     var entityid=kendo_all_min_js("#ddlentity").data("kendoDropDownList").value();
    var Status = 1;
    var Fields = [];
    var JsonFields = '';
    var i = 1;
    jquery_1_11_3_min_p('#tblFields tbody').find('tr').each(function () {
    var row = jquery_1_11_3_min_p(this);
   var  FieldId= row.find('td:nth-child(5)').text().trim();
    var DatatypeId=kendo_all_min_js("#ddlDatatype_" + row.find('td:nth-child(1)').text().trim()).val();
    var FieldName= jquery_1_11_3_min_p("#txtField_" + row.find('td:nth-child(1)').text().trim()).val();
    if(editFlag==0)
    {
    Fields.push({ DatatypeId: DatatypeId, FieldName: FieldName, CreatedBy: CreatedBy });
   }
   else{
    Fields.push({FieldId:FieldId, DatatypeId: DatatypeId, FieldName: FieldName, CreatedBy: CreatedBy });
   }
    i++;
    });
    JsonFields = JSON.stringify(Fields);
   var dbcolumns=JSON.stringify(dbfinalcolumnname);
   var orgflag=2;
    jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Setup.asmx/saveOrganizationParameter",
    data: "{'JsonFields':'" + JsonFields + "','editFlag':'" + editFlag + "','dbcolumns':" + dbcolumns + ",'entityid':" + entityid + ",'countryid':" + countryid + ",'OrgFlag':'" + orgflag + "'}",
    dataType: "json",
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
            if(jsonData.Table[0].Response=="1")
            {
       swal("Saved Successfully","Your data Saved successfully!","success")
            .then((value) => {
             window.location.replace("PartnerPara.aspx");
            });
            }
            else
            {
             swal("Updated Successfully","Your data Updated successfully!","success")
            .then((value) => {
             window.location.replace("PartnerPara.aspx");
            });
            }
        }
    });

}


function BindOrgParaGrid(searchtxt) {
 jquery_1_11_3_min_p("#tblFieldGrid tbody").empty();
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
    var Partners = [];

    var SearchValue = searchtxt;
    var orgflag=2;
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/BinOrgParaGrid",
        data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue + "','OrgFlag':'" + orgflag + "'}",
        dataType: "json",
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
                var markup = "<tr> <td style='display:none'> " + jsonData.Table[i].EntityId + "</td> <td style='display:none'> " + jsonData.Table[i].CountryId + "</td> <td> <input id='chkbox' type='checkbox' class='checkAll'  /></td><td>" + jsonData.Table[i].Entityname + "</td> <td >" + jsonData.Table[i].CountryName + "</td> <td >" + jsonData.Table[i].CountColumn + "</td></tr>";

                jquery_1_11_3_min_p("#tblFieldGrid tbody").append(markup);

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

function ValidateAddressGrid() {
    var allow = true;
    var i = 1;
    jquery_1_11_3_min_p('#tblFieldGrid tbody').find('tr').each(function () {
        var row = jquery_1_11_3_min_p(this);
        if (kendo_all_min_js("#ddlDatatype_" + counter).val()=="0") {
             kendo_all_min_js("#ddlDatatype_" +counter).data("kendoDropDownList").span.css('background', '#f9e5e5');
           
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


function ValidateGridColumn() {
    var allow = true;
    var i = 1;
    jquery_1_11_3_min_p('#tblOrgpopupdata tbody').find('tr').each(function () {
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


function CreateColumn() {
detailcounter=1;
columnname=[];
columnname +=tablename.replace(/\s+/g, '')+',';
columnname +=colname.replace(/\s+/g, '')+','; 
jquery_1_11_3_min_p('#tblOrgpopupdata tbody tr').each(function () {
var row = jquery_1_11_3_min_p(this);

 var id= "txtPField_"+row.find('td:nth-child(3)').text().trim();
 var columnnameval=jquery_1_11_3_min_p('#'+id).val().replace(/\s+/g, ''); 
  columnname += '['+ columnnameval+']' +' '+ '['+'nvarchar'+']'+'('+'100'+')' + ' ' +'NOT NULL' +',';
});
dbcolumnname.push(columnname);
dbfinalcolumnname.push(columnname);
$("#AllLeaveRequestPopup").modal('hide');

var kendoid="ddlDatatype_" + parseInt(counter);
            var dataSource  =  jquery_1_11_3_min_p('#'+kendoid).data("kendoDropDownList");
            dataSource.readonly();
            jquery_1_11_3_min_p("#txtField_" + parseInt(counter)).attr('disabled', 'disabled');
}





function checkAll(ele) {
    debugger;
    var state = $(ele).is(':checked');
    if (state == true) {

        $('.chk_All').prop('checked', true);
    }
    else {

        $('.chk_All').prop('checked', false);
    }
};

function checkPAll(ele) {
    debugger;
    var state = $(ele).is(':checked');
    if (state == true) {

        $('.chk_PAll').prop('checked', true);
    }
    else {

        $('.chk_PAll').prop('checked', false);
    }
};



function InputcheckAll(ele) {
    debugger;
    var state = $(ele).is(':checked');
   // var grid = $('#tblFields').data('kendoGrid');
    if (state == true) {

        $('.chk_All').prop('checked', true);
    }
    else {

        $('.chk_All').prop('checked', false);
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
 jquery_1_11_3_min_p('#tblFieldGrid thead tr ' +checkid).addClass('filter');
    }
    else
    {
     var checkid= '#'+ Data.id;
 jquery_1_11_3_min_p('#tblFieldGrid thead tr ' +checkid).removeClass('filter');
    }

}


function EditRow() {
var i=0;
jquery_1_11_3_min_p("#tblFields tbody").empty();
jQuery.each(editjson.Table, function (rec) {
 var rowID = i + 1;
        var markup = "<tr><td style='display:none'>" + rowID + "</td><td><input type='checkbox' class='chk_All' id='chk_" +rowID+"'></td><td ><input type='text' class='' id='txtField_" + rowID + "' onkeyup='RemoveClass(this)' autocomplete='off' placeholder='' /></td><td ><input type='text' id='ddlDatatype_" + rowID + "' class=''   autocomplete='off'/></td><td style='display:none'>" + editjson.Table[i].FieldId + "</td></tr>";
        jquery_1_11_3_min_p("#tblFields tbody").append(markup);
         kendo_all_min_js("#ddlDatatype_" + rowID).focus();
        counter = rowID;
        jquery_1_11_3_min_p("#txtField_" + counter).val(editjson.Table[i].FieldName);
        var selectedvalue=editjson.Table[i].FieldDataType;
        BindEditDataType(selectedvalue);

i++;
});

}


function BindEditDataType(selectedvalue) {
    if (counter == 0) {
        counter++;
    }
   
    ItemMaster = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/BindDataType",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            DataTypeJson = eval(result.d);
            ItemMaster.push({ value: "0", text: "Select" });
            jQuery.each(DataTypeJson.Table, function (rec) {
                ItemMaster.push({ value: DataTypeJson.Table[i].Fielddatatypid, text: DataTypeJson.Table[i].Datatypename });
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
            kendo_all_min_js("#ddlDatatype_" + counter.toString()).data("kendoDropDownList").span.css('background', 'none');
        }
    });
    kendo_all_min_js("#ddlDatatype_" + counter.toString()).data("kendoDropDownList").value(selectedvalue);
    
}


function Enablebutton(data) {
    var id = data.id;
     var val = jquery_1_11_3_min_p('#' + id).val();
     if(kendo_all_min_js("#ddlentity").data("kendoDropDownList").value()==0)
     {
     
     var fieldid= 'txtField_'+id.split('_')[1];
     jquery_1_11_3_min_p('#'+fieldid).val('');
     swal("Select entity","Please select entity first!", "warning")
     }
     else
     {
     if(val=='')
     {
     var datasourceid='ddlDatatype_'+id.split('_')[1];
      var datasource  =  jquery_1_11_3_min_p('#'+datasourceid).data("kendoDropDownList");
      datasource.readonly();

     }
     else
     {
      var datasourceid='ddlDatatype_'+id.split('_')[1];
      var datasource  =  jquery_1_11_3_min_p('#'+datasourceid).data("kendoDropDownList");
      datasource.readonly(false);
     }
     }

    }


function BindAllFields() {
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
        }
    });

     kendo_all_min_js('#ddlentity').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Entity,
        change: function () {
            kendo_all_min_js('#ddlentity').data("kendoDropDownList").span.css('background', 'none');
        }
    });
}


function Addpopuprow() {
    if (jquery_1_11_3_min_p("#txtPField_" + detailcounter).val() != "") {
        var rowID = detailcounter + 1;
        var markup = "<tr><td><input type='checkbox' class='chk_PAll' id='chkP_" +rowID+"'></td><td ><input type='text' class='' id='txtPField_" + rowID + "'  onchange='RemoveClassItemMaster(this)' onkeyup='Comparevalue(this)'   autocomplete='off' placeholder='Enter Column Name' /></td><td style='display:none'>" + rowID + "</td></tr>";
        jquery_1_11_3_min_p("#tblOrgpopupdata tbody").append(markup);


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


function RemoveClassItemMaster(data) {
    var id = data.id;
    var arr = id.split('_');
    var id = arr[1];
    if (jquery_1_11_3_min_p('#txtPField_' + id).val() != '') {
        jquery_1_11_3_min_p("#txtPField_" + id).removeClass('validate');
    }
}


function Comparevalue(data) {
    var id = data.id;
    var val = jquery_1_11_3_min_p('#' + id).val();
   var table = document.getElementById('tblOrgpopupdata');
  var rowlength = jquery_1_11_3_min_p("#tblOrgpopupdata tr").not("thead tr").length;
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

function NumericAllow(data) {
    var value = data.id;
    jquery_1_11_3_min_p('#' + value).keypress(function (e) {
    
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            jquery_1_11_3_min_p("#" + value).val('');
            return false;

        }
    });
}

function Deleteentity(country,entity)
{
  jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/DeleteFieldEntity",
        data: "{'Country':'" + country + "','Entity':'" + entity + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
        swal("Disabled Successfully","Your all dependecy has been lost!","success")
         .then((value) => {
             window.location.replace("PartnerPara.aspx");
            });
        }
        });
}