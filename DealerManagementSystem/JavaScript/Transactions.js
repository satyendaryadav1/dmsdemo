var Locationjsondata = ''; var editjsondata=''; var Counter = 1; var columnname = '';var dbcolumns = '';  var dbfinalcolumnname = []; var detailcounter = 1; var tablename = ''; var colname = '';var ColumnName=[]; var Locationtableid=0;
jquery_1_11_3_min_p(document).ready(function () {
BindEntityForgrid();
BindItemGrid(kendo_all_min_js('#ddlgridEntity').val()) ;
    //============================================================New & back Transaction===========================================
    jquery_1_11_3_min_p('#btnnew').click(function () {
        jquery_1_11_3_min_p('#InventoryTransactionForm').css('display', 'block');
        jquery_1_11_3_min_p('#InventoryTransactionGrid').css('display', 'none');
        jquery_1_11_3_min_p('#btnSubmit').css('display', 'block');
        jquery_1_11_3_min_p('#btnback').css('display', 'block');
        jquery_1_11_3_min_p('#btnnew').css('display', 'none');
        BindFormdetails();
    });

    jquery_1_11_3_min_p('#btnback').click(function () {
        window.location.replace("InventoryTransaction.aspx");
    });

    jquery_1_11_3_min_p('#btnclosedata').click(function () {
        kendo_all_min_js("#ddlitem_" + Counter.toString()).data("kendoDropDownList").value(0);
        $("#serialNo").modal('hide');
        detailcounter = 1;
        dbfinalcolumnname = []; dbcolumns = '';
           variant=[];
                variant.push({ value: "0", text: "Select" });
                variantid = "ddlvariant_" + Counter;
                kendo_all_min_js('#' + variantid).kendoDropDownList({
                    filter: "contains",
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: variant,
                    change: function () {
                        kendo_all_min_js('#' + variantid).data("kendoDropDownList").span.css('background', 'none');
                    }
                });
                 var Variant  =  jquery_1_11_3_min_p('#' + variantid).data("kendoDropDownList");
                Variant.readonly(true);
    });


    jquery_1_11_3_min_p('#btnbatchclose').click(function () {
        kendo_all_min_js("#ddlitem_" + Counter.toString()).data("kendoDropDownList").value(0);
        $("#Batchno").modal('hide');
        detailcounter = 1;
        dbfinalcolumnname = []; dbcolumns = '';
    });

    jquery_1_11_3_min_p("#btnsavepopupdata").click(function () {
        if (ValidateGridColumn() == true) {
            CreateColumn();
        }

    });


    jquery_1_11_3_min_p("#btnbatchsubmit").click(function () {
        if (ValidateGridColumnB() == true) {
            CreateColumnB();
        }

    });

    jquery_1_11_3_min_p("#btnSubmit").click(function () {
    swal({
                 title: "Do you want to proceed?",
                 text: "",
                 icon: "warning",
                 buttons: true,
                 dangerMode: true,
                 })
                 .then((willDelete) => {
                 if (willDelete) {
                 SaveTransaction();
                 
                  
                  }
                 });
    });
    

    //=========================================================End Transaction==============================================
    //=====================================================================End Document.Ready()=================================
});
//=============================================================Begin Function================================================


