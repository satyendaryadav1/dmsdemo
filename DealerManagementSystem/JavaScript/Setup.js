var Country = []; var jsonData = ''; var Entity = []; var Entityid = ''; var countercheck=1;var ColumnCopyJson = '';var FieldNameCopyJson = '';  var TableName=''; var arrayele=[]; var dynamiccounter=1;var ddlcount=0;  var tbldata=[]; var Clickparentd=0;var LoadData = '';var searchFlag = '';var searchtxt = '';var ColumnsName = []; var displayparentd=0;
jquery_1_11_3_min_p(document).ready(function () {
jquery_1_11_3_min_p("#hdnLoad").val(2);
 LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
 BindAddressSetupGrid(searchtxt);

      jquery_1_11_3_min_p('#btnLoadMore').click(function () {
        LoadData = parseInt(LoadData) + 2;
        jquery_1_11_3_min_p("#hdnLoad").val(LoadData);
        jquery_1_11_3_min_p('#preloader').css('display', 'block');
        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
          BindAddressSetupGrid(searchtxt);
    });

    $(document).on("dblclick","#tbladdressgrid tbody tr",function() {
   var row = jquery_1_11_3_min_p(this);
   jquery_1_11_3_min_p("#lblentityname").text(row.find('td:nth-child(3)').text().trim());
   jquery_1_11_3_min_p("#lblcountry").text(row.find('td:nth-child(4)').text().trim());
   $("#tbladdressgrid tbody tr").removeClass("selectedRow"); 
    row.addClass("selectedRow");
    
   DisplayAddressSetupGrid(row.find('td:nth-child(6)').text().trim(), row.find('td:nth-child(5)').text().trim());
   jquery_1_11_3_min_p('#BindAddress').css('display', 'block');

   });
//======================================= start Code for parent dropdown===================================
$("#setupdiv").on('click','li',function(){
var Ccurrentelemnt=$(this).text();
jquery_1_11_3_min_p('#AddressLine1').css('display', 'block');
 $('#tblFieldValue thead tr').empty();
    $('#tblFieldValue tbody').empty();
     dynamiccounter=0;
    ddlcount=0;
    var currentelemnt=$(this).text().split(' ');
    var ele=currentelemnt[0];
    var countercheck = 0;
    var id = "";
    if (ele > 0) {
        id = "acr_"+ele;
    }
    else {
        id = ele.id;
    }
   var ParentID=$(this).find('.PClass').attr("id");
   Clickparentd=ParentID.split('_')[1];
   
    var Country = kendo_all_min_js("#ddlcountry").data("kendoDropDownList").text();
    var CountryName = [];
    CountryName = Country.split(' ');
    var entity = kendo_all_min_js("#ddlentity").data("kendoDropDownList").text();
    var EntityName = [];
    EntityName = entity.split(' ');
    var FieldName = $('#' + id).text().trim();
    TableName = 'tbl' + EntityName[0] + CountryName[0] + '_'+ FieldName;
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/GetTableColumn",
        data: "{'TableName':'" + TableName.trim() + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsonData = result.d;
            ColumnCopyJson = jsonData;
            var k=0;
            var Fid=id.split("_");
            trcreate = "<tr><td style='display:none'>1</td></tr>";
            $('#tblFieldValue tbody').append(trcreate);

            for (var j = 1; j < jsonData.Table.length - 9; j++) {

                $('#tblFieldValue thead tr').append($('<th />', { text: jsonData.Table[j].COLUMN_NAME }));

                markup = "<td> <input type='text' onkeyup='RemoveClass(this)' id='txt" + jsonData.Table[j].COLUMN_NAME + "_1' placeholder='Enter Field Name' class='fieldName'  autocomplete='off'></td>";
                $('#tblFieldValue tbody tr').append(markup);
            }
        }
    });


    dynamiccounter=dynamiccounter+1;
    $("#setupdiv li").each(function(){
var allelemnt= $(this).text();
if(Ccurrentelemnt==allelemnt)
{
return false;
}
else
{ 
     
   var Country = kendo_all_min_js("#ddlcountry").data("kendoDropDownList").text();
    var CountryName = [];
    CountryName = Country.split(' ');
    var entity = kendo_all_min_js("#ddlentity").data("kendoDropDownList").text();
    var EntityName = [];
    EntityName = entity.split(' '); 
     arrayele=[];
      arrayele=allelemnt.split(" ");
    
     var k=0; 
  jQuery.each(FieldNameCopyJson.Table, function (rec) {
          if(arrayele[0]==FieldNameCopyJson.Table[k].FieldValuesetupid)
           {
           var tabName='tbl' + EntityName[0] + CountryName[0] + '_'+arrayele[1];
           ddlcount=ddlcount+1;
             $('#tblFieldValue tbody tr').append("<td><input type='text' id='txt"+arrayele[1]+'_'+dynamiccounter+"' onkeyup='RemoveClass(this)' /></td>");
             var ddlParentId='txt'+arrayele[1]+'_'+dynamiccounter;
            
             BindParentddl(tabName.trim(),arrayele[1],ddlParentId);
             }
           k++;
           });

      var appendth="<th>"+arrayele[1]+"</th>";
     jquery_1_11_3_min_p('#tblFieldValue thead tr').append(appendth);
     
}
});

   






});
//===============================endCode for parent dropdown===================================


