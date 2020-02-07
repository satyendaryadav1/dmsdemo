var Globaljson = ''; var Rowcounter = 1; var Popuptxtid = ''; var operator = []; var concatjsontableval = []; var formula = ''; var compareid = '';var checkComponent='';
var openbracketcounter = 0; var Bindformulajson='';  var subcomponentarray = []; var Operatorid = ''; var formulasyntaxid = ''; var formulavalue = ''; var ParentId = ''; var Label = ''; var TaxState = '';var searchtxt = '';var searchtxt1 = '';var dblclickTaxGroupId = 0;
jquery_1_11_3_min_p(document).ready(function () {

    //  operator.push("+", "-", "*", "/", "%", ".", "[", "]", "(", ")");
    operator.push("+", "-", "*", "/", "%", ".", "(", ")");
    jquery_1_11_3_min_p("#hdnLoad").val(30);
    jquery_1_11_3_min_p("#hdnLoad1").val(10);
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
     LoadData1 = jquery_1_11_3_min_p("#hdnLoad1").val();
    BindTaxSetupgrd(searchtxt);
    jquery_1_11_3_min_p('#btnLoadMore').click(function () {
        LoadData = parseInt(LoadData) + 10;
        jquery_1_11_3_min_p("#hdnLoad").val(LoadData);
        jquery_1_11_3_min_p('#preloader').css('display', 'block');
        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
        BindTaxSetupgrd(searchtxt);
    });
     jquery_1_11_3_min_p('#btnLoadMore1').click(function () {
        LoadData1 = parseInt(LoadData1) + 10;
        jquery_1_11_3_min_p("#hdnLoad1").val(LoadData);
       BindTaxHistoryGrd(dblclickTaxGroupId);
    });
    
      jquery_1_11_3_min_p('#btncal').click(function () {
        $('#rulesVerify').modal('show');
        BindFormula(dblclickTaxGroupId);

    });
     jquery_1_11_3_min_p('#btncloseformula').click(function () {
        $('#rulesVerify').modal('hide');
         jquery_1_11_3_min_p('#divoutput').css('display', 'none');
             jquery_1_11_3_min_p("#btnverify").attr("disabled", true); 
              jquery_1_11_3_min_p('#lblout').text('');
              kendo_all_min_js('#ddlformula').data("kendoDropDownList").value(0);
              jquery_1_11_3_min_p("#rulesVariables tbody").empty();
      //  BindFormula(dblclickTaxGroupId);

    });

    jquery_1_11_3_min_p('#btnverify').click(function () {
      if (FormulaValidation() == true) {
       Generateoutput();
      }
    });



//    jquery_1_11_3_min_p("#txtgstclose").change(function(){
//  if (jquery_1_11_3_min_p("#txtgstclose").val() != "") {
//            jquery_1_11_3_min_p("#txtgstclose").removeClass('validate');
//        }
//});
    jquery_1_11_3_min_p("#btnformSubmit").click(function () {
     if (FormValidation() == true) {
      swal({
title: "Do you want to proceed?",
text: "",
icon: "warning",
buttons: true,
dangerMode: true,
})
.then((willDelete) => {
if (willDelete) {
  saveTaxGroup();
}

});

}
    });
    jquery_1_11_3_min_p("#btnConfirm").click(function () {
     if (FormValidation() == true) {
    swal({
title: "Do you want to proceed?",
text: "",
icon: "warning",
buttons: true,
dangerMode: true,
})
.then((willDelete) => {
if (willDelete) {
UpdateRecord(dblclickTaxGroupId);
}

});
}
    });


    BindEntityCountrydDetails();
    jquery_1_11_3_min_p("#btnclosedata").click(function () {
        if (dblclickTaxGroupId == 0) {
            DeleteTempformula(ParentId, TaxState);
            jquery_1_11_3_min_p('#' + Popuptxtid).val('');
            Popuptxtid = '';
            $("#CalculatorPopup").modal('hide');
            jquery_1_11_3_min_p('#lblfinalrule').text('');
            jquery_1_11_3_min_p('.removeselect').removeClass('activeBtn');
            compareid = ''; jquery_1_11_3_min_p('#calError').text(''); formula = ''; openbracketcounter = 0; formula = ''; subcomponentarray = []; ParentId = ''; Label = ''; TaxState = '';checkComponent='';
        }
        else {
            $("#CalculatorPopup").modal('hide');
             DeleteTempformula(ParentId, TaxState);
            jquery_1_11_3_min_p('.removeselect').removeClass('activeBtn');
            Popuptxtid = '';
            compareid = ''; jquery_1_11_3_min_p('#calError').text(''); formula = ''; openbracketcounter = 0; formula = ''; subcomponentarray = []; ParentId = ''; Label = ''; TaxState = '';checkComponent='';
        }


    });

    $(document).on("dblclick", "#itemTaxtbl tbody tr", function () {
        var row = jquery_1_11_3_min_p(this);
        dblclickTaxGroupId = row.find('td:nth-child(1)').text().trim();
        jquery_1_11_3_min_p('#btnSubmit').css('display', 'block');
        jquery_1_11_3_min_p('#btnback').css('display', 'block');
        jquery_1_11_3_min_p('#btnnew').css('display', 'none');
        jquery_1_11_3_min_p('#CreateSequenceNew').css('display', 'block');
        jquery_1_11_3_min_p('#itemTaxGroupGrid').css('display', 'none');
        jquery_1_11_3_min_p('#btncal').css('display', 'block');
        ParentId = ''; TaxState = '';
        //  BindGsttails();
        jquery_1_11_3_min_p('#btnConfirm').prop('disabled', true);
        DeleteTempformula(ParentId, TaxState);
        BinddataOndblClick(dblclickTaxGroupId);

    });

    jquery_1_11_3_min_p("#btnclear").click(function () {
        jquery_1_11_3_min_p('#lblfinalrule').text('');
        jquery_1_11_3_min_p('.removeselect').removeClass('activeBtn');
        DeleteTempformula(ParentId, TaxState);
        compareid = ''; jquery_1_11_3_min_p('#calError').text(''); formula = ''; openbracketcounter = 0; formula = ''; subcomponentarray = []; Label = ''; checkComponent='';
        // ParentId = '';
        // TaxState = '';


    });

    jquery_1_11_3_min_p("#btnsubmit").click(function () {
        if (Validation() == true) {
        
            jquery_1_11_3_min_p('#calError').text('');
            jquery_1_11_3_min_p('#' + Popuptxtid).val(formula);
            $("#CalculatorPopup").modal('hide');
            jquery_1_11_3_min_p("#txtgstclose").removeClass('validate');
             jquery_1_11_3_min_p('#btnConfirm').prop('disabled', false);
             //code for remove class 
      $('#IntraDivappend input[type="text"]').each(function () { 
    if($(this).val()!="" || $(this).val()!=0)
    {
    $(this).removeClass('validate')
    }
    });
     $('#InterDivappend input[type="text"]').each(function () { 
    if($(this).val()!="" || $(this).val()!=0)
    {
    $(this).removeClass('validate')
    }
    });
        }
    });

    jquery_1_11_3_min_p("#btnnew").click(function () {
        jquery_1_11_3_min_p('#btnformSubmit').css('display', 'block');
        jquery_1_11_3_min_p('#btnConfirm').css('display', 'none');
        jquery_1_11_3_min_p('#btnback').css('display', 'block');
        jquery_1_11_3_min_p('#btnnew').css('display', 'none');
        jquery_1_11_3_min_p('#CreateSequenceNew').css('display', 'block');
        jquery_1_11_3_min_p('#itemTaxGroupGrid').css('display', 'none');
        ParentId = ''; TaxState = '';
        BindGsttails(); DeleteTempformula(ParentId, TaxState);

    });
    jquery_1_11_3_min_p("#btnback").click(function () {
    
//        jquery_1_11_3_min_p('#btnSubmit').css('display', 'none');
//        jquery_1_11_3_min_p('#btnback').css('display', 'none');
//        jquery_1_11_3_min_p('#btnnew').css('display', 'block');
//        jquery_1_11_3_min_p('#itemTaxGroupGrid').css('display', 'block');
//        jquery_1_11_3_min_p('#CreateSequenceNew').css('display', 'none');
         window.location.replace("TaxSetup.aspx");

    });

    //======================================End of Document Ready==============================================
});

