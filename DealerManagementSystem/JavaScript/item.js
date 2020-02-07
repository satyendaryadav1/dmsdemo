var Groups = [];var Itemtype = [];var variantcount=0;var isexist=0;var Tempvariantcount=1; var checkeddatajson=''; var variantcounter=1;var Existotherunitid = 0;
var ColumnName=[];var SkillCount =[]; var parentunitype=0;var parentUnitclass=0; var otherunitype=0;var otherUnitclass=0; var unitjson='';
var SKUCOUNT=''; var dblitemid=0; var dbitemname=''; var counter = 0;var editFlag=0; var editflag=0;
jquery_1_11_3_min_p(document).ready(function () {
BindItemGrid() ;
    //============================================================New Item Group===========================================
    jquery_1_11_3_min_p('#btnnew').click(function () {
        jquery_1_11_3_min_p('#variantForm').css('display', 'block');
        jquery_1_11_3_min_p('#variantGrid').css('display', 'none');
        jquery_1_11_3_min_p('#btnsubmit').css('display', 'block');
        jquery_1_11_3_min_p('#btnback').css('display', 'block');
        jquery_1_11_3_min_p('#btnnew').css('display', 'none');
        BindFormdetails();
        editflag=0;
    });
    //=========================================================End Item Group==============================================
    //=========================================================Back & Submit Button click===========================================
    jquery_1_11_3_min_p('#btnback').click(function () {
        window.location.replace("ItemCreate.aspx");
    });
    jquery_1_11_3_min_p('#btnpopupDeleteLine').on("click", function (event) {
var sel = false;
var ch = jquery_1_11_3_min_p('#' + 'tblpopupdata').find('tbody input[type=checkbox]');
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



$(document).on("dblclick","#ItemGrid tbody tr",function() {
   var row = jquery_1_11_3_min_p(this);
   var Itemid= row.find('td:nth-child(1)').text().trim();
   var Itemname= row.find('td:nth-child(3)').text().trim();
   dblitemid=Itemid; dbitemname=Itemname;
    jquery_1_11_3_min_p('#btntaxGrp').prop("disabled", false);
   jquery_1_11_3_min_p('#btnconversion').prop("disabled", false);
   jquery_1_11_3_min_p('#btnvariantdetails').prop("disabled", false);
   jquery_1_11_3_min_p('#variantForm').css('display', 'block');
        jquery_1_11_3_min_p('#variantGrid').css('display', 'none');
        jquery_1_11_3_min_p('#btnsubmit').css('display', 'block');
        jquery_1_11_3_min_p('#btnsubmit').prop("disabled", true);
         jquery_1_11_3_min_p('#btndisable').css('display', 'block');
        jquery_1_11_3_min_p('#btnback').css('display', 'block');
        jquery_1_11_3_min_p('#btnnew').css('display', 'none');
        editflag=1;
        BindGriddata(Itemid);

   
   });

   

      jquery_1_11_3_min_p('#btnTaxgrpSubmit').click(function () {
         SaveTaxGroup();
       
    });
   jquery_1_11_3_min_p('#btnconversion').click(function () {
   $("#conversionpopup").modal('show');
      jquery_1_11_3_min_p("#conversioname").text(dbitemname); 
      BindConversionDetails(dblitemid);
    });

       jquery_1_11_3_min_p('#btnclose').click(function () {
   $("#conversionpopup").modal('hide');
       
    });

     jquery_1_11_3_min_p('#btntaxGrp').click(function () {
   $("#TaxGroup").modal('show');
      jquery_1_11_3_min_p("#lblitm").text(dbitemname); 
      BindTaxGroup();
     
    });

       jquery_1_11_3_min_p('#btntaxgrpclose').click(function () {
       $("#TaxGroup").modal('hide');
       
    });

    jquery_1_11_3_min_p('#btnaddunit').click(function () {
   $("#AllLeaveRequestPopup").modal('show');
      
    });

    jquery_1_11_3_min_p('#btnclosedata').click(function () {
   $("#AllLeaveRequestPopup").modal('hide');
       
    });
  
   jquery_1_11_3_min_p('#btnsavepopupdata').click(function () {
   if(ValidateUnitGrid()==true)
 {
 SaveUnit();
 }
 });


     jquery_1_11_3_min_p('#btnconversionsub').click(function () {
     if(PopUpValidateForm()==true)
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
                 SaveConversionDetails();
                 
                  
                  }
                 });
      }
       
    });

      jquery_1_11_3_min_p('#btnsubmit').click(function () {
    if(ValidateForm()==true)
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
                 SaveItemDetails();
                 
                  
                  }
                 });
   
    }
    });


      jquery_1_11_3_min_p('#btnfinalsubmit').click(function () {
    if(ValidatevariantForm()==true)
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
                 SaveVariantDetails();
                 
                  
                  }
                 });
   
    }
    });


    //=========================================================End click===================================================
    //=========================================================Variant Click Check=========================================
    jquery_1_11_3_min_p('#btnvariantdetails').click(function () {
       
          var entityid=kendo_all_min_js("#ddlentity").val();
          var countryid=kendo_all_min_js("#ddlcountry").val();
            $("#variantPopup").modal('show');
           jquery_1_11_3_min_p("#btnaddvariants").css('display', 'block');
            jquery_1_11_3_min_p('#btnfinalsubmit').prop("disabled", true);
            BindVariantData(entityid,countryid,dblitemid);
          jquery_1_11_3_min_p("#lblvariantitemname").text(dbitemname); 

        });
    //=========================================================End Click===================================================
     jquery_1_11_3_min_p('#btnvariantclose').click(function () {
    $("#variantPopup").modal('hide');
     variantcounter=1;$('#varianttable tbody tr ').empty();jquery_1_11_3_min_p("#Divvariant").css('display', 'none');
     var entityid=kendo_all_min_js("#ddlentity").val();
     var countryid=kendo_all_min_js("#ddlcountry").val();
     BindVariantData(entityid,countryid,dblitemid);
     });

   //============================================================Variant Proceed===========================================
    jquery_1_11_3_min_p('#btnaddvariants').click(function () {
    if(ValidateVariant()==true)
    {

    jquery_1_11_3_min_p('#btnfinalsubmit').prop("disabled", false);
     jquery_1_11_3_min_p("#Divvariant").css('display', 'block');
     Bindsku();
     
     var i=0; var colname=[]; var coldata=[]; var appendtr='';var atr='';
    $('#varianttable tbody').empty();
     var appendtr='';
      appendtr +="<td><input type='checkbox' id='Checkbox4'></td> <td style='display: none;'><label class='getsku'>"+SKUCOUNT+" </label></td>";
     //============================================================Column Generate============================================
     jQuery.each(checkeddatajson.Table, function (rec) {
     var id="chkvariant_"+checkeddatajson.Table[i].Variantid;
     var variantlabelid="chkvariantlabel_"+checkeddatajson.Table[i].Variantid;
      var listdata="variantnameapend_"+checkeddatajson.Table[i].Variantid;
      if($('#'+id).is(':checked'))
      {
       colname.push(jquery_1_11_3_min_p('#'+variantlabelid).html());
       var variantid="ddlVariant_"+checkeddatajson.Table[i].VarinatName+variantcounter;
        appendtr +="<td><input type='text'  id='"+variantid+"' class='Operator form-control'></td>";
      }
     i++;
     });
     
     if(colname !=[])
     {
     var appendth='';
      $('#varianttable thead tr').empty();
     appendth +="<th><input type='checkbox' id='chkAll' >All</th>";
      for (var j = 0; j < colname.length; j++) {
      appendth +="<th>"+colname[j]+"</th> ";
     
      }
       $('#varianttable thead tr').append(appendth);
        atr="<tr>"+appendtr+"</tr>"; $('#varianttable tbody ').append(atr);
       //=====================================================End Column Generation=================================================
   //===========================================Insert TD in TR======================================================================
    var i=0;
   //  $('#varianttable tbody tr').append(appendth);
   

    jQuery.each(checkeddatajson.Table, function (rec) {
     var id="chkvariant_"+checkeddatajson.Table[i].Variantid;
     var variantlabelid="chkvariantlabel_"+checkeddatajson.Table[i].Variantid;
      var listdata="variantnameapend_"+checkeddatajson.Table[i].Variantid;
      if($('#'+id).is(':checked'))
      {
       coldata.push({ value: "0", text: "Select" });
       $(jquery_1_11_3_min_p('#'+listdata).find('span')).each(function( ) {
       var temdata=  $(this).text().trim();
        if(temdata !='')
        {
        coldata.push({ value: temdata, text: temdata });
        
       }
    });
    }
   var colid='';
  colid="ddlVariant_"+checkeddatajson.Table[i].VarinatName+variantcounter;
    kendo_all_min_js('#'+colid).kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: coldata,
        change: function () {
        kendo_all_min_js('#'+colid).data("kendoDropDownList").span.css('background', 'none');
        },
         popup: {
            appendTo: "#variantPopup"
        }
    });
    coldata=[];
    i++;
    });
   
   //============================================End Insertion======================================================================

     }
    }
    });
   //============================================================End Variant Proceed Click================================
   
});


