var jsonRecallData = ''; var BindRecallHistory = ''; var RequestControlItems = [];
var JsonRequestControlItems = ''; var checkquantity=0; var Checkvalidation=0;var approvetextid='';
var approveqty=0;
jquery_1_11_3_min_p(document).ready(function () {
    var LoadData = '';
    jquery_1_11_3_min_p('#availableWarehouse').css('display', 'none');
    jquery_1_11_3_min_p('#createNewItem').css('display','none');
    jquery_1_11_3_min_p("#hdnLoad").val(10);
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    jquery_1_11_3_min_p('#btnLoadMore').click(function () {
        LoadData = parseInt(LoadData) + 10;
        jquery_1_11_3_min_p("#hdnLoad").val(LoadData);
        BindRequestHeader();
    });

    jquery_1_11_3_min_p("#closeApprovePop").click(function () {
    window.location.replace("requestControl.aspx");
     });
     jquery_1_11_3_min_p("#btnconfirm").click(function () {
    window.location.replace("requestControl.aspx");
     });

    jquery_1_11_3_min_p('#btnShip').prop('disabled', true);
    jquery_1_11_3_min_p("#btnback").click(function () {
        jquery_1_11_3_min_p('#divbtn').css('display', 'none');
        jquery_1_11_3_min_p('#tblRequisitionDetail').css('display', 'none');
        jquery_1_11_3_min_p('#RequestControlDetail').css('display', 'none');
         jquery_1_11_3_min_p('#createNewItem').css('display','none');
        jquery_1_11_3_min_p('#availableWarehouse').css('display', 'none');
        jquery_1_11_3_min_p('#MainGrid').css('display', 'block');
    });

     $(document).on("dblclick", "#AllRequests tbody tr", function () {
        var row = jquery_1_11_3_min_p(this);
        
        var Reqid = row.find('td:nth-child(1)').text().trim();
        jquery_1_11_3_min_p('#btnReject').css('display', 'inline-block');
                        jquery_1_11_3_min_p('#btnTransferOrder').css('display', 'inline-block');
                        jquery_1_11_3_min_p('#createNewItem').css('display','block');
                        jquery_1_11_3_min_p('#btnReset').css('display', 'none');
                        jquery_1_11_3_min_p('#btnBack').css('display', 'inline-block');
                        jquery_1_11_3_min_p('#requestControl').addClass('hide');
                        jquery_1_11_3_min_p('#requestDetail').addClass('show');
                        jquery_1_11_3_min_p('#tblRequisitionDetail').css('display', 'table');
                        jquery_1_11_3_min_p('#divbtn').css('display', 'block');
                        jquery_1_11_3_min_p('#RequestControlDetail').css('display', 'block');
                        jquery_1_11_3_min_p('#btnApprove').css('display', 'inline-block');
                         jquery_1_11_3_min_p('#preloader').css('display', 'block');
                         jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
                        BindRequestDetails(Reqid);
        });

            $(document).on("dblclick", "#tblRequisitionDetail tbody tr", function () {
                          var row = jquery_1_11_3_min_p(this);
                           $("#tblRequisitionDetail tbody tr").removeClass("selectedRow"); 
         row.addClass("selectedRow");
                          jquery_1_11_3_min_p('#lblWReqNum').text(row.find('td:nth-child(5)').text().trim());
                          jquery_1_11_3_min_p('#lblWReqName').text(row.find('td:nth-child(6)').text().trim());
                          jquery_1_11_3_min_p('#lblWReqqty').text(row.find('td:nth-child(9)').text().trim());
                          jquery_1_11_3_min_p('#lblreqdetid').text(row.find('td:nth-child(1)').text().trim());
                          jquery_1_11_3_min_p('#lblrequitionid').text(row.find('td:nth-child(2)').text().trim());
                            jquery_1_11_3_min_p('#availableWarehouse').css('display', 'block');
                           approvetextid="txtPruch_"+row.find('td:nth-child(1)').text().trim();
                            BindWareHouseOnhand(row.find('td:nth-child(2)').text().trim(), row.find('td:nth-child(5)').text().trim());
//                         if (dataItem.TransferOrder != 0) {
//                             bootstrap_min_js("#configPopup").modal('show');

//                             BindGrid(dataItem.RequestDetId);
//                         }
//                         else {
//                             bootstrap_min_js("#Divconfig").modal('show');
//                         }
        });

    
    jquery_1_11_3_min_p("#btnShip").click(function () {
      swal({
             title: "Do you want to proceed?",
             text: "",
             icon: "warning",
             buttons: true,
             dangerMode: true,
             })
             .then((willDelete) => {
             if (willDelete) {

              Shipping();
              }
             });

        
    });

    BindRequestHeader();

    jquery_1_11_3_min_p('#btnRecall').click(function () {
        jquery_1_11_3_min_p('#btnShip').prop('disabled', true);
        jquery_1_11_3_min_p('#btnApprove').prop("disabled", false);
        jquery_1_11_3_min_p('#tblRequisitionDetail tbody').find('tr').each(function () {
            var row = jquery_1_11_3_min_p(this);
            var remainingqty = row.find('td:nth-child(14)').text().trim();
            var LineStatus = row.find('td:nth-child(15)').text().trim();
            var id = 'ddlwarehouse_' + row.find('td:nth-child(1)').text().trim();
            var warehouselabel = 'lblwarehouseid_' + row.find('td:nth-child(1)').text().trim();
            if (parseFloat(LineStatus) == 2 || parseFloat(LineStatus) == 1) {
                jquery_1_11_3_min_p("#txtPruch_" + row.find('td:nth-child(1)').text().trim()).css('display', 'inline-block');
                jquery_1_11_3_min_p("#lblItemName_" + row.find('td:nth-child(1)').text().trim()).css('display', 'none');
                jquery_1_11_3_min_p('#' + id).parent().css('display', 'inline-block');
                jquery_1_11_3_min_p('#' + id).val('');
                jquery_1_11_3_min_p('#' + warehouselabel).css('display', 'none');
                jquery_1_11_3_min_p('#btnRecall').css('display', 'none');
                jquery_1_11_3_min_p('#btnApprove').prop("disabled", false);
                //================================================================Enable Checkbox=================================================
                jquery_1_11_3_min_p("#tblRequisitionDetail table th:nth-child(3)").show();
                jquery_1_11_3_min_p("#tblRequisitionDetail table td:nth-child(3)").show();
                jquery_1_11_3_min_p("#tblRequisitionDetail table colgroup col:nth-child(12)").css('width', '50px');
                jquery_1_11_3_min_p("#tblRequisitionDetail table colgroup col:nth-child(1)").css('width', '20px');

                jquery_1_11_3_min_p('.checkAll').css('display', 'block');

                //================================================================End checkbox====================================================
            }
            else if ((parseFloat(LineStatus) == 3 && parseFloat(remainingqty) > 0)) {

                //jquery_1_11_3_min_p("#txtPruch_" + row.find('td:nth-child(1)').text().trim()).css('display', 'inline-block');
                //jquery_1_11_3_min_p("#lblItemName_" + row.find('td:nth-child(1)').text().trim()).css('display', 'none');
                //var rowid = jquery_1_11_3_min_p(row.find('td:nth-child(1)')).text();
                //jquery_1_11_3_min_p("#txtPruch_" + parseInt(rowid)).val('0');
                //jquery_1_11_3_min_p(row.find('td:nth-child(13)')).text(remainingqty);
                //jquery_1_11_3_min_p(row.find('td:nth-child(15)')).text('');
                //jquery_1_11_3_min_p(row.find('td:nth-child(16)')).text('');
                //jquery_1_11_3_min_p('#btnRecall').css('display', 'none');
                //jquery_1_11_3_min_p('#btnApprove').prop("disabled", false);
            }
        });
    });

     jquery_1_11_3_min_p('#btnApprove').click(function () {
   
     if(ValidateRequestControlGrid()==true)
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
             Approve();
             
              }
             });
             }
             

     });

});                                                              

