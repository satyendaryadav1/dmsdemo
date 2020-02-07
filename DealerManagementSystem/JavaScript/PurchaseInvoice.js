var Partners = []; var Rowcounter = 0; var Items = []; var PartnerId = 0; var PartnerAddress = []; var Globaljson = ''; var Rowcounter = 1;var Attachedfile=[];
var Items = []; var taxid = ''; var itemprice = ''; var sumofunitprice = 0; var sumofquantity = 0; var lineamountwithouttax = 0;
var itemarray = []; var Customergroupid = []; var Itemgroupid = []; var commongropid = ''; var taxstate = ''; var columncount = 0; var unitpricesum=0;
var newcolumncount = '';var coljson = '';var Componentjson = '';var TotalSumTaxwithtax = 0;var LoadData = ''; var dblClickInvoiceId 
var imagearray=[]; var GlobalJson=''; var Taxexclusiveinclusive=''; var discountValue=0;var discountMode=0; var fromqty=0;var toqty=0;
jquery_1_11_3_min_p(document).ready(function () {
BindInvoiceNo();
   jquery_1_11_3_min_p("#hdnLoad").val(10);
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
     BindTaxInvoiceGrid();
      jquery_1_11_3_min_p('#btnLoadMore').click(function () {
        LoadData = parseInt(LoadData) + 2;
        jquery_1_11_3_min_p("#hdnLoad").val(LoadData);
        jquery_1_11_3_min_p('#preloader').css('display', 'block');
        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
        BindTaxInvoiceGrid();
    });
  

 $(document).on("dblclick","#saleInvoicetbl tbody tr",function() {
   var row = jquery_1_11_3_min_p(this);
        var InvoiceId= row.find('td:nth-child(1)').text().trim();
        jquery_1_11_3_min_p("#variantForm").css('display', 'block');
        jquery_1_11_3_min_p("#saleInvoiceGrid").css('display', 'none');
        jquery_1_11_3_min_p("#btnnew").css('display', 'none');
        jquery_1_11_3_min_p("#btnback").css('display', 'block');
        jquery_1_11_3_min_p("#btnSubmit").css('display', 'block');
        jquery_1_11_3_min_p("#btnupload").css('display', 'flex');
        jquery_1_11_3_min_p("#invoiceno").css('display', 'block');
        BindEntityCountrydDetails();
        BinddataOndblClick(InvoiceId)
        // BindGsttails();
      
      });
    jquery_1_11_3_min_p("#btnsave").click(function () {
        if (ValidationOnSubmit() == true) {
    swal({
                 title: "Do you want to proceed?",
                 text: "",
                 icon: "warning",
                 buttons: true,
                 dangerMode: true,
                 })
                 .then((willDelete) => {
                 if (willDelete) {
                 
                 savedata();
                  
                  }
                 });
   
    
           
        }
    });
   
      jquery_1_11_3_min_p("#printInvoice").click(function () {
       $('#PrintInvoicePopup').modal('show');
       BindInvoicePopupdata();
    });
     jquery_1_11_3_min_p("#btnclosedata").click(function () {
       $('#PrintInvoicePopup').modal('hide');
    });


    jquery_1_11_3_min_p("#btnback").click(function () {
        window.location.replace("PurchaseInvoice.aspx");
    });
    jquery_1_11_3_min_p("#btnnew").click(function () {
        jquery_1_11_3_min_p("#variantForm").css('display', 'block');
        jquery_1_11_3_min_p("#saleInvoiceGrid").css('display', 'none');
        jquery_1_11_3_min_p("#btnnew").css('display', 'none');
        jquery_1_11_3_min_p("#btnback").css('display', 'block');
        jquery_1_11_3_min_p("#btnSubmit").css('display', 'none');
        jquery_1_11_3_min_p("#btnupload").css('display', 'flex');
        jquery_1_11_3_min_p("#invoiceno").css('display', 'block');
        jquery_1_11_3_min_p("#txtinvoicedate").val($.datepicker.formatDate('mm/dd/yy', new Date()));
        BindEntityCountrydDetails(); BindGsttails();


    });

    jquery_1_11_3_min_p("#btnDeleteLine").click(function () {

        Rowcounter = 1; itemarray = [];
        BindSubComponenets(taxid);
        jquery_1_11_3_min_p('#txtsumquantity').text(0.00);
        jquery_1_11_3_min_p('#txtunitpricesum').text(0.00);
        jquery_1_11_3_min_p('#txtlawtt').text(0.00);
        jquery_1_11_3_min_p('#txtlawt').text(0.00);

    });


    Partners.push({ value: "0", text: "Select" });
    kendo_all_min_js('#ddlpartners').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Partners,
        open: function () {
            if (kendo_all_min_js('#ddlentity').data("kendoDropDownList").value() == "0") {
                swal("Please select Entity");
            }
        },
        change: function () {
            kendo_all_min_js('#ddlpartners').data("kendoDropDownList").span.css('background', 'none');

        }
    });
    Items.push({ value: "0", text: "Select" });
    //    kendo_all_min_js('#txtItem_1').kendoDropDownList({
    //        filter: "contains",
    //        dataTextField: "text",
    //        dataValueField: "value",
    //        dataSource: Items,
    //        change: function () {
    //         //   kendo_all_min_js('#txtItem_1').data("kendoDropDownList").span.css('background', 'none');

    //        }
    //    });
    PartnerAddress.push({ value: "0", text: "Select" });
    kendo_all_min_js('#ddlbillingaddress').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: PartnerAddress,
        open: function () {
            if (kendo_all_min_js('#ddlpartners').data("kendoDropDownList").value() == "0") {
                swal("Please select Vendor");
            }
        },
        change: function () {
            kendo_all_min_js('#ddlbillingaddress').data("kendoDropDownList").span.css('background', 'none');

        }
    });
    kendo_all_min_js('#ddlshippingaddress').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: PartnerAddress,
        open: function () {
            if (kendo_all_min_js('#ddlpartners').data("kendoDropDownList").value() == "0") {
                swal("Please select Vendor");
            }
        },
        change: function () {
            kendo_all_min_js('#ddlshippingaddress').data("kendoDropDownList").span.css('background', 'none');

        }
    });
});


function BindGsttails() {
    var GST = []; var countryid = kendo_all_min_js("#ddlcountry").val();
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
            var i = 0; var markup = "";
            //   GST.push({ value: "0", text: "Select" });
            jquery_1_11_3_min_p("#rdoappend").empty();
            jQuery.each(jsonData.Table, function (rec) {
                if (i == 0) {
                    markup = "<fieldset class='radio'><label><input name='rdorights' id='rd_" + jsonData.Table[i].TaxSetupInfoId + "'   value='" + jsonData.Table[i].FieldName + "' type='radio' checked='checked' onclick='Gstwisevalue(this)'  />" + jsonData.Table[i].FieldName + " </label></fieldset>";
                    jquery_1_11_3_min_p("#rdoappend").append(markup);
                }
                else {
                    markup = "<fieldset class='radio'><label><input name='rdorights' id='rd_" + jsonData.Table[i].TaxSetupInfoId + "'   value='" + jsonData.Table[i].FieldName + "' type='radio' onclick='Gstwisevalue(this)'  />" + jsonData.Table[i].FieldName + " </label></fieldset>";
                    jquery_1_11_3_min_p("#rdoappend").append(markup);
                }
                i++;
            });


            BindSubComponenets(jsonData.Table[0].TaxSetupInfoId);

        }
    });
}