function ValidateUnitGrid() {
    var allow = true;
    var i = 1;
     
    jquery_1_11_3_min_p('#tblpopupdata tbody').find('tr').each(function () {
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


function AddRow() {
    if (counter == 0) {
        counter++;
    }
    if ((jquery_1_11_3_min_p("#txtUnit_" + counter).val() != "") && (jquery_1_11_3_min_p("#txtDesc_" + counter).val() != "")) {
        var rowID = counter + 1;
        var markup = "<tr><td style='display:none'>" + rowID + "</td><td><input type='checkbox' class='chk_All' id='chk_" + rowID + "'></td><td ><input type='text' class='' id='txtUnit_" + rowID + "' onkeypress='RemoveClass(this)' onkeyup='' autocomplete='off' placeholder='' /></td><td ><input type='text' id='txtDesc_" + rowID + "' class=''   onkeypress='RemoveClass(this)'   autocomplete='off'/></td></tr>";
        jquery_1_11_3_min_p("#tblpopupdata tbody").append(markup);
        kendo_all_min_js("#txtUnit_" + rowID).focus();
        counter = rowID;
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
    jquery_1_11_3_min_p('#tblpopupdata tbody').find('tr').each(function () {
    var row = jquery_1_11_3_min_p(this);
    var  FieldId= row.find('td:nth-child(1)').text().trim();
    var Unit=jquery_1_11_3_min_p("#txtUnit_" + row.find('td:nth-child(1)').text().trim()).val();
    var Description= jquery_1_11_3_min_p("#txtDesc_" + row.find('td:nth-child(1)').text().trim()).val();
    if(editFlag==0)
    {
    UnitArr.push({ Unit: Unit, Description: Description, CreatedBy: CreatedBy });
   }
   else{
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
            window.location.replace("ItemCreate.aspx");
            });
            }
            else
            {
             swal("Updated Successfully","Your data Updated successfully!","success")
            .then((value) => {
            // window.location.replace("AddressFields.aspx");
            });
            }
        }
    });

}

function AddVariantRow()
{
      var validationflag=0;

        var i=0;
        jQuery.each(checkeddatajson.Table, function (rec) {
         var variantid="ddlVariant_"+checkeddatajson.Table[i].VarinatName+variantcounter;
         if(kendo_all_min_js('#'+variantid).val()==0)
         {
         
         kendo_all_min_js('#'+variantid).data("kendoDropDownList").span.css('background', '#f9e5e5');
         validationflag=1;
          
         }
         i++;
        });

        if(validationflag==0)
        {

      variantcounter=variantcounter+1;
     var i=0; var coldata=[]; var appendtr='';var atr='';
     var appendtr='';
     var skudata=SKUCOUNT.split('-');
     var sku=AdditionValue(skudata[1]);
     var newsku=skudata[0]+'-'+sku;
     SKUCOUNT=newsku;
      appendtr +="<td><input type='checkbox' id='Checkbox4'></td> <td style='display: none;'><label class='getsku'>"+newsku+" </label></td>";
     //============================================================Column Generate============================================
     jQuery.each(checkeddatajson.Table, function (rec) {
     var id="chkvariant_"+checkeddatajson.Table[i].Variantid;
      var listdata="variantnameapend_"+checkeddatajson.Table[i].Variantid;
      if($('#'+id).is(':checked'))
      {
       
       var variantid="ddlVariant_"+checkeddatajson.Table[i].VarinatName+variantcounter;
        appendtr +="<td><input type='text'  id='"+variantid+"' class='Operator form-control'></td>";
      }
     i++;
     });
        atr="<tr>"+appendtr+"</tr>"; $('#varianttable tbody ').append(atr);
       //=====================================================End Column Generation=================================================
   //===========================================Insert TD in TR======================================================================
    var i=0;
  jQuery.each(checkeddatajson.Table, function (rec) {
     var id="chkvariant_"+checkeddatajson.Table[i].Variantid;
     var variantlabelid="chkvariantlabel_"+checkeddatajson.Table[i].Variantid;
      var listdata="variantnameapend_"+checkeddatajson.Table[i].Variantid;
      if($('#'+id).is(':checked'))
      {
       coldata.push({ value: "0", text: "Select" });
       $(jquery_1_11_3_min_p('#'+listdata).find('span')).each(function( ) {
       var temdata=  $(this).text().trim();
        if(temdata !='')
        {
        coldata.push({ value: temdata, text: temdata });
        
       }
    });
    }
   var colid='';
  colid="ddlVariant_"+checkeddatajson.Table[i].VarinatName+variantcounter;
    kendo_all_min_js('#'+colid).kendoDropDownList({
        filter: "contains",
        // optionLabel: "Select",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: coldata,
        change: function () {
        kendo_all_min_js('#'+colid).data("kendoDropDownList").span.css('background', 'none');

        },
         popup: {
            appendTo: "#variantPopup"
        }
    });
    coldata=[];
    i++;
    });
   
   //============================================End Insertion======================================================================
   }


  
}



function SaveItemDetails()
{

var cartprice='';
if(jquery_1_11_3_min_p("#txtcartprice").val().trim()=='')
{
cartprice=0;
}
else
{
cartprice=jquery_1_11_3_min_p("#txtcartprice").val().trim();
}

var Itemdetails=[];
var ItemJson='';
  Itemdetails.push({ItemName:jquery_1_11_3_min_p("#txtitemname").val(), ItemGroup: kendo_all_min_js("#txtitemgroup").val(), ItemType: kendo_all_min_js("#txtitemtype").val(), Description: jquery_1_11_3_min_p("#txtdescription").val(),CartPrice: cartprice,CreatedBy: jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim(),EntityId: kendo_all_min_js("#ddlentity").val(),Countryid: kendo_all_min_js("#ddlcountry").val(),track: kendo_all_min_js("#ddltracking").val(),itemcode: jquery_1_11_3_min_p("#txtitemcode").val().trim()});
  ItemJson=JSON.stringify(Itemdetails);
  

  var Baseunitdetails=[];
var  BaseunitJson='';
  Baseunitdetails.push({BaseUnit:kendo_all_min_js("#ddlunit").val(),CreatedBy: jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim(),EntityId: kendo_all_min_js("#ddlentity").val(),Countryid: kendo_all_min_js("#ddlcountry").val()});
  BaseunitJson=JSON.stringify(Baseunitdetails);
  


  var Otherunit=[];
  var otherunitjson='';
  var Otherunitdata=$("#hf").val().split(',');
  for(var i=1;i<Otherunitdata.length-1;i++)
  {
   Otherunit.push({BaseUnit:kendo_all_min_js("#ddlunit").val(),Otherunit:Otherunitdata[i],EntityId: kendo_all_min_js("#ddlentity").val(),Countryid: kendo_all_min_js("#ddlcountry").val(),CreatedBy: jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim()});
  }
    otherunitjson=JSON.stringify(Otherunit);

   jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Item.asmx/Insertitem",
    data: "{'Itemjson':'" + ItemJson + "','Otherunit':'" + otherunitjson + "','BaseUnit':'" + BaseunitJson + "'}",
    dataType: "json",
    async: false,
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
           // swal("Saved Successfully","Item Saved successfully!","success")
              if(jsonData.Table[0].Response=="1")
              {
             swal("Saved Successfully","Item Saved successfully!","success")
            .then((value) => {
             window.location.replace("ItemCreate.aspx");
            });
            }
        }
    });



}