//////////////////////////////////////////////////////////////////////////////////// Approve work END

function RemoveClassItemMaster(data) {

    var id = data.id;
    var arr = id.split('_');
    var id = arr[1];
    if (jquery_1_11_3_min_p('#txtPruch_' + id).val() != '') {
        jquery_1_11_3_min_p("#txtPruch_" + id).removeClass('validate');
    }



}

function ValidateRequestControlGrid() {


    var allow = true;
     var i = 1;

     jquery_1_11_3_min_p('#tblRequisitionDetail tbody').find('tr').each(function () {
         var row = jquery_1_11_3_min_p(this);
             if (jquery_1_11_3_min_p("#txtPruch_" + row.find('td:nth-child(1)').text().trim()).val() == '0' || jquery_1_11_3_min_p("#txtPruch_" + row.find('td:nth-child(1)').text().trim()).val() == '') {
                 jquery_1_11_3_min_p("#txtPruch_" + row.find('td:nth-child(1)').text().trim()).addClass('validate');
                 jquery_1_11_3_min_p("#txtPruch_" + row.find('td:nth-child(1)').text().trim()).attr("placeholder", "Enter approve qty!");
                 allow = false;
             }

     });
    return allow;
}


function Approve() {
    var i = 0;
    jquery_1_11_3_min_p('#tblRequisitionDetail tbody').find('tr').each(function () {
    var row = jquery_1_11_3_min_p(this);
        RequestControlItems.push({ ItemId: row.find('td:nth-child(5)').text().trim(), RequestedQty: row.find('td:nth-child(9)').text().trim(), RequisitionId: row.find('td:nth-child(2)').text().trim(), ApprovedQty: jquery_1_11_3_min_p("#txtPruch_" + row.find('td:nth-child(1)').text().trim()).val().trim(), RequestDetId: row.find('td:nth-child(1)').text().trim(), Warehouseid: '', RequestStatus: '0' });

       });
    JsonRequestControlItems = JSON.stringify(RequestControlItems);
     var WareHouseRequestControlItems = [];
     var WarehouseJsonRequestControlItems = ''; 
     if(jquery_1_11_3_min_p('#lblreqdetid').text() !='')
     {
     var i = 0;
    jquery_1_11_3_min_p('#RequestLine tbody').find('tr').each(function () {
    var row = jquery_1_11_3_min_p(this);
        var id= "txtApprove_"+row.find('td:nth-child(2)').text().trim();
       if(jquery_1_11_3_min_p('#' + id).val() >0)
       {
        WareHouseRequestControlItems.push({ RequestDetId: jquery_1_11_3_min_p('#lblreqdetid').text(), AXitemId: jquery_1_11_3_min_p('#lblWReqNum').text(), RequisitionId: jquery_1_11_3_min_p('#lblrequitionid').text(), RequestedWareHouse: row.find('td:nth-child(3)').text().trim(), ApproveQty: jquery_1_11_3_min_p('#' + id).val()});
        }

       });
       }
       WarehouseJsonRequestControlItems= JSON.stringify(WareHouseRequestControlItems);


    var UpdatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/ItemRequisition.asmx/ApproveRequest",
        data: "{'JsonRequestionItems':'" + JsonRequestControlItems + "','UpdatedBy':'" + UpdatedBy + "','JsonRequestionWarehouse':'" + WarehouseJsonRequestControlItems + "'}",
        dataType: "json",
        success: function (result) {

            var i = 0;
            var jsonData = eval(result.d);

             swal("Saved Successfully","Your data Saved successfully!","success")
            .then((value) => {

            
            jquery_1_11_3_min_p('#lblSReqNum').text(jquery_1_11_3_min_p('#lblReqNum').text());
            jquery_1_11_3_min_p('#lblSCreatedBy').text(jquery_1_11_3_min_p('#lblCreatedBy').text());
            jquery_1_11_3_min_p('#lblSReqDate').text(jquery_1_11_3_min_p('#lblReqDate').text());
             $("#RequisitionApproval").modal('show');

            jquery_1_11_3_min_p('#tblRequisitionDetail tbody').find('tr').each(function () {
    var row = jquery_1_11_3_min_p(this);
         var markup = "<tr><td> "+ row.find('td:nth-child(3)').text().trim()+"</td><td>"+row.find('td:nth-child(4)').text().trim()+"</td><td>"+row.find('td:nth-child(5)').text().trim()+"</td> <td >"+row.find('td:nth-child(6)').text().trim()+"</td> <td >"+row.find('td:nth-child(9)').text().trim()+"</td> <td >"+jquery_1_11_3_min_p("#txtPruch_" + row.find('td:nth-child(1)').text().trim()).val().trim()+"</td><td>"+row.find('td:nth-child(15)').text().trim()+"</td></tr>";
        jquery_1_11_3_min_p("#tblrowappend tbody").append(markup);
        i++;
         });
             
            
          
            });
             
           // }


            
         // window.location.replace("requestControl.aspx");
         
        }
    });

}

