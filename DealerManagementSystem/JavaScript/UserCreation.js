var Existwarehouseid = 0;
jquery_1_11_3_min_p(document).ready(function () {
    jquery_1_11_3_min_p("#btnSave").prop("disabled", true);
    jquery_1_11_3_min_p("#btnback").prop("disabled", true);

//    jquery_1_11_3_min_p('#preloader').css('display', 'block');
//    jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');

  //  BindDropDownAxEmpNo();
//    BindDropDownWareHouse();
//    BindGrid();

//    jquery_1_11_3_min_p("#txtUserPin").change(function () {
//        var num = jquery_1_11_3_min_p("#txtUserPin").val();
//        if (num.length != '6') {

//            jquery_1_11_3_min_p('#txtUserPin').addClass('validate');
//            //   jquery_1_11_3_min_p('#txtUserPin').val('');    
//            jquery_1_11_3_min_p('#lblUserPin').text("UserPin Must be 6 digits");
//        }
//        else {
//            jquery_1_11_3_min_p('#txtUserPin').removeClass('validate');
//            jquery_1_11_3_min_p('#lblUserPin').text('');


//        }

//    });

//    jquery_1_11_3_min_p("#btnUpdateSubmit").click(function () {
//        jquery_1_11_3_min_p("#btnback").prop("disabled", true);
//        jquery_1_11_3_min_p("#btnSave").prop("disabled", true);
//        bootstrap_min_js("#updatePopup").modal('hide');
//    });

//    jquery_1_11_3_min_p("#btnsaveclose").click(function () {
//        jquery_1_11_3_min_p("#btnback").prop("disabled", true);
//        jquery_1_11_3_min_p("#btnSave").prop("disabled", true);
//        bootstrap_min_js("#savePopup").modal('hide');
//    });
//    jquery_1_11_3_min_p("#txtUserPin").keypress(function (e) {

//        jquery_1_11_3_min_p('#txtUserPin').removeClass('validate');
//        jquery_1_11_3_min_p('#lblUserPin').text('');

//        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
//            return false;
//        }
//    });


//    jquery_1_11_3_min_p("#txtEmailId").change(function () {
//        var num = jquery_1_11_3_min_p("#txtEmailId").val();
//        var lastext = num.substr(num.length - 2);

//        if (lastext == "sa") {
//            jquery_1_11_3_min_p('#txtEmailId').removeClass('validate');
//        }
//        else {
//            var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
//            if (regex.test(document.getElementById("txtEmailId").value) == true) {
//                jquery_1_11_3_min_p('#txtEmailId').removeClass('validate');
//            }
//            else {

//                // jquery_1_11_3_min_p('#txtEmailId').val('');
//                jquery_1_11_3_min_p('#txtEmailId').attr("placeholder", "Invalid email ID!");
//            }
//        }


//    });

//    jquery_1_11_3_min_p("#txtEmailId").keypress(function (e) {

//        jquery_1_11_3_min_p('#txtEmailId').removeClass('validate');
//    });


//    jquery_1_11_3_min_p("#txtMobileNo").keypress(function (e) {

//        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
//            return false;
//        }
//    });

//    jquery_1_11_3_min_p("#txtMobileNo").change(function () {
//        var num = jquery_1_11_3_min_p("#txtMobileNo").val();
//        if (num.length == '10' || num.length == '9') {

//            jquery_1_11_3_min_p('#txtMobileNo').removeClass('validate');
//            jquery_1_11_3_min_p('#lblmobile').text('');
//        }
//        else {

//            jquery_1_11_3_min_p('#txtMobileNo').addClass('validate');
//            // jquery_1_11_3_min_p('#txtMobileNo').val('');
//            jquery_1_11_3_min_p('#lblmobile').text("Mobile Number Must be 10 digits");

//        }

//    });

//    jquery_1_11_3_min_p("#btnSave").click(function (event) {
//        if (Validation() == true) {
//            SaveUser();
//            BindGrid();

//        }
//    });
//    jquery_1_11_3_min_p("#btnnewUser").click(function () {
//        jquery_1_11_3_min_p("#btnnewUser").prop("disabled", true);
//        jquery_1_11_3_min_p("#UserGrid").css("display", "none");
//        jquery_1_11_3_min_p("#createUser").css("display", "block");
//        jquery_1_11_3_min_p("#btnback").prop("disabled", false);
//        jquery_1_11_3_min_p("#btnSave").prop("disabled", false);
//        Reset();
//    });
//    jquery_1_11_3_min_p("#btnback").click(function () {
//        jquery_1_11_3_min_p("#UserGrid").css("display", "block");
//        jquery_1_11_3_min_p("#createUser").css("display", "none");
//        jquery_1_11_3_min_p("#btnback").prop("disabled", true);
//        jquery_1_11_3_min_p("#btnSave").prop("disabled", true);
//        jquery_1_11_3_min_p("#btnnewUser").prop("disabled", false);
//        Reset();
//    });

});
function BindDropDownAxEmpNo() {

    var AxEmpNo = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",

        url: "../WebServices/UserCreation.asmx/BindDropDownAxEmpNo",
        data: "{}",
        dataType: "json",

        async: false,
        success: function (result) {
            var i = 0;

            var jsonData = eval(result.d);
            AxEmpNo.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {

                AxEmpNo.push({ value: jsonData.Table[i].EmpName, text: jsonData.Table[i].EmpCode });

                i++;

            });

        },
        error: function (result) {
        }
    });


    kendo_all_min_js('#ddlAXEmpNo').kendoDropDownList({

        filter: "contains",

        dataTextField: "text",
        dataValueField: "value",
        dataSource: AxEmpNo,

        change: function () {

            var EmpNo = kendo_all_min_js("#ddlAXEmpNo").data("kendoDropDownList").value();
            kendo_all_min_js("#ddlAXEmpNo").data("kendoDropDownList").span.css('background', 'none');
            jquery_1_11_3_min_p("#txtusername").val(EmpNo);
        }

    });

}