function SaveVariantDetails()
{
  var skudata=[]; var skujsondata=''; var skunum='';
//  if($('#chkvariant').is(':checked'))
//  {
     var i = 1; 
    
     var length1=jquery_1_11_3_min_p('#varianttable tbody tr td').length-2;
     jquery_1_11_3_min_p('#varianttable tbody').find('tr').each(function () {
      var row = jquery_1_11_3_min_p(this);
     
     var x=0; 
     jQuery.each(checkeddatajson.Table, function (rec) {
      var id="chkvariant_"+checkeddatajson.Table[x].Variantid;
      if($('#'+id).is(':checked'))
      {
     var variantid="ddlVariant_"+checkeddatajson.Table[x].VarinatName+i;
    
//     if(x<=length1-1)
//     {
      
      skunum +=  kendo_all_min_js('#'+variantid).data("kendoDropDownList").text() +' ';
    //  }
       
       }
       x++;
       });
       

      skudata.push({Skucode:row.find('td:nth-child(2)').text().trim(),Skuname:skunum,EntityId: kendo_all_min_js("#ddlentity").val(),Countryid: kendo_all_min_js("#ddlcountry").val(),CreatedBy: jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim()});
      skunum='';
    i++;
    });
   
   skujsondata=JSON.stringify(skudata);
  //  }

   jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Item.asmx/SkuInsertitem",
    data: "{'Skujson':'" + skujsondata + "','itemid':'" + dblitemid + "'}",
    dataType: "json",
    async: false,
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
              if(jsonData.Table[0].Response=="1")
              {
             swal("Saved Successfully","SKU Saved successfully!","success")
            .then((value) => {
 
 //$("#variantPopup").modal('hide');
 variantcounter=1;$('#varianttable tbody tr ').empty();jquery_1_11_3_min_p("#Divvariant").css('display', 'none');
   var entityid=kendo_all_min_js("#ddlentity").val();
     var countryid=kendo_all_min_js("#ddlcountry").val();
     BindVariantData(entityid,countryid,dblitemid);

            });
            }
        }
    });



}





function SaveConversionDetails()
{

var Conversiondetails=[];
var conversionJson='';
  Conversiondetails.push({ItemId:dblitemid, Value: jquery_1_11_3_min_p("#txtvalue").val(), ToUnit: kendo_all_min_js("#ddlBaseunit").val(), FromUnit: kendo_all_min_js("#ddlfromunit").val(),ConvertedValue: jquery_1_11_3_min_p("#txtconverted").val(),Countryid: kendo_all_min_js("#ddlcountry").val(),EntityId: kendo_all_min_js("#ddlentity").val(),CreatedBy: jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim()});
  conversionJson=JSON.stringify(Conversiondetails);
  
   jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Item.asmx/SaveUnitConversion",
    data: "{'UnitConversionJson':'" + conversionJson + "'}",
    dataType: "json",
    async: false,
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
             if(jsonData.Table[0].Response=="1")
              {
            swal("Saved Successfully","Conversion saved successfully!","success")
            jquery_1_11_3_min_p("#txtvalue").val('');
            kendo_all_min_js("#ddlfromunit").data("kendoDropDownList").value(0);
            jquery_1_11_3_min_p("#txtconverted").val('');
            BindConversionDetails(dblitemid);
            }
            else
            {
            swal("exists","Conversion already exists!","success")
            }
        }
    });



}



function BindConversionDetails(dblitemid)
{
   jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Item.asmx/BindUnitConversion",
    data: "{'ItemId':'" + dblitemid + "'}",
    dataType: "json",
    async: false,
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
           var i=0;
         var  counter=1;
         $('#tblpopunit tbody tr ').empty();
      jQuery.each(jsonData.Table, function (rec) {
       var rowID = counter + 1;
       var markup = "<tr><td><input type='checkbox' id='cb_" + rowID + "' class='checkbox'/></td><td>"+jsonData.Table[i].Value+"</td><td>"+jsonData.Table[i].Fromunit+"</td><td>"+jsonData.Table[i].Tounit+"</td><td>"+jsonData.Table[i].ConvertedValue+"</td> </tr>";
        jquery_1_11_3_min_p("#tblpopunit tbody").append(markup);
         counter = rowID;
         i++;
      });

        }
    });



}







function Bindsku()
{
    var countryid=kendo_all_min_js("#ddlcountry").data("kendoDropDownList").value();
     var entityid=kendo_all_min_js("#ddlentity").data("kendoDropDownList").value();
    jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Item.asmx/BindSKU",
    data: "{'EntityId':" + entityid + ",'CountryId':" + countryid + "}",
    dataType: "json",
    async: false,
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
           SKUCOUNT=jsonData.Table[i].SKU;
        }
    });
}








