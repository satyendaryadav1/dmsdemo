jquery_1_11_3_min_p(document).ready(function () {
   
    jquery_1_11_3_min_p("#hdnLoad").val(50);
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    jquery_1_11_3_min_p('#preloader').css('display', 'block');
    jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
    BindAllCustomers();
    jquery_1_11_3_min_p('#btnLoadMore').click(function () {
        LoadData = parseInt(LoadData) + 50;
        jquery_1_11_3_min_p("#hdnLoad").val(LoadData);
        jquery_1_11_3_min_p('#preloader').css('display', 'block');
        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
        BindAllCustomers();
    });

    jquery_1_11_3_min_p('#searchText').keypress(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {

            BindAllCustomers(); }

    });
    jquery_1_11_3_min_p('#search').click(function () {
        BindAllCustomers();
     });

});


function BindAllCustomers() {
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 300;
    var Custdata = [];
    var LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    var SearchValue = jquery_1_11_3_min_p("#searchText").val();
    var UpdatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text();
    jquery_1_11_3_min_p.ajax({

        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Customer.asmx/BindCustData",
        data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue +"'}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');

            var i = 0;
            var jsonData = result.d;
            jQuery.each(jsonData.Table, function (rec) {
                Custdata.push({ SrNo: jsonData.Table[i].SrNo, CUST_NAME: jsonData.Table[i].CUST_NAME, CUST_ACCOUNTNUMBER: jsonData.Table[i].CUST_ACCOUNTNUMBER, CUST_TYPE: jsonData.Table[i].CUST_TYPE, WareHouseName: jsonData.Table[i].WareHouseName});
                i++;
            });

            kendo_all_min_js("#custgrid").kendoGrid({
                toolbar: ['Export'],
               
                dataSource: {
                    data: Custdata,
                    schema: {
                        model: {
                            id: "SrNo",
                            fields: {
                                SrNo: { type: "string" },
                                CUST_NAME: { type: "string" },
                                CUST_ACCOUNTNUMBER: { type: "string" },
                                CUST_TYPE: { type: "string" },
                                WareHouseName: { type: "string" }
                               

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
                        var grid = kendo_all_min_js("#custgrid").getKendoGrid();

                        var rows = [{
                            cells: [
            { value: "SrNo" },
            { value: "CustomerName" },
             { value: "AccountNumber" },
            { value: "CustomerType" },
            { value: "WareHouseName" }
           


          ]
                        }];
                        var trs = $("#custgrid").find('tr');
                        for (var i = 0; i < trs.length; i++) {
                            if ($(trs[i]).find(":checkbox").is(":checked")) {
                                var dataItem = grid.dataItem(trs[i]);
                                rows.push({
                                    cells: [
                { value: dataItem.SrNo },
                { value: dataItem.CUST_NAME },
                { value: dataItem.CUST_ACCOUNTNUMBER },
                { value: dataItem.CUST_TYPE },
                { value: dataItem.WareHouseName }
                

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


                           
                             { title: " <input id='chkall' type='checkbox' class='checkboxcls' onclick='checkAll(this)' />All", template: " <input id='chk_Box' class='checkAll' type='checkbox'/>", filtrable: false, width: "20px" },
                            { field: "SrNo", title: "SrNo", width: "100px" },
                            { field: "CUST_NAME", title: "CustomerName", width: "100px" },
                            { field: "CUST_ACCOUNTNUMBER", title: "AccountNumber", width: "100px" },
                            { field: "CUST_TYPE", title: "CustomerType", width: "100px" },
                            { field: "WareHouseName", title: "WareHouseName", width: "100px" }
                           

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

}


function checkAll(ele) {
    debugger;
    var state = $(ele).is(':checked');
    var grid = $('#custgrid').data('kendoGrid');
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