function BindDropDownWareHouse() {

    var WareHouse = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/UserCreation.asmx/AllBindDropDownWareHouse",
        data: "{}",
        dataType: "json",

        async: false,
        success: function (result) {
            var i = 0;

            var jsonData = eval(result.d);

            WareHouse.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {
                WareHouse.push({ value: jsonData.Table[i].WareHouseId, text: jsonData.Table[i].WareHouseName });

                i++;

            });

        },
        error: function (result) {
        }
    });
    kendo_all_min_js('#ddlWarehouse').kendoDropDownList({
        filter: "contains",
        // optionLabel: "Select",

        dataTextField: "text",
        dataValueField: "value",
        dataSource: WareHouse,
        change: function () {
            var warehouseid = kendo_all_min_js("#ddlWarehouse").data("kendoDropDownList").value();
            var isexist = 0;
            jquery_1_11_3_min_p('#TableFileSequence tbody').find('tr').find('td').find('div').each(function () {
                var row = jquery_1_11_3_min_p(this);
                if (row.find('#lblFileSequenceid').html() == parseInt(warehouseid)) {
                    isexist = 1;
                }

            });
            if (isexist == 1) {
                kendo_all_min_js("#ddlWarehouse").data("kendoDropDownList").text(Existwarehouseid);
                isexist = 0;
                bootstrap_min_js("#Divalredyselected").modal('show');
            }
            else {
                jquery_1_11_3_min_p("#TableFileSequence tbody tr td").append("<div class='flexiblewidth'> <label id='lblFileSequence' class='control-label no-padding'>" + kendo_all_min_js("#ddlWarehouse").data("kendoDropDownList").text() + "</label> <label id='lblFileSequenceid'  class='control-label no-padding' style='display:none'>" + kendo_all_min_js("#ddlWarehouse").data("kendoDropDownList").value() + "</label> <span class='crossimgDiv'><img src='../assets/img/cross.png' id='lnkremoveEmail' class='crosswidth no-padding' /></span></div>");
                kendo_all_min_js("#ddlWarehouse").data("kendoDropDownList").span.css('background', 'none');
            }
        }


    });

}