function DeleteTempformula(parentId, taxState) {
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Taxgroupsetup.asmx/DeleteTempformula",
        data: "{'ParentId':'" + parentId + "','TaxState':'" + taxState + "'}",
        dataType: "json",
        async: false,
        success: function (result) {

        }
    });
}

function TempSaveformula() {
    Lab = jquery_1_11_3_min_p('#txtruleslabel').val();
    var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
    var Tempformulajson = []; var Tempformulajsonstring = '';
    Tempformulajson.push({ Operatorid: Operatorid, formulasyntaxid: formulasyntaxid, formulavalue: formulavalue.trim(), ParentId: ParentId, Label: Lab, CreatedBy: CreatedBy, TaxState: TaxState });
    Tempformulajsonstring = JSON.stringify(Tempformulajson);
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Taxgroupsetup.asmx/saveTempFormula",
        data: "{'Json':'" + Tempformulajsonstring + "'}",
        dataType: "json",
        async: false,
        success: function (result) {

        }
    });
}

function Validation() {
    var allow = true;
  
    if (openbracketcounter != 0) {
        jquery_1_11_3_min_p('#calError').text("Wrong formula");
        allow = false;
    }
    if (jquery_1_11_3_min_p('#txtruleslabel').val()=='') {
        allow = false;
        jquery_1_11_3_min_p('#txtruleslabel').addClass("validate");
    }
    if (jquery_1_11_3_min_p('#lblfinalrule').text() == '') {
        jquery_1_11_3_min_p('#calError').text("Generate formula");
        allow = false;
    }
     if(checkComponent=='')
   {
    jquery_1_11_3_min_p('#calError').text("Please enter atleast one component");
        allow = false;
   }

    return allow;
}

function RemoveValidation() {
    jquery_1_11_3_min_p('#txtruleslabel').removeClass("validate");
    jquery_1_11_3_min_p('#calError').text('');
}

function BindGsttails() {
    var GST = []; var countryid = kendo_all_min_js("#ddlcountry").val(); 
    ;var Taxtype = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Taxgroupsetup.asmx/BindGst",
        data: "{'Countryid':'" + countryid + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
            Globaljson = eval(result.d);
            var i = 0;
            //   GST.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {
                GST.push({ value: jsonData.Table[i].TaxSetupInfoId, text: jsonData.Table[i].FieldName });
                i++;
            });
            var i = 0;
          //  Taxtype.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table2, function (rec) {
                Taxtype.push({ value: jsonData.Table2[i].Taxtyeid, text: jsonData.Table2[i].Taxtype });
                i++;
            });

            kendo_all_min_js('#ddlgst').kendoDropDownList({
                filter: "contains",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: GST,
                change: function () {
                    kendo_all_min_js('#ddlgst').data("kendoDropDownList").span.css('background', 'none');
                    BindSubComponenets();
                }
            });

            kendo_all_min_js('#ddltaxtype').kendoDropDownList({
                filter: "contains",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: Taxtype,
                change: function () {
                    kendo_all_min_js('#ddltaxtype').data("kendoDropDownList").span.css('background', 'none');
                    BindSubComponenets();
                }
            });

            BindSubComponenets();

        }
    });
}



function BindSubComponenets() {
    
    if (Globaljson != '') {
        var i = 0; jquery_1_11_3_min_p("#IntraDivappend").empty(); jquery_1_11_3_min_p("#InterDivappend").empty();
        jQuery.each(Globaljson.Table1, function (rec) {
            if (Globaljson.Table1[i].TaxSetupInfoId == kendo_all_min_js("#ddlgst").data("kendoDropDownList").value()) {
                var markup = "<div class='col-md-12'><div class='input-group input-group-sm'><div class='input-group-prepend'><span class='input-group-text'>" + Globaljson.Table1[i].SUBCOMPONENTNAME + "</span></div><input type='text' id='txtintrasubcomponent_" + Globaljson.Table1[i].GSTSUBID + "_1" + "' class='form-control' readonly='readonly' placeholder='Formula' onclick='Showpopup(this)'><label id='txt_" + Globaljson.Table1[i].GSTSUBID + "' style='Display:none'>" + Globaljson.Table1[i].SUBCOMPONENTNAME + "</label></div></div>";
                jquery_1_11_3_min_p("#IntraDivappend").append(markup);
//                if (Globaljson.Table1[i].SUBCOMPONENTNAME == "IGST") {
//                    $("#txtintrasubcomponent_" + Globaljson.Table1[i].GSTSUBID + "_1").val(0);
//                    $("#txtintrasubcomponent_" + Globaljson.Table1[i].GSTSUBID + "_1").prop("disabled", true);

//                }
                var markup1 = "<div class='col-md-12'><div class='input-group input-group-sm'><div class='input-group-prepend'><span class='input-group-text'>" + Globaljson.Table1[i].SUBCOMPONENTNAME + "</span></div><input type='text' id='txtintersubcomponent_" + Globaljson.Table1[i].GSTSUBID + "_2" + "' class='form-control' readonly='readonly' placeholder='Formula' onclick='Showpopup(this)'><label id='txt_" + Globaljson.Table1[i].GSTSUBID + "' style='Display:none'>" + Globaljson.Table1[i].SUBCOMPONENTNAME + "</label></div></div>";
                jquery_1_11_3_min_p("#InterDivappend").append(markup1);
            }


            i++;
        });
    }
}