function PopUpValidateForm() {
    var allow = true;
       if(jquery_1_11_3_min_p("#txtvalue").val()=='')
       {
         jquery_1_11_3_min_p("#txtvalue").addClass("validate");
            allow = false;
       }
         if (kendo_all_min_js("#ddlfromunit").val() == 0) {
            kendo_all_min_js("#ddlfromunit").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }

         if(jquery_1_11_3_min_p("#txtconverted").val()=='')
       {
         jquery_1_11_3_min_p("#txtconverted").addClass("validate");
            allow = false;
       }

      
        return allow;

        }




function ValidateForm() {
    var allow = true;
    var i = 1;
     if (kendo_all_min_js("#ddlentity").val() == 0) {
            kendo_all_min_js("#ddlentity").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
       if(jquery_1_11_3_min_p("#txtitemname").val()=='')
       {
         jquery_1_11_3_min_p("#txtitemname").addClass("validate");
           jquery_1_11_3_min_p("#txtitemname").attr("placeholder", "Enter Item Name!");
            allow = false;
       }

       if(jquery_1_11_3_min_p("#txtitemcode").val()=='')
       {
         jquery_1_11_3_min_p("#txtitemcode").addClass("validate");
           jquery_1_11_3_min_p("#txtitemcode").attr("placeholder", "Enter Item Name!");
            allow = false;
       }
       if (kendo_all_min_js("#txtitemgroup").val() == 0) {
            kendo_all_min_js("#txtitemgroup").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
         if (kendo_all_min_js("#txtitemtype").val() == 0) {
            kendo_all_min_js("#txtitemtype").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }

        if (kendo_all_min_js("#ddlunit").val() == 0) {
            kendo_all_min_js("#ddlunit").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
          if (kendo_all_min_js("#ddlotherunits").val() == 0) {
            kendo_all_min_js("#ddlotherunits").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
          if (kendo_all_min_js("#ddltracking").val() == 0) {
            kendo_all_min_js("#ddltracking").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }


    return allow;
}


function ValidatevariantForm() {
    var allow = true;
   var validationflag=0;
    var i=0;
    jQuery.each(checkeddatajson.Table, function (rec) {
         var variantid="ddlVariant_"+checkeddatajson.Table[i].VarinatName+variantcounter;
         if(kendo_all_min_js('#'+variantid).val()==0)
         {
         
         kendo_all_min_js('#'+variantid).data("kendoDropDownList").span.css('background', '#f9e5e5');
         validationflag=1;
          allow = false;
         }
         i++;
        });

    return allow;
}






function ValidateVariant() {
    var allow = true;
    var i = 1;
     if (kendo_all_min_js("#ddlentity").val() == 0) {
            kendo_all_min_js("#ddlentity").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
//       if($('#chkvariant').is(':checked'))
//       {
        var x=0; var istrue=0;
        jQuery.each(checkeddatajson.Table, function (rec) {
         var id="chkvariant_"+checkeddatajson.Table[x].Variantid;
         if($('#'+id).is(':checked'))
         {
         istrue=1;
         }
         x++;
        });
        if(istrue==0)
        {
        var x=0;
           jQuery.each(checkeddatajson.Table, function (rec) {
           var id="chkvariant_"+checkeddatajson.Table[x].Variantid;
         $('#'+id).addClass("validate");
          swal("No Variant selected","Please select Variant !", "warning")
          allow = false;
           x++;
          });
         
        }
         if(istrue==1)
        {
        var x=0;
           jQuery.each(checkeddatajson.Table, function (rec) {
           var variantinput="txtvariantvalue_"+checkeddatajson.Table[x].Variantid;
           var variantappend="variantnameapend_"+checkeddatajson.Table[x].Variantid;
            var id="chkvariant_"+checkeddatajson.Table[x].Variantid;
             if($('#'+id).is(':checked'))
             {
//             if( $('#'+variantappend).val()=='')
//             {
//          $('#'+variantappend).addClass("validate");
//          }
          if( $('#'+variantappend).text().length == 0)
          {
            $('#'+variantappend).addClass("validate");
             swal("No Variant selected","Please select Variant !", "warning")
            allow = false;
            }
          
           }
         
           x++;
          });
         
      //  }


       }

        i++;
   
    return allow;
}


function PopupRemoveClassItem(data) {
   
       if(jquery_1_11_3_min_p("#txtvalue").val()=='')
       {
         jquery_1_11_3_min_p("#txtvalue").addClass("validate");
            allow = false;
       }
       else
       {
       jquery_1_11_3_min_p("#txtvalue").removeClass('validate');
       }
         if (kendo_all_min_js("#ddlfromunit").val() == 0) {
            kendo_all_min_js("#ddlfromunit").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }

         if(jquery_1_11_3_min_p("#txtconverted").val()=='')
       {
         jquery_1_11_3_min_p("#txtconverted").addClass("validate");
            allow = false;
       }
       else
       {
       jquery_1_11_3_min_p("#txtconverted").removeClass('validate');
       }

       }



function RemoveClassItem() {
   
       if(jquery_1_11_3_min_p("#txtitemname").val()=='')
       {
         jquery_1_11_3_min_p("#txtitemname").addClass("validate");
           jquery_1_11_3_min_p("#txtitemname").attr("placeholder", "Enter Item Name!");
       }
       else
       {
       jquery_1_11_3_min_p("#txtitemname").removeClass('validate');
       }


        if(jquery_1_11_3_min_p("#txtitemcode").val()=='')
       {
         jquery_1_11_3_min_p("#txtitemcode").addClass("validate");
           jquery_1_11_3_min_p("#txtitemcode").attr("placeholder", "Enter Item Name!");
       }
       else
       {
       jquery_1_11_3_min_p("#txtitemcode").removeClass('validate');
       }

//          if(jquery_1_11_3_min_p("#txtdescription").val()=='')
//       {
//         jquery_1_11_3_min_p("#txtdescription").addClass("validate");
//           jquery_1_11_3_min_p("#txtdescription").attr("placeholder", "Enter Description!");
//            
//       }
//       else
//       {
//        jquery_1_11_3_min_p("#txtdescription").removeClass('validate');
//       }


//         if(jquery_1_11_3_min_p("#txtcartprice").val()=='')
//       {
//         jquery_1_11_3_min_p("#txtcartprice").addClass("validate");
//           jquery_1_11_3_min_p("#txtcartprice").attr("placeholder", "Enter Cart Price!");
//       }
//       else
//       {
//       jquery_1_11_3_min_p("#txtcartprice").removeClass('validate');
//       }

       
}




function BindFormdetails() {
    var Country = []; var Entity = []; var BaseUnits = []; var OtherUnits = []; var jsonData =''; var tracking =[];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Item.asmx/BindEntitydDetails",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
           jsonData = eval(result.d);
           unitjson=eval(result.d);
           
         
            var i = 0;
          //  SKUCOUNT= jsonData.Table6[i].totalcount;
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
            var i = 0;
            BaseUnits.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table4, function (rec) {
                BaseUnits.push({ value: jsonData.Table4[i].Unitid, text: jsonData.Table4[i].Unitname });
                i++;
            });
             var i = 0;
            OtherUnits.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table5, function (rec) {
                OtherUnits.push({ value: jsonData.Table5[i].Unitid, text: jsonData.Table5[i].Unitname });
                i++;
            });

             var i = 0;
            tracking.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table6, function (rec) {
                tracking.push({ value: jsonData.Table6[i].Trackingid, text: jsonData.Table6[i].TrackingName });
                i++;
            });

            
        },
        error: function (result) {
        }
    });

   Groups = [];
   Groups.push({ value: "0", text: "Select" });
    kendo_all_min_js("#txtitemgroup").kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Groups,
         change: function () {
            kendo_all_min_js('#txtitemgroup').data("kendoDropDownList").span.css('background', 'none');
        }
    });

   Itemtype = [];
    Itemtype.push({ value: "0", text: "Select" });
    kendo_all_min_js("#txtitemtype").kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Itemtype,
         change: function () {
            kendo_all_min_js('#txtitemtype').data("kendoDropDownList").span.css('background', 'none');
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

     kendo_all_min_js('#ddltracking').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: tracking,
        change: function () {
            kendo_all_min_js('#ddltracking').data("kendoDropDownList").span.css('background', 'none');
        }
    });


    kendo_all_min_js('#ddlentity').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Entity,
        change: function () {
            kendo_all_min_js('#ddlentity').data("kendoDropDownList").span.css('background', 'none');
            var entityid=kendo_all_min_js("#ddlentity").val();
            var countryid=kendo_all_min_js("#ddlcountry").val();
             jquery_1_11_3_min_p("#chkvariant").attr('disabled', false);
              var i = 0;  Groups = [];
            jQuery.each(jsonData.Table2, function (rec) {
               if(jsonData.Table2[i].Entityid==entityid && jsonData.Table2[i].Countryid==countryid)
               {
                Groups.push({ value: jsonData.Table2[i].GroupId, text: jsonData.Table2[i].GroupName });
                }
                i++;
            });
          

           Groups.push({ value: "0", text: "Select" });
         kendo_all_min_js("#txtitemgroup").kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Groups,
         change: function () {
            kendo_all_min_js('#txtitemgroup').data("kendoDropDownList").span.css('background', 'none');
        }
        });
         var i = 0;  Itemtype = [];
            jQuery.each(jsonData.Table3, function (rec) {
                Itemtype.push({ value: jsonData.Table3[i].Itemtypeid, text: jsonData.Table3[i].Itemtype });
                i++;
            });
         
    Itemtype.push({ value: "0", text: "Select" });
    kendo_all_min_js("#txtitemtype").kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Itemtype,
         change: function () {
            kendo_all_min_js('#txtitemtype').data("kendoDropDownList").span.css('background', 'none');
        }
    });



        }
    });
    kendo_all_min_js('#ddlunit').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: BaseUnits,
        change: function () {
            kendo_all_min_js('#ddlunit').data("kendoDropDownList").span.css('background', 'none');
            $("#hf").val('');parentunitype=0;parentUnitclass=0;otherunitype=0;otherUnitclass=0;
            var baseunit=kendo_all_min_js('#ddlunit').val();
            var i=0;
             jQuery.each(jsonData.Table4, function (rec) {
              if(jsonData.Table4[i].Unitid==baseunit)
              {
              parentunitype=jsonData.Table4[i].Unittype;
              parentUnitclass=jsonData.Table4[i].Unitclass;
              }
              i++;
             });
             var kk=[];
             var dataSource1  =  jquery_1_11_3_min_p('#ddlotherunits').data("kendoDropDownList");
            dataSource1.setDataSource(kk); // clears dataSource
         kendo_all_min_js('#ddlotherunits').kendoDropDownList({
        //name: "OtherUnit1",
        checkboxes: true,
        dataTextField: "text",
        dataValueField: "value",
        dataSource: OtherUnits,
        filter: "contains",
        template: "<input type='checkbox' id='chk_OtherUnit_#=data.value #' class='clsSkillInner' value='#=data.value #' name='OtherUnit' />" + " " + "${ data.text }",  
        close: onClose,  
        dataBound: onOtherUnitBound,
        change: function () {
        kendo_all_min_js('#ddlotherunits').data("kendoDropDownList").span.css('background', 'none');
       
       }

    });


        }
    });
     kendo_all_min_js('#ddlotherunits').kendoDropDownList({
        //name: "OtherUnit1",
        checkboxes: true,
        dataTextField: "text",
        dataValueField: "value",
        dataSource: OtherUnits,
        filter: "contains",
        template: "<input type='checkbox' id='chk_OtherUnit_#=data.value #' class='clsSkillInner' value='#=data.value #' name='OtherUnit' />" + " " + "${ data.text }",  
        close: onClose,  
        dataBound: onOtherUnitBound,
        change: function () {
        kendo_all_min_js('#ddlotherunits').data("kendoDropDownList").span.css('background', 'none');
       
       }

    });
}