function Shipping() {
   
RequestControlItems = []; JsonRequestControlItems = '';
jquery_1_11_3_min_p('#tblRequisitionDetail tbody').find('tr').each(function () {
var row = jquery_1_11_3_min_p(this);
var id = 'ddlwarehouse_' + parseInt(row.find('td:nth-child(1)').text().trim());
var vals = kendo_all_min_js('#' + id).data("kendoDropDownList").value();
var LineStatus = row.find('td:nth-child(15)').text().trim();
if(parseFloat(LineStatus) == 2)
{
kendo_all_min_js('#' + id.toString()).data("kendoDropDownList").span.css('background', 'none');
var textvalue = 'txtPruch_' + parseInt(row.find('td:nth-child(1)').text().trim());
var gettxtval = jquery_1_11_3_min_p("#" + textvalue.toString()).val().trim();
 RequestControlItems.push({ ItemId: row.find('td:nth-child(4)').text().trim(),RequestNo: jquery_1_11_3_min_p('#lblReqNum').text(), RequisitionId: row.find('td:nth-child(2)').text().trim(),UserId:jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text() ,ApprovedQty: gettxtval.toString(), RequestDetId: row.find('td:nth-child(1)').text().trim(),ToLocation:jquery_1_11_3_min_p('#lblRequestedWareHouseId').text(),FromLocation:row.find('td:nth-child(28)').text().trim()});
 }

});


    JsonRequestControlItems = JSON.stringify(RequestControlItems);
    var UpdatedBy = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text()
     var ReqNo = jquery_1_11_3_min_p('#lblReqNum').text();
      var reqwarehouseId=jquery_1_11_3_min_p('#lblRequestedWareHouseId').text();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/AxPosting.asmx/Shipping",
        data: "{'JsonRequestionItems':'" + JsonRequestControlItems + "','UpdatedBy':'" + UpdatedBy + "','ReqNo':'" + ReqNo + "','reqwarehouseId':'" + reqwarehouseId + "'}",
        dataType: "json",
        success: function (result) {

            var i = 0;
            var jsonData = eval(result.d);
          window.location.replace("requestControl.aspx");
         
        }
    });