function Showpopup(Data) {

    checkComponent='';
    Popuptxtid = Data.id; compareid = ''; jquery_1_11_3_min_p('#lblfinalrule').text(''); openbracketcounter = 0; formula = ''; subcomponentarray = [];
    ParentId = ''; Label = '';TaxState = '';
    jquery_1_11_3_min_p('#calError').text('');
    if (Popuptxtid == "txtgstclose") {
        jquery_1_11_3_min_p("#ColumnName").text('Tax Rule');
        jquery_1_11_3_min_p("#lblrulename").text('Tax Value' + " " + "=" + " ");
        
        jquery_1_11_3_min_p("#txtruleslabel").val('');
        jquery_1_11_3_min_p(".removeselect").removeClass('activeBtn');
        var i = 0; if (Globaljson != '') {
        ParentId = '2000';
             jquery_1_11_3_min_p("#divsubcomponenets").empty();
             jquery_1_11_3_min_p("#Divint").empty();
             jquery_1_11_3_min_p("#Divoperator").empty();
         jQuery.each(Globaljson.Table1, function (rec) {
             if (Globaljson.Table1[i].TaxSetupInfoId == kendo_all_min_js("#ddlgst").data("kendoDropDownList").value()) {
                 var id = Globaljson.Table1[i].GSTSUBID + "_" + "4";
                 var markup = "<button type='button' id='btn_3_" + id + "'  class='btn btn-primary calBtn removeselect' title='" + Globaljson.Table1[i].SUBCOMPONENTNAME + "' onclick = 'Getclick(this)'> " + Globaljson.Table1[i].SUBCOMPONENTNAME + " </button>";
                 jquery_1_11_3_min_p("#divsubcomponenets").append(markup);
             }
             i++;
         });
     }
     var x = 20;
     for (var i = 0; i < 10; i++) {
         var markup = "<button type='button' id='btn_1_" + x + "' class='btn btn-primary calOperators removeselect' onclick = 'Getclick(this)'>" + i + "</button>";
         jquery_1_11_3_min_p("#Divint").append(markup);
         x++;
     }
     var x = 31;
     for (var i = 0; i < operator.length; i++) {
         var markup = "<button type='button' id='btn_2_" + x + "' class='btn btn-primary calOperators removeselect' onclick = 'Getclick(this)'>" + operator[i] + "</button>";
         jquery_1_11_3_min_p("#Divoperator").append(markup);
         x++;
     }

        $("#CalculatorPopup").modal('show');
    }
    else {
        var data = Popuptxtid.split('_');
        var newid = 'txt_' + data[1];
        jquery_1_11_3_min_p("#txtruleslabel").val('');
        jquery_1_11_3_min_p(".removeselect").removeClass('activeBtn');
        jquery_1_11_3_min_p("#ColumnName").text(jquery_1_11_3_min_p('#' + newid).text() + ' ' + 'Rule');
        jquery_1_11_3_min_p("#lblrulename").text(jquery_1_11_3_min_p('#' + newid).text()+" "+"="+" ");
        jquery_1_11_3_min_p("#divsubcomponenets").empty();
        jquery_1_11_3_min_p("#Divint").empty();
        jquery_1_11_3_min_p("#Divoperator").empty();
        var i = 0; if (Globaljson != '') {
            ParentId = data[1];
            TaxState = data[2];
        concatjsontableval = [];
        jQuery.each(Globaljson.Table1, function (rec) {
            if (Globaljson.Table1[i].TaxSetupInfoId == kendo_all_min_js("#ddlgst").data("kendoDropDownList").value()) {
                // 4 type for gst/vat......
                var id1 = "3_" + Globaljson.Table1[i].GSTSUBID + "_4";
                concatjsontableval.push({ id: id1, name: Globaljson.Table1[i].SUBCOMPONENTNAME, title: Globaljson.Table1[i].SUBCOMPONENTNAME, type: 4 });
            }
            i++;
        });
        var i = 0;
        jQuery.each(Globaljson.Table3, function (rec) {

            // 5 type for invoice components......
            var id2 = "4_" + Globaljson.Table3[i].InvCode + "_5";
            concatjsontableval.push({ id: id2, name: Globaljson.Table3[i].Shortform, title: Globaljson.Table3[i].ComponentName, type: 5 });
                //                 var markup = "<button type='button' id='btn_2_" + Globaljson.Table1[i].GSTSUBID + "'  class='btn btn-primary calBtn removeselect'> " + Globaljson.Table1[i].SUBCOMPONENTNAME + " </button>";
                //                 jquery_1_11_3_min_p("#divsubcomponenets").append(markup);
            
            i++;
        });

        for (var i = 0; i < concatjsontableval.length; i++) {
           // var id = concatjsontableval[i].id +"_"+ concatjsontableval[i].type;

           if (kendo_all_min_js('#ddltaxtype').data("kendoDropDownList").value()==1)
           {
            if(concatjsontableval[i].id=='4_1007_5')
            {
            
            }
            else
            {
            var markup = "<button type='button' id='btn_" + concatjsontableval[i].id + "'  class='btn btn-primary calBtn removeselect' title='" + concatjsontableval[i].title + "' onclick = 'Getclick(this)'> " + concatjsontableval[i].name + " </button>";
          jquery_1_11_3_min_p("#divsubcomponenets").append(markup);
          }
           }
           else
           {
            var markup = "<button type='button' id='btn_" + concatjsontableval[i].id + "'  class='btn btn-primary calBtn removeselect' title='" + concatjsontableval[i].title + "' onclick = 'Getclick(this)'> " + concatjsontableval[i].name + " </button>";
          jquery_1_11_3_min_p("#divsubcomponenets").append(markup);
           }
           


            
        }

        }
         var x = 20;
        for (var i = 0; i < 10; i++) {
            var markup = "<button type='button' id='btn_1_" + x + "' class='btn btn-primary calOperators removeselect' onclick = 'Getclick(this)'>" + i + "</button>";
            jquery_1_11_3_min_p("#Divint").append(markup);
            x++;
        }
        var x = 31;
        for (var i = 0; i < operator.length; i++) {
            var markup = "<button type='button' id='btn_2_" + x + "' class='btn btn-primary calOperators removeselect' onclick = 'Getclick(this)'>" + operator[i] + "</button>";
            jquery_1_11_3_min_p("#Divoperator").append(markup);
            x++;
        }
        $("#CalculatorPopup").modal('show');
    }

    DeleteTempformula(ParentId, TaxState); //for clear existing formula

}