function SaveUser() {

    var UserId = jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text();
    var isdeviceUserId = jquery_1_11_3_min_p('#lblDeviceUserId').text();
    var Isactive;
    if (jquery_1_11_3_min_p('#chkIsActive').is(":checked")) {
        Isactive = 1;
    }
    else {
        Isactive = 0;
    }
    var dtFileSequence = "<dtXml>";
    jquery_1_11_3_min_p('#TableFileSequence tbody').find('tr').find('td').find('div').each(function () {
        dtFileSequence += "<dtXml ";
        var row = jquery_1_11_3_min_p(this);
        var arrvalue = [];
        if (row.find('#lblFileSequenceid').html() != undefined) {
            arrvalue = row.find('#lblFileSequenceid').html();
            if (arrvalue == undefined) {
                arrvalue = '';
            }
        }

        dtFileSequence += 'Multiplewarehouse="' + arrvalue + '" ';
        dtFileSequence += " />";
    });
    dtFileSequence += "</dtXml>";

    var dtDeviceUser = "<dtXml>";
    dtDeviceUser += "<dtXml ";
    if (jquery_1_11_3_min_p("#chkmrn").prop('checked') == true) {
        //  dtDeviceUser += "<dtXml ";
        dtDeviceUser += 'MRN="' + 1 + '" ';

    }
    else {
        //  dtDeviceUser += "<dtXml ";
        dtDeviceUser += 'MRN="' + 0 + '" ';
        //  dtDeviceUser += " />";
    }
    if (jquery_1_11_3_min_p("#chksl").prop('checked') == true) {
        //  dtDeviceUser += "<dtXml ";
        dtDeviceUser += 'ShipperList="' + 1 + '" ';
        // dtDeviceUser += " />";
    }
    else {
        //   dtDeviceUser += "<dtXml ";
        dtDeviceUser += 'ShipperList="' + 0 + '" ';
        //  dtDeviceUser += " />";
    }

    if (jquery_1_11_3_min_p("#chkbir").prop('checked') == true) {
        //  dtDeviceUser += "<dtXml ";
        dtDeviceUser += 'BranchInventoryReceiving="' + 1 + '" ';
        // dtDeviceUser += " />";
    }
    else {
        // dtDeviceUser += "<dtXml ";
        dtDeviceUser += 'BranchInventoryReceiving="' + 0 + '" ';
        //  dtDeviceUser += " />";
    }

    if (jquery_1_11_3_min_p("#chkic").prop('checked') == true) {
        //  dtDeviceUser += "<dtXml ";
        dtDeviceUser += 'InventoryCounting="' + 1 + '" ';
        //dtDeviceUser += " />";
    }
    else {
        // dtDeviceUser += "<dtXml ";
        dtDeviceUser += 'InventoryCounting="' + 0 + '" ';
        // dtDeviceUser += " />";
    }

    if (jquery_1_11_3_min_p("#chkqrd").prop('checked') == true) {
        // dtDeviceUser += "<dtXml ";
        dtDeviceUser += 'QrDetails="' + 1 + '" ';
        //  dtDeviceUser += " />";
    }
    else {
        // dtDeviceUser += "<dtXml ";
        dtDeviceUser += 'QrDetails="' + 0 + '" ';
        // dtDeviceUser += " />";
    }
    if (jquery_1_11_3_min_p("#chkqud").prop('checked') == true) {
        //  dtDeviceUser += "<dtXml ";
        dtDeviceUser += 'QuantityUpdateDetails="' + 1 + '" ';
        //  dtDeviceUser += " />";
    }
    else {
        // dtDeviceUser += "<dtXml ";
        dtDeviceUser += 'QuantityUpdateDetails="' + 0 + '" ';
        //  dtDeviceUser += " />";
    }
    dtDeviceUser += " />";
    dtDeviceUser += "</dtXml>";

    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/UserCreation.asmx/SaveUser",
        data: "{'UserPin':'" + jquery_1_11_3_min_p('#txtUserPin').val() + "','AxEmpNo':'" + kendo_all_min_js("#ddlAXEmpNo").data("kendoDropDownList").text() + "','UserName':'" + jquery_1_11_3_min_p('#txtusername').val() + "','EmailId':'" + jquery_1_11_3_min_p('#txtEmailId').val() + "','MobileNo':'" + jquery_1_11_3_min_p('#txtMobileNo').val() + "','IsActive':'" + Isactive + "','UserId':'" + UserId + "','WareHouseName':'" + kendo_all_min_js("#ddlWarehouse").data("kendoDropDownList").value() + "','isdeviceUserId':'" + isdeviceUserId + "','MultipleWareHouse':'" + dtFileSequence + "','Deviceuser':'" + dtDeviceUser + "'}",
        dataType: "json",
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
            if (isdeviceUserId == '') {
                if (jsonData.Table[0].UserId == '0') {
                    jquery_1_11_3_min_p('#lblUserPin').text("UserPin already exist");
                    jquery_1_11_3_min_p('#lblDeviceUserId').text('');



                }
                else if (jsonData.Table[0].UserId == '-1') {

                    jquery_1_11_3_min_p('#lblEmailId').text("EmailId already exist");
                    jquery_1_11_3_min_p('#lblDeviceUserId').text('');
                }
                else if (jsonData.Table[0].UserId == '-2') {
                    jquery_1_11_3_min_p('#lblDeviceUserId').text('');
                    jquery_1_11_3_min_p('#lblAxNum').text("Ax employeeID already exist");

                }

                else {

                    bootstrap_min_js('#savePopup').modal('show');
                    Reset();
                    BindGrid();
                    jquery_1_11_3_min_p("#UserGrid").css("display", "block");
                    jquery_1_11_3_min_p("#createUser").css("display", "none");
                    jquery_1_11_3_min_p("#btnnewUser").prop("disabled", false);
                }

            }
            else {
                bootstrap_min_js('#updatePopup').modal('show');

                BindGrid();
                jquery_1_11_3_min_p("#UserGrid").css("display", "block");
                jquery_1_11_3_min_p("#createUser").css("display", "none");
                jquery_1_11_3_min_p("#btnnewUser").prop("disabled", false);
                Reset();


            }

        }
    });

}