function BindItemGrid(entityid) {
 jquery_1_11_3_min_p("#inventoryTrGrid tbody").empty();
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
    var Partners = [];

    var SearchValue = "";

  //  LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
 var LoadData=20;
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Transaction.asmx/BindItemTransactions",
        data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue + "','EntityId':'" + entityid + "'}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
           // jquery_1_11_3_min_p('#divGrid').css('display', 'block');
            var i = 0;
            var jsonData = result.d;
            editjsondata= result.d;

            jQuery.each(jsonData.Table, function (rec) {
//            <td style='display:none'> " + jsonData.Table[i].FieldId + "</td>
                var markup = "<tr> <td style='display:none'> " + jsonData.Table[i].TransId + "</td> <td> <input id='chkbox' type='checkbox' class='checkAll'  /></td><td>" + jsonData.Table[i].lotNumber + "</td> <td >" + jsonData.Table[i].InventDate + "</td><td >" + jsonData.Table[i].Transdate + "</td> <td >" + jsonData.Table[i].ItemName + "</td> <td >" + jsonData.Table[i].LocationName + "</td> <td >" + jsonData.Table[i].Transtype + "</td> <td >" + jsonData.Table[i].Quantity + "</td> <td >" + jsonData.Table[i].NetQty + "</td><td >" + jsonData.Table[i].Amount + "</td><td >" + jsonData.Table[i].NetAmt + "</td><td >" + jsonData.Table[i].AvgWtAmt + "</td></tr>";

                jquery_1_11_3_min_p("#inventoryTrGrid tbody").append(markup);

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
            jquery_1_11_3_min_p('#inventoryTrGrid thead tr th').each(function () {
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




function SaveTransaction() { 
 var itemid= kendo_all_min_js("#ddlitem_" + Counter.toString()).data("kendoDropDownList").value().split('-');
 var newitemid=itemid[0];
 var trackingid=itemid[1];
  var Transdetails=[];
   var TransJson='';
   Transdetails.push({LotNumber:jquery_1_11_3_min_p('#txtlotno_1').val().trim(), InventDate: jquery_1_11_3_min_p('#txtinventorydate_1').val().trim(), ItemId: newitemid,TrackingId: trackingid,LocationId: kendo_all_min_js("#ddllocation_" + Counter.toString()).data("kendoDropDownList").value(),TransactionType: kendo_all_min_js("#ddltranstype_" + Counter.toString()).data("kendoDropDownList").value(),Quantity: jquery_1_11_3_min_p('#txtqty_1').val().trim(),NetQty: jquery_1_11_3_min_p('#lblnewtqty').text().trim(),Amount: jquery_1_11_3_min_p('#txtamount_1').val().trim(),NetAmt: jquery_1_11_3_min_p('#lblnetamt').text().trim(),AvgWtAmt: jquery_1_11_3_min_p('#lblavgwt').text().trim(),CountryId: kendo_all_min_js("#ddlcountry").val(),EntityId: kendo_all_min_js("#ddlentity").val(),CreatedBy: jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim(),Locationtableid: Locationtableid,Skuid: kendo_all_min_js("#ddlvariant_1").val()});
TransJson=JSON.stringify(Transdetails);
 jquery_1_11_3_min_p.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: "../WebServices/Transaction.asmx/InsertTrans",
    data: "{'Transjson':'" + TransJson + "','trackingcolumn':'" + dbcolumns + "','Entityid':'" + kendo_all_min_js("#ddlentity").val() + "','Countryid':'" + kendo_all_min_js("#ddlcountry").val() + "','itemid':'" + newitemid + "','locationid':'" + kendo_all_min_js("#ddllocation_" + Counter.toString()).data("kendoDropDownList").value() + "'}",
    dataType: "json",
    async: false,
    success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
           // swal("Saved Successfully","Item Saved successfully!","success")
              if(jsonData.Table[0].Response=="1")
              {
             swal("Saved Successfully","Transaction Created successfully!","success")
            .then((value) => {
             window.location.replace("InventoryTransaction.aspx");
            });
            }
        }
    });




}

function Setqty(Data)
{
var id = Data.id;
var val = jquery_1_11_3_min_p('#' + id).val();
jquery_1_11_3_min_p('#lblnewtqty').text(val);

}


function Setamt(Data)
{
var id = Data.id;
var val = jquery_1_11_3_min_p('#' + id).val();
jquery_1_11_3_min_p('#lblnetamt').text(val);

var netqty=jquery_1_11_3_min_p('#lblnewtqty').text();

var avgwtamt= parseFloat(jquery_1_11_3_min_p('#lblnetamt').text())/parseFloat(netqty);
jquery_1_11_3_min_p('#lblavgwt').text(avgwtamt);



}


function ValidateGridColumn() {
    var allow = true;
    var i = 1;
    jquery_1_11_3_min_p('#tblserialpop tbody').find('tr').each(function () {
        var row = jquery_1_11_3_min_p(this);
        var rowid = row.find('td:nth-child(3)').text().trim();
        if (jquery_1_11_3_min_p("#txtserialno_" + rowid).val() == "") {
            jquery_1_11_3_min_p("#txtserialno_" + rowid).addClass("validate");
            jquery_1_11_3_min_p("#txtserialno_" + rowid).attr("placeholder", "Enter Field!");
            allow = false;
        }

        i++;
    });
    return allow;
}

function ValidateGridColumnB() {
    var allow = true;
    var i = 1;
    jquery_1_11_3_min_p('#tblbatch tbody').find('tr').each(function () {
        var row = jquery_1_11_3_min_p(this);
        var rowid = row.find('td:nth-child(3)').text().trim();
        if (jquery_1_11_3_min_p("#txtbatchno_" + rowid).val() == "") {
            jquery_1_11_3_min_p("#txtbatchno_" + rowid).addClass("validate");
            jquery_1_11_3_min_p("#txtbatchno_" + rowid).attr("placeholder", "Enter Field!");
            allow = false;
        }

        i++;
    });
    return allow;
}



function CreateColumn() {
    var data = kendo_all_min_js('#ddlitem_1').data("kendoDropDownList").value().split('-');
    var itemid = data[0];
    var trackingid = data[1];
    jquery_1_11_3_min_p('#tblserialpop tbody tr').each(function () {
        var row = jquery_1_11_3_min_p(this);
        var id = "txtserialno_" + row.find('td:nth-child(3)').text().trim();
        var columnnameval = jquery_1_11_3_min_p('#' + id).val().replace(/\s+/g, '');
        dbfinalcolumnname.push({ ItemId: itemid,TrackingType: trackingid, TrackingValue: columnnameval,EntityId:kendo_all_min_js("#ddlentity").val(),CountryId:kendo_all_min_js("#ddlcountry").val(),CreatedBy:jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim() });
    });
    dbcolumns = JSON.stringify(dbfinalcolumnname);
    
    jquery_1_11_3_min_p("#txtserialno_" + parseInt(Counter)).attr('disabled', 'disabled');
    $("#serialNo").modal('hide');


}

function CreateColumnB() {
    var data = kendo_all_min_js('#ddlitem_1').data("kendoDropDownList").value().split('-');
    var itemid = data[0];
    var trackingid = data[1];
    jquery_1_11_3_min_p('#tblbatch tbody tr').each(function () {
        var row = jquery_1_11_3_min_p(this);
        var id = "txtbatchno_" + row.find('td:nth-child(3)').text().trim();
        var columnnameval = jquery_1_11_3_min_p('#' + id).val().replace(/\s+/g, '');
        dbfinalcolumnname.push({ ItemId: itemid,TrackingType: trackingid, TrackingValue: columnnameval,EntityId:kendo_all_min_js("#ddlentity").val(),CountryId:kendo_all_min_js("#ddlcountry").val(),CreatedBy:jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim() });
    });
    dbcolumns = JSON.stringify(dbfinalcolumnname);
     
    jquery_1_11_3_min_p("#txtserialno_" + parseInt(Counter)).attr('disabled', 'disabled');
    $("#Batchno").modal('hide');


}







function BindFormdetails() {
    var Country = []; var Entity = []; var jsonData = '';
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Transaction.asmx/BindEntitydDetails",
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
            var Countryname = kendo_all_min_js("#ddlcountry").data("kendoDropDownList").text();
            var cName = Countryname.split(' ');
            var EntityName = kendo_all_min_js("#ddlentity").data("kendoDropDownList").text();
            var EName = EntityName.split(' ');
            var tablename = 'tbl' + EName[0] + 'Address' + cName[0];
            var countryid = kendo_all_min_js("#ddlcountry").data("kendoDropDownList").value();
            var entityid = kendo_all_min_js("#ddlentity").data("kendoDropDownList").value();
            BindLocation(tablename, countryid, entityid);

        }
    });
    kendo_all_min_js('#ddlentity').data("kendoDropDownList").value(3);
    var Countryname = kendo_all_min_js("#ddlcountry").data("kendoDropDownList").text();
    var cName = Countryname.split(' ');
    var EntityName = kendo_all_min_js("#ddlentity").data("kendoDropDownList").text();
    var EName = EntityName.split(' ');
     tablename = 'tbl' + EName[0] + 'Address' + cName[0];
     
    var countryid = kendo_all_min_js("#ddlcountry").data("kendoDropDownList").value();
    var entityid = kendo_all_min_js("#ddlentity").data("kendoDropDownList").value();
    BindLocation(tablename, countryid, entityid);
    
}