function Getclick(Data) {
    if ($("#txtruleslabel").val() == '') {
        jquery_1_11_3_min_p('#calError').text("Please Enter Label");
       }
    else {
        var id = Data.id;
        var getdata = id.split('_');
        jquery_1_11_3_min_p('.removeselect').removeClass('activeBtn');
        jquery_1_11_3_min_p('#' + id).addClass('activeBtn');
        Operatorid = ''; formulasyntaxid = '';
        Operatorid = getdata[1]; formulasyntaxid = getdata[2];
        //======================================Blank check===========================================
        if (compareid == '') {
            if (getdata[2] >= "31" && getdata[2] <= "36") {
                jquery_1_11_3_min_p('#calError').text("Not allowed");
            }
            else {
                if (getdata[2] == "37") {
                    openbracketcounter += parseInt(1);
                    formula += jquery_1_11_3_min_p('#' + id).text();
                    jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                    compareid = getdata[2];
                     formulavalue = '';
                        formulavalue += jquery_1_11_3_min_p('#' + id).text();
                    jquery_1_11_3_min_p('#calError').text('');
                    TempSaveformula();
                }
                else if (getdata[2] == "38") {
                    if (parseInt(38) - parseInt(compareid) == 1) {
                        formula += 0 + jquery_1_11_3_min_p('#' + id).text();
                        openbracketcounter -= parseInt(1);
                        jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                        compareid = getdata[2];
                         formulavalue = '';
                        formulavalue += jquery_1_11_3_min_p('#' + id).text();
                        jquery_1_11_3_min_p('#calError').text('');
                        TempSaveformula();
                    }
                    else {
                        if (parseInt(openbracketcounter) < 1) {
                            jquery_1_11_3_min_p('#calError').text("not allowed");
                        }
                        else {
                            // openbracketcounter -= parseInt(1);
                            formula += jquery_1_11_3_min_p('#' + id).text();
                            jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                            compareid = getdata[2];
                            jquery_1_11_3_min_p('#calError').text('');
                            openbracketcounter -= parseInt(1);
                            TempSaveformula();
                        }
                    }

                }
                else {
                    if (getdata[1] == "2") {
                        jquery_1_11_3_min_p('#calError').text("Not allowed");
                    }
                    else {
                        if (getdata[1] == "3") {
                           checkComponent='1';
                            formula += jquery_1_11_3_min_p('#' + id).text();
                            jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                            compareid = getdata[1];
                            subcomponentarray.push(getdata[2]);
                            formulavalue = '';
                            formulavalue += jquery_1_11_3_min_p('#' + id).text().trim();
                            jquery_1_11_3_min_p('#calError').text('');
                            TempSaveformula();
                        }
                        else if (getdata[1] == "4") {
                         checkComponent='1';
                            formula += jquery_1_11_3_min_p('#' + id).text();
                            jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                            compareid = getdata[1];
                            formulavalue = '';
                            formulavalue += jquery_1_11_3_min_p('#' + id).text().trim();
                            jquery_1_11_3_min_p('#calError').text('');
                            TempSaveformula();
                        }
                        else {
                            if (getdata[1] == "1") {
                                formula += jquery_1_11_3_min_p('#' + id).text();
                                jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                                compareid = getdata[2];
                                formulavalue = '';
                                formulavalue += jquery_1_11_3_min_p('#' + id).text();
                                jquery_1_11_3_min_p('#calError').text('');
                                TempSaveformula();
                            }
                            else {
                                formula += jquery_1_11_3_min_p('#' + id).text();
                                jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                                compareid = getdata[2];
                                jquery_1_11_3_min_p('#calError').text('');
                                TempSaveformula();
                            }
                        }

                    }
                }


            }
        }
        //======================================End Blank check=======================================

        //====================================== Check case on Integer "1" data==============================
        else if (getdata[1] == "1") {

            if (getdata[1] == "3" || getdata[1] == "4") {
                if (getdata[2] >= "20" && getdata[2] <= "29") {
                    jquery_1_11_3_min_p('#calError').text("not allowed");
                }
                else if (getdata[2] == "35" || getdata[2] == "36") {
                    jquery_1_11_3_min_p('#calError').text("not allowed");
                }
                else {
                     checkComponent='1';
                    formula += jquery_1_11_3_min_p('#' + id).text();
                    jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                    compareid = getdata[2];
                    jquery_1_11_3_min_p('#calError').text('');
                    TempSaveformula();
                }

            }
            else {
                if (subcomponentarray.length > 0) {
                    if (((getdata[2] == "35") || (getdata[2] == "36")) || (getdata[2] >= "20" && getdata[2] <= "29")) {

                        jquery_1_11_3_min_p('#calError').text("not allowed");
                    }
                    else {
                        formula += jquery_1_11_3_min_p('#' + id).text();
                        jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                        compareid = getdata[2];
                        subcomponentarray = [];
                        jquery_1_11_3_min_p('#calError').text('');
                        TempSaveformula();
                    }
                }
                else {
                    // jquery_1_11_3_min_p('#calError').text("not allowed");
                    if (compareid == "35") {
                        jquery_1_11_3_min_p('#calError').text("not allowed");
                    }
                    else {
                        formula += jquery_1_11_3_min_p('#' + id).text();
                        jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                        compareid = getdata[2];
                        subcomponentarray = [];
                        formulavalue = '';
                        formulavalue += jquery_1_11_3_min_p('#' + id).text();
                        jquery_1_11_3_min_p('#calError').text('');
                        TempSaveformula();
                    }
                }

            }

        }
        //====================================== End integer "1" case data===================================

        //=======================================check case on symboll data===================================
        else if (getdata[1] == "2") {
            //subcomponentarray = [];
            formulavalue = '';
            formulavalue = jquery_1_11_3_min_p('#' + id).text();
            if (compareid >= "20" && compareid <= "29") {
                //        formula += jquery_1_11_3_min_p('#' + id).text();
                //        jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                //        compareid = getdata[2];
                //        jquery_1_11_3_min_p('#calError').text('');
                if (getdata[2] == "37") {
                    openbracketcounter += parseInt(1);
                    formula += jquery_1_11_3_min_p('#' + id).text();
                    jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                    compareid = getdata[2];
                    subcomponentarray = [];
                    jquery_1_11_3_min_p('#calError').text('');
                    TempSaveformula();
                }
                else if (getdata[2] == "38") {
                    if (parseInt(38) - parseInt(compareid) == 1) {
                        formula += 0 + jquery_1_11_3_min_p('#' + id).text();
                        openbracketcounter -= parseInt(1);
                        jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                        compareid = getdata[2];
                        subcomponentarray = [];
                        jquery_1_11_3_min_p('#calError').text('');
                        TempSaveformula();
                    }
                    else {
                        if (parseInt(openbracketcounter) < 1) {
                            jquery_1_11_3_min_p('#calError').text("not allowed");
                        }
                        else {
                            // openbracketcounter -= parseInt(1);
                            formula += jquery_1_11_3_min_p('#' + id).text();
                            jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                            compareid = getdata[2];
                            jquery_1_11_3_min_p('#calError').text('');
                            openbracketcounter -= parseInt(1);
                            subcomponentarray = [];
                            TempSaveformula();
                        }
                    }
                }
                else {
                    formula += jquery_1_11_3_min_p('#' + id).text();
                    jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                    compareid = getdata[2];
                    subcomponentarray = [];
                    jquery_1_11_3_min_p('#calError').text('');
                    TempSaveformula();
                }
            }
            else {
                if (getdata[2] == "37") {
                    openbracketcounter += parseInt(1);
                    formula += jquery_1_11_3_min_p('#' + id).text();
                    jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                    compareid = getdata[2];
                    subcomponentarray = [];
                    jquery_1_11_3_min_p('#calError').text('');
                    TempSaveformula();
                }
                else if (getdata[2] == "38") {
                    if (parseInt(38) - parseInt(compareid) == 1) {
                        formula += 0 + jquery_1_11_3_min_p('#' + id).text();
                        openbracketcounter -= parseInt(1);
                        jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                        compareid = getdata[2];
                        jquery_1_11_3_min_p('#calError').text('');
                        subcomponentarray = [];
                        TempSaveformula();
                    }
                    else {
                        if (parseInt(openbracketcounter) < 1) {
                            jquery_1_11_3_min_p('#calError').text("not allowed");
                        }
                        else {
                            // openbracketcounter -= parseInt(1);
                            formula += jquery_1_11_3_min_p('#' + id).text();
                            jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                            compareid = getdata[2];
                            jquery_1_11_3_min_p('#calError').text('');
                            openbracketcounter -= parseInt(1);
                            subcomponentarray = [];
                            TempSaveformula();
                        }
                    }


                }
                else {
                    if (compareid == "38") {
                        if (getdata[2] >= "31" && getdata[2] <= "34") {
                            formula += jquery_1_11_3_min_p('#' + id).text();
                            jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                            compareid = getdata[2];
                            jquery_1_11_3_min_p('#calError').text('');
                            subcomponentarray = [];
                            TempSaveformula();
                        }
                        else {
                            jquery_1_11_3_min_p('#calError').text("not allowed");
                        }
                    }
                    else {
                        if (compareid == "3") {
                            if (getdata[2] >= "31" && getdata[2] <= "34") {
                                formula += jquery_1_11_3_min_p('#' + id).text();
                                jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                                compareid = getdata[2];
                                jquery_1_11_3_min_p('#calError').text('');
                                subcomponentarray = [];
                                TempSaveformula();
                            }
                            else {
                                jquery_1_11_3_min_p('#calError').text("not allowed");
                            }
                        }
                        else if (compareid == "4") {
                            if (getdata[2] >= "31" && getdata[2] <= "34") {
                                formula += jquery_1_11_3_min_p('#' + id).text();
                                jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                                compareid = getdata[2];
                                jquery_1_11_3_min_p('#calError').text('');
                                subcomponentarray = [];
                                TempSaveformula();
                            }
                            else {
                                jquery_1_11_3_min_p('#calError').text("not allowed");
                            }
                        }

                        else {

                            if (subcomponentarray.length > 0) {
                                if ((getdata[2] == "35") || (getdata[2] == "36")) {
                                    jquery_1_11_3_min_p('#calError').text("not allowed");
                                }
                                else {
                                    formula += jquery_1_11_3_min_p('#' + id).text();
                                    jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                                    compareid = getdata[2];
                                    jquery_1_11_3_min_p('#calError').text('');
                                    subcomponentarray = [];
                                    TempSaveformula();

                                }
                            }
                            else {
                                jquery_1_11_3_min_p('#calError').text("not allowed");
                            }

                        }

                    }
                }
            }

        }
        //========================================End case of symbol data====================================
        //========================================Start with Invoice components 3 integer ==============================
        else if (getdata[1] == "3" || getdata[1] == "4") {
            formulavalue = '';
            formulavalue = jquery_1_11_3_min_p('#' + id).text();
            var found = false;
            for (var i = 0; i < subcomponentarray.length && !found; i++) {
                if (subcomponentarray[i] === getdata[2]) {
                    found = true;
                    break;
                }
            }
            if (found == true) {
                jquery_1_11_3_min_p('#calError').text("not allowed");
            }
            else {

                if (subcomponentarray.length > 0) {
                    jquery_1_11_3_min_p('#calError').text("not allowed");
                }
                else {

                    if ((compareid >= "20" && compareid <= "29") || (compareid >= "35" && compareid <= "36")) {
                        jquery_1_11_3_min_p('#calError').text("not allowed");
                    }
                    else {

                        checkComponent='1';
                        subcomponentarray = [];
                        formula += jquery_1_11_3_min_p('#' + id).text();
                        jquery_1_11_3_min_p('#lblfinalrule').text(formula);
                        subcomponentarray.push(getdata[2]);
                        jquery_1_11_3_min_p('#calError').text('');
                        TempSaveformula();
                    }
                }
                //jquery_1_11_3_min_p('#calError').text("not allowed");

            }
        }
    }// end validation else Condition
//========================================End with Invoice components 3 integer ===============================


}



