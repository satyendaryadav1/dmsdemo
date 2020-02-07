
var LoadData = '';
var searchFlag='';

jquery_1_11_3_min_p(document).ready(function () {


    jquery_1_11_3_min_p('#btnBack').css('display', 'none');
    jquery_1_11_3_min_p('#btnSubmit').css('display', 'none');
   jquery_1_11_3_min_p('#btnUpdate').css('display', 'none');
   
    jquery_1_11_3_min_p('#NotSellableItm').css('display', 'none');
    
   
    jquery_1_11_3_min_p("#hdnLoad").val(50);
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    jquery_1_11_3_min_p('#preloader').css('display', 'block');
    jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
    BindSellableItem();
    jquery_1_11_3_min_p('#btnLoadMore').click(function () {
        LoadData = parseInt(LoadData) + 50;
        jquery_1_11_3_min_p("#hdnLoad").val(LoadData);
        jquery_1_11_3_min_p('#preloader').css('display', 'block');
        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
        BindAllItem();
    });
    jquery_1_11_3_min_p('#searchText').keypress(function (event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
        if(searchFlag==''){
           SearchBindSellableItem();
             
             }
             else{
            SearchBindAllItem();
             }
        }

    });
    jquery_1_11_3_min_p('#btnLoadMore1').click(function () {
        LoadData = parseInt(LoadData) + 50;
        jquery_1_11_3_min_p("#hdnLoad").val(LoadData);
        jquery_1_11_3_min_p('#preloader').css('display', 'block');
        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
        BindSellableItem();
    });

    jquery_1_11_3_min_p('#btnNew').click(function () {
        searchFlag=1;
        jquery_1_11_3_min_p('#preloader').css('display', 'block');
        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block')
        jquery_1_11_3_min_p('#NotSellableItm').css('display', 'block');
        jquery_1_11_3_min_p('#SellableItme').css('display', 'none');
        jquery_1_11_3_min_p('#btnSubmit').css('display', 'block');
      //  jquery_1_11_3_min_p('#btnSubmit').prop('disabled', 'disabled');
        jquery_1_11_3_min_p('#btnBack').css('display', 'block');
        jquery_1_11_3_min_p('#btnNew').css('display', 'none');
        BindAllItem();
        jquery_1_11_3_min_p('#searchText').val("");
    });

      jquery_1_11_3_min_p('#search').click(function () {
        if(searchFlag==''){
           SearchBindSellableItem();
             
             }
             else{
            SearchBindAllItem();
             }
       });

    jquery_1_11_3_min_p('#btnSubmit').click(function () {
    var flagitem=0;
     var sel = false;
        var ch = jquery_1_11_3_min_p('#' + 'AllItemgrid').find('tbody input[type=checkbox]');
        ch.each(function () {
            var $this = jquery_1_11_3_min_p(this);
            if ($this.is(':checked')) {
                sel = true;
               flagitem = 1;
            }
            else {
                swal('No Line Selected');

            }
        });
        if(flagitem==1)
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

              MakeSellableItem();
              }
             });
}
       
    });

    jquery_1_11_3_min_p('#btnUpdate').click(function () {
    var flag=0;
    var ch = jquery_1_11_3_min_p('#' + 'SellableItemgrid').find('tbody input[type=checkbox]');
       ch.each(function () {
           var $this = jquery_1_11_3_min_p(this);
           if ($this.is(':checked')) {
               sel = true;
             
               flag = 1;
           }
           else {
               swal('No Lines Selected');
               
               return;
           }
       });
       if(flag==1)
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

               MakeNONSellableItem();
              }
             });
}
       
    });
    jquery_1_11_3_min_p('#btnBack').click(function () {
        jquery_1_11_3_min_p('#NotSellableItm').css('display', 'none')
       jquery_1_11_3_min_p('#SellableItme').css('display', 'block');

        jquery_1_11_3_min_p('#btnNew').css('display', 'block');
        jquery_1_11_3_min_p('#btnBack').css('display', 'none');
        jquery_1_11_3_min_p('#btnSubmit').css('display', 'none');
        searchFlag='';
        BindSellableItem();
        jquery_1_11_3_min_p('#searchText').val("");
        
    });

}); 