/// <reference path="../WebServices/AxPosting.asmx" />

}


function BindRequestHeader() {
    var dataRequestHeader = [];
    var LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/ItemRequisition.asmx/BindRequestHeaderRC",
         data: "{'LoadData':'" + LoadData + "'}",

        //data:"{}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
            var i = 0;
            var jsonData = result.d;
            jquery_1_11_3_min_p("#AllRequests tbody").empty();
            jQuery.each(jsonData.Table, function (rec) {
                var markup = "<tr><td style='Display:none'>"+jsonData.Table[i].RequisitionId+"</td><td><input type='checkbox' id='cb_" + jsonData.Table[i].RequisitionId + "' class='checkbox'/></td><td>"+jsonData.Table[i].RequestNumber+"</td><td>"+jsonData.Table[i].CreatedBy+"</td><td>"+jsonData.Table[i].CreatedOn+"</td><td>"+jsonData.Table[i].SubmittedDate+"</td><td>"+jsonData.Table[i].Status+"</td><td>"+jsonData.Table[i].CUST_TYPE+"</td><td>"+jsonData.Table[i].LastActivtityBy+"</td><td>"+jsonData.Table[i].LastActivtityDate+"</td></tr>";
                 jquery_1_11_3_min_p("#AllRequests tbody").append(markup);
                i++;
            });
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

//kendo_all_min_js("#AllRequests").kendoTooltip({
//    filter: "td + td",
//    position: "left",
//    content: function (e) {
//        var text = kendo_all_min_js(e.target).text();
//        return '<div style="width: ' + text.length * .6 + 'em; max-width: 14em">' + text + '</div>';
//    }
//});

//function checkAll(ele) {
//            debugger;
//            var state = $(ele).is(':checked');
//            var grid = $('#tblRequisitionDetail').data('kendoGrid');
//            if (state == true) {
//            
//                $('.checkAll').prop('checked', true);
//            }
//            else {
//            
//                $('.checkAll').prop('checked', false);
//            }
//        };

//        function getwarehouseonhand(Data) {

//            var state = $(Data).is(':checked');
//            var grid = $('#tblRequisitionDetail').data('kendoGrid');
//            if (state == true) {
//            var id=Data.id;
//            alert(id);
////                $('.checkAll').prop('checked', true);
//            }
//            else {
//            
//             //   $('.checkAll').prop('checked', false);
//             alert('hello');
//            }
//        };


        function checkAllHeaderGrid(ele) {
            debugger;
            var state = $(ele).is(':checked');
            var grid = $('#tblRequisitionDetail').data('kendoGrid');
            if (state == true) {
            
                $('.checkAllHeader').prop('checked', true);
            }
            else {
            
                $('.checkAllHeader').prop('checked', false);
            }
        };



function SearchBindRequestHeader() {
    var LoadData = jquery_1_11_3_min_p('#lblRowCount').text();
    var RequisitionNo = jquery_1_11_3_min_p('#searchText').val();
    var dataRequestHeader = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/ItemRequisition.asmx/SearchBindRequestHeaderRC",
        data: "{'SearchValue':'" + RequisitionNo + "','LoadData':'" + LoadData + "'}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
            var i = 0;
            var jsonData = result.d;
            jQuery.each(jsonData.Table, function (rec) {
                dataRequestHeader.push({ RequisitionId: jsonData.Table[i].RequisitionId, RequestNumber: jsonData.Table[i].RequestNumber, CreatedBy: jsonData.Table[i].CreatedBy, CreatedOn: jsonData.Table[i].CreatedOn, SubmittedDate: jsonData.Table[i].SubmittedDate, Status: jsonData.Table[i].Status, WarehouseName: jsonData.Table[i].WarehouseName, LastActivtityBy: jsonData.Table[i].LastActivtityBy, LastActivtityDate: jsonData.Table[i].LastActivtityDate });
                i++;
            });

            kendo_all_min_js("#requestControlGrid").kendoGrid({
//                toolbar: ["excel"],
//                excel: {
//                    fileName: "Book1.xlsx",
//                    filterable: true,
//                    allPages: true
//                },
                dataSource: {
                    data: dataRequestHeader,
                    schema: {
                        model: {
                            id: "RequisitionId",
                            fields: {
                                RequestNumber: { type: "string" },
                                WarehouseName: { type: "string" },
                                CreatedBy: { type: "string" },
                                CreatedOn: { type: "string" },
                                SubmittedDate: { type: "string" },
                                Status: { type: "string" }
                                    ,
                                LastActivtityBy: { type: "string" },
                                LastActivtityDate: { type: "string" }
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
                    var grid = this;
                    grid.tbody.find("tr").dblclick(function (e) {
                        var dataItem = grid.dataItem(this);
                        jquery_1_11_3_min_p('#btnReject').css('display', 'inline-block');
                        jquery_1_11_3_min_p('#btnTransferOrder').css('display', 'inline-block');
                        jquery_1_11_3_min_p('#btnReset').css('display', 'none');
//                        jquery_1_11_3_min_p('#btnRecall').css('display', 'inline-block');

//                        jquery_1_11_3_min_p("#btnRecall").prop("disabled", false);
                        jquery_1_11_3_min_p('#btnBack').css('display', 'inline-block');
                        jquery_1_11_3_min_p('#requestControl').addClass('hide');
                        jquery_1_11_3_min_p('#requestDetail').addClass('show');
                        jquery_1_11_3_min_p('#RequestControlDetail').css('display', 'block');

                        jquery_1_11_3_min_p('#preloader').css('display', 'block');
                        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
                        BindRequestDetails(dataItem.RequisitionId);



                        jquery_1_11_3_min_p('#btnApprove').css('display', 'inline-block');
                    });

                    grid.tbody.find("tr").click(function (e) {


                    });
                },
                pageable: false,
                columns: [


                            { hidden: true, field: "RequisitionId", title: "RequisitionId", width: "10px" },
                            { field: "RequestNumber", title: "Request No.", width: "100px" },
                            { field: "WarehouseName", title: "Branch", width: "100px" },
                            { field: "CreatedBy", title: "Created By", width: "100px" },
                            { field: "CreatedOn", title: "Created On", width: "100px" },
                            { field: "SubmittedDate", title: "Submitted Date", width: "100px" },
                            { field: "Status", title: "Status", width: "100px" },
                            { field: "LastActivtityBy", title: "Last Activity By", width: "100px" },
                            { field: "LastActivtityDate", title: "Last Activity Date", width: "100px" }
                           ]
            });
        },
        error: function () {
        }
    });
}
kendo_all_min_js("#requestControlGrid").kendoTooltip({
    filter: "td + td",
    position: "left",
    content: function (e) {
        var text = kendo_all_min_js(e.target).text();
        return '<div style="width: ' + text.length * .6 + 'em; max-width: 14em">' + text + '</div>';
    }
})



function BindRequestDetails(RequisitionId) {
    var RequestDetails = [];
    var warehouse = [];
     var warehouseOnHand = [];
     jquery_1_11_3_min_p.ajax({
         type: "POST",
         contentType: "application/json; charset=utf-8",
         url: "../WebServices/ItemRequisition.asmx/BindRequestDetails",
         data: "{RequisitionId:'" + RequisitionId + "'}",
         dataType: "json",
         success: function (result) {
             jquery_1_11_3_min_p('#MainGrid').css('display', 'none');
              jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');

             var jsonData = result.d;
             jsonRecallData = result.d;
             BindRecallHistory = eval(result.d);

//             i = 0;
//             jQuery.each(jsonData.Table3, function (rec) {

//                 warehouseOnHand.push({ AXItemid: jsonData.Table3[i].AXItemid, WareHouseId: jsonData.Table3[i].WareHouseId, AvailPhysical: jsonData.Table3[i].AvailPhysical });

//                 i++;

//             });
             var j=0;
             var RecallFlag='';
             jQuery.each(jsonData.Table1, function (rec) {
             if (jsonData.Table1[j].LineStatus == 2) {
                 jquery_1_11_3_min_p('#btnShip').prop('disabled', false);
//                  jquery_1_11_3_min_p("#btnRecall").prop("disabled", false);
                  RecallFlag=1;
                 return;
             }
             j++
             });

             if (jsonData.Table[0].Status == 'Approved') {
                 jquery_1_11_3_min_p("#btnApprove").prop("disabled", true);
                 //jquery_1_11_3_min_p("#btnRecall").prop("disabled", false);
                 jquery_1_11_3_min_p('#btnShip').prop('disabled', false);

             }
             else if (jsonData.Table[0].Status == 'Cancelled') {
                 jquery_1_11_3_min_p("#btnApprove").prop("disabled", true);
                // jquery_1_11_3_min_p("#btnRecall").prop("disabled", true);

             }
             else if (jsonData.Table[0].Status == 'Shipped') {
                 jquery_1_11_3_min_p("#btnApprove").prop("disabled", true);
               //  jquery_1_11_3_min_p("#btnRecall").prop("disabled", true);
                  jquery_1_11_3_min_p('#btnShip').prop('disabled', true);

             }
             else if (jsonData.Table[0].Status == 'Received') {
                 jquery_1_11_3_min_p("#btnApprove").prop("disabled", true);
                // jquery_1_11_3_min_p("#btnRecall").prop("disabled", true);
                 jquery_1_11_3_min_p('#btnShip').prop('disabled', true);

             }

             else {
                 jquery_1_11_3_min_p("#btnApprove").prop("disabled", false);
                 if(RecallFlag==1){
                 }
                 else{
                 //  jquery_1_11_3_min_p("#btnRecall").prop("disabled", true);
                 }
               
                // jquery_1_11_3_min_p("#btnRecall").prop("disabled", true);
                // jquery_1_11_3_min_p('#btnShip').prop('disabled', true);

             }

             jquery_1_11_3_min_p('#lblReqNum').text(jsonData.Table[0].RequestNumber);
             jquery_1_11_3_min_p('#lblCreatedBy').text(jsonData.Table[0].CreatedBy);
             jquery_1_11_3_min_p('#lblReqDate').text(jsonData.Table[0].RequestedDate);
             jquery_1_11_3_min_p('#lblStatus').text(jsonData.Table[0].Status);
             jquery_1_11_3_min_p('#lblRequestedWareHouseId').text(jsonData.Table[0].InventLocationId);
             var i = 0;
             jquery_1_11_3_min_p("#tblRequisitionDetail tbody").empty();
             jQuery.each(jsonData.Table1, function (rec) {
             var markup="<tr><td style='Display:none'>"+jsonData.Table1[i].RequestDetId+"</td><td style='Display:none'>"+jsonData.Table1[i].RequisitionId+"</td><td><input id='chkbox' type='checkbox' class='FcheckAll'  /></td><td>"+jsonData.Table1[i].ParterAddress+"</td><td>"+jsonData.Table1[i].AXitemId+"</td><td>"+jsonData.Table1[i].ItemName+"</td><td>"+jsonData.Table1[i].UserName+"</td><td>"+jsonData.Table1[i].Unitname+"</td><td>"+jsonData.Table1[i].RequestedQty+"</td><td><input type='text' readonly='true'class='change form-control' value='"+jsonData.Table1[i].ApprovedQty+"' id='txtPruch_"+jsonData.Table1[i].RequestDetId+"' onchange='RemoveClassItemMaster(this)' onkeypress='NumericAllow(this)' onkeyup='Comparevalue(this)'  autocomplete='off'  /></td><td>"+jsonData.Table1[i].LineStatus+"</td><td>"+jsonData.Table1[i].RemainingQty+"</td><td>"+jsonData.Table1[i].Remarks+"</td></tr>";
             
             jquery_1_11_3_min_p("#tblRequisitionDetail tbody").append(markup);

                 i++;
             });

           }
     });
    
}
function DecialLimit(data) {
    var id = data.id;
    var Arr = id.split('_');
    var val = jquery_1_11_3_min_p('#' + id).val();
    var rx = new RegExp(/^\d+(?:\.\d{1,3})?$/);
    if (rx.test(val)) {
        return true;
    } else {
        if (val != '') {
            jquery_1_11_3_min_p('#' + id).val('');
            jquery_1_11_3_min_p('#' + id).attr("placeholder", "only three digit allow!");
        }
        else {
            jquery_1_11_3_min_p('#' + Arr[1]).prop("disabled", true);
            jquery_1_11_3_min_p('#' + id).val('');
           

        }
        return false;
    }
}
function Comparevalue(data) {

    var id = data.id;
    var val = jquery_1_11_3_min_p('#' + id).val();
    
    var re = /^([0-9]+[\.]?[0-9]?[0-9]?[0-9]?|[0-9]+)$/g;
    var re1 = /^([0-9]+[\.]?[0-9]?[0-9]?[0-9]?|[0-9]+)/g;
    if (re.test(val)) {
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
        var row = kendo_all_min_js('#' + id).closest("tr");
        var itemqty = row.find('td:nth-child(10)').text();
        var onhand = jquery_1_11_3_min_p("#lblonhand_" + row.find('td:nth-child(1)').text().trim()).text().trim();
        if (parseFloat(val) > parseFloat(onhand)) {
                    jquery_1_11_3_min_p('#' + id).val('');
                    jquery_1_11_3_min_p('#' + id).attr("placeholder", "Please check WareHouseOnHand Qty!");
                    jquery_1_11_3_min_p('#' + Arr[1]).prop("disabled", true);
                }
        

                  if (parseFloat(val) > parseFloat(itemqty)) {
                    jquery_1_11_3_min_p('#' + id).val('');
                    jquery_1_11_3_min_p('#' + id).attr("placeholder", "Please check requested Qty!");
                    jquery_1_11_3_min_p('#' + Arr[1]).prop("disabled", true);
                }
        
       


    }

}



function WComparevalue(data) {

    var id = data.id;
    var val = jquery_1_11_3_min_p('#' + id).val();
    
    var re = /^([0-9]+[\.]?[0-9]?[0-9]?[0-9]?|[0-9]+)$/g;
    var re1 = /^([0-9]+[\.]?[0-9]?[0-9]?[0-9]?|[0-9]+)/g;
    if (re.test(val)) {
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
        var row = kendo_all_min_js('#' + id).closest("tr");
        var onhand = row.find('td:nth-child(5)').text();
        var warehousecode=row.find('td:nth-child(3)').text();
        if (parseFloat(val) > parseFloat(onhand)) {
                    jquery_1_11_3_min_p('#' + id).val('');
                    jquery_1_11_3_min_p('#' + id).attr("placeholder", "Please check WareHouseOnHand Qty!");
                    jquery_1_11_3_min_p('#' + Arr[1]).prop("disabled", true);
                }
               else
               {
               approveqty=0;
               jquery_1_11_3_min_p('#' + approvetextid).val();
               var i=0;
               jquery_1_11_3_min_p('#RequestLine tbody').find('tr').each(function () {
               var row = jquery_1_11_3_min_p(this);
               var id= "txtApprove_"+row.find('td:nth-child(2)').text().trim();
               if(jquery_1_11_3_min_p('#' + id).val()==null || jquery_1_11_3_min_p('#' + id).val()=='')
               {
                approveqty +=0;
               }
               else
               {
               approveqty += parseInt(jquery_1_11_3_min_p('#' + id).val());
               }
               i++;
               });

               jquery_1_11_3_min_p('#' + approvetextid).val(approveqty);
               }
    }

}




function NumericAllow(data) {
    var value = data.id;
    jquery_1_11_3_min_p("#" + value).keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            jquery_1_11_3_min_p("#" + value).val('');
            return false;

        }
    });
}