function BindEntityCountrydDetails() {
    var Country = []; var Entity = []; 
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Taxgroupsetup.asmx/BindEntityCountrydDetails",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
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
            
        }
    });


}


function FormValidation() {
    var allow = true;
    $('#IntraDivappend input[type="text"]').each(function () { 
    if($(this).val()=="" || $(this).val()=="0")
    {
    $(this).addClass('validate')
     $(this).val("");
    allow = false;
    }
    });
     $('#InterDivappend input[type="text"]').each(function () { 
    if($(this).val()=="" || $(this).val()=="0")
    {
    $(this).addClass('validate')
    $(this).val("");
    allow = false;
    }
    });

    if ($("#txtgrpName").val() == "") {
        $("#txtgrpName").addClass('validate');
        allow = false;
    }
    if ($("#txtdesc").val() == "") {
        
        $("#txtdesc").addClass('validate');
        allow = false;
    }

    if (kendo_all_min_js('#ddlgst').data("kendoDropDownList").value() == "0") {
            allow = false;
            kendo_all_min_js("#ddlgst").data("kendoDropDownList").span.css('background', '#f9e5e5');
        }
        if (kendo_all_min_js('#ddltaxtype').data("kendoDropDownList").value() == "0") {
            allow = false;
            kendo_all_min_js("#ddltaxtype").data("kendoDropDownList").span.css('background', '#f9e5e5');
        }
        if (kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value() == "0") {
            allow = false;
            kendo_all_min_js("#ddlcountry").data("kendoDropDownList").span.css('background', '#f9e5e5');
        }
        if (kendo_all_min_js('#ddlentity').data("kendoDropDownList").value() == "0") {
            allow = false;
            kendo_all_min_js("#ddlentity").data("kendoDropDownList").span.css('background', '#f9e5e5');
        }
        if ($("#txtFromDate").val() == "") {
            $("#txtFromDate").addClass('validate');
            allow = false;
        }
        if ($("#txtTodate").val() == "") {
            $("#txtTodate").addClass('validate');
            allow = false;
        }
        if ($("#txtgstclose").val() == "" || $("#txtgstclose").val() == "0") {
            $("#txtgstclose").addClass('validate');
            $("#txtgstclose").val("");
            allow = false;
        }

        var FromDate = $("#txtFromDate").val();
        var Todate = $("#txtTodate").val();
       if (FromDate != "") {
     if (Date.parse(FromDate) > Date.parse(Todate)) {
         $("#txtTodate").addClass('validate');
         swal("alert!", "Todate must be greater then from Fromdate.");
            allow = false;
}
}

        return allow;
    }

    function RemoveClass(data) {
        var id = data.id;
        var arr = id.split('_');
        var id = arr[1];

        if (jquery_1_11_3_min_p("#txtgrpName").val() != "") {
            jquery_1_11_3_min_p("#txtgrpName").removeClass('validate');
        }
        if (jquery_1_11_3_min_p("#txtdesc").val() != "") {
            jquery_1_11_3_min_p("#txtdesc").removeClass('validate');
        }
        if (jquery_1_11_3_min_p("#txtFromDate").val() != "") {
            jquery_1_11_3_min_p("#txtFromDate").removeClass('validate');
        }
        if (jquery_1_11_3_min_p("#txtTodate").val() != "") {
            jquery_1_11_3_min_p("#txtTodate" ).removeClass('validate');
        }
        if (jquery_1_11_3_min_p("#txtgstclose").val() != "" || jquery_1_11_3_min_p("#txtgstclose").val() != "0") {
            jquery_1_11_3_min_p("#txtgstclose").removeClass('validate');
        }
    }

 function FormulaValidation()
 {
     var allow = true;
    jquery_1_11_3_min_p('#rulesVariables tbody').find('tr').each(function () {
    var row = jquery_1_11_3_min_p(this);
      if(jquery_1_11_3_min_p("#txt_" + row.find('td:nth-child(4)').text()).val()=='')
      {
      jquery_1_11_3_min_p("#txt_" + row.find('td:nth-child(4)').text()).addClass('validate');
      allow=false;
      }
    });

        return allow;
 }


    function saveTaxGroup() {
        var countryId = kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value();
        var EntityId = kendo_all_min_js('#ddlentity').data("kendoDropDownList").value();
        var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
        var Todate = jquery_1_11_3_min_p("#txtTodate").val();
        var FromDate = jquery_1_11_3_min_p("#txtFromDate").val();
        var Tempformulajson = []; var Tempformulajsonstring = '';
        Tempformulajson.push({ GroupName: jquery_1_11_3_min_p("#txtgrpName").val(), Description: jquery_1_11_3_min_p("#txtdesc").val(), TaxMode: kendo_all_min_js('#ddlgst').data("kendoDropDownList").value(), TaxType: kendo_all_min_js('#ddltaxtype').data("kendoDropDownList").value(), CreatedBy: CreatedBy, CountryId: countryId, EntityId: EntityId });
        Tempformulajsonstring = JSON.stringify(Tempformulajson);
        jquery_1_11_3_min_p.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../WebServices/Taxgroupsetup.asmx/SaveTaxGroup",
            data: "{'Json':'" + Tempformulajsonstring + "','Fromdate':'" + FromDate + "','Todate':'" + Todate + "'}",
            dataType: "json",
            async: false,
            success: function (result) {
                window.location.replace("TaxSetup.aspx");

            }
        });

    }


    function BindTaxSetupgrd(searchtxt) {
        jquery_1_11_3_min_p("#itemTaxtbl tbody").empty();
        var wh = jquery_1_11_3_min_p(document).height();
        var gh = wh - 260;
        var SearchValue = searchtxt;
        LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
        jquery_1_11_3_min_p.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../WebServices/Taxgroupsetup.asmx/BindTaxSetupgrd",
            data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue + "'}",
            dataType: "json",
            success: function (result) {
                jquery_1_11_3_min_p('#preloader').css('display', 'none');
                jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
                jquery_1_11_3_min_p('#divGrid').css('display', 'block');
                var i = 0;
                var jsonData = result.d;
                jQuery.each(jsonData.Table, function (rec) {
                    var markup = "<tr><td style='display:none'> " + jsonData.Table[i].taxgroupId + "</td><td> <input id='chkbox' type='checkbox' class='checkAll'  /></td><td>" + jsonData.Table[i].TaxGroupCode + "</td> <td >" + jsonData.Table[i].TaxGroupName + "</td><td >" + jsonData.Table[i].TaxDescription + "</td><td >" + jsonData.Table[i].FieldName + "</td><td >" + jsonData.Table[i].CountryName + "</td></tr>";

                    jquery_1_11_3_min_p("#itemTaxtbl tbody").append(markup);



                    i++;
                });
//                var k = 0;
//                if (jsonData.Table.length > 0) { var columnsIn = jsonData.Table[0]; for (var key in columnsIn) { if (k > 0) { ColumnName.push(key); } k++; } } else {
//                    ColumnName.push(k); k++;
//                }
//                var j = 0; jquery_1_11_3_min_p("#DivSearch").empty();

//                jquery_1_11_3_min_p('#tblFieldSetupGrid thead tr th').each(function () {
//                    if (j > 1) {


//                        var SearchDiv = "<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='searchcheckAll' id='chk_" + ColumnName[j - 2] + "' ><label for='check3' class='coldata'>" + $(this).text() + "</label></span></div>";
//                        jquery_1_11_3_min_p("#DivSearch").append(SearchDiv);


//                    }
//                    j++;

//                });
//                var Searchfinaldiv = "<div class='dropdownBottom'><label class='pull-left' id='selectall' onclick='searchcheckAll()' >Select All</label><label class='pull-right' id='reset' onclick='searchUncheckAll()' >Reset</label></div>";
//                jquery_1_11_3_min_p("#DivSearch").append(Searchfinaldiv);
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

    function BinddataOndblClick(TaxgrpId) {

        jquery_1_11_3_min_p.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../WebServices/Taxgroupsetup.asmx/BinddataOndblClick",
            data: "{'TaxgroupId':'" + TaxgrpId + "'}",
            dataType: "json",
            async: false,
            success: function (result) {

                var i = 0;
                var jsonData = result.d;
                if (jsonData.Table.length > 0) {
                    jquery_1_11_3_min_p("#txtgrpName").val(jsonData.Table[0].TaxGroupName);
                    jquery_1_11_3_min_p("#txtdesc").val(jsonData.Table[0].TaxDescription);
                    jquery_1_11_3_min_p("#txtgrpName").prop("disabled",true);
                     jquery_1_11_3_min_p("#txtdesc").prop("disabled",true);
                    BindGsttails();
                    kendo_all_min_js('#ddlgst').data("kendoDropDownList").value(jsonData.Table[0].TaxMode);
                   BindSubComponenets();
                    kendo_all_min_js('#ddltaxtype').data("kendoDropDownList").value(jsonData.Table[0].TaxType);
                    kendo_all_min_js('#ddlgst').data("kendoDropDownList").readonly();
                     kendo_all_min_js('#ddltaxtype').data("kendoDropDownList").readonly();
                    BindEntityCountrydDetails();
                    kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value(jsonData.Table[0].CountryId);
                    kendo_all_min_js('#ddlentity').data("kendoDropDownList").value(jsonData.Table[0].EntityId);
                     kendo_all_min_js('#ddlcountry').data("kendoDropDownList").readonly();
                     kendo_all_min_js('#ddlentity').data("kendoDropDownList").readonly();

                }
                if (jsonData.Table1.length > 0) {
                    var i = 0;
                    $("#txtFromDate").val(jsonData.Table1[0].Fromdate);
                    $("#txtTodate").val(jsonData.Table1[0].Todate);
                    jQuery.each(jsonData.Table1, function (rec) {
                        if (jsonData.Table1[i].TaxState == 0 && jsonData.Table1[i].SubCompId == 2000) {
                            $("#txtgstclose").val(jsonData.Table1[i].Formulavalue);
                            $("#txtgstclose").attr('title',jsonData.Table1[i].Label );
                        }
                        if (jsonData.Table1[i].TaxState == 1) {

                            $("#txtintrasubcomponent_" + jsonData.Table1[i].SubCompId + "_1").val(jsonData.Table1[i].Formulavalue);
                             $("#txtintrasubcomponent_" + jsonData.Table1[i].SubCompId + "_1").attr('title',jsonData.Table1[i].Label );
                        }
                        else {
                            $("#txtintersubcomponent_" + jsonData.Table1[i].SubCompId + "_2").val(jsonData.Table1[i].Formulavalue);
                             $("#txtintersubcomponent_" + jsonData.Table1[i].SubCompId + "_2").attr('title',jsonData.Table1[i].Label );
                        }

                        i++;
                    });

                }
                BindTaxHistoryGrd(TaxgrpId);
            }
        });
    }



    function UpdateRecord() {
        var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
        var Todate = jquery_1_11_3_min_p("#txtTodate").val();
        var FromDate = jquery_1_11_3_min_p("#txtFromDate").val();
       
        jquery_1_11_3_min_p.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../WebServices/Taxgroupsetup.asmx/UpdateRecord",
            data: "{'GroupId':'" + dblclickTaxGroupId + "','UpdatedBy':'" + CreatedBy + "','Fromdate':'" + FromDate + "','Todate':'" + Todate + "'}",
            dataType: "json",
            async: false,
            success: function (result) {
               window.location.replace("TaxSetup.aspx");

            }
        });

    }


      function BindTaxHistoryGrd(groupid) {
        jquery_1_11_3_min_p("#TxHistorygrd tbody").empty();
        var wh = jquery_1_11_3_min_p(document).height();
        var gh = wh - 260;
        var SearchValue = searchtxt1;
        LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
        jquery_1_11_3_min_p.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../WebServices/Taxgroupsetup.asmx/BindTaxHistoryGrd",
            data: "{'LoadData':'" + LoadData1 + "','SearchValue':'" + SearchValue + "' ,'groupid':'" + groupid + "'}",
            dataType: "json",
            success: function (result) {
                jquery_1_11_3_min_p('#preloader').css('display', 'none');
                jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
                jquery_1_11_3_min_p('#divGrid').css('display', 'block');
                var i = 0;
                var jsonData = result.d;
                jQuery.each(jsonData.Table, function (rec) {
                var a='';
                if(jsonData.Table[i].IsActive==1)
                {
                a='Active'
                }
                else{
                 a='InActive'
                }
                    var markup = "<tr><td> <input id='chkbox' type='checkbox' class='checkAll'  /></td><td>" + jsonData.Table[i].Fromdate + "</td> <td >" + jsonData.Table[i].Todate + "</td><td >" + jsonData.Table[i].Formulavalue + "</td><td >" + a + "</td></tr>";

                    jquery_1_11_3_min_p("#TxHistorygrd tbody").append(markup);



                    i++;
                });
//                var k = 0;
//                if (jsonData.Table.length > 0) { var columnsIn = jsonData.Table[0]; for (var key in columnsIn) { if (k > 0) { ColumnName.push(key); } k++; } } else {
//                    ColumnName.push(k); k++;
//                }
//                var j = 0; jquery_1_11_3_min_p("#DivSearch").empty();

//                jquery_1_11_3_min_p('#tblFieldSetupGrid thead tr th').each(function () {
//                    if (j > 1) {


//                        var SearchDiv = "<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='searchcheckAll' id='chk_" + ColumnName[j - 2] + "' ><label for='check3' class='coldata'>" + $(this).text() + "</label></span></div>";
//                        jquery_1_11_3_min_p("#DivSearch").append(SearchDiv);


//                    }
//                    j++;

//                });
//                var Searchfinaldiv = "<div class='dropdownBottom'><label class='pull-left' id='selectall' onclick='searchcheckAll()' >Select All</label><label class='pull-right' id='reset' onclick='searchUncheckAll()' >Reset</label></div>";
//                jquery_1_11_3_min_p("#DivSearch").append(Searchfinaldiv);
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



    function BindFormula(dblclickTaxGroupId) {
    var Formula = []; 
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Taxgroupsetup.asmx/BindFormula",
        data: "{'TaxGroupId':'"+dblclickTaxGroupId+"'}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
            Bindformulajson= eval(result.d);
            var i = 0;
            Formula.push({ value: "0", text: "select" });
            jQuery.each(jsonData.Table, function (rec) {
                Formula.push({ value: jsonData.Table[i].SubCompId, text: jsonData.Table[i].Formulavalue });
                i++;
            });
           
          
        },
        error: function (result) {
        }
    });

    kendo_all_min_js('#ddlformula').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Formula,
        change: function () {
            kendo_all_min_js('#ddlformula').data("kendoDropDownList").span.css('background', 'none');
            var formulavalue=kendo_all_min_js('#ddlformula').data("kendoDropDownList").value();
            var splitdata=formulavalue.split('_');
            Bindformularow(splitdata[0],splitdata[1]);
            jquery_1_11_3_min_p('#divoutput').css('display', 'block');
             jquery_1_11_3_min_p("#btnverify").attr("disabled", false); 

        },
         popup: {
            appendTo: "#rulesVerify"
        }
    });
  


}


