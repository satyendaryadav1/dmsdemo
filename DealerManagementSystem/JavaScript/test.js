 editFlag = 0;
 jquery_1_11_3_min_p(document).ready(function () {
     BindTestGrid();
     jquery_1_11_3_min_p('#btnsubmit').click(function () {
         var itemid = jquery_1_11_3_min_p('#txtitemid').val();
         // alert(itemid);
         if (itemid == '') {
             if (ValidateForm() == true) {
                 saveData();
             }
         }
         else {
             if (ValidateForm() == true) {
                 updateFormdata();
             }
         }

     });
     jquery_1_11_3_min_p('#btnnew').click(function () {
         var itemid = jquery_1_11_3_min_p('#txtitemid').val('');
         var Name = jquery_1_11_3_min_p('#txtitemname').val('');
         var Code = jquery_1_11_3_min_p('#txtitemcode').val('');
         var Price = jquery_1_11_3_min_p('#txtitemgroup').val('');
     });
     jquery_1_11_3_min_p('#DeleteBtn').click(function () {
         deleteRow();
     });
     jquery_1_11_3_min_p('#btnDeleteRow').click(function () {
         multipleDeleteRow();
     });
 });

function saveData() {
    var Name = jquery_1_11_3_min_p('#txtitemname').val();
    var Code = jquery_1_11_3_min_p('#txtitemcode').val();
    var Price = jquery_1_11_3_min_p('#txtitemgroup').val();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/test.asmx/Savedata",
        data: "{'Name':'" + Name + "','Code':'" + Code + "','Price':'" + Price + "'}",
        dataType: "json",
        success: function (result) {
            alert("Save");
            BindTestGrid();
            jquery_1_11_3_min_p('#variantForm').css('display', 'none');
            jquery_1_11_3_min_p('#variantGrid').css('display', 'block');
        }
    });

}
function BindTestGrid() {
    jquery_1_11_3_min_p("#ItemGrid tbody").empty();
 //   var wh = jquery_1_11_3_min_p(document).height();
 //    var gh = wh - 260;

  //  LoadData = 10;
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/test.asmx/BindGrid",
        data: "{}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
            jquery_1_11_3_min_p('#divGrid').css('display', 'block');
            var i = 0;
            var jsonData = result.d;
            jquery_1_11_3_min_p("#ItemGrid tbody").empty();
            jQuery.each(jsonData.Table, function (rec) {
                var markup = "<tr><td style='display:none'> " + jsonData.Table[i].id + "</td><td> <input id='chkbox_" + jsonData.Table[i].id + "' type='checkbox' class='checkAll'  /></td><td>" + jsonData.Table[i].Name + "</td> <td >" + jsonData.Table[i].Code + "</td><td >" + jsonData.Table[i].Price + "</td></tr>";
                jquery_1_11_3_min_p("#ItemGrid tbody").append(markup);
                i++;
            });
           


        }
    });

}
$(document).on("dblclick", "#ItemGrid tbody tr", function () {
    editflag = 1;
    alert(editflag);
    var row = jquery_1_11_3_min_p(this);
    var Itemid = row.find('td:nth-child(1)').text().trim();
    var Itemname = row.find('td:nth-child(3)').text().trim();
    dblitemid = Itemid; dbitemname = Itemname;
    jquery_1_11_3_min_p('#variantForm').css('display', 'block');
    jquery_1_11_3_min_p('#variantGrid').css('display', 'none');

    BindGriddata(Itemid);

});

function BindGriddata(itemid) {
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/test.asmx/Binddoubleclickdata",
        data: "{'id':'" + itemid + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
            jquery_1_11_3_min_p("#txtitemid").val(itemid);
            jquery_1_11_3_min_p("#txtitemname").val(jsonData.Table[0].Name);
            jquery_1_11_3_min_p("#txtitemcode").val(jsonData.Table[0].Code);
            jquery_1_11_3_min_p("#txtitemgroup").val(jsonData.Table[0].Price);
            //saveData();
        }
    });

}
function updateFormdata() {
    var itemid = jquery_1_11_3_min_p('#txtitemid').val();
    var Name = jquery_1_11_3_min_p('#txtitemname').val();
    var Code = jquery_1_11_3_min_p('#txtitemcode').val();
    var Price = jquery_1_11_3_min_p('#txtitemgroup').val();
   //  editFlag = 1;
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/test.asmx/Updatedata",
        data: "{'Name':'" + Name + "','Code':'" + Code + "','Price':'" + Price + "','id':'" + itemid + "'}",
        dataType: "json",
        success: function (result) {
            alert("update");
            BindTestGrid();
            jquery_1_11_3_min_p('#variantForm').css('display', 'none');
            jquery_1_11_3_min_p('#variantGrid').css('display', 'block');
        }
    });

}

function deleteRow() {
    var itemid = jquery_1_11_3_min_p('#txtitemid').val();
 
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/test.asmx/delete",
        data: "{'id':'" + itemid + "'}",
        dataType: "json",
        success: function (result) {
            alert("Record deleted");
            BindTestGrid();
            jquery_1_11_3_min_p('#variantForm').css('display', 'none');
            jquery_1_11_3_min_p('#variantGrid').css('display', 'block');
        }
    });
}

function multipleDeleteRow() {
    var checkedid = [];
    var jsonId = '';
//    $.each($("tbody input[type='checkbox']:checked"), function () {
//        var a = $(this).attr("id");
//        var id = a.split('_');
//        checkedid.push({ Id: id[1] });
    //    });
    var dtAileId = "<dtXml>";
    $.each($("tbody input[type='checkbox']:checked"), function () {
        var a = $(this).attr("id");
        var id = a.split('_');
        dtAileId += "<dtXml ";
        dtAileId += 'Id= "' + id[1] + '"';
        dtAileId += " />";
        //checkedid.push({ Id: id[1] });
    });
    dtAileId += "</dtXml>";
    //jsonId = JSON.stringify(checkedid);
    alert(dtAileId);
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/test.asmx/multipleDeleteRow",
        data: "{'id':'" + dtAileId + "'}",
        dataType: "json",
        success: function (result) {
            alert("Records deleted");
            BindTestGrid();
           // jquery_1_11_3_min_p('#variantForm').css('display', 'none');
           // jquery_1_11_3_min_p('#variantGrid').css('display', 'block');
        }
    });
}

function ValidateForm() {
    var allow = true;
    var i = 1;

    if (jquery_1_11_3_min_p("#txtitemname").val() == '') {
        jquery_1_11_3_min_p("#txtitemname").addClass("validate");
        jquery_1_11_3_min_p("#txtitemname").attr("placeholder", "Enter Item Name!");
        allow = false;
    }

    if (jquery_1_11_3_min_p("#txtitemcode").val() == '') {
        jquery_1_11_3_min_p("#txtitemcode").addClass("validate");
        jquery_1_11_3_min_p("#txtitemcode").attr("placeholder", "Enter Item Name!");
        allow = false;
    }
    if (kendo_all_min_js("#txtitemgroup").val() == 0) {
        jquery_1_11_3_min_p("#txtitemgroup").addClass("validate");
        jquery_1_11_3_min_p("#txtitemgroup").attr("placeholder", "Enter Item Price!");
        allow = false;
    }
   
  

    return allow;
}