function onOtherUnitBound(e) {  
 
    $(".clsSkillInner").on("click", function (e) {  
        var obj = this;  
        var id = $(obj).attr('id');  
        var name = 'OtherUnit';
        var value = $(obj).attr('value');  
        var IsChecked = $(obj).is(':checked');  
        var hf = $("#hf").get(0);  
        
        if(kendo_all_min_js("#ddlunit").val()==0)
        {
        jquery_1_11_3_min_p("#"+id).prop( "checked", false );
        kendo_all_min_js('#ddlotherunits').data("kendoDropDownList").value(0);
        swal("Base unit not selected","Please select base unit!", "warning")
        }
        else
        {
        if (value != 0) {  

//               var i=0;
//             jQuery.each(unitjson.Table5, function (rec) {
//              if(unitjson.Table5[i].Unitid==value)
//              {
//              otherunitype=unitjson.Table5[i].Unittype;
//              otherUnitclass=unitjson.Table5[i].Unitclass;
//              }
//              i++;
//             });
//           
//             if(parentUnitclass==otherUnitclass)
//             {
//              jquery_1_11_3_min_p("#"+id).prop( "checked", false );
//             
//              var Otherunitdata=$("#hf").val().split(',');
//              var lastelement=Otherunitdata[1];
//               kendo_all_min_js('#ddlotherunits').data("kendoDropDownList").value(lastelement);
//              swal("Not allowed","Same unit class not allowed!", "warning")
//               return false;
//             }
//             else
//             {
             // return true;
            UpdateIdInHiddenField(hf, value, IsChecked);  
            var totalchk = $('input[id*="chk_' + name + '"]').not("#chk_" + name + "_0").length;  
            var checkedchk = $('input[id*="chk_' + name + '"]:checked').not("#chk_" + name + "_0").length;  
  
            if (totalchk == checkedchk) {  
                $("#chk_" + name + "_0").prop("checked", true);  
            }  
            else {  
                $("#chk_" + name + "_0").prop("checked", false);  
            } 
             
            SkillCount = $("#hf").val().split(',').length - 1;  
          //  }

        }  
        else {  
  
        }  
        IsItemChecked = true;  
        }

        if(kendo_all_min_js("#ddlunit").val()==0)
        {
        return false;
        }
        else
        {
        return true;
        }
        
    });  
    bindSkillChk();  

}

