
jquery_1_11_3_min_p(document).ready(function () {
    BindGrid();
    BindGrid1();
    BindGrid2();
    BindGrid4();
});


function BindGrid1() {
    var dataCompany = [];

    //    jquery_1_11_3_min_p.ajax({

    //        type: "POST",
    //        contentType: "application/json; charset=utf-8",
    //        url: "../WebServices/UserCreation.asmx/BindGrid",
    //        dataType: "json",
    //        success: function (result) {

    var i = 0;
    //  var jsonData = result.d;
    // jQuery.each(jsonData.Table, function (rec) {
    //                if (jsonData.Table[i].Status == true) {
    //                    jsonData.Table[i].Status = 'Active';
    //                }
    //                else {
    //                    jsonData.Table[i].Status = 'InActive';
    //                }
    dataCompany.push({ mandateId: 'Mandate001', referenceId: 'Ref001', mandateType: 'Physical', amount: '2000', bankName: 'HDFC Bank' });
    dataCompany.push({ mandateId: 'Mandate002', referenceId: 'Ref002', mandateType: 'E-mandate', amount: '2000', bankName: 'Kotak Mahindra Bank' });
    dataCompany.push({ mandateId: 'Mandate003', referenceId: 'Ref003', mandateType: 'Physical', amount: '2000', bankName: 'ICICI Bank' });
    dataCompany.push({ mandateId: 'Mandate004', referenceId: 'Ref004', mandateType: 'Physical', amount: '2000', bankName: 'HDFC Bank' });
    dataCompany.push({ mandateId: 'Mandate005', referenceId: 'Ref005', mandateType: 'Physical', amount: '2000', bankName: 'HDFC Bank' });

    //                i++;

    //            });

    kendo_all_min_js("#grid1").kendoGrid({
        dataSource: {
            data: dataCompany,
            schema: {

                model: {
                    id: "head1",
                    fields: {
                        head2: { type: "string" },
                        head3: { type: "string" },
                        head4: { type: "string" },
                        head5: { type: "string" }
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



            grid.tbody.find("tr").click(function (e) {
            });
        },
        pageable: false,
        columns: [

        // UserID: '1', MobileNo: '8273534947', UserPin: '12345', UserName:'fatehsingh', EmailId: 'fateh.singh@amysoftech.in' });
                            {hidden: false, field: "mandateId", title: "Mandate ID", width: "110px" },
                            { field: "referenceId", title: "Reference ID", width: "110px" },
                            { field: "mandateType", title: "Mandate Type", width: "100px" },
                             { field: "amount", title: "Amount", width: "80px" },
                             { field: "bankName", title: "Bank Name", width: "110px" }

                           ]
    });

    //        },
    //        error: function () {

    //        }
    //    });
}



function BindGrid() {
    var dataCompany = [];

    //    jquery_1_11_3_min_p.ajax({

    //        type: "POST",
    //        contentType: "application/json; charset=utf-8",
    //        url: "../WebServices/UserCreation.asmx/BindGrid",
    //        dataType: "json",
    //        success: function (result) {

    var i = 0;
    //  var jsonData = result.d;
    // jQuery.each(jsonData.Table, function (rec) {
    //                if (jsonData.Table[i].Status == true) {
    //                    jsonData.Table[i].Status = 'Active';
    //                }
    //                else {
    //                    jsonData.Table[i].Status = 'InActive';
    //                }
    dataCompany.push({ mandateId: 'Mandate001', referenceId: 'Ref001', mandateType: 'Physical', amount: '2000', bankName: 'HDFC Bank' });
    dataCompany.push({ mandateId: 'Mandate002', referenceId: 'Ref002', mandateType: 'E-mandate', amount: '2000', bankName: 'Kotak Mahindra Bank' });
    dataCompany.push({ mandateId: 'Mandate003', referenceId: 'Ref003', mandateType: 'Physical', amount: '2000', bankName: 'ICICI Bank' });
    dataCompany.push({ mandateId: 'Mandate004', referenceId: 'Ref004', mandateType: 'Physical', amount: '2000', bankName: 'HDFC Bank' });
    dataCompany.push({ mandateId: 'Mandate005', referenceId: 'Ref005', mandateType: 'Physical', amount: '2000', bankName: 'HDFC Bank' });
    //                i++;

    //            });

    kendo_all_min_js("#grid2").kendoGrid({
        dataSource: {
            data: dataCompany,
            schema: {

                model: {
                    id: "UserID",
                    fields: {
                        MobileNo: { type: "string" },
                        UserPin: { type: "string" },
                        UserName: { type: "string" },
                        EmailId: { type: "string" }
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



            grid.tbody.find("tr").click(function (e) {
            });
        },
        pageable: false,
        columns: [

        // UserID: '1', MobileNo: '8273534947', UserPin: '12345', UserName:'fatehsingh', EmailId: 'fateh.singh@amysoftech.in' });
                             {hidden: false, field: "mandateId", title: "Mandate ID", width: "110px" },
                            { field: "referenceId", title: "Reference ID", width: "110px" },
                            { field: "mandateType", title: "Mandate Type", width: "100px" },
                             { field: "amount", title: "Amount", width: "80px" },
                             { field: "bankName", title: "Bank Name", width: "110px" }

                           ]
    });

    //        },
    //        error: function () {

    //        }
    //    });
}

function BindGrid2() {
    var dataCompany = [];

    //    jquery_1_11_3_min_p.ajax({

    //        type: "POST",
    //        contentType: "application/json; charset=utf-8",
    //        url: "../WebServices/UserCreation.asmx/BindGrid",
    //        dataType: "json",
    //        success: function (result) {

    var i = 0;
    //  var jsonData = result.d;
    // jQuery.each(jsonData.Table, function (rec) {
    //                if (jsonData.Table[i].Status == true) {
    //                    jsonData.Table[i].Status = 'Active';
    //                }
    //                else {
    //                    jsonData.Table[i].Status = 'InActive';
    //                }
    dataCompany.push({ mandateId: 'Mandate001', referenceId: 'Ref001', mandateType: 'Physical', amount: '2000', bankName: 'HDFC Bank', UMRN: 'UMRN 01' });
    dataCompany.push({ mandateId: 'Mandate002', referenceId: 'Ref002', mandateType: 'E-mandate', amount: '2000', bankName: 'Kotak Mahindra Bank', UMRN: 'UMRN 02' });
    dataCompany.push({ mandateId: 'Mandate003', referenceId: 'Ref003', mandateType: 'Physical', amount: '2000', bankName: 'ICICI Bank', UMRN: 'UMRN 03' });
    dataCompany.push({ mandateId: 'Mandate004', referenceId: 'Ref004', mandateType: 'Physical', amount: '2000', bankName: 'HDFC Bank', UMRN: 'UMRN 04' });
    dataCompany.push({ mandateId: 'Mandate005', referenceId: 'Ref005', mandateType: 'Physical', amount: '2000', bankName: 'HDFC Bank', UMRN: 'UMRN 05' });
    //                i++;

    //            });

    kendo_all_min_js("#grid3").kendoGrid({
        dataSource: {
            data: dataCompany,
            schema: {

                model: {
                    id: "head1",
                    fields: {
                        head2: { type: "string" },
                        head3: { type: "string" },
                        head4: { type: "string" },
                        head5: { type: "string" }
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



            grid.tbody.find("tr").click(function (e) {
            });
        },
        pageable: false,
        columns: [

        // UserID: '1', MobileNo: '8273534947', UserPin: '12345', UserName:'fatehsingh', EmailId: 'fateh.singh@amysoftech.in' });
                           {hidden: false, field: "mandateId", title: "Mandate ID", width: "105px" },
                            { field: "referenceId", title: "Reference ID", width: "115px" },
                            { field: "mandateType", title: "Mandate Type", width: "120px" },
                             { field: "amount", title: "Amount", width: "90px" },
                             { field: "bankName", title: "Bank Name", width: "105px" },
                             { field: "UMRN", title: "UMRN", width: "80px" }

                           ]
    });

    //        },
    //        error: function () {

    //        }
    //    });
}




//function BindGrid4() {
//    var dataCompany = [];

//    //    jquery_1_11_3_min_p.ajax({

//    //        type: "POST",
//    //        contentType: "application/json; charset=utf-8",
//    //        url: "../WebServices/UserCreation.asmx/BindGrid",
//    //        dataType: "json",
//    //        success: function (result) {

//    var i = 0;
//    //  var jsonData = result.d;
//    // jQuery.each(jsonData.Table, function (rec) {
//    //                if (jsonData.Table[i].Status == true) {
//    //                    jsonData.Table[i].Status = 'Active';
//    //                }
//    //                else {
//    //                    jsonData.Table[i].Status = 'InActive';
//    //                }
//    dataCompany.push({ bankName: 'HDFC Bank', umrn: 'UMRN001', amount: '1000', status: 'Approved' });
//    dataCompany.push({ bankName: 'ICICI Bank', umrn: 'UMRN002', amount: '2000', status: 'Saved' });
//    dataCompany.push({ bankName: 'SBI Bank', umrn: 'UMRN003', amount: '3000', status: 'Confirmed' });
//    dataCompany.push({ bankName: 'PNB Bank', umrn: 'UMRN004', amount: '1000', status: 'Approved' });
//    dataCompany.push({ bankName: 'HDFC Bank', umrn: 'UMRN005', amount: '1000', status: 'Confirmed' });

//    //                i++;

//    //            });

//    kendo_all_min_js("#presentmentGrid").kendoGrid({
//        dataSource: {
//            data: dataCompany,
//            schema: {

//                model: {
//                    id: "head1",
//                    fields: {
//                        head2: { type: "string" },
//                        head3: { type: "string" },
//                        head4: { type: "string" },
//                        head5: { type: "string" }
//                    }
//                }
//            }


//        },

//        selectable: "single",
//        height: 250,
//        scrollable: true,
//        sortable: true,
//        reorderable: true,
//        persistSelection: true,
//        resizable: true,
//        groupable: false,

//        filterable: true,
//        dataBound: function (e) {

//            var grid = this;



//            grid.tbody.find("tr").click(function (e) {
//            });
//        },
//        pageable: false,
//        columns: [

//        // UserID: '1', MobileNo: '8273534947', UserPin: '12345', UserName:'fatehsingh', EmailId: 'fateh.singh@amysoftech.in' });
//                            {hidden: false, field: "bankName", title: "Bank Name", width: "60px" },
//                            { field: "umrn", title: "UMRN", width: "110px" },
//                            { field: "amount", title: "Amount", width: "100px" },
//                             { field: "status", title: "Status", width: "110px" }

//                           ]
//    });

//    //        },
//    //        error: function () {

//    //        }
//    //    });
//}


function BindGrid4() {
    var dataCompany = [];

    //    jquery_1_11_3_min_p.ajax({

    //        type: "POST",
    //        contentType: "application/json; charset=utf-8",
    //        url: "../WebServices/UserCreation.asmx/BindGrid",
    //        dataType: "json",
    //        success: function (result) {

    var i = 0;
    //  var jsonData = result.d;
    // jQuery.each(jsonData.Table, function (rec) {
    //                if (jsonData.Table[i].Status == true) {
    //                    jsonData.Table[i].Status = 'Active';
    //                }
    //                else {
    //                    jsonData.Table[i].Status = 'InActive';
    //                }
    dataCompany.push({ bankName: 'HDFC Bank', umrn: 'UMRN001', amount: '2000', status: 'Approved' });
    dataCompany.push({ bankName: 'HDFC Bank', umrn: 'UMRN002', amount: '2000', status: 'Saved' });
    dataCompany.push({ bankName: 'HDFC Bank', umrn: 'UMRN003', amount: '2000', status: 'Confirmed' });
    dataCompany.push({ bankName: 'HDFC Bank', umrn: 'UMRN004', amount: '2000', status: 'Approved' });
    dataCompany.push({ bankName: 'HDFC Bank', umrn: 'UMRN005', amount: '2000', status: 'Confirmed' });

    //                i++;

    //            });

    kendo_all_min_js("#presentmentGrid").kendoGrid({
        dataSource: {
            data: dataCompany,
            schema: {

                model: {
                    id: "head1",
                    fields: {
                        head2: { type: "string" },
                        head3: { type: "string" },
                        head4: { type: "string" },
                        head5: { type: "string" }
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



            grid.tbody.find("tr").click(function (e) {
            });
        },
        pageable: false,
        columns: [

        // UserID: '1', MobileNo: '8273534947', UserPin: '12345', UserName:'fatehsingh', EmailId: 'fateh.singh@amysoftech.in' });
                            {hidden: false, field: "bankName", title: "Bank Name", width: "110px" },
                            { field: "umrn", title: "UMRN", width: "110px" },
                            { field: "amount", title: "Amount", width: "100px" },
                             { field: "status", title: "Status", width: "80px" }

                           ]
    });

    //        },
    //        error: function () {

    //        }
    //    });
}