function BindGrid() {
    var dataCompany = [];

    jquery_1_11_3_min_p.ajax({

        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/UserCreation.asmx/BindGrid",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
            var i = 0;
            var jsonData = result.d;
            jQuery.each(jsonData.Table, function (rec) {
                if (jsonData.Table[i].Status == true) {
                    jsonData.Table[i].Status = 'Active';
                }
                else {
                    jsonData.Table[i].Status = 'InActive';
                }
                dataCompany.push({ UserID: jsonData.Table[i].UserID, MobileNo: jsonData.Table[i].MobileNo, UserPin: jsonData.Table[i].UserPin, UserName: jsonData.Table[i].UserName, EmailId: jsonData.Table[i].EmailId, AxEmpNo: jsonData.Table[i].AxEmpNo, WareHouseName: jsonData.Table[i].WarehouseName, Status: jsonData.Table[i].Status });

                i++;

            });

            kendo_all_min_js("#userList").kendoGrid({
                dataSource: {
                    data: dataCompany,
                    schema: {

                        model: {
                            id: "UserID",
                            fields: {
                                MobileNo: { type: "string" },
                                UserPin: { type: "string" },
                                UserName: { type: "string" },
                                EmailId: { type: "string" },
                                AxEmpNo: { type: "string" },
                                WarehouseName: { type: "string" },
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

                    var grid = this;


                    grid.tbody.find("tr").dblclick(function (e) {
                        var dataItem = grid.dataItem(this);
                        jquery_1_11_3_min_p('#txtUserPin').val(dataItem.UserPin);
                        kendo_all_min_js("#ddlAXEmpNo").data("kendoDropDownList").text(dataItem.AxEmpNo);
                        kendo_all_min_js("#ddlWarehouse").data("kendoDropDownList").text(dataItem.WareHouseName);
                        Existwarehouseid = dataItem.WareHouseName;
                        jquery_1_11_3_min_p('#txtusername').val(dataItem.UserName);
                        jquery_1_11_3_min_p('#txtEmailId').val(dataItem.EmailId);
                        jquery_1_11_3_min_p('#txtMobileNo').val(dataItem.MobileNo);
                        jquery_1_11_3_min_p('#lblDeviceUserId').text(dataItem.UserID);
                        if (dataItem.Status == 'Active') {
                            jquery_1_11_3_min_p("#chkIsActive").prop("checked", true);
                        }
                        else {
                            jquery_1_11_3_min_p("#chkIsActive").prop("checked", false);
                        }
                        jquery_1_11_3_min_p('#preloader').css('display', 'block');
                        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'block');
                        UserRecord();
                        jquery_1_11_3_min_p("#UserGrid").css("display", "none");
                        jquery_1_11_3_min_p("#createUser").css("display", "block");
                        jquery_1_11_3_min_p("#btnSave").prop("disabled", false);
                        jquery_1_11_3_min_p("#btnback").prop("disabled", false);
                        jquery_1_11_3_min_p("#btnnewUser").prop("disabled", true);
                        kendo_all_min_js("#ddlWarehouse").data("kendoDropDownList").attr("disabled", "disabled");
                        jquery_1_11_3_min_p('#txtUserPin').attr("disabled", "disabled");
                    });

                    grid.tbody.find("tr").click(function (e) {
                    });
                },
                pageable: false,
                columns: [


                            { hidden: true, field: "UserID", title: "User ID", width: "100px" },
                              { hidden: true, field: "MobileNo", title: "Mobile No.", width: "100px" },
                            { field: "UserPin", title: "User Pin", width: "80px" },
                             { field: "UserName", title: "User Name", width: "180px" },
                            { field: "EmailId", title: "Email ID", width: "120px" },
                             { field: "AxEmpNo", title: "AX Employee ID", width: "190px" },
                             { field: "WareHouseName", title: "Warehouse", width: "180px" },
                             { field: "Status", title: "Status", width: "100px" },
                           ]
            });

            //            jquery_1_11_3_min_p("#chkallDelete").click(function () {
            //                jquery_1_11_3_min_p("#btndelete").prop('disabled', false);
            //                jquery_1_11_3_min_p('.case').prop('checked', this.checked);
            //            });



            //            jquery_1_11_3_min_p(".case").click(function () {

            //                jquery_1_11_3_min_p("#btndelete").prop('disabled', false);
            //                if (jquery_1_11_3_min_p(".case").length == jquery_1_11_3_min_p(".case:checked").length) {
            //                    jquery_1_11_3_min_p("#chkallDelete").prop("checked", true);
            //                } else {
            //                    jquery_1_11_3_min_p("#chkallDelete").prop("checked", false);
            //                }
            //            });
        },
        error: function () {

        }
    });
}




function Reset() {
    jquery_1_11_3_min_p('#txtUserPin').val('');
    jquery_1_11_3_min_p('#txtusername').val('');
    jquery_1_11_3_min_p('#txtEmailId').val('');
    jquery_1_11_3_min_p("#txtMobileNo").val('');
    jquery_1_11_3_min_p("#chkIsActive").prop("checked", true);
    jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').val('');
    jquery_1_11_3_min_p('#lblDeviceUserId').text('');
    kendo_all_min_js("#ddlAXEmpNo").data("kendoDropDownList").value('0');
    kendo_all_min_js("#ddlWarehouse").data("kendoDropDownList").value('0');
    jquery_1_11_3_min_p('#txtEmailId').removeClass('validate');
    jquery_1_11_3_min_p('#txtUserPin').removeClass('validate');
    kendo_all_min_js("#ddlAXEmpNo").data("kendoDropDownList").span.css('background', 'none');
    kendo_all_min_js("#ddlWarehouse").data("kendoDropDownList").span.css('background', 'none');
    jquery_1_11_3_min_p('#lblUserPin').text('');
    jquery_1_11_3_min_p('#lblEmailId').text('');
    jquery_1_11_3_min_p('#TableFileSequence tbody tr td div').remove();
    jquery_1_11_3_min_p('#chkmrn').prop('checked', false);
    jquery_1_11_3_min_p('#chksl').prop('checked', false);
    jquery_1_11_3_min_p('#chkbir').prop('checked', false);
    jquery_1_11_3_min_p('#chkic').prop('checked', false);
    jquery_1_11_3_min_p('#chkqrd').prop('checked', false);
    jquery_1_11_3_min_p('#chkqud').prop('checked', false);
}


function Validation() {
    var flag = 0;
    if (jquery_1_11_3_min_p('#txtUserPin').val() == '') {
        jquery_1_11_3_min_p('#txtUserPin').addClass('validate');
        flag = 1;
    }
    var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
    if (regex.test(document.getElementById("txtEmailId").value) == false) {
        jquery_1_11_3_min_p('#txtEmailId').addClass('validate');
        flag = 1;
    }

    if (jquery_1_11_3_min_p('#txtEmailId').val() == '') {
        jquery_1_11_3_min_p('#txtEmailId').addClass('validate');
        flag = 1;
    }
    if (kendo_all_min_js("#ddlAXEmpNo").data("kendoDropDownList").value() == 0) {
        kendo_all_min_js("#ddlAXEmpNo").data("kendoDropDownList").span.css('background', '#f9e5e5');
        flag = 1;
    }
    if (kendo_all_min_js("#ddlWarehouse").data("kendoDropDownList").value() == 0) {
        kendo_all_min_js("#ddlWarehouse").data("kendoDropDownList").span.css('background', '#f9e5e5');
        flag = 1;
    }

    if (flag == 1) {
        return false;
    }
    else {
        return true;
    }
}

//---------------------------------------------------Remove class-------------------------
function RemoveClass() {

    jquery_1_11_3_min_p('#email').removeClass('validate');
    jquery_1_11_3_min_p('#txtMobileNo').removeClass('validate');
    jquery_1_11_3_min_p('#ddlAXEmpNo').removeClass('validate');
    jquery_1_11_3_min_p('#ddlWarehouse').removeClass('validate');

}

//-------------------BindTree-----------

var Text = '';
var Data = [];
var Data1 = [];
function UserRecord() {

    var UserId = jquery_1_11_3_min_p('#lblDeviceUserId').text();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        url: "../WebServices/RolesCreation.asmx/UserRecord",
        contentType: "application/json; charset=utf-8",
        data: "{'UserId':'" + UserId + "'}",

        dataType: "json",
        success: SaveRoleAssignSucceed,
        error: SaveRoleAssignFailed
    });

    function SaveRoleAssignSucceed(result) {
        jquery_1_11_3_min_p('#preloader').css('display', 'none');
        jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
        var i = 0;
        var j = 0;
        var jsonData = eval(result.d);
        jquery_1_11_3_min_p('#TableFileSequence tbody tr td div').remove();
        if (jsonData.Table2.length != 0) {
            var i = 0;

            jQuery.each(jsonData.Table2, function (rec) {
                jquery_1_11_3_min_p("#TableFileSequence tbody tr td").append("<div class='flexiblewidth'> <label id='lblFileSequence' class='control-label no-padding'>" + jsonData.Table2[i].WareHouseId + "</label> <label id='lblFileSequenceid'  class='control-label no-padding' style='display:none'>" + jsonData.Table2[i].WareHouseUserId + "</label> <span class='crossimgDiv'><img src='../assets/img/cross.png' id='lnkremoveEmail' class='crosswidth no-padding' /></span></div>");
                i++;
            });
        }

        if (jsonData.Table3.length != 0) {
            var i = 0;
            jQuery.each(jsonData.Table3, function (rec) {
                if (jsonData.Table3[i].MRN == true) {
                    jquery_1_11_3_min_p('#chkmrn').prop('checked', true);
                }
                if (jsonData.Table3[i].ShipperList == true) {
                    jquery_1_11_3_min_p('#chksl').prop('checked', true);
                }
                if (jsonData.Table3[i].BranchInventoryReceiving == true) {
                    jquery_1_11_3_min_p('#chkbir').prop('checked', true);
                }
                if (jsonData.Table3[i].InventoryCounting == true) {
                    jquery_1_11_3_min_p('#chkic').prop('checked', true);
                }
                if (jsonData.Table3[i].QrDetails == true) {
                    jquery_1_11_3_min_p('#chkqrd').prop('checked', true);
                }
                if (jsonData.Table3[i].QuantityUpdateDetails == true) {
                    jquery_1_11_3_min_p('#chkqud').prop('checked', true);
                }

                i++;
            });
        }


        jquery_ui_1_8_24_js('#tblDest tbody ').find("tr").remove();
        if (jsonData.Table1.length != 0) {
            jquery_ui_1_8_24_js('#tblDest tbody ').find("tr").remove();
            jquery_ui_1_8_24_js('#tblDest tbody ').append("<tr><td></td></tr>");
            jQuery.each(jsonData.Table1, function (rec) {
                Data1.push({ RoleId: jsonData.Table1[j].RoleId });
                //   tempId = Data[i].RoleId;

                if (jquery_ui_1_8_24_js('#tblDest tbody ').find("tr:last").find("td:last").find(".draggable").length == 4) {
                    jquery_ui_1_8_24_js('#tblDest tbody ').append("<tr><td></td></tr>");

                }
                jquery_ui_1_8_24_js('#tblDest tbody ').find("tr:last").find("td:last").append("<Div id='" + Data1[j].RoleId + "' class='draggable' ></Div>");
                //   DragndDrop();
                // jquery_1_11_3_min_p("#dvDest ").append("<Div id='" + Data1[j].RoleId + "' class='draggable' ></Div>");
                tempId = Data1[j].RoleId;

                BindTree();

                j++;
            });
        }
        else {
            //  jquery_1_11_3_min_p('#dvDest div').remove();
        }



        jquery_1_11_3_min_p('#lblmsg').html('');
    }
    function SaveRoleAssignFailed(result) {
        alert("error...");
    }

}

