var StausId = '';
var LoadData = '';
var ReturnStatusId = '';
jquery_1_11_3_min_p(document).ready(function () {

    BindDropDownStatus();
    
    
    jquery_1_11_3_min_p("#hdnLoad").val(50);
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    jquery_1_11_3_min_p('#preloader').css('display', 'block');
    jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
  StausId=  BindTrans(1);
    jquery_1_11_3_min_p('#btnLoadMore').click(function () {
        LoadData = parseInt(LoadData) + 50;
        jquery_1_11_3_min_p("#hdnLoad").val(LoadData);
       jquery_1_11_3_min_p('#preloader').css('display', 'block');
       jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
        BindTrans(ReturnStatusId);
    });
   
});

function BindTrans(statusId) {
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 300;
     ReturnStatusId = statusId;
    var Transdata = [];
    var LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
  
    var UpdatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text();
    var AccountNo = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblAccountNo').text();

    jquery_1_11_3_min_p.ajax({
        type: "POST", 
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Transaction.asmx/BindTrans",
        data: "{'LoadData':'" + LoadData + "','AccountNo':'" + AccountNo + "','StatusId':'" + ReturnStatusId + "'}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
          
            var i = 0;
            var jsonData = result.d;
            jQuery.each(jsonData.Table, function (rec) {
                Transdata.push({ TransId: jsonData.Table[i].TransId, VoucharNo: jsonData.Table[i].VoucharNo, AccountNo: jsonData.Table[i].AccountNo, TransAmount: jsonData.Table[i].TransAmount, TransDate: jsonData.Table[i].TransDate, invoiceNo: jsonData.Table[i].invoiceNo, currencyCode: jsonData.Table[i].currencyCode, settlementdate: jsonData.Table[i].settlementdate, Status: jsonData.Table[i].Status });
                i++;
            });

            kendo_all_min_js("#transectionGrid").kendoGrid({
              toolbar: ['Export'],
//                excel: {
//                    fileName: "Book1.xlsx",
//                    filterable: true,
//                    allPages: true
//                },
                dataSource: {
                    data: Transdata,
                    schema: {
                        model: {
                            id: "TransId",
                            fields: {
                                VoucharNo: { type: "string" },
                                TransDate: { type: "string" },
                                TransAmount: { type: "string" },
                                currencyCode: { type: "string" },
                                invoiceNo: { type: "string" },
                                settlementdate: { type: "string" }
                                    ,
                                Status: { type: "string" }
                                
                            }
                        }
                    }
                },

                selectable: "single",
                height: 250,
                scrollable: true,
                sortable: true,
                reorderable: true,
                persistSelection: true,
                resizable: true,
                groupable: false,
                filterable: true,
                dataBound: function (e) {
                    jquery_1_11_3_min_p(".k-grid-Export").click(function () {
                        var grid = kendo_all_min_js("#transectionGrid").getKendoGrid();

                        var rows = [{
                            cells: [
            { value: "VoucharNo" },
            { value: "TransDate" },
             { value: "TransAmount" },
            { value: "currencyCode" },
            { value: "invoiceNo" },
            { value: "settlementdate" },
             { value: "Status" }
           

          ]
                        }];
                        var trs = $("#transectionGrid").find('tr');
                        for (var i = 0; i < trs.length; i++) {
                            if ($(trs[i]).find(":checkbox").is(":checked")) {
                                var dataItem = grid.dataItem(trs[i]);
                                rows.push({
                                    cells: [
                { value: dataItem.VoucharNo },
                { value: dataItem.TransDate },
                { value: dataItem.TransAmount },
                { value: dataItem.currencyCode },
                { value: dataItem.invoiceNo },
                { value: dataItem.settlementdate },
                { value: dataItem.Status }
                
              ]
                                })
                            }
                        }
                        excelExport(rows)
                    });

                    var grid = this;
                    grid.tbody.find("tr").dblclick(function (e) {
                        var dataItem = grid.dataItem(this);
                     
                    });

                    grid.tbody.find("tr").click(function (e) {


                    });
                },
                pageable: false,
                columns: [


                            { hidden: true, field: "TransId", title: "Trans Id", width: "10px" },
                            { hidden: true, field: "AccountNo", title: "Account No", width: "10px" },
                             { title: " <input id='chkall' type='checkbox' class='checkboxcls' onclick='checkAll(this)' />", template: " <input id='chk_#=TransId#' class='checkAll' type='checkbox'/>", filtrable: false, width: "20px" },
                            { field: "VoucharNo", title: "Vouchar No", width: "100px" },
                            { field: "TransDate", title: "Transaction Date", width: "100px" },
                            { field: "TransAmount", title: "Transaction Amount", width: "100px" },
                            { field: "currencyCode", title: "Currency Code", width: "100px" },
                            { field: "invoiceNo", title: "Invoice No", width: "100px" },
                            { field: "settlementdate", title: "Settlement Date", width: "100px" },
                            { field: "Status", title: "Status", width: "100px" }

                           ]
            });
            kendo_all_min_js(".k-grid-content").css('max-height', gh);
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
        },
        error: function () {
        }
    });
    return ReturnStatusId;
}


function BindDropDownStatus() {
 Transdata = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Transaction.asmx/BindDropDownStatus",
        data: "{}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsondata = eval(result.d);
           // Transdata.push({ value: "0", text: "Select" });
            jQuery.each(jsondata.Table, function (rec) {
                Transdata.push({ value: jsondata.Table[i].TransStatusId, text: jsondata.Table[i].Name });
                i++;
            });
        },
        error: function (result) {
        }
    });
    kendo_all_min_js('#txtTrans').kendoDropDownList({
        filter: "contains",
        // optionLabel: "Select",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Transdata,
        change: function () {
            jquery_1_11_3_min_p('#preloader').css('display', 'block');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
            jquery_1_11_3_min_p("#hdnLoad").val(50);
            LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
            var StatusId = kendo_all_min_js("#txtTrans").val().trim();
           
                BindTrans(StatusId);
            
           
            

        }
    });
    }


    function checkAll(ele) {
        debugger;
        var state = $(ele).is(':checked');
        var grid = $('#transectionGrid').data('kendoGrid');
        if (state == true) {

            $('.checkAll').prop('checked', true);
        }
        else {

            $('.checkAll').prop('checked', false);
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