function BindLocation(tablename,countryid, entityid) {
    var Location = []; var items = []; var transtype = []; var location = ''; var item = '';var trastypes = ''; var variant=[]; var variantid='';
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Transaction.asmx/BindLocation",
        data: "{'Tablename':'" + tablename + "','Countryid':'" + countryid + "','Entityid':'" + entityid + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            Locationjsondata = eval(result.d);
            if (Locationjsondata.Table[0].Response == "1") {
                var i = 0;
                Location.push({ value: "0", text: "Select" });
                jQuery.each(Locationjsondata.Table1, function (rec) {
                    Location.push({ value: Locationjsondata.Table1[i].AutoId, text: Locationjsondata.Table1[i].Locationname });
                    i++;
                });
                var i = 0;
                items.push({ value: "0", text: "Select" });
                jQuery.each(Locationjsondata.Table2, function (rec) {
                    items.push({ value: Locationjsondata.Table2[i].ItemCode, text: Locationjsondata.Table2[i].ItemName });
                    i++;
                });

                var i = 0;
                transtype.push({ value: "0", text: "Select" });
                jQuery.each(Locationjsondata.Table3, function (rec) {
                    transtype.push({ value: Locationjsondata.Table3[i].Transid, text: Locationjsondata.Table3[i].Transtype });
                    i++;
                });
//                 var i = 0;
//                variant.push({ value: "0", text: "Select" });
//                jQuery.each(Locationjsondata.Table5, function (rec) {
//                    variant.push({ value: Locationjsondata.Table5[i].Skuid, text: Locationjsondata.Table5[i].Skuname });
//                    i++;
//                });


                location = "ddllocation_" + Counter;
                kendo_all_min_js('#' + location).kendoDropDownList({
                    filter: "contains",
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: Location,
                    change: function () {
                        kendo_all_min_js('#' + location).data("kendoDropDownList").span.css('background', 'none');
                    }
                });

                item = "ddlitem_" + Counter;
                kendo_all_min_js('#' + item).kendoDropDownList({
                    filter: "contains",
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: items,
                    change: function () {
                        kendo_all_min_js('#' + item).data("kendoDropDownList").span.css('background', 'none');
                        var data = kendo_all_min_js('#' + item).data("kendoDropDownList").value().split('-');
                         var Variant  =  jquery_1_11_3_min_p('#' + variantid).data("kendoDropDownList");
                         Variant.readonly(false);
                          variantid = "ddlvariant_" + Counter;
                         var itemid=data[0];variant=[];
                         variant.push({ value: "0", text: "Select" });
                         var i=0;
                          jQuery.each(Locationjsondata.Table5, function (rec) {
                             if(Locationjsondata.Table5[i].Itemid==itemid)
                             {
                              variant.push({ value: Locationjsondata.Table5[i].Skuid, text: Locationjsondata.Table5[i].Skuname });
                              }
                                 i++;
                             }); 

                 variantid = "ddlvariant_" + Counter;
                kendo_all_min_js('#' + variantid).kendoDropDownList({
                    filter: "contains",
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: variant,
                    change: function () {
                        kendo_all_min_js('#' + variantid).data("kendoDropDownList").span.css('background', 'none');
                    }
                });

                        if (data[1] == 2) {
                            $("#serialNo").modal('show');
                            $("#Batchno").modal('hide');
                            detailcounter = 1;
                            dbfinalcolumnname = []; dbcolumns = '';

                        }
                        else if (data[1] == 3) {

                            $("#Batchno").modal('show');
                            $("#serialNo").modal('hide');
                            detailcounter = 1;
                            dbfinalcolumnname = []; dbcolumns = '';

                        }
                        else if (data[1] == 1) {
                            detailcounter = 1;
                            dbfinalcolumnname = []; dbcolumns = '';
                        }
                    }
                });

                trastypes = "ddltranstype_" + Counter;
                kendo_all_min_js('#' + trastypes).kendoDropDownList({
                    filter: "contains",
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: transtype,
                    change: function () {
                        kendo_all_min_js('#' + trastypes).data("kendoDropDownList").span.css('background', 'none');
                    }
                });

                var countryid = kendo_all_min_js("#ddlcountry").data("kendoDropDownList").value();
                var entityid = kendo_all_min_js("#ddlentity").data("kendoDropDownList").value();
//                if(countryid== Locationjsondata.Table4[0].CountryId && entityid==  Locationjsondata.Table4[0].EntityId)
//                {
//                Locationtableid=Locationjsondata.Table4[0].AutoId;
//                }
               //added by satyendar
                  var m=0;
                  jQuery.each(Locationjsondata.Table4, function (rec) {
                 if(countryid== Locationjsondata.Table4[m].CountryId && entityid==  Locationjsondata.Table4[m].EntityId)
                {
                Locationtableid=Locationjsondata.Table4[m].AutoId;
                }
                                 m++;
                             });
                             //end by satyendar
                variant=[];
                variant.push({ value: "0", text: "Select" });
                variantid = "ddlvariant_" + Counter;
                kendo_all_min_js('#' + variantid).kendoDropDownList({
                    filter: "contains",
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: variant,
                    change: function () {
                        kendo_all_min_js('#' + variantid).data("kendoDropDownList").span.css('background', 'none');
                    }
                });

                var Variant  =  jquery_1_11_3_min_p('#' + variantid).data("kendoDropDownList");
                Variant.readonly(true);
                

            }
            else {
               variant=[];
                variant.push({ value: "0", text: "Select" });
                variantid = "ddlvariant_" + Counter;
                kendo_all_min_js('#' + variantid).kendoDropDownList({
                    filter: "contains",
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: variant,
                    change: function () {
                        kendo_all_min_js('#' + variantid).data("kendoDropDownList").span.css('background', 'none');
                    }
                });
                 var Variant  =  jquery_1_11_3_min_p('#' + variantid).data("kendoDropDownList");
                Variant.readonly(true);

                Location.push({ value: "0", text: "Select" });
                location = "ddllocation_" + Counter;
                kendo_all_min_js('#' + location).kendoDropDownList({
                    filter: "contains",
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: Location,
                    change: function () {
                        kendo_all_min_js('#' + location).data("kendoDropDownList").span.css('background', 'none');
                    }
                });

                items.push({ value: "0", text: "Select" });
                item = "ddlitem_" + Counter;
                kendo_all_min_js('#' + location).kendoDropDownList({
                    filter: "contains",
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: items,
                    change: function () {
                        kendo_all_min_js('#' + item).data("kendoDropDownList").span.css('background', 'none');
                        
                    }
                });

                transtype.push({ value: "0", text: "Select" });
                trastypes = "ddltranstype_" + Counter;
                kendo_all_min_js('#' + location).kendoDropDownList({
                    filter: "contains",
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: transtype,
                    change: function () {
                        kendo_all_min_js('#' + trastypes).data("kendoDropDownList").span.css('background', 'none');
                    }
                });

//                Locationjsondata.Table4[0].ItemCode
            }
        },
        error: function (result) {
        }
    });
    return Locationjsondata;
}