function Bindformularow(subcomponentval,taxgroupid)
{
           var detailcounter=1;var i=0; var subc='';var taxgroup='';

           jquery_1_11_3_min_p("#rulesVariables tbody").empty();
            jQuery.each(Bindformulajson.Table1, function (rec) {
            if(Bindformulajson.Table1[i].SubCompId==subcomponentval && Bindformulajson.Table1[i].TaxState==taxgroupid)
            {
           // if(subc==Bindformulajson.Table1[i].SubCompId && Bindformulajson.Table1[i].TaxState==taxgroupid)
//            {
//             var markup = "<tr style='display:none'><td>"+detailcounter+"</td><td>"+Bindformulajson.Table1[i].Formulavalue+"</td><td><input type='text' id='txt_"+Bindformulajson.Table1[i].Id+"' placeholder='Enter Value' onchange='RemoveValidation(this)' onkeyup='Validatekey(this)' class='fieldName'></td><td style='display:none' >"+Bindformulajson.Table1[i].Id+"</td></tr>";
//            jquery_1_11_3_min_p("#rulesVariables tbody").append(markup);
//            subc=Bindformulajson.Table1[i].SubCompId;taxgroup=Bindformulajson.Table1[i].TaxState;
//            }
//            else
//            {
            var markup = "<tr><td>"+detailcounter+"</td><td>"+Bindformulajson.Table1[i].Formulavalue+"</td><td><input type='text' id='txt_"+Bindformulajson.Table1[i].Id+"' placeholder='Enter Value' onchange='RemoveValidation(this)' onkeyup='Validatekey(this)' class='fieldName'></td><td style='display:none' >"+Bindformulajson.Table1[i].Id+"</td></tr>";
            jquery_1_11_3_min_p("#rulesVariables tbody").append(markup);
            subc=Bindformulajson.Table1[i].SubCompId;taxgroup=Bindformulajson.Table1[i].TaxState;
           // }

             detailcounter++;

            }
            i++;
           
            });


}