//======================================= start Code for parent dropdown===================================
$("#setupdiv1").on('click','li',function(){
var Dcurrentelemnt=$(this).text();
appendaddressColumn(Dcurrentelemnt);

});



    jquery_1_11_3_min_p('#btnnew').click(function () {
        jquery_1_11_3_min_p('#vertical-tabs').css('display', 'block');
        jquery_1_11_3_min_p('#addressDiv').css('display', 'none');
        jquery_1_11_3_min_p('#btnSubmit').css('display', 'block');
        jquery_1_11_3_min_p('#btnback').css('display', 'block');
        jquery_1_11_3_min_p('#btnnew').css('display', 'none');
        jquery_1_11_3_min_p('#BindAddress').css('display', 'none');
        Country = []; jsonData = ''; Entity = []; Entityid = ''; countercheck=1; ColumnCopyJson = ''; FieldNameCopyJson = '';  TableName=''; arrayele=[]; dynamiccounter=1; ddlcount=0;  tbldata=[];  Clickparentd=0; LoadData = ''; searchFlag = '';  searchtxt = '';  ColumnsName = [];  displayparentd=0;
        BindAddressSetup();
        Country = [];
        Country.push({ value: "0", text: "Select" });
        kendo_all_min_js("#ddlcountry").kendoDropDownList({
            filter: "contains",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: Country
        });

    });
    jquery_1_11_3_min_p('#btnback').click(function () {
//        jquery_1_11_3_min_p('#vertical-tabs').css('display', 'none');
//        jquery_1_11_3_min_p('#addressDiv').css('display', 'block');
//        jquery_1_11_3_min_p('#btnSubmit').css('display', 'none');
//        jquery_1_11_3_min_p('#btnback').css('display', 'none');
//        jquery_1_11_3_min_p('#btnnew').css('display', 'block');
window.location.replace("AddressDataSetup.aspx");
    });

    jquery_1_11_3_min_p('#btnAddLine').click(function () {
        addrow();

    });
    jquery_1_11_3_min_p('#btnSubmit').click(function () {
        if (Validate() == true) {
         swal({
                 title: "Do you want to proceed?",
                 text: "",
                 icon: "warning",
                 buttons: true,
                 dangerMode: true,
                 })
                 .then((willDelete) => {
                 if (willDelete) {
                 
                  SaveRecord();
                  
                  }
                 });
   
            
        }

    });

    //=================================================End of Document Ready()======================================================
});
function BindAddressSetup() {
    var Entity = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/BindAddesssetUp",
        //        data: "{'jsonItem':'" + jsonItem + "','UpdatedBy':'" + UpdatedBy + "'}",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            jsonData = eval(result.d);
            Entity.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {
                Entity.push({ value: jsonData.Table[i].Entityid, text: jsonData.Table[i].Entityname });
                i++;
            });
        },
        error: function (result) {
        }
    });

    kendo_all_min_js("#ddlentity").kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Entity,
        change: function () {
        kendo_all_min_js("#ddlentity").data("kendoDropDownList").span.css('background', 'none');
            Entityid = kendo_all_min_js("#ddlentity").data("kendoDropDownList").value();
            Country = [];
            Country.push({ value: "0", text: "Select" });
            var i = 0;
            jQuery.each(jsonData.Table1, function (rec) {
                if (Entityid == jsonData.Table1[i].Entityid) {
                    Country.push({ value: jsonData.Table1[i].Countryid, text: jsonData.Table1[i].CountryName });
                }
                i++;
            });
            kendo_all_min_js('#ddlcountry').kendoDropDownList({
                filter: "contains",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: Country,
                change: function () {
                    var entityId = kendo_all_min_js("#ddlentity").val();
                    var countryId = kendo_all_min_js("#ddlcountry").val();
                    BindFieldSetupGrid(entityId, countryId);
                    kendo_all_min_js("#ddlcountry").data("kendoDropDownList").span.css('background', 'none');
                    jquery_1_11_3_min_p('.noData').css('display', 'none');


                }
            });

        }

    });


}