function Addpopuprow() {
    if (jquery_1_11_3_min_p("#txtserialno_" + detailcounter).val() != "") {
        var rowID = detailcounter + 1;
        var markup = "<tr><td><input type='checkbox' class='chk_PAll' id='cbP_" + rowID + "'></td><td ><input type='text' class='' id='txtserialno_" + rowID + "'  autocomplete='off' placeholder='Enter Column Name' /></td><td style='display:none'>" + rowID + "</td></tr>";
        jquery_1_11_3_min_p("#tblserialpop tbody").append(markup);


        // kendo_all_min_js("#ddlDatatype_" + rowID).focus();
        detailcounter = rowID;
        jquery_1_11_3_min_p("#txtserialno_" + parseInt(detailcounter - 1)).attr('disabled', 'disabled');


    }
    else {


        if (jquery_1_11_3_min_p("#txtserialno_" + detailcounter).val() == "") {
            jquery_1_11_3_min_p("#txtserialno_" + detailcounter).addClass("validate");
            jquery_1_11_3_min_p("#txtserialno_" + detailcounter).attr("placeholder", "Enter Serialno!");

        }
    }
}



function Addpopupbatchrow() {
    if (jquery_1_11_3_min_p("#txtbatchno_" + detailcounter).val() != "") {
        var rowID = detailcounter + 1;
        var markup = "<tr><td><input type='checkbox' class='chk_PAll' id='cbP_" + rowID + "'></td><td ><input type='text' class='' id='txtbatchno_" + rowID + "'  autocomplete='off' placeholder='Enter Column Name' /></td><td style='display:none'>" + rowID + "</td></tr>";
        jquery_1_11_3_min_p("#tblbatch tbody").append(markup);


        // kendo_all_min_js("#ddlDatatype_" + rowID).focus();
        detailcounter = rowID;
        jquery_1_11_3_min_p("#txtbatchno_" + parseInt(detailcounter - 1)).attr('disabled', 'disabled');


    }
    else {


        if (jquery_1_11_3_min_p("#txtbatchno_" + detailcounter).val() == "") {
            jquery_1_11_3_min_p("#txtbatchno_" + detailcounter).addClass("validate");
            jquery_1_11_3_min_p("#txtbatchno_" + detailcounter).attr("placeholder", "Enter Serialno!");

        }
    }
}




function BindEntityForgrid() {
    var EntityforGrid = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Transaction.asmx/BindEntityForgrid",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
            var i = 0;
            jQuery.each(jsonData.Table, function (rec) {
                EntityforGrid.push({ value: jsonData.Table[i].Entityid, text: jsonData.Table[i].Entityname });
                i++;
            });

        },
        error: function (result) {
        }
    });
    kendo_all_min_js('#ddlgridEntity').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: EntityforGrid,
        change: function () {
            kendo_all_min_js('#ddlgridEntity').data("kendoDropDownList").span.css('background', 'none');
           BindItemGrid(kendo_all_min_js('#ddlgridEntity').val()) ;

        }
    });
   
    
}