var flag = 0;
function BindTree() {
    var name = ''
    var id = [];
    var id1 = [];
    var flag = "0";

    var RoleId = tempId;
    var DataTreeview = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/RolesCreation.asmx/TreeView",
        data: "{'RoleId':'" + RoleId + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);

            jQuery.each(jsonData.Table, function (rec) {
                if (jsonData.Table[i].parentId == null) {
                    var parId = "0";
                }
                else {
                    var parId = jsonData.Table[i].parentId;
                }
                DataTreeview.push({ id: jsonData.Table[i].ID, text: jsonData.Table[i].PageName, LevelNo: jsonData.Table[i].LevelNo, parent: parId });

                if (jsonData.Table[i].LevelNo == 0) {
                    name = jsonData.Table[i].PageName;
                }
                if (jsonData.Table[i].AccessValue == 1) {
                    id.push({ name: jsonData.Table[i].PageName });
                }
                else if (jsonData.Table[i].AccessValue == 0) {
                    id1.push({ name: jsonData.Table[i].PageName });
                }

                i++;
            });

            function processTable(data, idField, foreignKey, rootLevel) {
                var hash = {};

                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    var id = item[idField];
                    var parentId = item[foreignKey];

                    hash[id] = hash[id] || [];
                    hash[parentId] = hash[parentId] || [];

                    item.items = hash[id];
                    hash[parentId].push(item);
                }
                return hash[rootLevel];
            }

            if (flag == 0) {
                kendo_all_min_js("#" + tempId + "").kendoTreeView({
                    dataSource: processTable(DataTreeview, "id", "parent", 0),
                    expanded: true,
                    autoBind: false,
                    loadOnDemand: false
                });

                flag = 1;
            }

            if (jsonData.Table.length != "0") {

                kendo_all_min_js("#" + tempId + "").data("kendoTreeView").dataSource.data(processTable(DataTreeview, "id", "parent", 0));
                kendo_all_min_js("#" + tempId + "").find("span.k-in:contains(" + name + ")").addClass('node');

                for (var i = 0; i < id.length; i++) {
                    if (id[i].name != undefined) {
                        kendo_all_min_js("#" + tempId + "").find("span.k-in:contains(" + id[i].name + ")").css('color', 'green');
                    }
                }
                for (var i = 0; i < id1.length; i++) {
                    if (id1[i].name != undefined) {
                        kendo_all_min_js("#" + tempId + "").find("span.k-in:contains(" + id1[i].name + ")").css('color', '#00a1ff');
                    }
                }
                id = [];
                id1 = [];
            } else {
                kendo_all_min_js("#" + tempId + "").data("kendoTreeView").dataSource.data('');
            }
        },
        error: function (result) {
            alert("error..");
        }
    });
}