function BindAddressSetupGrid(searchtxt) {
 jquery_1_11_3_min_p("#tbladdressgrid tbody").empty();
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
            jquery_1_11_3_min_p("#tbladdressgrid tbody").empty();
            jQuery.each(jsonData.Table, function (rec) {
                var markup = "<tr><td style='display:none'> " + jsonData.Table[i].Fieldsetupid + "</td><td> <input id='chkbox' type='checkbox' class='checkAll'  /></td><td>" + jsonData.Table[i].Entityname + "</td> <td >" + jsonData.Table[i].CountryName + "</td> <td style='display:none' >" + jsonData.Table[i].Countryid + "</td> <td style='display:none' >" + jsonData.Table[i].Entityid + "</td></tr>";

                jquery_1_11_3_min_p("#tbladdressgrid tbody").append(markup);

         

                i++;
            });
            var k = 0;
            if (jsonData.Table.length > 0) { var columnsIn = jsonData.Table[0]; for (var key in columnsIn) { if (k > 0) { ColumnsName.push(key); } k++; } } else {
                ColumnsName.push(k); k++;
            }
            var j = 0; jquery_1_11_3_min_p("#DivSearch").empty();

            jquery_1_11_3_min_p('#tbladdressgrid thead tr th').each(function () {
                if (j > 1) {


                    var SearchDiv = "<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='searchcheckAll' id='chk_" + ColumnsName[j - 2] + "' ><label for='check3' class='coldata'>" + $(this).text() + "</label></span></div>";
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



function BindFieldSetupGrid(entityId, countryId) {
   var FieldName = '';
    var entityId = entityId;
    var countryId = countryId;
    jquery_1_11_3_min_p("#BindField").empty();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/BindFieldSetupList",
        data: "{'entityId':'" + entityId + "','countryId':'" + countryId + "'}",
        dataType: "json",
        success: function (result) {
            var i = 0;
            var jsonData = result.d;
            FieldNameCopyJson=jsonData;
            jQuery.each(jsonData.Table, function (rec) {

//                var markup = "<li class='nav-item' ><label style='display:none'  id=lbl_" + jsonData.Table[i].FieldValuesetupid + ">" + jsonData.Table[i].FieldValuesetupid + "</label><a class='nav-link ' id=acr_" + jsonData.Table[i].FieldValuesetupid + " data-toggle='tab' onclick='appendColumn(this)'  href=#" + jsonData.Table[i].FieldValuesetupid + " > " + jsonData.Table[i].FieldName + "</a></li>";
   var markup = "<li class='nav-item' ><label style='display:none'  id=lbl_" + jsonData.Table[i].FieldValuesetupid + ">" + jsonData.Table[i].FieldValuesetupid + "</label><a class='nav-link ' id=acr_" + jsonData.Table[i].FieldValuesetupid + " data-toggle='tab'   href=#" + jsonData.Table[i].FieldValuesetupid + " > " + jsonData.Table[i].FieldName + "</a><label style='display:none' class='PClass'  id=lblP_" + jsonData.Table[i].Fieldparent + ">" +"</label></li>";
                jquery_1_11_3_min_p("#BindField").append(markup);
                i++;
                FieldName = jsonData.Table[0].FieldName;

            });
            jquery_1_11_3_min_p('#acr_' + jsonData.Table[0].FieldValuesetupid).addClass('active');
            Clickparentd =jsonData.Table[0].Fieldparent;
            appendColumn(jsonData.Table[0].FieldValuesetupid);
            
            if (jsonData.Table.length > 0) {
            
                jquery_1_11_3_min_p('#setupdiv').css('display', 'block');
            }




        }
    });

}


function DisplayAddressSetupGrid(entityId, countryId) {
   var FieldName = '';
    var entityId = entityId;
    var countryId = countryId;
    jquery_1_11_3_min_p("#BindField1").empty();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/BindFieldSetupList",
        data: "{'entityId':'" + entityId + "','countryId':'" + countryId + "'}",
        dataType: "json",
        success: function (result) {
            var i = 0;
            var jsonData = result.d;
           // FieldNameCopyJson=jsonData;
            jQuery.each(jsonData.Table, function (rec) {

//                var markup = "<li class='nav-item' ><label style='display:none'  id=lbl_" + jsonData.Table[i].FieldValuesetupid + ">" + jsonData.Table[i].FieldValuesetupid + "</label><a class='nav-link ' id=acr_" + jsonData.Table[i].FieldValuesetupid + " data-toggle='tab' onclick='appendColumn(this)'  href=#" + jsonData.Table[i].FieldValuesetupid + " > " + jsonData.Table[i].FieldName + "</a></li>";
   var markup = "<li class='nav-item' ><label style='display:none'  id=lbl_" + jsonData.Table[i].FieldValuesetupid + ">" + jsonData.Table[i].FieldValuesetupid + "</label><a class='nav-link ' id=acr_" + jsonData.Table[i].FieldValuesetupid + " data-toggle='tab'   href=#" + jsonData.Table[i].FieldValuesetupid + " > " + jsonData.Table[i].FieldName + "</a><label style='display:none' class='PClass'  id=lblP_" + jsonData.Table[i].Fieldparent + ">" +"</label></li>";
                jquery_1_11_3_min_p("#BindField1").append(markup);
                i++;
                FieldName = jsonData.Table[0].FieldName;

            });
            jquery_1_11_3_min_p('#acr_' + jsonData.Table[0].FieldValuesetupid).addClass('active');
            displayparentd =jsonData.Table[0].Fieldparent;
            
            appendaddressColumn(jsonData.Table[0].FieldValuesetupid);
            
            if (jsonData.Table.length > 0) {
            
                jquery_1_11_3_min_p('#setupdiv1').css('display', 'block');
            }




        }
    });

}