function BindWareHouseOnhand(reqid,itemId) {
//var markup='';
  var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 500;
var RequestLine = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/ItemRequisition.asmx/BindWareHouseOnhand",
        data: "{itemId:'" + itemId + "',reqid:'" + reqid + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
           jquery_1_11_3_min_p("#RequestLine tbody").empty();
             jQuery.each(jsonData.Table, function (rec) {
                       var markup="<tr><td><input id='chkbox' type='checkbox' class='FcheckAll'  /></td><td>"+jsonData.Table[i].Sn+"</td><td>"+jsonData.Table[i].LocationCode+"</td><td>"+jsonData.Table[i].LocationName+"</td><td>"+jsonData.Table[i].Onhand+"</td><td><input type='text' class='' id='txtApprove_"+jsonData.Table[i].Sn+"' onkeypress='NumericAllow(this)' onkeyup='WComparevalue(this)'  autocomplete='off'/></td></tr>";
 jquery_1_11_3_min_p("#RequestLine tbody").append(markup);
 if(jsonData.Table[i].ApproveQty!=0)
 {
 $("#txtApprove_"+jsonData.Table[i].Sn).val(jsonData.Table[i].ApproveQty);
 }

 
                    i++;
                });
                
 }
    });
}




function NumericAllow(data) {
    var id = data.id;
    var row = kendo_all_min_js('#' + id).closest("tr");
    if (event.keyCode == 13) {
    
        allow = false;
        event.preventDefault();
    }
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
        kendo.saveAs({dataURI: workbook.toDataURL(), fileName: "Book1.xlsx"});
      }








      