function bindSkillChk(){  
       var chkInner = $("#hf").val().split(',');  
       chkInner=chkInner.filter(a=>a!='');  
       $.each(chkInner, function (index, data) {  
           $('input[id*="chk_OtherUnit_' + data + '"]').prop("checked", true);  
       })  
   }  
  
  
   function onClose(e) {  
       if (IsItemChecked == true) {  
           IsItemChecked = false;  
           e.preventDefault();  
       }  
       else {  
            
              if(kendo_all_min_js("#ddlunit").val()==0)
             { 
              kendo_all_min_js('#ddlotherunits').data("kendoDropDownList").value(0);
             swal("Base unit not selected","Please select base unit!", "warning")
             }
             else
             {
             if(editflag==0)
             {
             var Otherunitdata=$("#hf").val().split(',');
             var getlastele=Otherunitdata.length-2;
               var lastelement=Otherunitdata[getlastele];
               if(lastelement=='' || lastelement==undefined)
               {
                kendo_all_min_js('#ddlotherunits').data("kendoDropDownList").value(0);
               }
               else
               {
                kendo_all_min_js('#ddlotherunits').data("kendoDropDownList").value(lastelement);
               }
               }

             }
       }  
   }  
 
   var IsItemChecked = false;  
   function UpdateIdInHiddenField(hf, id, IsAdd) {  
       if (hf.value == "") {  
           hf.value = ",";  
       }  
  
       if (IsAdd == true) {  
           if (hf.value.indexOf("," + id + ",") == -1) {  
               hf.value = hf.value + id + ",";  
           }  
       }  
       else if (IsAdd == false) {  
           if (hf.value.indexOf("," + id + ",") >= 0) {  
               hf.value = hf.value.replace("," + id + ",", ",");  
           }  
       }  
  
   }  





function BindGriddata(itemid) {
    var Country = []; var Entity = []; var BaseUnits = []; var OtherUnits = []; var jsonData ='';var otherunitname=[];var tracking =[];var dataatzeo=''; var alldataatzeo='';
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Item.asmx/Binddoubleclickdata",
        data: "{'Itemid':'" + itemid + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
           jsonData = eval(result.d);
           
           
         
            var i = 0;
          //  SKUCOUNT= jsonData.Table6[i].totalcount;
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
            var i = 0;
            BaseUnits.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table4, function (rec) {
                BaseUnits.push({ value: jsonData.Table4[i].Unitid, text: jsonData.Table4[i].Unitname });
                i++;
            });

      var i=0;dataatzeo='';
      jQuery.each(jsonData.Table8, function (rec) {
      alldataatzeo +=jsonData.Table8[i].Unitname+",";
      if(i <=1)
      {
     dataatzeo +=jsonData.Table8[i].Unitname+" , ";
     }
     else if(i ==2)
     {
     dataatzeo +=jsonData.Table8[i].Unitname+"...";
     }
       i++;
    });
    

             var i = 0;
             if(jsonData.Table8.length>0)
             {
            OtherUnits.push({ value: "0", text:dataatzeo });
            }
            else
            {
             OtherUnits.push({ value: "0", text: "Select" });
             }
            jQuery.each(jsonData.Table5, function (rec) {
                OtherUnits.push({ value: jsonData.Table5[i].Unitid, text: jsonData.Table5[i].Unitname });
                i++;
            });



            var i=0;
            otherunitname.push({ value: "0", text: "Select" });
    jQuery.each(jsonData.Table11, function (rec) {
    
      otherunitname.push({ value: jsonData.Table11[i].Otherunit, text: jsonData.Table11[i].Unitname });
    i++;
    });


    var i = 0;
            tracking.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table10, function (rec) {
                tracking.push({ value: jsonData.Table10[i].Trackingid, text: jsonData.Table10[i].TrackingName });
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

     kendo_all_min_js('#ddltracking').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: tracking,
        change: function () {
            kendo_all_min_js('#ddltracking').data("kendoDropDownList").span.css('background', 'none');
        }
    });
    
    kendo_all_min_js('#ddltracking').data("kendoDropDownList").value(jsonData.Table6[0].Itemtracking);
    kendo_all_min_js('#ddlentity').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Entity,
        change: function () {
            kendo_all_min_js('#ddlentity').data("kendoDropDownList").span.css('background', 'none');
           
        }
    });

    // var i=0;
    kendo_all_min_js('#ddlentity').data("kendoDropDownList").value(jsonData.Table6[0].EntityId);
     kendo_all_min_js('#ddlcountry').val(jsonData.Table6[0].Countryid);
       var entityid=kendo_all_min_js("#ddlentity").val();
            var countryid=kendo_all_min_js("#ddlcountry").val();
             jquery_1_11_3_min_p("#chkvariant").attr('disabled', false);
               var i = 0;  Groups = [];
            jQuery.each(jsonData.Table2, function (rec) {
               if(jsonData.Table2[i].Entityid==entityid && jsonData.Table2[i].Countryid==countryid)
               {
                Groups.push({ value: jsonData.Table2[i].GroupId, text: jsonData.Table2[i].GroupName });
                }
                i++;
            });

             Groups.push({ value: "0", text: "Select" });
         kendo_all_min_js("#txtitemgroup").kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Groups,
         change: function () {
            kendo_all_min_js('#txtitemgroup').data("kendoDropDownList").span.css('background', 'none');
        }
        });
         var i = 0;  Itemtype = [];
            jQuery.each(jsonData.Table3, function (rec) {
                Itemtype.push({ value: jsonData.Table3[i].Itemtypeid, text: jsonData.Table3[i].Itemtype });
                i++;
            });
         
    Itemtype.push({ value: "0", text: "Select" });
    kendo_all_min_js("#txtitemtype").kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Itemtype,
         change: function () {
            kendo_all_min_js('#txtitemtype').data("kendoDropDownList").span.css('background', 'none');
        }
    });



    kendo_all_min_js('#ddlunit').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: BaseUnits,
        change: function () {
            kendo_all_min_js('#ddlunit').data("kendoDropDownList").span.css('background', 'none');
        }
    });
     kendo_all_min_js('#ddlunit').data("kendoDropDownList").value(jsonData.Table7[0].BaseUnit);

        kendo_all_min_js('#ddlBaseunit').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: BaseUnits,
        change: function () {
            kendo_all_min_js('#ddlBaseunit').data("kendoDropDownList").span.css('background', 'none');
        }
    });
     kendo_all_min_js('#ddlBaseunit').data("kendoDropDownList").value(jsonData.Table7[0].BaseUnit);



     kendo_all_min_js('#ddlfromunit').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: otherunitname,
        change: function () {
         kendo_all_min_js('#ddlfromunit').data("kendoDropDownList").span.css('background', 'none');

        },
         popup: {
            appendTo: "#conversionpopup"
        }

    });


     kendo_all_min_js('#ddlotherunits').kendoDropDownList({
        checkboxes: true,
        dataTextField: "text",
        dataValueField: "value",
        dataSource: OtherUnits,
        filter: "contains",
        template: "<input type='checkbox' id='chk_OtherUnit_#=data.value #' class='clsSkillInner' value='#=data.value #' name='OtherUnit' />" + " " + "${ data.text }",  
        close: onClose,  
        dataBound: onOtherUnitBound,
        change: function () {
        kendo_all_min_js('#ddlotherunits').data("kendoDropDownList").span.css('background', 'none');
       }

    });

    //kendo_all_min_js('#ddlotherunits').data("kendoDropDownList").value(jsonData.Table8[0].Otherunit);
    jquery_1_11_3_min_p("#txtitemname").val(jsonData.Table6[0].ItemName);
    jquery_1_11_3_min_p("#txtitemcode").val(jsonData.Table6[0].ItemCode);
    jquery_1_11_3_min_p("#txtdescription").val(jsonData.Table6[0].Description)
    jquery_1_11_3_min_p("#txtcartprice").val(jsonData.Table6[0].CartPrice)
    

    var i=0;var value=''; var doubleclickdata=',';
    jQuery.each(jsonData.Table8, function (rec) {
    var id="chk_OtherUnit_"+jsonData.Table8[i].Otherunit;
     jquery_1_11_3_min_p("#"+id).prop( "checked", true );
     value=jsonData.Table8[i].Otherunit;
     doubleclickdata +=jsonData.Table8[i].Otherunit+",";
    i++;
    });
    jquery_1_11_3_min_p("#hf").val(doubleclickdata);
     kendo_all_min_js('#ddlotherunits').data("kendoDropDownList").value(0);
     kendo_all_min_js('#ddlotherunits').data("kendoDropDownList").span.attr('title',alldataatzeo);

}


