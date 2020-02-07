var editjsondata = '';var ColumnName = [];
jquery_1_11_3_min_p(document).ready(function () {
    BindFormdetails();
    BindOnhand();

});

//=========================================================Bind Entity && Country==================================
function BindFormdetails() {
    var Country = []; var Entity = []; var jsonData = ''; var Filters = [];
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

            var i = 0;
            Filters.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table2, function (rec) {
                Filters.push({ value: jsonData.Table2[i].Searchid, text: jsonData.Table2[i].Filtername });
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
            var tablename = 'tbl' + EName[0] + 'Location' + cName[0];
            var countryid = kendo_all_min_js("#ddlcountry").data("kendoDropDownList").value();
            var entityid = kendo_all_min_js("#ddlentity").data("kendoDropDownList").value();
           

        }
    });

    kendo_all_min_js('#ddlfilters').kendoDropDownList({
        checkboxes: true,
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Filters,
        filter: "contains",
        template: "<input type='checkbox' id='chk_Filters_#=data.value #' class='clsSkillInner' value='#=data.value #' name='Filters' />" + " " + "${ data.text }",
       // close: onClose,
      //  dataBound: onOtherUnitBound,
        change: function () {
            kendo_all_min_js('#ddlfilters').data("kendoDropDownList").span.css('background', 'none');

        }

    });


  
}

//=========================================================Bind Onhand==================================
function BindOnhand() {
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
    var Partners = [];
    var SearchValue = "";

    //  LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    var LoadData = 10;
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Transaction.asmx/BindOnhand",
        data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue + "'}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
            jquery_1_11_3_min_p('#divGrid').css('display', 'block');
            var i = 0;
            var jsonData = result.d;
            editjsondata = result.d;
            jQuery.each(jsonData.Table, function (rec) {
                var markup = "<tr> <td style='display:none'> " + jsonData.Table[i].Itemid + "</td> <td> <input id='chkbox' type='checkbox' class='checkAll'  /></td><td>" + jsonData.Table[i].Itemid + "</td> <td >" + jsonData.Table[i].ItemName + "</td> <td >" + jsonData.Table[i].Onhand + "</td></tr>";

                jquery_1_11_3_min_p("#onhandTable tbody").append(markup);

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
            jquery_1_11_3_min_p('#onhandTable thead tr th').each(function () {
                if (j > 1) {

                    var id1 = 'chk_' + ColumnName[j - 2];
                    this.id = id1;
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
            var Searchfinaldiv = "<div class='dropdownBottom'><label class='pull-left' id='selectall' onclick='searchcheckAll()' >Select All</label><label class='pull-right' id='reset' onclick='searchUncheckAll()' >Reset</label></div>";
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