function addrow() {
var colid=[];var id=''; var isenable=0;isenable=0;
jquery_1_11_3_min_p('#tblFieldValue thead tr th').each(function(){
id='txt'+$(this).text()+'_'+countercheck;
colid.push(id);
 });
  for (var i=0;i<colid.length;i++)
  {
  if(ddlcount==0)
  {
  if(jquery_1_11_3_min_p('#'+colid[i].trim()).val()=='')
  {
  isenable=1;
   jquery_1_11_3_min_p('#'+colid[i].trim()).addClass("validate");
  }
  }
  else
  {
  if(i < colid.length-parseInt(ddlcount))
  {
  if(jquery_1_11_3_min_p('#'+colid[i].trim()).val()=='')
  {
    isenable=1;
   jquery_1_11_3_min_p('#'+colid[i].trim()).addClass("validate");
  }
  }
  }
  }
  var lastelement=colid.length-parseInt(ddlcount);
   for(var x=1;x<=parseInt(ddlcount);x++)
  {
   
   if(kendo_all_min_js('#' + colid[lastelement]).val()==0)
   {
   kendo_all_min_js('#' + colid[lastelement]).data("kendoDropDownList").span.css('background', '#f9e5e5');
   isenable=1;
   lastelement=lastelement+1;
   }

  }

  if(isenable !=1)
  {
   if(ddlcount==0)
  {
  var RowId = countercheck + 1; var markup=''; var colname='';
  markup +="<tr><td style='display:none'> "+RowId +" </td>";
  jquery_1_11_3_min_p('#tblFieldValue thead tr th').each(function(){
  colname='txt'+$(this).text()+'_'+RowId;
  markup +="<td> <input type='text' onkeyup='RemoveClass(this)' id="+colname+" placeholder='Enter Field Name' class='fieldName'  autocomplete='off'></td>";
  });
   markup +="</tr>";
   $('#tblFieldValue tbody').append(markup);
   countercheck = RowId;
   }
   else
   {

  var RowId = countercheck + 1; var markup=''; var colname=''; 
//  var rowCount=jquery_1_11_3_min_p('#tblFieldValue thead tr th').length;
//  var rowcountlength=rowCount-ddlcount;
var lastelement=colid.length-parseInt(ddlcount);
  markup +="<tr><td style='display:none'> "+RowId +" </td>";
  jquery_1_11_3_min_p('#tblFieldValue thead tr th').each(function(){
  colname='txt'+$(this).text()+'_'+RowId;
  markup +="<td> <input type='text' onkeyup='RemoveClass(this)' id="+colname+" placeholder='Enter Field Name' class='fieldName'  autocomplete='off'></td>";
 

  });
   markup +="</tr>";
   $('#tblFieldValue tbody').append(markup);
   countercheck = RowId;
    var Country = kendo_all_min_js("#ddlcountry").data("kendoDropDownList").text();
    var CountryName = [];
    CountryName = Country.split(' ');
    var entity = kendo_all_min_js("#ddlentity").data("kendoDropDownList").text();
    var EntityName = [];
    EntityName = entity.split(' '); 
   for(var x=1;x<=parseInt(ddlcount);x++)
  {
    var id='txt'+jquery_1_11_3_min_p('#tblFieldValue thead tr th').eq(lastelement).text()+'_'+RowId;
     
    var tabName='tbl' + EntityName[0] + CountryName[0] + '_'+jquery_1_11_3_min_p('#tblFieldValue thead tr th').eq(lastelement).text();
    
    var ColumnName=jquery_1_11_3_min_p('#tblFieldValue thead tr th').eq(lastelement).text();
   
    BindParentddlclick(tabName,ColumnName,id);
  lastelement=lastelement+1;
  }
//  for(var x=rowcountlength;x<=parseInt(ddlcount);x++)
//  {
//  var id=jquery_1_11_3_min_p('#tblFieldValue thead tr th').eq(x).text();
//  alert(id);
//  }





   }

  }
//   var RowId = counter + 1; var markup=''; var flag=0;
//     for (var j = 1; j < ColumnCopyJson.Table.length - 8; j++) {
//     if (jquery_1_11_3_min_p("#txt" + ColumnCopyJson.Table[j].COLUMN_NAME + "_" + counter).val() != "") {
//     flag=0;
//   }
//   else
//   {
//   flag=flag+1;
//    jquery_1_11_3_min_p("#txt"+ ColumnCopyJson.Table[j].COLUMN_NAME +"_"+counter).addClass("validate");
//   }

//   }
//   if(flag==0)
//   {
//   
//     markup +="<tr><td style='display:none'> "+RowId +" </td>";
//   for (var j = 1; j < ColumnCopyJson.Table.length - 8; j++) {
//    markup +="<td> <input type='text' onkeypress='RemoveClass(this)' id='txt" + ColumnCopyJson.Table[j].COLUMN_NAME + "_" + RowId + "' placeholder='Enter Field Name' class='fieldName'  autocomplete='off'></td>";
//   }
//   markup +="</tr>";
//   $('#tblFieldValue tbody').append(markup);
//   counter = RowId;
//   }
//   

}