function BindSubComponenets(Taxid) {
    taxid = Taxid;
    var mark1 = "";var rowmark = "";var columnsum = "";
    jquery_1_11_3_min_p("#tblsaleInvoiceFields thead").empty(); jquery_1_11_3_min_p("#tblsaleInvoiceFields tbody").empty(); jquery_1_11_3_min_p("#tblsum tbody").empty();
    mark1 += "<tr><th><input type='checkbox' id='Chkall'>All</th><th>Item Name</th><th>Quantity</th><th>Price</th><th>Discount(Rs)</th><th>Discount(%)</th><th>" + Globaljson.Table4[0].Shortform + "</th>";
    
    if (Globaljson != '') {
        var i = 0;
        jQuery.each(Globaljson.Table1, function (rec) {

            if (Globaljson.Table1[i].TaxSetupInfoId == Taxid) {
                mark1 += "<th>" + Globaljson.Table1[i].SUBCOMPONENTNAME + "</th>";
                columnsum += "<tr><td>Sum of " + Globaljson.Table1[i].SUBCOMPONENTNAME + "  :</td><td class='text-right'><label id='txt_" + Globaljson.Table1[i].SUBCOMPONENTNAME + "_" + Globaljson.Table1[i].GSTSUBID + "' >0.00</label></td></tr>";
            }


            i++;
        });
        mark1 += "<th>" + Globaljson.Table4[1].Shortform + "</th><th></th>";
       // columnsum += "<tr><td>Sum of Quantity  :</td><td class='text-right'> 0.00</td></tr>";
        jquery_1_11_3_min_p("#tblsaleInvoiceFields thead").append(mark1 + "</tr>");
        jquery_1_11_3_min_p("#tblsum tbody").append(columnsum);
    }

    for (var y = 0; y < 5; y++) {
        //        rowmark += "<tr><td><input type='checkbox' id='chk_" + Rowcounter + "' class='chk_All'></td><td><input type='text' id='txtItem_" + Rowcounter + "' onchange='Binddataonchange(this)' readonly='readonly'></td><td><input type='text' id='txtUnitprice_" + Rowcounter + "' class='fieldName' onchange='Binddataunitprice(this)' placeholder='0.00'></td><td><input type='text'  id='txtQuantity_" + Rowcounter + "' onchange='Binddataquantity(this)' class='fieldName'  placeholder='0.00'></td><td><label id='lblwithouttax_" + Globaljson.Table4[0].InvCid + "_" + Rowcounter + "'></label></td>";
           rowmark += "<tr><td><input type='checkbox' id='chk_" + Rowcounter + "' class='chk_All'></td><td><input type='text' id='txtItem_" + Rowcounter + "' onchange='Binddataonchange(this)' readonly='readonly'></td><td><input type='text'  id='txtQuantity_" + Rowcounter + "' onchange='Binddataquantity(this)' onkeyup='Comparevalue(this)' class='fieldName'  placeholder='0.00'></td><td><input type='text' id='txtUnitprice_" + Rowcounter + "' class='fieldName' onchange='Binddataunitprice(this)' onkeyup='Comparevalue(this)' placeholder='0.00'></td><td><label id='lbldiscountRs_" + Rowcounter + "'></label></td><td><label id='lblDiscountPercent_" + Rowcounter + "'></label></td><td><label id='lblwithouttax_" + Rowcounter + "'></label></td>";
         if (Globaljson != '') {
             var x = 0; columncount = 0; newcolumncount = ''; coljson = '';Componentjson = '';
             jQuery.each(Globaljson.Table1, function (rec) {

                 if (Globaljson.Table1[x].TaxSetupInfoId == Taxid) {
                     rowmark += "<td><label id='lbltaxtype_" + Globaljson.Table1[x].GSTSUBID + "_"+Rowcounter+"'></label></td>";
                     columncount++;
                     coljson += Globaljson.Table1[x].SUBCOMPONENTNAME + ',';
                     Componentjson += Globaljson.Table1[x].GSTSUBID + ',';
                     newcolumncount = 7 + parseInt(columncount) + 2;
                 }


                 x++;
             });
       
         rowmark += "<td><input type='text' id='lblwithtax_" +Rowcounter+"' class='fieldName' onchange='BindInclusive(this)' onkeyup='Comparevalue(this)' /></td> <td><label style='display:none'>"+Rowcounter+"</label></td>";
        rowmark += "</tr>";
        jquery_1_11_3_min_p("#tblsaleInvoiceFields tbody").append(rowmark);
        rowmark = '';
        kendo_all_min_js('#txtItem_' + Rowcounter).kendoDropDownList({
            filter: "contains",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: Items,
            change: function () {
               // kendo_all_min_js('#txtItem_' + Rowcounter).data("kendoDropDownList").span.css('background', 'none');

            }
        });
        var dataSource = jquery_1_11_3_min_p('#txtItem_' + Rowcounter).data("kendoDropDownList");
        dataSource.enable(true);
        Rowcounter = Rowcounter + 1;
    }

}
}

function Gstwisevalue(Data)
{
    var value = Data.id;
    var splitdata = value.split('_');
    Rowcounter = 1; itemarray = [];
    BindSubComponenets(splitdata[1]);
    taxid = splitdata[1];
    jquery_1_11_3_min_p('#txtsumquantity').text(0.00);
    jquery_1_11_3_min_p('#txtunitpricesum').text(0.00);
    jquery_1_11_3_min_p('#txtlawtt').text(0.00);
    jquery_1_11_3_min_p('#txtlawt').text(0.00);

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
            var EntityId = kendo_all_min_js('#ddlentity').data("kendoDropDownList").value();
            BindVendors(EntityId);
            kendo_all_min_js('#ddlpartners').data("kendoDropDownList").enable(true);

        }
    });


} 


function BindVendors(EntityId) {
   Partners = []; 
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/PurchaseInvoice.asmx/BindVendors",
        data: "{'EntityId':'" + EntityId + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
            var i = 0;
            Partners.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {
                Partners.push({ value: jsonData.Table[i].VendorId, text: jsonData.Table[i].VendorName });
                i++;
            });
          

        },
        error: function (result) {
        }
    });

    kendo_all_min_js('#ddlpartners').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Partners,
        open: function () {
            if (kendo_all_min_js('#ddlentity').data("kendoDropDownList").value() == "0") {
                swal("Please select Entity");
            }
        },
        change: function () {
            kendo_all_min_js('#ddlpartners').data("kendoDropDownList").span.css('background', 'none');
            PartnerId = kendo_all_min_js('#ddlpartners').data("kendoDropDownList").value();
            // BindItem(PartnerId);
            jquery_1_11_3_min_p("#BindPartnerDetails").empty();
            $("#nodetails").css('display', 'block');
            BindVendorAddress(PartnerId);
            Rowcounter = 1;
            BindSubComponenets(taxid);

        }
    });
}




function BindLegaltax(PartnerId,Locationid) {
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/PurchaseInvoice.asmx/BindLegaltax",
        data: "{'PartnerId':'" + PartnerId + "','LocationId':'" + Locationid + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
            if (jsonData.Table.length > 0) {
                $("#nodetails").css('display', 'none');
            }
            else {
                $("#nodetails").css('display', 'block');
            }
            var i = 0; jquery_1_11_3_min_p("#BindPartnerDetails").empty(); var markup = '';
            Items.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {

                markup = "<div class='col-md-6'><label class='AddressLabel'>" + jsonData.Table[i].FieldName + "</label><label class='AddressValue'>: " + jsonData.Table[i].FieldValue + "</label></div>";
                jquery_1_11_3_min_p("#BindPartnerDetails").append(markup);
                i++;
            });


        },
        error: function (result) {
        }
    });

   
}


function BindVendorAddress(PartnerId) {
    PartnerAddress = [];
    var EntityId = kendo_all_min_js('#ddlentity').data("kendoDropDownList").value();
    var CountryId = kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/PurchaseInvoice.asmx/BindVendorAddress",
        data: "{'EntityId':'" + EntityId + "','CountryId':'" + CountryId + "','PartnerId':'" + PartnerId + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
            var i = 0;
            PartnerAddress.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {
                PartnerAddress.push({ value: jsonData.Table[i].Auto, text: jsonData.Table[i].ParterAddress });
                i++;
            });

            var i = 0; Customergroupid = [];
            jQuery.each(jsonData.Table1, function (rec) {
                Customergroupid.push(jsonData.Table1[i].TaxGroupId);
                i++;
            });


        },
        error: function (result) {
        }
    });

    kendo_all_min_js('#ddlbillingaddress').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: PartnerAddress,
        open: function () {
            if (kendo_all_min_js('#ddlpartners').data("kendoDropDownList").value() == "0") {

                swal("Please select Vendor");
            }
        },
        change: function () {
            kendo_all_min_js('#ddlbillingaddress').data("kendoDropDownList").span.css('background', 'none');
            if (kendo_all_min_js('#ddlbillingaddress').data("kendoDropDownList").value() == "0") {
                var dataSource = jquery_1_11_3_min_p('#txtItem_1').data("kendoDropDownList");
                dataSource.enable(false);
            }
            else {
//                var dataSource = jquery_1_11_3_min_p('#txtItem_1').data("kendoDropDownList");
//                dataSource.enable(true);
                BindLegaltax(PartnerId, kendo_all_min_js('#ddlbillingaddress').data("kendoDropDownList").value());
                PartnerId = kendo_all_min_js('#ddlpartners').data("kendoDropDownList").value();
                BindItem(PartnerId, kendo_all_min_js('#ddlbillingaddress').data("kendoDropDownList").value());
                Rowcounter = 1;
                BindSubComponenets(taxid);
                //BindItem();

            }
        }
    });

    kendo_all_min_js('#ddlshippingaddress').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: PartnerAddress,
        open: function () {
            if (kendo_all_min_js('#ddlpartners').data("kendoDropDownList").value() == "0") {
                swal("Please select Vendor");
            }
        },
        change: function () {
            kendo_all_min_js('#ddlshippingaddress').data("kendoDropDownList").span.css('background', 'none');
            if (kendo_all_min_js('#ddlbillingaddress').data("kendoDropDownList").text().trim() == kendo_all_min_js('#ddlshippingaddress').data("kendoDropDownList").text().trim()) {
                taxstate = 1;
            }
            else {
                taxstate = 2;
            }
        }
    });
}




function BindItem(PartnerId,Locationid) {
//    if (Rowcounter == 0) {
//        Rowcounter++;
//    }
    Items = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/PurchaseInvoice.asmx/BindItem",
        data: "{'PartnerId':'" + PartnerId + "','LocationId':'" + Locationid + "','Countryid':'" + kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value() + "','Entityid':'" + kendo_all_min_js('#ddlentity').data("kendoDropDownList").value() + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
            itemprice = eval(result.d);
            var i = 0;
            Items.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {
                Items.push({ value: jsonData.Table[i].Itemid, text: jsonData.Table[i].ItemName });
                i++;
            });


        },
        error: function (result) {
        }
    });

   // Items.push({ value: "0", text: "Select" });
    for (var y = 1; y < Rowcounter; y++) {
        kendo_all_min_js('#txtItem_' + y).kendoDropDownList({
            filter: "contains",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: Items,
            change: function () {
              //  kendo_all_min_js('#txtItem_' + y).data("kendoDropDownList").span.css('background', 'none');

            }
        });

        var dataSource = jquery_1_11_3_min_p('#txtItem_'+y).data("kendoDropDownList");
        dataSource.enable(true);
    }

}

function AddRow() {
    AddSubComponenets(taxid);
}