function DblBindVariantData(EntityId,CountryId,getjsondata) {
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Item.asmx/BindVariantDetails",
         data: "{'EntityID':'" + EntityId + "','CountryId':'" + CountryId + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
          var jsonData = eval(result.d);
         var getdata=  getjsondata.Table9[0].Skuname.split(' ');
            var i = 0;
             jquery_1_11_3_min_p('#appendvariant').empty();
            jQuery.each(jsonData.Table, function (rec) {
              var markup="<div class='col-md-2'><div class=''><input type='checkbox' id='chkvariant_"+jsonData.Table[i].Variantid+"' onchange='valueChanged(this)' class='colorCheckbox_"+jsonData.Table[i].Variantid+"'><label id='chkvariantlabel_"+jsonData.Table[i].Variantid+"' class=''>"+jsonData.Table[i].VarinatName+" </label></div></div><div class='col-md-2' id='colorTextBox_"+jsonData.Table[i].Variantid+"' ><div class='form-group'><input type='text' onkeypress='BindVariant(this)' onkeyup='RemoveClassItemMaster(this)' name='weekday' class='form-control' id='txtvariantvalue_"+jsonData.Table[i].Variantid+"' placeholder='Enter "+jsonData.Table[i].VarinatName+"'></div></div><div class='col-md-8' id='colorListBox_"+jsonData.Table[i].Variantid+"' ><div id='variantnameapend_"+jsonData.Table[i].Variantid+"' class='VarientList'></div></div>";
              jquery_1_11_3_min_p('#appendvariant').append(markup);
             var id="chkvariant_" +jsonData.Table[i].Variantid;
            if(getdata[i].trim()==jsonData.Table[i].VarinatName)
            {
            jquery_1_11_3_min_p('#'+id).prop( "checked", true );
            }
            i++;
            });
        },
        error: function (result) {
        }
    });
}



function BindVariantData(EntityId,CountryId,itemid) {
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Item.asmx/BindVariantDetails",
         data: "{'EntityID':'" + EntityId + "','CountryId':'" + CountryId + "','Itemid':'" + itemid + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
          var jsonData = eval(result.d);
          checkeddatajson=eval(result.d);
          //===============================================For Variant append code=============================================================================
            var i = 0;
             jquery_1_11_3_min_p('#appendvariant').empty();
            jQuery.each(jsonData.Table, function (rec) {
             var markup="<div class='col-md-2'><div class=''><input type='checkbox' id='chkvariant_"+jsonData.Table[i].Variantid+"' onchange='valueChanged(this)' class='colorCheckbox_"+jsonData.Table[i].Variantid+"'><label id='chkvariantlabel_"+jsonData.Table[i].Variantid+"' class=''>"+jsonData.Table[i].VarinatName+" </label></div></div><div class='col-md-2' id='colorTextBox_"+jsonData.Table[i].Variantid+"' ><div class='form-group'><input type='text' onkeypress='BindVariant(this)' onkeyup='RemoveClassItemMaster(this)' name='weekday' class='form-control' id='txtvariantvalue_"+jsonData.Table[i].Variantid+"' placeholder='Enter "+jsonData.Table[i].VarinatName+"'></div></div><div class='col-md-8' id='colorListBox_"+jsonData.Table[i].Variantid+"' ><div id='variantnameapend_"+jsonData.Table[i].Variantid+"' class='VarientList'></div></div>";
              jquery_1_11_3_min_p('#appendvariant').append(markup);
                             i++;
            });

            //=============================================End Variant append code=================================================================================

            //==============================================For Variant details bind================================================================================
             var i = 0;
             jquery_1_11_3_min_p('#varianttablebind tbody').empty();
            jQuery.each(jsonData.Table1, function (rec) {
             var markup="<tr><td><input type='checkbox' id='chkvariantd_"+jsonData.Table1[i].Skuid+"' /></td><td>"+jsonData.Table1[i].sn+"</td><td>"+jsonData.Table1[i].Skucode+"</td><td>"+jsonData.Table1[i].Skuname+"</td></tr>";
              jquery_1_11_3_min_p('#varianttablebind tbody').append(markup);
                             i++;
            });
            //==============================================End Variant details bind================================================================================
        },
        error: function (result) {
        }
    });

   
}

function RemoveClassItemMaster(data) {
    var id = data.id;
    if (jquery_1_11_3_min_p('#' + id).val() != '') {
        jquery_1_11_3_min_p('#' + id).removeClass('validate');
    }

}



function BindVariant(Data) {
  var id = Data.id;
  var listdata="variantnameapend_"+id.split('_')[1];
  if (event.keyCode == 13) {
   $('#'+listdata).removeClass("validate");
  //===================================================Start Enter Click===============================================
        if (jquery_1_11_3_min_p('#'+id).val().trim() == '') {jquery_1_11_3_min_p('#'+id).addClass("validate");allow = false;event.preventDefault();}
        else {
        isexist=0;
         variantcount=variantcount+1;
         jquery_1_11_3_min_p('#'+listdata).append("<span id='Divremovedata_"+variantcount+"' class='kk'><label id='lblvariantSequence_"+variantcount+"' class='control-label no-padding'>" + jquery_1_11_3_min_p('#'+id).val().trim() + "</label><span class='crossimgDiv'><img src='../assets/img/cross.png' id='lnkremovevariant_"+variantcount+"' onclick='RemoveChanged(this)' class='crosswidth no-padding' /></span></span>");
         var data=[];
          $(jquery_1_11_3_min_p('#'+listdata).find('span')).each(function( ) {
           var temdata=  $(this).text().trim();
            if(temdata !='')
            {
            data.push(temdata);
            }
          });
          for(var i=0;i<data.length-1;i++)
          {
           if(jquery_1_11_3_min_p('#'+id).val().toLowerCase()==data[i].toLowerCase())
           {
            isexist=1;
            }
          }    
         jquery_1_11_3_min_p('#'+id).val('');
          if(isexist==1)
         {
         var id="Divremovedata_"+variantcount;
         $('#'+id).remove();
        swal("exists","Color already exists!","success");
     }
        }
//==================================End Enter click=================================================================
        }
}