function RemoveClass(data) {
    var id = data.id;
    if (jquery_1_11_3_min_p('#' + id).val() != '') {
        jquery_1_11_3_min_p('#' + id).removeClass('validate');
    }

//      for (var j = 1; j < ColumnCopyJson.Table.length - 8; j++) {
//          if (jquery_1_11_3_min_p("#txt" + ColumnCopyJson.Table[j].COLUMN_NAME + "_" + id).val() != '') {
//              jquery_1_11_3_min_p("#txt" + ColumnCopyJson.Table[j].COLUMN_NAME + "_" + id).removeClass('validate');
//          }
//    }

   
}

function appendColumn(ele) {
    jquery_1_11_3_min_p('#AddressLine1').css('display', 'block');
    $('#tblFieldValue thead tr').empty();
    $('#tblFieldValue tbody').empty();
    
    var countercheck = 0;
    var id = "";
    if (ele > 0) {
        id = "acr_"+ele;
    }
    else {
        id = ele.id;
    }
//     var Countryid = kendo_all_min_js("#ddlcountry").val();
//      var Entityid = kendo_all_min_js("#ddlentity").val();
    var Country = kendo_all_min_js("#ddlcountry").data("kendoDropDownList").text();
    var CountryName = [];
    CountryName = Country.split(' ');
    var entity = kendo_all_min_js("#ddlentity").data("kendoDropDownList").text();
    var EntityName = [];
    EntityName = entity.split(' ');
    var FieldName = $('#' + id).text().trim();
    TableName = 'tbl' + EntityName[0] + CountryName[0] + '_'+ FieldName;
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/GetTableColumn",
        data: "{'TableName':'" + TableName.trim() + "'}",
        dataType: "json",
        success: function (result) {
            var i = 0;
            var jsonData = result.d;
            ColumnCopyJson = jsonData;
            var k=0;
            var Fid=id.split("_");
            trcreate = "<tr><td style='display:none'>1</td></tr>";
            $('#tblFieldValue tbody').append(trcreate);

            for (var j = 1; j < jsonData.Table.length - 9; j++) {

                $('#tblFieldValue thead tr').append($('<th />', { text: jsonData.Table[j].COLUMN_NAME }));

                markup = "<td> <input type='text' onkeyup='RemoveClass(this)' id='txt" + jsonData.Table[j].COLUMN_NAME + "_1' placeholder='Enter Field Name' class='fieldName'  autocomplete='off'></td>";
                $('#tblFieldValue tbody tr').append(markup);
            }
        }
    });
}