function RemoveValidation(Data)
{
var id=Data.id;
jquery_1_11_3_min_p('#'+id).removeClass('validate');
}

function Validatekey(Data)
{
     var id = Data.id;
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
}


function Generateoutput()
{
 var Fields = [];
 var JsonFields = '';
 jquery_1_11_3_min_p('#rulesVariables tbody').find('tr').each(function () {
 var row = jquery_1_11_3_min_p(this);
 var newid=row.find('td:nth-child(4)').text()+','+jquery_1_11_3_min_p("#txt_" + row.find('td:nth-child(4)').text()).val();
 var rowno=row.find('td:nth-child(1)').text();
 Fields.push({ Rowno: rowno, Values: newid});
  });
  JsonFields = JSON.stringify(Fields);
 var taxgroup=dblclickTaxGroupId;
 var formulavalue=kendo_all_min_js('#ddlformula').data("kendoDropDownList").value();
 var splitdata=formulavalue.split('_');
 subcomponentid=splitdata[0];
 taxstateid=splitdata[1];
  jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Taxgroupsetup.asmx/Getoutputval",
        data: "{'Json':'"+JsonFields+"','Taxgroupid':'"+taxgroup+"','Subcomponentid':'"+subcomponentid+"','Taxstateid':'"+taxstateid+"'}",
        dataType: "json",
        async: false,
        success: function (result) {
           var jsonData = eval(result.d);
          jquery_1_11_3_min_p('#lblout').text(jsonData.Table[0].Calculatedvalue); 
          
        },
        error: function (result) {
        }
    });
 

}