function RemoveChanged(Data)
{
//alert(Data.id);
var removevariantdata="Divremovedata_"+Data.id.split('_')[1];
//alert(removevariantdata);
 jquery_1_11_3_min_p('#'+removevariantdata).remove();
}

function valueChanged(Data)
{
// var getdata=Data.id.split('_')[1];
// var id="chkvariant_"+getdata;
// $('#'+id).removeClass('validate');
// var colorTextBox="colorTextBox_"+getdata;
// var colorlistbox="colorListBox_"+getdata;
//  if ($('#'+id).is(":checked")) {
//  jquery_1_11_3_min_p('#'+colorTextBox).css('display', 'block');
// jquery_1_11_3_min_p('#'+colorlistbox).css('display', 'block');
// //variantcount=0;
//  }
//  else
//  {
//   jquery_1_11_3_min_p('#'+colorTextBox).css('display', 'none');
//   jquery_1_11_3_min_p('#'+colorlistbox).css('display', 'none');
//  // $( ".kk span" ).remove();
//  var deletedata="variantnameapend_"+getdata;
//  var deldata="txtvariantvalue_"+getdata;
//  $('#'+deletedata).find('span').remove();
//    $('#'+deldata).find('span').remove();
//    //Tempvariantcount=1;
////   var removevariantdata="Divremovedata_"+Data.id.split('_')[1];
////jquery_1_11_3_min_p('#variantnameapend_' span').remove();

//  }
}


function Comparevalue(data) {
    var id = data.id;
    var val = jquery_1_11_3_min_p('#' + id).val();
    var re = /^([0-9]+[\.]?[0-9]?[0-9]?[0-9]?|[0-9]+)$/g;
    var re1 = /^([0-9]+[\.]?[0-9]?[0-9]?[0-9]?|[0-9]+)/g;
    if (re.test(val)) {
        //do something here

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

}



function AdditionValue(Num)
{
var result = Number(Num) + 1;
 if ( result < 10 ) {
            return "000000" + result;
        } else {
            return "00000"+ result;
        }
         if ( result < 100 ) {
            return "000000" + result;
        } else {
            return "0000"+ result;
        }
         if ( result < 1000 ) {
            return "000000" + result;
        } else {
            return "000"+ result;
        }
         if ( result < 10000 ) {
            return "000000" + result;
        } else {
            return "00"+ result;
        }
         if ( result < 100000 ) {
            return "000000" + result;
        } else {
            return "0"+ result;
        }
         if ( result < 1000000 ) {
            return "000000" + result;
        } else {
            return result;
        }
}



function BindItemGrid() {
 jquery_1_11_3_min_p("#ItemGrid tbody").empty();
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
    var Partners = [];

    var SearchValue = "";

  //  LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
 var LoadData=20;
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Item.asmx/BindItemGrid",
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
//            
            jQuery.each(jsonData.Table, function (rec) {
//            <td style='display:none'> " + jsonData.Table[i].FieldId + "</td>
                var markup = "<tr> <td style='display:none'> " + jsonData.Table[i].Itemid + "</td> <td> <input id='chkbox' type='checkbox' class='checkAll'  /></td><td>" + jsonData.Table[i].ItemName + "</td> <td >" + jsonData.Table[i].GroupName + "</td> <td >" + jsonData.Table[i].Itemtype + "</td> <td >" + jsonData.Table[i].CartPrice + "</td> <td >" + jsonData.Table[i].Description + "</td></tr>";

                jquery_1_11_3_min_p("#ItemGrid tbody").append(markup);

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
            var SearchDiv1 = "<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='checkAll' id='chk_" + ColumnName[j - 1] + "' onclick='checkAll(this)'><label for='check3' class='coldata'>All</label></span></div>";
            jquery_1_11_3_min_p("#DivSearch").append(SearchDiv1);
            jquery_1_11_3_min_p('#ItemGrid thead tr th').each(function () {
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


function Addclasstocolumn(Data) {
var state = $(Data).is(':checked');
   // var grid = $('#tblFields').data('kendoGrid');
    if (state == true) {
     var checkid= '#'+ Data.id;
 jquery_1_11_3_min_p('#ItemGrid thead tr ' +checkid).addClass('filter');
    }
    else
    {
     var checkid= '#'+ Data.id;
 jquery_1_11_3_min_p('#ItemGrid thead tr ' +checkid).removeClass('filter');
    }

}



function BindTaxGroup()
{
    var countryid=kendo_all_min_js("#ddlcountry").data("kendoDropDownList").value();
    var entityid=kendo_all_min_js("#ddlentity").data("kendoDropDownList").value();
    jquery_1_11_3_min_p("#divTaxGroup").empty();
    jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Item.asmx/BindTaxGroup",
    data: "{'EntityId':'" + entityid + "','CountryId':'" + countryid + "','ItemId':'"+dblitemid+"'}",
    dataType: "json",
    async: false,
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
             jQuery.each(jsonData.Table, function (rec) {
          var markup="<div class='col-md-4 '><div class='taxGroup'><input type='checkbox' id='chkTaxgrp_"+jsonData.Table[i].TaxGroupId+"' ><label id='lblTaxgrp_"+jsonData.Table[i].TaxGroupId+"' class=''>"+ jsonData.Table[i].TaxGroupName+"</label></div></div>";
           jquery_1_11_3_min_p("#divTaxGroup").append(markup);
           i++;
          });
var ch = jquery_1_11_3_min_p('#' + 'divTaxGroup').find('input[type=checkbox]');
ch.each(function () {
var check = jquery_1_11_3_min_p(this);
    id=check.attr("id");
    var grpId=id.split("_");
   var TaxGroupId=grpId[1];
    var j=0;
    jQuery.each(jsonData.Table1, function (rec) {
if (TaxGroupId==jsonData.Table1[j].TaxGroupId) {
        $("#"+id).prop("checked",true);
}
j++;
});
});

        }
    });
}


function SaveTaxGroup() {
  var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
  var countryid=kendo_all_min_js("#ddlcountry").data("kendoDropDownList").value();
    var entityid=kendo_all_min_js("#ddlentity").data("kendoDropDownList").value();
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
TaxGrp.push({ItemId:dblitemid,ItemCode:ItemCode,TaxGrpId:TaxGroupId,CountryId:countryid,EntityId:entityid,CreatedBy:CreatedBy})

}
});
if(validateFlag==1)
{
var TaxGrpjson=JSON.stringify(TaxGrp);

  jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Item.asmx/SaveTaxGroup",
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