function appendaddressColumn(ele) {
    jquery_1_11_3_min_p('#AddressLine11').css('display', 'block');
    $('#tblFieldValue1 thead tr').empty();
    $('#tblFieldValue1 tbody').empty();
    
    var countercheck = 0;
    var id = "";
    if (ele > 0) {
        id = "acr_"+ele;
    }
    else {
       var currentelemnt=ele.split(' ');
       var ele1=currentelemnt[0];
       id = "acr_"+ele1;
       
    }
    var Country = jquery_1_11_3_min_p("#lblcountry").text();
    var CountryName = [];
    CountryName = Country.split(' ');
    var entity = jquery_1_11_3_min_p("#lblentityname").text();
    var EntityName = [];
    EntityName = entity.split(' ');
    var FieldName = $('#' + id).text().trim();
    TableName = 'tbl' + EntityName[0] + CountryName[0] + '_'+ FieldName;
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/GetTableColumn",
        data: "{'TableName':'" + TableName.trim() + "'}",
        dataType: "json",
        success: function (result) {
            var jsonData = result.d;
           var i = 0; var  markup ='';
            for (var j = 1; j < jsonData.Table.length - 9; j++) {
                $('#tblFieldValue1 thead tr').append($('<th />', { text: jsonData.Table[j].COLUMN_NAME }));
            }
            jQuery.each(jsonData.Table1, function (rec) {

             markup +="<tr>";
               for (var j = 1; j < jsonData.Table.length - 9; j++) {
               var colname=jsonData.Table[j].COLUMN_NAME;
             var getdata=jsonData.Table1[i][jsonData.Table[j].COLUMN_NAME];
              markup+=  "<td> "+ getdata +"</td>";
               }
                i++;
                markup +="</tr>";
            });
           $('#tblFieldValue1 tbody').append(markup);
        }
    });
}