function AddSubComponenets(Taxid) {

    var rowmark = "";

    rowmark += "<tr><td><input type='checkbox' id='chk_" + Rowcounter + "' class='chk_All'></td><td><input type='text' id='txtItem_" + Rowcounter + "' onchange='Binddataonchange(this)' readonly='readonly'></td><td><input type='text'  id='txtQuantity_" + Rowcounter + "' onchange='Binddataquantity(this)' onkeyup='Comparevalue(this)' class='fieldName'  placeholder='0.00'></td><td><input type='text' id='txtUnitprice_" + Rowcounter + "' class='fieldName' onchange='Binddataunitprice(this)' onkeyup='Comparevalue(this)' placeholder='0.00'></td><td><label id='lbldiscountRs_" + Rowcounter + "'></label></td><td><label id='lblDiscountPercent_" + Rowcounter + "'></label></td><td><label id='lblwithouttax_" + Rowcounter + "'></label></td>";
        if (Globaljson != '') {
            var x = 0;
            jQuery.each(Globaljson.Table1, function (rec) {

                if (Globaljson.Table1[x].TaxSetupInfoId == Taxid) {
                    rowmark += "<td><label id='lbltaxtype_" + Globaljson.Table1[x].GSTSUBID + "_"+Rowcounter+"'></label></td>";
                    
                }


                x++;
            });
            rowmark += "<td><label id='lblwithtax_" +Rowcounter+"'></label></td> <td><label  style='display:none'>" + Rowcounter + "</label></td>";
            rowmark += "</tr>";
            jquery_1_11_3_min_p("#tblsaleInvoiceFields tbody").append(rowmark);
            rowmark = '';

            kendo_all_min_js('#txtItem_' + Rowcounter).kendoDropDownList({
                filter: "contains",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: Items,
                change: function () {
                  //  kendo_all_min_js('#txtItem_' + Rowcounter).data("kendoDropDownList").span.css('background', 'none');

                }
            });
            var dataSource = jquery_1_11_3_min_p('#txtItem_' + Rowcounter).data("kendoDropDownList");
            dataSource.enable(true);
            Rowcounter = Rowcounter + 1;


        }
    }

    function Binddataonchange(Data) {
        var id = Data.id;
        var cartprice = '';
        var splitdata=id.split('_');
        kendo_all_min_js('#' + id).data("kendoDropDownList").span.css('background', 'none');
        if (Validation() == true) {
            // code  for Discount
            var item= kendo_all_min_js('#' + id).data("kendoDropDownList").value();
            GetDiscount(item);
            // start code set discount value in column
             var lbldiscountRsId = "lbldiscountRs_" + splitdata[1];
             var lblDiscountPercent = "lblDiscountPercent_" + splitdata[1];
            if(discountMode==1)
            {
           
            jquery_1_11_3_min_p('#' + lbldiscountRsId).text(discountValue);
             jquery_1_11_3_min_p('#' + lblDiscountPercent).text(0);
            }
            else{
             jquery_1_11_3_min_p('#' + lblDiscountPercent).text(discountValue);
             jquery_1_11_3_min_p('#' + lbldiscountRsId).text(0);
            }

           // end code

            if (itemarray.length > 0) {
                if (jQuery.inArray(kendo_all_min_js('#' + id).data("kendoDropDownList").value(), itemarray) ==-1) {

                    var txtunitpriceid = "txtUnitprice_" + splitdata[1];

                    var i = 0;
                    jQuery.each(itemprice.Table, function (rec) {
                        if (itemprice.Table[i].Itemid == kendo_all_min_js('#' + id).data("kendoDropDownList").value()) {
                        if(discountMode==1)
                        { 
                        //statr code by satyendar
                        var cartprice=itemprice.Table[i].CartPrice;
                        var newcardPriceWithDisc=0;
                        newcardPriceWithDisc= cartprice-discountValue;
                            jquery_1_11_3_min_p('#' + txtunitpriceid).val(newcardPriceWithDisc);
                            itemarray.push(kendo_all_min_js('#' + id).data("kendoDropDownList").value());
                          //  Taxexclusiveinclusive=itemprice.Table[i].ItemType;
                          
                          }
                          else if(discountMode==2){
                          var cartprice=itemprice.Table[i].CartPrice;
                           var newcardPriceWithDisc=0;
                           newcardPriceWithDisc= cartprice*discountValue/100;
                            jquery_1_11_3_min_p('#' + txtunitpriceid).val(newcardPriceWithDisc);
                            itemarray.push(kendo_all_min_js('#' + id).data("kendoDropDownList").value());

                          }
                          else{
                           jquery_1_11_3_min_p('#' + txtunitpriceid).val(cartprice);
                            itemarray.push(kendo_all_min_js('#' + id).data("kendoDropDownList").value());
                          }

                          //end code by satyendar
                        }
                        i++;
                    });
                      






                    var i = 0; Itemgroupid = [];
                    jQuery.each(itemprice.Table1, function (rec) {
                        if (itemprice.Table1[i].ItemId == kendo_all_min_js('#' + id).data("kendoDropDownList").value()) {
                            Itemgroupid.push(itemprice.Table1[i].TaxGroupId);
                           // Taxexclusiveinclusive=itemprice.Table[i].TaxType;

                        }
                        i++;
                    });
                    var common = $.grep(Customergroupid, function (element) {
                        return $.inArray(element, Itemgroupid) !== -1;
                    }); Taxexclusiveinclusive='';
                    commongropid = '';
                    if (common == '') {
                       var i = 0; 
                    jQuery.each(itemprice.Table1, function (rec) {
                        if (itemprice.Table1[i].TaxGroupId == common) {
                           Taxexclusiveinclusive=itemprice.Table1[i].TaxType;
                        }
                        i++;
                    });
                            if(Taxexclusiveinclusive=='1')
                      {
                 var rowwithtax = "lblwithtax_" + splitdata[1];
                jquery_1_11_3_min_p('#' + rowwithtax).attr('readonly', 'readonly');



                  var price = "txtUnitprice_" + splitdata[1];
                  if ( $('#' + price).is('[readonly]') ){jquery_1_11_3_min_p('#' + price).removeAttr("readonly");}

                  
                  var quantity = "txtQuantity_" + splitdata[1];
                  if ( $('#' + quantity).is('[readonly]') ){  jquery_1_11_3_min_p('#' + quantity).removeAttr("readonly");}
                 
                

                }
                else if(Taxexclusiveinclusive=='')
                      {
                 var rowwithtax = "lblwithtax_" + splitdata[1];
                jquery_1_11_3_min_p('#' + rowwithtax).attr('readonly', 'readonly');



                  var price = "txtUnitprice_" + splitdata[1];
                  if ( $('#' + price).is('[readonly]') ){jquery_1_11_3_min_p('#' + price).removeAttr("readonly");}

                  
                  var quantity = "txtQuantity_" + splitdata[1];
                  if ( $('#' + quantity).is('[readonly]') ){  jquery_1_11_3_min_p('#' + quantity).removeAttr("readonly");}
                 
                

                }
                else
                {
                 
                  var price = "txtUnitprice_" + splitdata[1];
                  jquery_1_11_3_min_p('#' + price).attr('readonly', 'readonly');
                  var quantity = "txtQuantity_" + splitdata[1];
                  jquery_1_11_3_min_p('#' + quantity).attr('readonly', 'readonly');

                var rowwithtax = "lblwithtax_" + splitdata[1];
                  if ( $('#' + rowwithtax).is('[readonly]') ) {jquery_1_11_3_min_p('#' + rowwithtax).removeAttr("readonly"); }
                

                }
                    }
                    else {
                     if(common.length>1)
                 {
                 swal("No tax group found!")
                 }
                 else
                 {
                 BindTaxgroupvalue(common, id);
                  var i = 0; 
                    jQuery.each(itemprice.Table1, function (rec) {
                        if (itemprice.Table1[i].TaxGroupId == common) {
                           Taxexclusiveinclusive=itemprice.Table1[i].TaxType;
                        }
                        i++;
                    });
                            if(Taxexclusiveinclusive=='1')
                      {
                 var rowwithtax = "lblwithtax_" + splitdata[1];
                jquery_1_11_3_min_p('#' + rowwithtax).attr('readonly', 'readonly');



                  var price = "txtUnitprice_" + splitdata[1];
                  if ( $('#' + price).is('[readonly]') ){jquery_1_11_3_min_p('#' + price).removeAttr("readonly");}

                  
                  var quantity = "txtQuantity_" + splitdata[1];
                  if ( $('#' + quantity).is('[readonly]') ){  jquery_1_11_3_min_p('#' + quantity).removeAttr("readonly");}
                 
                

                }
                else if(Taxexclusiveinclusive=='')
                      {
                 var rowwithtax = "lblwithtax_" + splitdata[1];
                jquery_1_11_3_min_p('#' + rowwithtax).attr('readonly', 'readonly');



                  var price = "txtUnitprice_" + splitdata[1];
                  if ( $('#' + price).is('[readonly]') ){jquery_1_11_3_min_p('#' + price).removeAttr("readonly");}

                  
                  var quantity = "txtQuantity_" + splitdata[1];
                  if ( $('#' + quantity).is('[readonly]') ){  jquery_1_11_3_min_p('#' + quantity).removeAttr("readonly");}
                 
                

                }
                else
                {
                 
                  var price = "txtUnitprice_" + splitdata[1];
                  jquery_1_11_3_min_p('#' + price).attr('readonly', 'readonly');
                  var quantity = "txtQuantity_" + splitdata[1];
                  jquery_1_11_3_min_p('#' + quantity).attr('readonly', 'readonly');

                var rowwithtax = "lblwithtax_" + splitdata[1];
                  if ( $('#' + rowwithtax).is('[readonly]') ) {jquery_1_11_3_min_p('#' + rowwithtax).removeAttr("readonly"); }
                

                }
                 }

                    }

                  

                } else {
                    swal("Exists", "Item already selected!", "warning")
                    kendo_all_min_js('#' + id).data("kendoDropDownList").value(0);


                }

            }
            else {
                var txtunitpriceid = "txtUnitprice_" + splitdata[1];
                var i = 0;
                jQuery.each(itemprice.Table, function (rec) {
                    if (itemprice.Table[i].Itemid == kendo_all_min_js('#' + id).data("kendoDropDownList").value()) {
//                        jquery_1_11_3_min_p('#' + txtunitpriceid).val(itemprice.Table[i].CartPrice);
//                      //  Taxexclusiveinclusive=itemprice.Table[i].ItemType;
//                        itemarray.push(kendo_all_min_js('#' + id).data("kendoDropDownList").value());
                          if(discountMode==1)
                        { 
                        //statr code by satyendar
                        var cartprice=itemprice.Table[i].CartPrice;
                        var newcardPriceWithDisc=0;
                        newcardPriceWithDisc= cartprice-discountValue;
                            jquery_1_11_3_min_p('#' + txtunitpriceid).val(newcardPriceWithDisc);
                            itemarray.push(kendo_all_min_js('#' + id).data("kendoDropDownList").value());
                          //  Taxexclusiveinclusive=itemprice.Table[i].ItemType;
                          
                          }
                          else{
                          var cartprice=itemprice.Table[i].CartPrice;
                           var newcardPriceWithDisc=0;
                           newcardPriceWithDisc= cartprice*discountValue/100;
                            jquery_1_11_3_min_p('#' + txtunitpriceid).val(newcardPriceWithDisc);
                            itemarray.push(kendo_all_min_js('#' + id).data("kendoDropDownList").value());

                          }
                    }
                    i++;
                });

                var i = 0;Itemgroupid = [];
                jQuery.each(itemprice.Table1, function (rec) {
                    if (itemprice.Table1[i].ItemId == kendo_all_min_js('#' + id).data("kendoDropDownList").value()) {
                        Itemgroupid.push(itemprice.Table1[i].TaxGroupId);
                      //  Taxexclusiveinclusive=itemprice.Table[i].TaxType;

                    }
                    i++;
                });

                var common = $.grep(Customergroupid, function (element) {
                    return $.inArray(element, Itemgroupid) !== -1;
                });
                commongropid = '';
                if (common == '') {
                 var i = 0; 
                    jQuery.each(itemprice.Table1, function (rec) {
                        if (itemprice.Table1[i].TaxGroupId == common) {
                           Taxexclusiveinclusive=itemprice.Table1[i].TaxType;
                        }
                        i++;
                    });
                        if(Taxexclusiveinclusive=='1')
                      {
                 var rowwithtax = "lblwithtax_" + splitdata[1];
                jquery_1_11_3_min_p('#' + rowwithtax).attr('readonly', 'readonly');



                  var price = "txtUnitprice_" + splitdata[1];
                  if ( $('#' + price).is('[readonly]') ){jquery_1_11_3_min_p('#' + price).removeAttr("readonly");}

                  
                  var quantity = "txtQuantity_" + splitdata[1];
                  if ( $('#' + quantity).is('[readonly]') ){  jquery_1_11_3_min_p('#' + quantity).removeAttr("readonly");}
                 
                

                }
                else  if(Taxexclusiveinclusive=='')
                      {
                 var rowwithtax = "lblwithtax_" + splitdata[1];
                jquery_1_11_3_min_p('#' + rowwithtax).attr('readonly', 'readonly');



                  var price = "txtUnitprice_" + splitdata[1];
                  if ( $('#' + price).is('[readonly]') ){jquery_1_11_3_min_p('#' + price).removeAttr("readonly");}

                  
                  var quantity = "txtQuantity_" + splitdata[1];
                  if ( $('#' + quantity).is('[readonly]') ){  jquery_1_11_3_min_p('#' + quantity).removeAttr("readonly");}
                 
                

                }
                else
                {
                 
                  var price = "txtUnitprice_" + splitdata[1];
                  jquery_1_11_3_min_p('#' + price).attr('readonly', 'readonly');
                  var quantity = "txtQuantity_" + splitdata[1];
                  jquery_1_11_3_min_p('#' + quantity).attr('readonly', 'readonly');

                var rowwithtax = "lblwithtax_" + splitdata[1];
                  if ( $('#' + rowwithtax).is('[readonly]') ) {jquery_1_11_3_min_p('#' + rowwithtax).removeAttr("readonly"); }
                

                }
                 BindTaxgroupvalue(common, id);
                }
                else {

                      if(common.length>1)
                 {
                 swal("No tax group found!")
                 }
                 else
                 {
                 BindTaxgroupvalue(common, id);
                  var i = 0; 
                    jQuery.each(itemprice.Table1, function (rec) {
                        if (itemprice.Table1[i].TaxGroupId == common) {
                           Taxexclusiveinclusive=itemprice.Table1[i].TaxType;
                        }
                        i++;
                    });

                     if(Taxexclusiveinclusive=='1')
                      {
                 var rowwithtax = "lblwithtax_" + splitdata[1];
                jquery_1_11_3_min_p('#' + rowwithtax).attr('readonly', 'readonly');



                  var price = "txtUnitprice_" + splitdata[1];
                  if ( $('#' + price).is('[readonly]') ){jquery_1_11_3_min_p('#' + price).removeAttr("readonly");}

                  
                  var quantity = "txtQuantity_" + splitdata[1];
                  if ( $('#' + quantity).is('[readonly]') ){  jquery_1_11_3_min_p('#' + quantity).removeAttr("readonly");}
                 
                

                }
                else if(Taxexclusiveinclusive=='')
                      {
                 var rowwithtax = "lblwithtax_" + splitdata[1];
                jquery_1_11_3_min_p('#' + rowwithtax).attr('readonly', 'readonly');



                  var price = "txtUnitprice_" + splitdata[1];
                  if ( $('#' + price).is('[readonly]') ){jquery_1_11_3_min_p('#' + price).removeAttr("readonly");}

                  
                  var quantity = "txtQuantity_" + splitdata[1];
                  if ( $('#' + quantity).is('[readonly]') ){  jquery_1_11_3_min_p('#' + quantity).removeAttr("readonly");}
                 
                

                }
                else
                {
                 
                  var price = "txtUnitprice_" + splitdata[1];
                  jquery_1_11_3_min_p('#' + price).attr('readonly', 'readonly');
                  var quantity = "txtQuantity_" + splitdata[1];
                  jquery_1_11_3_min_p('#' + quantity).attr('readonly', 'readonly');

                var rowwithtax = "lblwithtax_" + splitdata[1];
                  if ( $('#' + rowwithtax).is('[readonly]') ) {jquery_1_11_3_min_p('#' + rowwithtax).removeAttr("readonly"); }
                

                }

                 }

                }
                
            }
            
        }
        else {
            kendo_all_min_js('#' + id).data("kendoDropDownList").value(0);
        }
   

    }
    function Binddataquantity(Data) {
        var id = Data.id;
         var data=id.split('_');
        var newid='txtItem_'+data[1];
        var disamt='lbldiscountRs_'+data[1];
        var disper='lblDiscountPercent_'+data[1];
         var item= kendo_all_min_js('#' + newid).data("kendoDropDownList").value();
            GetDiscount(item);
        sumofquantity = 0; sumofunitprice = 0;lineamountwithouttax = 0;
        jquery_1_11_3_min_p('#' + id).removeClass('validate');
        jquery_1_11_3_min_p('#tblsaleInvoiceFields tbody').find('tr').each(function () {
            var row = jquery_1_11_3_min_p(this);
            // var rowid = "txtQuantity_" + row.find('td:nth-child(11)').text().trim();
            var rowid = "txtQuantity_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim();
            // var itemid = kendo_all_min_js("#ddlItem_" + row.find('td:nth-child(3)').text().trim()).val().trim();
            if (jquery_1_11_3_min_p('#' + rowid).val() == '') {
                sumofquantity = parseFloat(sumofquantity) + parseFloat(0.00);
            }
            else {
                sumofquantity = parseFloat(sumofquantity) + parseFloat(jquery_1_11_3_min_p('#' + rowid).val());
            }

            var rowid = "txtUnitprice_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim();
            // var itemid = kendo_all_min_js("#ddlItem_" + row.find('td:nth-child(3)').text().trim()).val().trim();
            if (jquery_1_11_3_min_p('#' + rowid).val() == '') {
                sumofunitprice = parseFloat(sumofunitprice) + parseFloat(0.00);
            }
            else {
                sumofunitprice = parseFloat(sumofunitprice) + parseFloat(jquery_1_11_3_min_p('#' + rowid).val());
            }
            if (jquery_1_11_3_min_p('#' + "txtQuantity_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).val() != '' && jquery_1_11_3_min_p('#' + "txtUnitprice_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).val() != '') {
                var withouttaxid = "lblwithouttax_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim();


                // added by satyendar
                var Discount=0; 
                var withouttaxidNew=0;  var NewUnitPrice= parseFloat(jquery_1_11_3_min_p('#' + "txtUnitprice_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).val())
                if(parseInt(jquery_1_11_3_min_p('#'+Data.id).val())>=parseInt(fromqty) && parseInt(jquery_1_11_3_min_p('#'+Data.id).val())<=parseInt(toqty))
                {
               
                if(discountMode==1)
                {

                 Discount = $("#lbldiscountRs_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).text();
                 withouttaxidNew=  NewUnitPrice-Discount;

                }
                else if(discountMode==2){
                 Discount=0;
                 Discount = $("#lblDiscountPercent_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).text();
                  withouttaxidNew=  NewUnitPrice*Discount/100;
                }
                else{
                withouttaxidNew=NewUnitPrice;
                }

                }
                else
                {
                 withouttaxidNew=NewUnitPrice;
                 jquery_1_11_3_min_p('#'+disamt).text('0.00');
                 jquery_1_11_3_min_p('#'+disper).text('0.00');
                }
             


                 //  end added by satyendar
                var outval = parseFloat(jquery_1_11_3_min_p('#' + "txtQuantity_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).val()) *withouttaxidNew ;

                jquery_1_11_3_min_p('#' + withouttaxid).text(outval);
            }


            var rowid = "lblwithouttax_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim();
            // var itemid = kendo_all_min_js("#ddlItem_" + row.find('td:nth-child(3)').text().trim()).val().trim();
            if (jquery_1_11_3_min_p('#' + rowid).text() == '') {
                lineamountwithouttax = parseFloat(lineamountwithouttax) + parseFloat(0.00);
            }
            else {
                lineamountwithouttax = parseFloat(lineamountwithouttax) + parseFloat(jquery_1_11_3_min_p('#' + rowid).text());
            }

        });

        jquery_1_11_3_min_p('#txtsumquantity').text(sumofquantity);
        jquery_1_11_3_min_p('#txtunitpricesum').text(sumofunitprice.toFixed(3));
        jquery_1_11_3_min_p('#txtlawtt').text(lineamountwithouttax.toFixed(3));


        var currentrowid = Data.id.split('_');
        var bindid = 'txtItem_' + currentrowid[1];
        if (kendo_all_min_js('#' + bindid).data("kendoDropDownList").value() == 0) {
            swal("Selection", "Please select Item!", "warning")
        }
        else {
            var common = $.grep(Customergroupid, function (element) {
                return $.inArray(element, Itemgroupid) !== -1;
            });
            commongropid = '';
            if (common == '') {
             BindTaxgroupvalue(common, id);
            }
            else {
                 if(common.length>1)
                 {
                 swal("No tax group found!")
                 }
                 else
                 {
                 BindTaxgroupvalue(common, id);
                 }
            }
        }

        
    }
    function Binddataunitprice(Data) {
        var id = Data.id;
        var data=id.split('_');
        var newid='txtItem_'+data[1];
         var item= kendo_all_min_js('#' + newid).data("kendoDropDownList").value();
            GetDiscount(item);
        
        jquery_1_11_3_min_p('#' + id).removeClass('validate');
        sumofunitprice = 0; sumofquantity = 0; lineamountwithouttax = 0;
        jquery_1_11_3_min_p('#tblsaleInvoiceFields tbody').find('tr').each(function () {
            var row = jquery_1_11_3_min_p(this);
            
            var rowid = "txtUnitprice_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim();
            // var itemid = kendo_all_min_js("#ddlItem_" + row.find('td:nth-child(3)').text().trim()).val().trim();
            if (jquery_1_11_3_min_p('#' + rowid).val() == '') {
                sumofunitprice = parseFloat(sumofunitprice) + parseFloat(0.00);
            }
            else {
                sumofunitprice = parseFloat(sumofunitprice) + parseFloat(jquery_1_11_3_min_p('#' + rowid).val());
            }

           // var rowid = "txtQuantity_" + row.find('td:nth-child(11)').text().trim();
            var rowid = "txtQuantity_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim();
            // var itemid = kendo_all_min_js("#ddlItem_" + row.find('td:nth-child(3)').text().trim()).val().trim();
            if (jquery_1_11_3_min_p('#' + rowid).val() == '') {
                sumofquantity = parseFloat(sumofquantity) + parseFloat(0.00);
            }
            else {
                sumofquantity = parseFloat(sumofquantity) + parseFloat(jquery_1_11_3_min_p('#' + rowid).val());
            }
            if (jquery_1_11_3_min_p('#' + "txtQuantity_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).val() != '' && jquery_1_11_3_min_p('#' + "txtUnitprice_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).val() != '') {
                var withouttaxid = "lblwithouttax_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim();
                // added by satyendar
                var Discount=0;
                var withouttaxidNew=0;
                  var NewUnitPrice= parseFloat(jquery_1_11_3_min_p('#' + "txtUnitprice_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).val())
                if(discountMode==1)
                {
                 Discount = $("#lbldiscountRs_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).text();
                 withouttaxidNew=  NewUnitPrice-Discount;
                }
                else if(discountMode==2){
                 Discount=0;
                 Discount = $("#lblDiscountPercent_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).text();
                  withouttaxidNew=  NewUnitPrice*Discount/100;
                }
              else{
                withouttaxidNew=NewUnitPrice;
                }
                 //  end added by satyendar
               

//                jquery_1_11_3_min_p('#' + withouttaxid).text(parseFloat(jquery_1_11_3_min_p('#' + "txtQuantity_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).val()) * parseFloat(jquery_1_11_3_min_p('#' + "txtUnitprice_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).val()));
jquery_1_11_3_min_p('#' + withouttaxid).text(parseFloat(jquery_1_11_3_min_p('#' + "txtQuantity_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).val()) * withouttaxidNew);
            }

            var rowid = "lblwithouttax_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim();
            // var itemid = kendo_all_min_js("#ddlItem_" + row.find('td:nth-child(3)').text().trim()).val().trim();
            if (jquery_1_11_3_min_p('#' + rowid).text() == '') {
                lineamountwithouttax = parseFloat(lineamountwithouttax) + parseFloat(0.00);
            }
            else {
                lineamountwithouttax = parseFloat(lineamountwithouttax) + parseFloat(jquery_1_11_3_min_p('#' + rowid).text());
            }

        });
        jquery_1_11_3_min_p('#txtunitpricesum').text(sumofunitprice.toFixed(3));
        jquery_1_11_3_min_p('#txtsumquantity').text(sumofquantity);
        jquery_1_11_3_min_p('#txtlawtt').text(lineamountwithouttax.toFixed(3));
        var currentrowid = Data.id.split('_');
        var bindid = 'txtItem_' + currentrowid[1];
        if (kendo_all_min_js('#' + bindid).data("kendoDropDownList").value() == 0) {
           swal("Selection", "Please select Item!", "warning")
       }
       else {
           var common = $.grep(Customergroupid, function (element) {
               return $.inArray(element, Itemgroupid) !== -1;
           });
           commongropid = '';
           if (common == '') {
            BindTaxgroupvalue(common, id);
           }
           else {
                if(common.length>1)
                 {
                 swal("No tax group found!")
                 }
                 else
                 {
                 BindTaxgroupvalue(common, id);
                 }

           }
       }




        
    }
    function Validation() {
        var allow = true;
        if (kendo_all_min_js('#ddlentity').data("kendoDropDownList").value() == "0") {
            kendo_all_min_js("#ddlentity").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
        else if (kendo_all_min_js('#ddlpartners').data("kendoDropDownList").value() == "0")
        {
            kendo_all_min_js("#ddlpartners").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
        else if (kendo_all_min_js('#ddlbillingaddress').data("kendoDropDownList").value() == "0") {
            kendo_all_min_js("#ddlbillingaddress").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
        else if (kendo_all_min_js('#ddlshippingaddress').data("kendoDropDownList").value() == "0") {
            kendo_all_min_js("#ddlshippingaddress").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
        return allow;
    }


    function BindTaxgroupvalue(Data,id) {
        var groupid = Data;
        var textid = id.split('_');
        var formullaid = 'lblwithouttax_' + textid[1];
        if (parseFloat(jquery_1_11_3_min_p('#' + formullaid).text()) > 0) {
            var subcomponent = coljson.split(','); var finalcoljson = ''; var sublength = subcomponent.length - 1;
            var datajson = ''; var comma=',';var subdatajson = ''; var Temptaxcol=[]; var Temptaxstringifycol='';
            finalcoljson += "select "; datajson = "[{"; FinalSubdatajson = "'[";var subdatajson = '';

            for (var subid = 0; subid < subcomponent.length - 1; subid++) {
                if (subid == sublength-1) {
                    finalcoljson += "max(case when name='" + subcomponent[subid] + "' then convert(nvarchar(max),StringValue) else '' end) as  " + subcomponent[subid] + " into ##TempColumnJson FROM parseJSON('";
                    datajson += '"' + subcomponent[subid] + '"' + ':' + '""';
                }
                else {
                    finalcoljson += "max(case when name='" + subcomponent[subid] + "' then convert(nvarchar(max),StringValue) else '' end) as  " + subcomponent[subid] + " ,";
                    datajson += '"'+subcomponent[subid] +'"'+':' + '""'+',';
                }

                Temptaxcol.push({ ColnName: subcomponent[subid],ColValues:0.00});
            }
            datajson += "}]') where ValueType = 'string' OR ValueType = 'int' group by parent_ID";
            finalcoljson += datajson;



            var subdatavalue = Componentjson.split(',');
            var subclength = subdatavalue.length - 1;
            var rowcounter = 1;
            for (var subval = 0; subval < subdatavalue.length - 1; subval++) {
                if (subval == sublength - 1) {
                    subdatajson += '{"Rowno' + '"' + ':' +'"' + rowcounter + '"'+ ',' + '"' + 'Values' + '"' + ':' +'"' + subdatavalue[subval]+'"' + '}]';
                }
                else {
                    subdatajson += '{"Rowno' +'"'+ ':'+ '"'+ rowcounter+'"'  + ',' + '"'+ 'Values' + '"'+ ':' +'"'+ subdatavalue[subval] +'"'+ '},';

                }
                rowcounter = rowcounter + 1;
            }
            FinalSubdatajson += subdatajson + "'";
            var arr1 = [];
            arr1.push(finalcoljson);
            var arr2 = [];
            arr2.push(FinalSubdatajson);
            var Taxjson = JSON.stringify(arr1);
            var Taxdatajson = JSON.stringify(arr2);
            Temptaxstringifycol=JSON.stringify(Temptaxcol);
      //   ===========================================================get tax data value ==============================
            jquery_1_11_3_min_p.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "../WebServices/PurchaseInvoice.asmx/Bindtaxstate",
                data: "{'Taxjson':" + Taxjson + ",'Taxdatajson':" + Taxdatajson + ", 'TaxState':'" + taxstate + "','Linevalue':'" + jquery_1_11_3_min_p('#' + formullaid).text() + "','Taxtype':'" + taxid + "','Taxgroupid':'" + groupid + "','Tempcols':'" + Temptaxstringifycol + "'}",
                dataType: "json",
                async: false,
                success: function (result) {
                    var Getjsondata = eval(result.d);


                    var z = 0; var columnid = ''; TotalSumTaxwithtax = 0;
                    var rowwithouttax = "lblwithouttax_" + textid[1];
                    TotalSumTaxwithtax = parseFloat(TotalSumTaxwithtax) + parseFloat(jquery_1_11_3_min_p('#' + rowwithouttax).text());
                    // for (var y = 0; y < subdatavalue.length - 1; y++) {
                    for (var m = 0; m < parseInt(columncount); m++) {
                        var rowid = "lbltaxtype_" + subdatavalue[m] + '_' + textid[1];
                        if (Getjsondata.Table[0][subcomponent[m]] == '') {
                            jquery_1_11_3_min_p('#' + rowid).text(0.00);
                            TotalSumTaxwithtax = parseFloat(TotalSumTaxwithtax) + parseFloat(0.00);
                        }
                        else {
                            var getvalue = parseFloat(Getjsondata.Table[0][subcomponent[m]]);
                            jquery_1_11_3_min_p('#' + rowid).text(getvalue.toFixed(3));
                            TotalSumTaxwithtax = parseFloat(TotalSumTaxwithtax) + parseFloat(Getjsondata.Table[0][subcomponent[m]]);
                        }


                    }
                    //  }
                    var rowwithtax = "lblwithtax_" + textid[1];
                    jquery_1_11_3_min_p('#' + rowwithtax).val(TotalSumTaxwithtax.toFixed(3));
                    var finaltotalwithtax = 0;
                    // Final total for linewithtax=========================================
                    jquery_1_11_3_min_p('#tblsaleInvoiceFields tbody').find('tr').each(function () {
                        var row = jquery_1_11_3_min_p(this);
                        var linetaxwittax = "lblwithtax_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim();
                        if (jquery_1_11_3_min_p('#' + linetaxwittax).val() == '') {

                        }
                        else {
                            finaltotalwithtax = parseFloat(finaltotalwithtax) + parseFloat(jquery_1_11_3_min_p('#' + linetaxwittax).val());
                        }

                    });
                    jquery_1_11_3_min_p('#txtlawt').text(finaltotalwithtax.toFixed(3));
                    //End total for linewithtax==============================================
                    // alert(sublength);
                    var Ssubvalue = 0; var yy = 1; var newcolumn = parseInt(sublength) + parseInt(4);
                    for (var m = 0; m < parseInt(columncount); m++) {
                        var rowid = "lbltaxtype_" + subdatavalue[m] + '_' + textid[1];
                        var newid = "txt_" + subcomponent[m] + "_" + subdatavalue[m];
                        var value = jquery_1_11_3_min_p('#' + newid).text();
                        var value2 = jquery_1_11_3_min_p('#' + rowid).text();
                        var value3 = parseFloat(value) + parseFloat(value2);
                        jquery_1_11_3_min_p('#' + newid).text(value3.toFixed(3));

                    }

                },
                error: function (result) {
                }
            });
            //=============================================================end get tax data ================================================

        }
        //---------------------------------Else part of CP check----------------------------------------
        else { 
        
        }
       //---------------------------------End Part of CP check------------------------------------------


    }



    function ValidationOnSubmit() {
        var allow = true;
        if (kendo_all_min_js('#ddlentity').data("kendoDropDownList").value() == "0") {
            kendo_all_min_js("#ddlentity").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
        if (kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value() == "0") {
            kendo_all_min_js("#ddlcountry").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
         if (kendo_all_min_js('#ddlpartners').data("kendoDropDownList").value() == "0") {
            kendo_all_min_js("#ddlpartners").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
         if (kendo_all_min_js('#ddlbillingaddress').data("kendoDropDownList").value() == "0") {
            kendo_all_min_js("#ddlbillingaddress").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }
         if (kendo_all_min_js('#ddlshippingaddress').data("kendoDropDownList").value() == "0") {
            kendo_all_min_js("#ddlshippingaddress").data("kendoDropDownList").span.css('background', '#f9e5e5');
            allow = false;
        }

        if ($('#txtinvoicedate').val() == "") {
            $('#txtinvoicedate').addClass('validate')
            allow = false;
        }
        else if (jquery_1_11_3_min_p('#txtlawt').text() <= 0) {
            allow = false;
           swal('Please select atleast one item');
          
        }
       
        return allow;
    }


    function savedata() {
        var Itemdata = [];
        var ItemdataJson = '';
        var InvoiceData = [];
        var InvoiceDatajson = '';
        var CreatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
        InvoiceData.push({ lblInvoiceNo: $("#lblInvoiceNo").text(), InvoiceDate: $("#txtinvoicedate").val(), Duedate: $("#txtduedate").val(), Description: $("#txtdescription").val(), PartnerId: kendo_all_min_js('#ddlpartners').val(), BillingAddress: kendo_all_min_js('#ddlbillingaddress').val(), ShippingAddress: kendo_all_min_js('#ddlshippingaddress').val(), TaxType: taxid, SumOfQty: $("#txtsumquantity").text(), SumOfunitPrice: $("#txtunitpricesum").text(), SumOfLAWTTax: $("#txtlawtt").text(), SumOfLAWTax: $("#txtlawt").text(), EntityId: kendo_all_min_js('#ddlentity').data("kendoDropDownList").value(), CountryId: kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value(), CreatedBy: CreatedBy })
        jquery_1_11_3_min_p('#tblsaleInvoiceFields tbody').find('tr').each(function () {
            var row = jquery_1_11_3_min_p(this);
            var rowid = "txtUnitprice_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim();
            var col = newcolumncount - 1;
           if (jquery_1_11_3_min_p('#lblwithtax_' + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).val() != '' && row.find("td:nth-child(" + 5 + ")").text().trim() != '') {
            var qty=0;
            var price=0;
            if(jquery_1_11_3_min_p('#txtQuantity_' + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).val()=="")
            {
            qty=0
            }
            else{
            qty=jquery_1_11_3_min_p('#txtQuantity_' + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).val();
            }
            if(jquery_1_11_3_min_p('#txtUnitprice_' + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).val()=="")
            {
            price=0
            }
            else{
            price=jquery_1_11_3_min_p('#txtUnitprice_' + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).val();
            }


                Itemdata.push({ ItemId: kendo_all_min_js('#' + "txtItem_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).val(), Price: price, Quantity: qty, LineWithoutTax: row.find("td:nth-child(" + 7 + ")").text().trim(), LineWithTax: jquery_1_11_3_min_p('#lblwithtax_' + row.find("td:nth-child(" + newcolumncount + ")").text().trim()).val(), CreatedBy: CreatedBy })
            }

        });
        ItemdataJson = JSON.stringify(Itemdata);
        InvoiceDatajson = JSON.stringify(InvoiceData);
    var fileUpload = $("#attachfile").get(0);
    var files = fileUpload.files;
    var data = new FormData();
    for (var i = 0; i < files.length; i++) {
      data.append(files[i].name, files[i]);
    }
                jquery_1_11_3_min_p.ajax({
                    type: 'POST',
                    url: '../PurchaseInvoice.ashx?InVoiceNo='+jquery_1_11_3_min_p('#lblInvoiceNo').text()+'&Itemdata='+ItemdataJson+'&InvoiceData='+InvoiceDatajson+'&UserId='+CreatedBy,
                    processData: false,
                    contentType: false,
                    data: data,
                    async:false,
                    success: function (e) {
                    if(e=="1")
                    {
                     swal("Saved Successfully","Your data Saved successfully!","success")
            .then((value) => {
             window.location.replace("PurchaseInvoice.aspx");
            });
            }
                    }
                });
                  }



     function BindInvoiceNo() {
        
        jquery_1_11_3_min_p.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../WebServices/PurchaseInvoice.asmx/BindInvoiceNo",
            data: "{}",
            dataType: "json",
            async: false,
            success: function (result) {
                jsonData = eval(result.d);
                $('#lblInvoiceNo').text(jsonData.Table[0].InvoiceNo);
            }
        });
 }

 function BindTaxInvoiceGrid() {
   
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
    var Partners = [];
     LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
  
 var SearchValue='';
 
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/PurchaseInvoice.asmx/BindInvoiceGrid",
        data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue + "'}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
            jquery_1_11_3_min_p('#divGrid').css('display', 'block');
            var i = 0;
            var jsonData = result.d;
            GlobalJson=result.d;
            jquery_1_11_3_min_p("#saleInvoicetbl tbody").empty();
            jQuery.each(jsonData.Table, function (rec) {
            var markup = "<tr><td style='display:none'> "+jsonData.Table[i].InvoiceId+"</td><td> <input id='chkbox' type='checkbox' class='checkboxcls' onclick='checkAll(this)' /></td> <td >"+jsonData.Table[i].InvoiceNo+"</td>  <td >"+jsonData.Table[i].PartnerName+"</td>  <td >"+jsonData.Table[i].InvoiceDate+"</td> <td >"+jsonData.Table[i].ShippingLocId+"</td><td><a class='saleViewAttachment' id='"+jsonData.Table[i].InvoiceNo+"' onclick='DownloadImage(this)' >View Attachment</a></td></tr>";

            jquery_1_11_3_min_p("#saleInvoicetbl tbody").append(markup);



            //=========================== start for PDF===================================

//             var pdftable = "<tr><td>"+jsonData.Table[i].PartnerType+"</td> <td >"+jsonData.Table[i].PartnerName+"</td> <td >"+jsonData.Table[i].ContactNo+"</td></tr>";
//  jquery_1_11_3_min_p("#pdftable tbody").append(pdftable);

             //==============================end for PFD=================================
              
                i++;
            });
         
 if (jsonData.Table.length >= jsonData.Table1[0].Totalcount) {
                jquery_1_11_3_min_p('#lblRowCount').text(jsonData.Table.length);
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


function DownloadImage(Data)
{
imagearray=[];
   var i=0;
  jQuery.each(GlobalJson.Table2, function (rec) {
    if(GlobalJson.Table2[i].InvoiceNo==Data.id)
    {
    imagearray.push(GlobalJson.Table2[i].AttachedFile)
    }
    i++;
});
if(imagearray.length >0)
{
jquery_1_11_3_min_p('#ContentPlaceHolder1_hdninvoice').val(Data.id);
CallDownloadbutton();
//var data = new FormData();
//   data.append("","");
// jquery_1_11_3_min_p.ajax({
//                    type: 'POST',
//                    url: '../Downloadimage.ashx?InVoiceNo='+Data.id+'&Imagepath='+imagearray,
//                    processData: false,
//                    contentType: false,
//                    data: data,
//                    async:false,
//                    success: function (e) {

//                    }

//                    });
}
else
{
swal("Sorry","No attachments found!", "warning")
}
}


function BinddataOndblClick(InvoiceId)
{
        jquery_1_11_3_min_p.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../WebServices/PurchaseInvoice.asmx/BinddataOndblClick",
            data: "{'InvoiceId':'" + InvoiceId + "'}",
            dataType: "json",
            async: false,
            success: function (result) {
               var jsonData = eval(result.d);
                $("#lblPname").text(jsonData.Table[0].VendorName);
                 $("#lblPCode").text(jsonData.Table[0].VendorCode);
                $("#lblInvoiceNo").text(jsonData.Table[0].InvoiceNo);
                $("#txtinvoicedate").val(jsonData.Table[0].InvoiceDate);
                $("#txtduedate").val(jsonData.Table[0].Duedate)
                  $("#txtinvoicedate").prop( "disabled", true );
                   $("#txtduedate").prop( "disabled", true );
                 $("#txtdescription").val(jsonData.Table[0].Description);
                  $("#txtdescription").prop( "disabled", true );
                    kendo_all_min_js('#ddlentity').data("kendoDropDownList").value(jsonData.Table[0].EntityId);
                    kendo_all_min_js('#ddlentity').data("kendoDropDownList").readonly();
                  kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value(jsonData.Table[0].CountryId);
                  kendo_all_min_js('#ddlcountry').data("kendoDropDownList").readonly();
                 BindVendors(jsonData.Table[0].EntityId);
                 kendo_all_min_js('#ddlpartners').data("kendoDropDownList").value(jsonData.Table[0].VendorId);
                 kendo_all_min_js('#ddlpartners').data("kendoDropDownList").readonly();
                 BindVendorAddress(jsonData.Table[0].VendorId)
                kendo_all_min_js('#ddlbillingaddress').data("kendoDropDownList").value(jsonData.Table[0].BillingLocId);
                 kendo_all_min_js('#ddlbillingaddress').data("kendoDropDownList").readonly();
                 kendo_all_min_js('#ddlshippingaddress').data("kendoDropDownList").value(jsonData.Table[0].ShippingLocId);
                 kendo_all_min_js('#ddlshippingaddress').data("kendoDropDownList").readonly();
                  BindGsttails();
                 $("#rd_"+jsonData.Table[0].TaxTypeId).attr("checked",true);
                 $("#rdoappend input:radio").attr('disabled',true);
                  BindItem(jsonData.Table[0].VendorId, kendo_all_min_js('#ddlbillingaddress').data("kendoDropDownList").value());
                $("#txtsumquantity").text(jsonData.Table[0].SumOfQty);
                $("#txtunitpricesum").text(jsonData.Table[0].SumOfUnitPrice);
                $("#txtlawtt").text(jsonData.Table[0].TotalWithoutTax);
                $("#txtlawt").text(jsonData.Table[0].TotalWithTax);
                 var dropdownlist = kendo_all_min_js("#ddlshippingaddress").data("kendoDropDownList");
                  dropdownlist.trigger("change");
                   var dropdownlist1 = kendo_all_min_js("#ddlbillingaddress").data("kendoDropDownList");
                  dropdownlist1.trigger("change");
                var i=0;
                var RowCount=1;
                jQuery.each(jsonData.Table1, function (rec) {
                if(i<5)
                {

                  {
                kendo_all_min_js('#' + "txtItem_" +RowCount).data("kendoDropDownList").value(jsonData.Table1[i].ItemId);
                kendo_all_min_js('#' + "txtItem_" +RowCount).trigger("change");
                kendo_all_min_js('#' + "txtItem_" +RowCount).data("kendoDropDownList").readonly();
                jquery_1_11_3_min_p('#' + "txtUnitprice_" +RowCount).val(jsonData.Table1[i].Price);
                jquery_1_11_3_min_p('#' + "txtUnitprice_" +RowCount).prop( "disabled", true );
                jquery_1_11_3_min_p('#' + "lblwithtax_" +RowCount).prop( "disabled", true );
                jquery_1_11_3_min_p('#' + "txtQuantity_" +RowCount).prop( "disabled", true );
                if(Taxexclusiveinclusive==2)
                { 
                jquery_1_11_3_min_p('#' + "lblwithtax_" +RowCount).val(jsonData.Table1[i].LineWithTax);
                 kendo_all_min_js('#' + "lblwithtax_" +RowCount).trigger("change");
                 jquery_1_11_3_min_p('#' + "lblwithtax_" +RowCount).prop( "disabled", true );
                }
                else
                {
                jquery_1_11_3_min_p('#' + "txtQuantity_" +RowCount).val(jsonData.Table1[i].Quantity);
                jquery_1_11_3_min_p('#' + "txtQuantity_" +RowCount).prop( "disabled", true );
                kendo_all_min_js('#' + "txtQuantity_" +RowCount).trigger("change");
                }

                RowCount++;
                i++;
                }
//                kendo_all_min_js('#' + "txtItem_" +RowCount).data("kendoDropDownList").value(jsonData.Table1[i].ItemId);
//                kendo_all_min_js('#' + "txtItem_" +RowCount).trigger("change");
//                kendo_all_min_js('#' + "txtItem_" +RowCount).data("kendoDropDownList").readonly();
//                jquery_1_11_3_min_p('#' + "txtUnitprice_" +RowCount).val(jsonData.Table1[i].Price);
//                jquery_1_11_3_min_p('#' + "txtUnitprice_" +RowCount).prop( "disabled", true );
//                jquery_1_11_3_min_p('#' + "txtQuantity_" +RowCount).val(jsonData.Table1[i].Quantity);
//                jquery_1_11_3_min_p('#' + "txtQuantity_" +RowCount).prop( "disabled", true );
//                kendo_all_min_js('#' + "txtQuantity_" +RowCount).trigger("change");
//                RowCount++;
//                i++;
                }
                else{
                AddRow();
                 kendo_all_min_js('#' + "txtItem_" +RowCount).data("kendoDropDownList").value(jsonData.Table1[i].ItemId);
                kendo_all_min_js('#' + "txtItem_" +RowCount).trigger("change");
                kendo_all_min_js('#' + "txtItem_" +RowCount).data("kendoDropDownList").readonly();
                jquery_1_11_3_min_p('#' + "txtUnitprice_" +RowCount).val(jsonData.Table1[i].Price);
                jquery_1_11_3_min_p('#' + "txtUnitprice_" +RowCount).prop( "disabled", true );
                jquery_1_11_3_min_p('#' + "txtQuantity_" +RowCount).val(jsonData.Table1[i].Quantity);
                jquery_1_11_3_min_p('#' + "txtQuantity_" +RowCount).prop( "disabled", true );
                kendo_all_min_js('#' + "txtQuantity_" +RowCount).trigger("change");
                RowCount++;
                i++;
                }

            });
            jquery_1_11_3_min_p('#btnsave').css( "display", "none" );
             jquery_1_11_3_min_p('#attachfile').prop( "disabled", true );
             jquery_1_11_3_min_p('#btnSubmit').css( "display", "none" );
              jquery_1_11_3_min_p('#printInvoice').css( "display", "block" );
           
            }
        });
}

function BindInvoicePopupdata()
{
 $("#PlblInvoice").text($("#lblInvoiceNo").text());
  $("#PlblPartnerCode").text($("#lblPCode").text());
   $("#plblpname").text($("#lblPname").text());
   $("#PlblInvoicedate").text($("#txtinvoicedate").val());
   $("#lblBillingAddress").text(kendo_all_min_js("#ddlbillingaddress").data("kendoDropDownList").text());
    $("#plblpnameShipping").text($("#lblPname").text());
    $("#lblshippingAddress").text(kendo_all_min_js("#ddlshippingaddress").data("kendoDropDownList").text());
    $("#Tablepop").empty();
     var copy=$("#tblsaleInvoiceFields").clone();
    $("#Tablepop").prepend(copy);
               
}


function BindInclusive(Data)
{
 var lineamountwithtax=Data.id; 
 var lineamountwithouttax="txtUnitprice_"+ lineamountwithtax.split('_')[1];
 var newid='txtItem_'+lineamountwithtax.split('_')[1];
  var item= kendo_all_min_js('#' + newid).data("kendoDropDownList").value();
 GetDiscount(item);
 
 var inclusiveamount='';var exclusiveamount='';
 if(jquery_1_11_3_min_p('#'+lineamountwithtax).val()=='' || jquery_1_11_3_min_p('#'+lineamountwithtax).val()==0)
 {
 inclusiveamount=0;
 }
 else if (jquery_1_11_3_min_p('#'+lineamountwithouttax).val()=='' || jquery_1_11_3_min_p('#'+lineamountwithouttax).val()==0)
 {
 exclusiveamount=0;
 }
 var common = $.grep(Customergroupid, function (element) {
 return $.inArray(element, Itemgroupid) !== -1;
  });
  commongropid = '';
  if (common == '') {

  }
  else {
   if(common.length>1)
   {
   swal("No tax group found!")
    }
   else
   {
   var subcomponent = coljson.split(','); var finalcoljson = ''; var sublength = subcomponent.length - 1;
            var datajson = ''; var comma=',';var subdatajson = ''; var Temptaxcol=[]; var Temptaxstringifycol='';
            finalcoljson += "select "; datajson = "[{"; FinalSubdatajson = "'[";var subdatajson = '';
             for (var subid = 0; subid < subcomponent.length - 1; subid++) {
                if (subid == sublength-1) {
                    finalcoljson += "max(case when name='" + subcomponent[subid] + "' then convert(nvarchar(max),StringValue) else '' end) as  " + subcomponent[subid] + " into ##TempColumnJson FROM parseJSON('";
                    datajson += '"' + subcomponent[subid] + '"' + ':' + '""';
                }
                else {
                    finalcoljson += "max(case when name='" + subcomponent[subid] + "' then convert(nvarchar(max),StringValue) else '' end) as  " + subcomponent[subid] + " ,";
                    datajson += '"'+subcomponent[subid] +'"'+':' + '""'+',';
                }

                Temptaxcol.push({ ColnName: subcomponent[subid],ColValues:0.00});
            }
            datajson += "}]') where ValueType = 'string' OR ValueType = 'int' group by parent_ID";
            finalcoljson += datajson;

             var subdatavalue = Componentjson.split(',');
            var subclength = subdatavalue.length - 1;
            var rowcounter = 1;
            for (var subval = 0; subval < subdatavalue.length - 1; subval++) {
                if (subval == sublength - 1) {
                    subdatajson += '{"Rowno' + '"' + ':' +'"' + rowcounter + '"'+ ',' + '"' + 'Values' + '"' + ':' +'"' + subdatavalue[subval]+'"' + '}]';
                }
                else {
                    subdatajson += '{"Rowno' +'"'+ ':'+ '"'+ rowcounter+'"'  + ',' + '"'+ 'Values' + '"'+ ':' +'"'+ subdatavalue[subval] +'"'+ '},';

                }
                rowcounter = rowcounter + 1;
            }
            FinalSubdatajson += subdatajson + "'";
            var arr1 = [];
            arr1.push(finalcoljson);
            var arr2 = [];
            arr2.push(FinalSubdatajson);
            var Taxjson = JSON.stringify(arr1);
            var Taxdatajson = JSON.stringify(arr2);
            Temptaxstringifycol=JSON.stringify(Temptaxcol);

            var lineamtwithtax=0;
            if(jquery_1_11_3_min_p('#' + lineamountwithouttax).val()=='')
            {
            lineamtwithtax=0;
            }
            else
            {
            lineamtwithtax=jquery_1_11_3_min_p('#' + lineamountwithouttax).val();
            }
            ////Ajax data post===========================================================================================
             jquery_1_11_3_min_p.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "../WebServices/Saleinvoice.asmx/Bindinclusivetaxstate",
                data: "{'Taxjson':" + Taxjson + ",'Taxdatajson':" + Taxdatajson + ", 'TaxState':'" + taxstate + "','Linevaluewithouttax':'" + lineamtwithtax + "','Linevaluewithtax':'" + jquery_1_11_3_min_p('#' + lineamountwithtax).val() + "','Taxtype':'" + taxid + "','Taxgroupid':'" + common + "','Tempcols':'" + Temptaxstringifycol + "','TempDate':'" + jquery_1_11_3_min_p("#txtinvoicedate").val() + "'}",
                dataType: "json",
                async: false,
                success: function (result) {
                    var Getjsondata = eval(result.d);
                     var z = 0; var columnid = ''; TotalSumTaxwithouttax = 0;
                      var rowwithtax = "lblwithtax_" + lineamountwithtax.split('_')[1];
                       TotalSumTaxwithouttax =   parseFloat(jquery_1_11_3_min_p('#' + rowwithtax).val())-parseFloat(TotalSumTaxwithouttax);

                       for (var m = 0; m < parseInt(columncount); m++) {
                        var rowid = "lbltaxtype_" + subdatavalue[m] + '_' + lineamountwithtax.split('_')[1];
                        if (Getjsondata.Table[0][subcomponent[m]] == '') {
                            jquery_1_11_3_min_p('#' + rowid).text(0.00);
                            TotalSumTaxwithouttax = parseFloat(TotalSumTaxwithouttax) - parseFloat(0.00);
                        }
                        else {
                            var getvalue = parseFloat(Getjsondata.Table[0][subcomponent[m]]);
                            jquery_1_11_3_min_p('#' + rowid).text(getvalue.toFixed(3));
                            TotalSumTaxwithouttax = parseFloat(TotalSumTaxwithouttax) - parseFloat(Getjsondata.Table[0][subcomponent[m]]);
                        }


                    }

                    jquery_1_11_3_min_p('#txtlawtt').text(TotalSumTaxwithouttax.toFixed(3));

                    if(discountMode==1)
                    {
                     var cartprice=TotalSumTaxwithouttax.toFixed(3);
                      var newcardPriceWithDisc=0;
                      newcardPriceWithDisc= cartprice-discountValue;
                        var rowwithtax = "lblwithouttax_" + lineamountwithtax.split('_')[1];
                    jquery_1_11_3_min_p('#' + rowwithtax).text(newcardPriceWithDisc.toFixed(3));
                     var unitprice="txtUnitprice_" + lineamountwithtax.split('_')[1];
                     jquery_1_11_3_min_p('#' + unitprice).val(newcardPriceWithDisc.toFixed(3));
                    }
                    else  if(discountMode==2)
                    {
                     var cartprice=TotalSumTaxwithouttax.toFixed(3);
                      var newcardPriceWithDisc=0;
                      newcardPriceWithDisc= cartprice*discountValue/100;
                        var rowwithtax = "lblwithouttax_" + lineamountwithtax.split('_')[1];
                    jquery_1_11_3_min_p('#' + rowwithtax).text(newcardPriceWithDisc.toFixed(3));

                    var unitprice="txtUnitprice_" + lineamountwithtax.split('_')[1];
                     jquery_1_11_3_min_p('#' + unitprice).val(newcardPriceWithDisc.toFixed(3));
                    }
                    else
                    {
                     var rowwithtax = "lblwithouttax_" + lineamountwithtax.split('_')[1];
                    jquery_1_11_3_min_p('#' + rowwithtax).text(TotalSumTaxwithouttax.toFixed(3));
                      var unitprice="txtUnitprice_" + lineamountwithtax.split('_')[1];
                     jquery_1_11_3_min_p('#' + unitprice).val(TotalSumTaxwithouttax.toFixed(3));
                    }
                   
                    

                    var finaltotalwithtax = 0;  var finaltotalwithouttax = 0;  unitpricesum=0;
                     jquery_1_11_3_min_p('#tblsaleInvoiceFields tbody').find('tr').each(function () {
                        var row = jquery_1_11_3_min_p(this);
                        var linetaxwittax = "lblwithouttax_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim();
                         var linetaxwittax1 = "lblwithtax_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim();
                          var unitpriceid ="txtUnitprice_" + row.find("td:nth-child(" + newcolumncount + ")").text().trim();
                        if (jquery_1_11_3_min_p('#' + linetaxwittax).text() == '') {

                        }
                        else {
                            finaltotalwithtax = parseFloat(finaltotalwithtax) + parseFloat(jquery_1_11_3_min_p('#' + linetaxwittax).text());
                        }

                         if (jquery_1_11_3_min_p('#' + linetaxwittax1).val() == '') {

                        }
                        else {
                            finaltotalwithouttax = parseFloat(finaltotalwithouttax) + parseFloat(jquery_1_11_3_min_p('#' + linetaxwittax1).val());
                        }

                         if (jquery_1_11_3_min_p('#' + unitpriceid).val() == '') {
                         
                        }
                        else
                        {
                        unitpricesum =parseFloat(unitpricesum) + parseFloat(jquery_1_11_3_min_p('#' + unitpriceid).val());
                        }

                    });
                    jquery_1_11_3_min_p('#txtlawtt').text(finaltotalwithtax.toFixed(3));

                     jquery_1_11_3_min_p('#txtunitpricesum').text(unitpricesum.toFixed(3));
                      
                    jquery_1_11_3_min_p('#txtlawt').text(finaltotalwithouttax.toFixed(3));


                      var Ssubvalue = 0; var yy = 1; var newcolumn = parseInt(sublength) + parseInt(4);
                    for (var m = 0; m < parseInt(columncount); m++) {
                        var rowid = "lbltaxtype_" + subdatavalue[m] + '_' + lineamountwithtax.split('_')[1];
                        var newid = "txt_" + subcomponent[m] + "_" + subdatavalue[m];
                        var value = jquery_1_11_3_min_p('#' + newid).text();
                        var value2 = jquery_1_11_3_min_p('#' + rowid).text();
                        var value3 = parseFloat(value) + parseFloat(value2);
                        jquery_1_11_3_min_p('#' + newid).text(value3.toFixed(3));

                    }
                    }
                    });
            ////End data post============================================================================================




         
   }
   }
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

}


// start code for discount

     function GetDiscount(ItemId) {
       var PartnerId=kendo_all_min_js('#ddlpartners').data("kendoDropDownList").value();
       var EntityId=kendo_all_min_js('#ddlentity').data("kendoDropDownList").value();
       var CountryId=kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value();
       var date=$("#txtinvoicedate").val();
        jquery_1_11_3_min_p.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../WebServices/PurchaseInvoice.asmx/GetDiscount",
            data: "{'ItemId':'"+ItemId+"','PartnerId':'"+PartnerId+"','EntityId':'"+EntityId+"','CountryId':'"+CountryId+"','date':'"+date+"'}",
            dataType: "json",
            async: false,
            success: function (result) {
               var  jsonData = eval(result.d);
                if(jsonData.Table.length>0)
                {
                 discountValue=0;discountMode=0; fromqty=0;toqty=0;
                 discountValue= jsonData.Table[0].discountvalue;
                 discountMode=jsonData.Table[0].discountMode;
                 fromqty= jsonData.Table[0].FromQty;
                 toqty= jsonData.Table[0].ToQty;
                }
                else{
                 discountValue=0;
                 discountMode=0;
                
                }
            }
        });
 }
// end  code for discount