function BindAllItem() {
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
   
    var Transdata = [];
    var LoadData = jquery_1_11_3_min_p("#hdnLoad").val();

    var UpdatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text();
    var AccountNo = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblAccountNo').text();

    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/AllItem.asmx/BindAllItem",
        data: "{'LoadData':'" + LoadData + "'}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');

            var i = 0;
            var jsonData = result.d;
            jQuery.each(jsonData.Table, function (rec) {
           
                Transdata.push({ AXItemid: jsonData.Table[i].AXItemid, ItemName: jsonData.Table[i].ItemName, ItemUnit: jsonData.Table[i].ItemUnit });
                i++;
            });

            kendo_all_min_js('#AllItemgrid').kendoGrid({
                toolbar: ['Export'],
          
                dataSource: {
                    data: Transdata,
                    schema: {
                        model: {
                            id: "AXItemid",
                            fields: {
                               
                                AXItemid: { type: "string" },
                                ItemName: { type: "string" },
                                ItemUnit: { type: "string" }
                                

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
                        var grid = kendo_all_min_js("#AllItemgrid").getKendoGrid();

                        var rows = [{
                            cells: [
            { value: "AXItemid" },
            { value: "ItemName" },
             { value: "ItemUnit" }
           

          ]
                        }];
                        var trs = $("#AllItemgrid").find('tr');
                        for (var i = 0; i < trs.length; i++) {
                            if ($(trs[i]).find(":checkbox").is(":checked")) {
                                var dataItem = grid.dataItem(trs[i]);
                                rows.push({
                                    cells: [
                { value: dataItem.AXItemid },
                { value: dataItem.ItemName },
                { value: dataItem.ItemUnit }
                

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




                             { title: " <input id='chkall' type='checkbox' class='checkboxcls' onclick='checkAll(this)' /> All", template: " <input id='chk' class='checkAll' type='checkbox'/>", filtrable: false, width: "30px" },
                            { field: "AXItemid", title: "Item Id", width: "100px" },
                            { field: "ItemName", title: "Item Name", width: "100px" },
                            { field: "ItemUnit", title: "Item Unit", width: "100px" },
                              { field: "", title: "", width: "300px" }
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

function SearchBindAllItem() {
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 300;
    var LoadData = jquery_1_11_3_min_p('#lblRowCount').text();
    var SearchValue = jquery_1_11_3_min_p('#searchText').val();
    var Transdata = [];
    var LoadData = jquery_1_11_3_min_p("#hdnLoad").val();

    var UpdatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text();
    var AccountNo = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblAccountNo').text();

    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/AllItem.asmx/SearchBindAllItem",
        data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue + "'}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');

            var i = 0;
            var jsonData = result.d;
            jQuery.each(jsonData.Table, function (rec) {
           
                Transdata.push({ AXItemid: jsonData.Table[i].AXItemid, ItemName: jsonData.Table[i].ItemName, ItemUnit: jsonData.Table[i].ItemUnit });
                i++;
            });

            kendo_all_min_js('#AllItemgrid').kendoGrid({
                toolbar: ['Export'],
          
                dataSource: {
                    data: Transdata,
                    schema: {
                        model: {
                            id: "AXItemid",
                            fields: {
                               
                                AXItemid: { type: "string" },
                                ItemName: { type: "string" },
                                ItemUnit: { type: "string" }
                                

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
                        var grid = kendo_all_min_js("#AllItemgrid").getKendoGrid();

                        var rows = [{
                            cells: [
            { value: "AXItemid" },
            { value: "ItemName" },
             { value: "ItemUnit" }
           

          ]
                        }];
                        var trs = $("#AllItemgrid").find('tr');
                        for (var i = 0; i < trs.length; i++) {
                            if ($(trs[i]).find(":checkbox").is(":checked")) {
                                var dataItem = grid.dataItem(trs[i]);
                                rows.push({
                                    cells: [
                { value: dataItem.AXItemid },
                { value: dataItem.ItemName },
                { value: dataItem.ItemUnit }
                

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




                             { title: " <input id='chkall' type='checkbox' class='checkboxcls' onclick='checkAll(this)' />", template: " <input id='chk' class='checkAll' type='checkbox'/>", filtrable: false, width: "30px" },
                            { field: "AXItemid", title: "Item Id", width: "100px" },
                            { field: "ItemName", title: "Item Name", width: "100px" },
                            { field: "ItemUnit", title: "Item Unit", width: "100px" },
                               { field: "", title: "", width: "300px" }
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

function SearchBindSellableItem() {
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 270;
    var LoadData = jquery_1_11_3_min_p('#lblRowCount').text();
    var SearchValue = jquery_1_11_3_min_p('#searchText').val();
    var Transdata = [];
    var LoadData = jquery_1_11_3_min_p("#hdnLoad").val();

//    var UpdatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text();
//    var AccountNo = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblAccountNo').text();

    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/AllItem.asmx/SearchBindSellableItem",
        data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue + "'}",
        dataType: "json",
       success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
           //  jquery_1_11_3_min_p('#SellableItme').css('display', 'block');
           
            var i = 0;
            var jsonData = result.d;
            if(jsonData.Table.length >0)
            {
           jquery_1_11_3_min_p('#btnUpdate').css('display', 'block');
            }
            else{
            jquery_1_11_3_min_p('#btnUpdate').css('display', 'none');
            }
           
            jQuery.each(jsonData.Table, function (rec) {

                Transdata.push({ AXItemid: jsonData.Table[i].AXItemid, ItemName: jsonData.Table[i].ItemName, ItemUnit: jsonData.Table[i].ItemUnit });
                i++;
            });

            kendo_all_min_js('#SellableItemgrid').kendoGrid({
                toolbar: ['Export'],

                dataSource: {
                    data: Transdata,
                    schema: {
                        model: {
                            id: "AXItemid",
                            fields: {
                               
                                AXItemid: { type: "string" },
                                ItemName: { type: "string" },
                                ItemUnit: { type: "string" }


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
                        var grid = kendo_all_min_js("#SellableItemgrid").getKendoGrid();

                        var rows = [{
                            cells: [
            { value: "AXItemid" },
            { value: "ItemName" },
             { value: "ItemUnit" }


          ]
                        }];
                        var trs = $("#SellableItemgrid").find('tr');
                        for (var i = 0; i < trs.length; i++) {
                            if ($(trs[i]).find(":checkbox").is(":checked")) {
                                var dataItem = grid.dataItem(trs[i]);
                                rows.push({
                                    cells: [
                { value: dataItem.AXItemid },
                { value: dataItem.ItemName },
                { value: dataItem.ItemUnit }


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



                           
                             { title: " <input id='chkall' type='checkbox' class='checkboxcls' onclick='checkAll(this)' /> All", template: " <input id='chk1' class='checkAll' type='checkbox'/>", filtrable: false, width: "30px" },
                            { field: "AXItemid", title: "Item Id", width: "100px" },
                            { field: "ItemName", title: "Item Name", width: "100px" },
                            { field: "ItemUnit", title: "Item Unit", width: "100px" },
                             { field: "", title: "", width: "300px" }
                           ]
            });
            kendo_all_min_js(".k-grid-content").css('max-height', gh);
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
        },
        error: function () {
        }
    });

}


function BindSellableItem() {
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 300;

    var Transdata = [];
    var LoadData = jquery_1_11_3_min_p("#hdnLoad").val();

    var UpdatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text();
    var AccountNo = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblAccountNo').text();

    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/AllItem.asmx/BindSellableItem",
        data: "{'LoadData':'" + LoadData + "'}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
           //  jquery_1_11_3_min_p('#SellableItme').css('display', 'block');
           
            var i = 0;
            var jsonData = result.d;
            if(jsonData.Table.length >0)
            {
           jquery_1_11_3_min_p('#btnUpdate').css('display', 'block');
            }
            else{
            jquery_1_11_3_min_p('#btnUpdate').css('display', 'none');
            }
           
            jQuery.each(jsonData.Table, function (rec) {

                Transdata.push({ AXItemid: jsonData.Table[i].AXItemid, ItemName: jsonData.Table[i].ItemName, ItemUnit: jsonData.Table[i].ItemUnit });
                i++;
            });

            kendo_all_min_js('#SellableItemgrid').kendoGrid({
                toolbar: ['Export'],

                dataSource: {
                    data: Transdata,
                    schema: {
                        model: {
                            id: "AXItemid",
                            fields: {
                               
                                AXItemid: { type: "string" },
                                ItemName: { type: "string" },
                                ItemUnit: { type: "string" }


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
                        var grid = kendo_all_min_js("#SellableItemgrid").getKendoGrid();

                        var rows = [{
                            cells: [
            { value: "AXItemid" },
            { value: "ItemName" },
             { value: "ItemUnit" }


          ]
                        }];
                        var trs = $("#SellableItemgrid").find('tr');
                        for (var i = 0; i < trs.length; i++) {
                            if ($(trs[i]).find(":checkbox").is(":checked")) {
                                var dataItem = grid.dataItem(trs[i]);
                                rows.push({
                                    cells: [
                { value: dataItem.AXItemid },
                { value: dataItem.ItemName },
                { value: dataItem.ItemUnit }


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



                           
                             { title: " <input id='chkall' type='checkbox' class='checkboxcls' onclick='checkAll(this)' /> All", template: " <input id='chk1' class='checkAll' type='checkbox'/>", filtrable: false, width: "30px" },
                            { field: "AXItemid", title: "Item Id", width: "100px" },
                            { field: "ItemName", title: "Item Name", width: "100px" },
                            { field: "ItemUnit", title: "Item Unit", width: "100px" },
                             { field: "", title: "", width: "300px" }
                           ]
            });
            kendo_all_min_js(".k-grid-content").css('max-height', gh);
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
        },
        error: function () {
        }
    });

}

function MakeSellableItem() {
   
    Item = []; jsonItem = '';
    var UpdatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text();
     var sel = false;
        var ch = jquery_1_11_3_min_p('#' + 'AllItemgrid').find('tbody input[type=checkbox]');
        ch.each(function () {
            var $this = jquery_1_11_3_min_p(this);
            if ($this.is(':checked')) {
                sel = true;
                row = jquery_1_11_3_min_p(this).closest('tr')[0];
                Item.push({ AxItemId: row.cells[1].innerHTML });
              
            }
           
        });
        
            jsonItem = JSON.stringify(Item);
            jquery_1_11_3_min_p.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "../WebServices/AllItem.asmx/MakeSellableItem",
                data: "{'jsonItem':'" + jsonItem + "','UpdatedBy':'" + UpdatedBy + "'}",
                dataType: "json",
                success: function (result) {
                    
                    swal("Submitted Successfully")
                    .then((value) => {
                  // BindAllItem();
                   window.location.replace("AllItem.aspx")
                         });

                    
                    var i = 0;
                    var jsonData = result.d;



                }
            });
        

   }

   function MakeNONSellableItem() {
     
       Item = []; jsonItem = '';
       var UpdatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text();
       var sel = false;
       var ch = jquery_1_11_3_min_p('#' + 'SellableItemgrid').find('tbody input[type=checkbox]');
       ch.each(function () {
           var $this = jquery_1_11_3_min_p(this);
           if ($this.is(':checked')) {
               sel = true;
               row = jquery_1_11_3_min_p(this).closest('tr')[0];
               Item.push({ AxItemId: row.cells[1].innerHTML });
               
           }
          
       });
      
           jsonItem = JSON.stringify(Item);
           jquery_1_11_3_min_p.ajax({
               type: "POST",
               contentType: "application/json; charset=utf-8",
               url: "../WebServices/AllItem.asmx/MakeNONSellableItem",
               data: "{'jsonItem':'" + jsonItem + "','UpdatedBy':'" + UpdatedBy + "'}",
               dataType: "json",
               success: function (result) {
                 
                   swal("Deleted Successfully")
                    .then((value) => {
                   BindSellableItem();
                         });

                  

                   var i = 0;
                   var jsonData = result.d;



               }
           });
       
   }







function checkAll(ele) {
    debugger;
    var state = $(ele).is(':checked');
    var grid = $('#AllItemgrid').data('kendoGrid');
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