function SaveRecord()
{
var parentid="";
var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text();
var entityid=kendo_all_min_js("#ddlentity").val();
 
  var FieldItems = [];
    var JsonFieldItems = '';
    var i = 1;
    var str='';
    var cols=[];
    var columnName = '';
    var columnName1 = ''
    var ColName = [];
    var cnt = 0;
    var length=jquery_1_11_3_min_p('#tblFieldValue tbody').find('tr').length;
   columnName1 +='[';
   jquery_1_11_3_min_p('#tblFieldValue tbody').find('tr').each(function () {

       var row = jquery_1_11_3_min_p(this);
       columnName1 +='{';
       for (var j = 1; j < ColumnCopyJson.Table.length - 9; j++) {
           var fieldValue = kendo_all_min_js("#txt" + ColumnCopyJson.Table[j].COLUMN_NAME + "_" + row.find('td:nth-child(1)').text().trim()).val();
           columnName = ColumnCopyJson.Table[j].COLUMN_NAME;
           if(j ==ColumnCopyJson.Table.length - 10)
           {
            columnName1 += '"' + columnName + '"' + ':' + '"' + fieldValue + '"';
           }
           else
           {
           columnName1 += '"' + columnName + '"' + ':' + '"' + fieldValue + '"'+ ',';
           }
           if (cnt == 0) {
               ColName.push(columnName);
           }

       }
       cnt++;
       if(i==length)
       {
       columnName1 +='}';
       }
       else
       {
       columnName1 +='},';
       }
       i++;
  
   });
     var newcol = columnName1.slice(0, -1);
    columnName1 = '';
    columnName1 += newcol+'}]'; 
    JsonFieldItems = columnName1;
    var Column = JSON.stringify(ColName);
  

     jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Setup.asmx/SaveRecord",
    data: "{'JsonFieldItems':'" + JsonFieldItems + "','TableName':'" + TableName + "','parentid':'" + Clickparentd + "','entityid':'" + entityid + "','CreatedBy':'" + CreatedBy + "','Column':" + Column + "}",
    dataType: "json",
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
            if(jsonData.Table[0].Response==0)
            {
             swal("Entity Already Exists!")
            
            }
            else{
       swal("Saved Successfully","Your data Saved successfully!","success")
            .then((value) => {
             window.location.replace("AddressDataSetup.aspx");
            });
        }
        }
    });
}



function Validate() {
    var allow = true;
    var Vcolid=[];var Vid=''; 
      if (kendo_all_min_js("#ddlentity").data("kendoDropDownList").value() == 0) {
            kendo_all_min_js("#ddlentity").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
         if (kendo_all_min_js("#ddlcountry").data("kendoDropDownList").value() == 0) {
            kendo_all_min_js("#ddlcountry").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
       
jquery_1_11_3_min_p('#tblFieldValue thead tr th').each(function(){
Vid='txt'+$(this).text()+'_'+countercheck;
Vcolid.push(Vid);
 });
  for (var i=0;i<Vcolid.length;i++)
  {
  if(ddlcount==0)
  {
  if(jquery_1_11_3_min_p('#'+Vcolid[i].trim()).val()=='')
  {
  allow =false;
   jquery_1_11_3_min_p('#'+Vcolid[i].trim()).addClass("validate");
  }
  }
  else
  {
  if(i < Vcolid.length-parseInt(ddlcount))
  {
  if(jquery_1_11_3_min_p('#'+Vcolid[i].trim()).val()=='')
  {
    allow =false;
   jquery_1_11_3_min_p('#'+Vcolid[i].trim()).addClass("validate");
  }
  }
  }
  }
  var lastelement=Vcolid.length-parseInt(ddlcount);
   for(var x=1;x<=parseInt(ddlcount);x++)
  {
   
   if(kendo_all_min_js('#' + Vcolid[lastelement]).val()==0)
   {
   kendo_all_min_js('#' + Vcolid[lastelement]).data("kendoDropDownList").span.css('background', '#f9e5e5');
   allow =false;
   lastelement=lastelement+1;
   }

  }





//    jquery_1_11_3_min_p('#tblFieldValue tbody').find('tr').each(function () {
//  //  var row = jquery_1_11_3_min_p(this);

//        for (var j = 1; j < ColumnCopyJson.Table.length - 8; j++) {
//            if (jquery_1_11_3_min_p("#txt" + ColumnCopyJson.Table[j].COLUMN_NAME + "_" + countercheck).val() == "") {
//                jquery_1_11_3_min_p("#txt" + ColumnCopyJson.Table[j].COLUMN_NAME + "_" + countercheck).addClass("validate");
//                jquery_1_11_3_min_p("#txt" + ColumnCopyJson.Table[j].COLUMN_NAME + "_" + countercheck).attr("placeholder", "Enter Value!");
//                allow = false
//            }


//        }

//        i++;
//    });
   return allow;
}


function Comparevalue(data) {
    var id = data.id;
    var val = jquery_1_11_3_min_p('#' + id).val();
  // var table = document.getElementById('#tblFieldValue');
  var rowlength = jquery_1_11_3_min_p("#tblFieldValue tr").not("thead tr").length;
  if(rowlength>1)
  {
  var i;
  for (i = 1; i <= parseInt(rowlength-1); i++) {
  for (var j = 1; j < ColumnCopyJson.Table.length - 9; j++) {
  var existfieldid1= jquery_1_11_3_min_p("#txt" + ColumnCopyJson.Table[1].COLUMN_NAME + "_" + countercheck).val();
 

  }

 // var existfieldid1 = jquery_1_11_3_min_p(table.rows[i].cells[2]).text().trim();
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


function BindParentddl(TableName,ColumnName,ddlParentId) {
    var TableName=TableName;
    var ColumnName=ColumnName;
    var ddlParentId=ddlParentId;
    
    tbldata=[];
    var jsondata='';
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/BindParentddl",
        data: "{'TableName':'" + TableName + "','ColumnName':'" + ColumnName + "'}",
       // data: "{}",
       dataType: "json",
        async: false,
        
        success: function (result) {
            var i = 0;
             jsondata = eval(result.d);
           
          tbldata.push({ value: "0", text: "Select" });
            jQuery.each(jsondata.Table, function (rec) {
                tbldata.push({ value: jsondata.Table[i].IDField, text: jsondata.Table[i].ValueField });
                i++;
            });
           
        },
        error: function (result) {
        }
    });
     if(jsondata.Table.length==0)
            {
             jquery_1_11_3_min_p('#AddressLine1').css('display', 'none');
            }
             else{
             
    kendo_all_min_js('#'+ddlParentId).kendoDropDownList({
        filter: "contains",
        // optionLabel: "Select",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: tbldata,
        change: function () {
        kendo_all_min_js('#'+ddlParentId).data("kendoDropDownList").span.css('background', 'none');

        }
    });

     }

     countercheck=1;

    }




    function BindParentddlclick(tabName,ColumnName,id) {
    
    tbldata=[];
    var jsondata='';
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/BindParentddl",
        data: "{'TableName':'" + tabName + "','ColumnName':'" + ColumnName + "'}",
       // data: "{}",
       dataType: "json",
        async: false,
        
        success: function (result) {
            var i = 0;
             jsondata = eval(result.d);
           
          tbldata.push({ value: "0", text: "Select" });
            jQuery.each(jsondata.Table, function (rec) {
                tbldata.push({ value: jsondata.Table[i].IDField, text: jsondata.Table[i].ValueField });
                i++;
            });
           
        },
        error: function (result) {
        }
    });


     kendo_all_min_js('#'+id).kendoDropDownList({
        filter: "contains",
        // optionLabel: "Select",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: tbldata,
        change: function () {
        kendo_all_min_js('#'+id).data("kendoDropDownList").span.css('background', 'none');

        }
    });
    }