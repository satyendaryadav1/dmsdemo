var LoadData=0;var txtsearchValue='';  var Treearray = []; var count=0; var Arrayid = []; var grandtotal=0;var searchValue='';var dblclickflag=0;var dblAccountID=0;
jquery_1_11_3_min_p(document).ready(function () {
     jquery_1_11_3_min_p("#hdnLoad").val(20);
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    BindAccountsGrid(txtsearchValue);
    jquery_1_11_3_min_p('#btnNew').click(function () {
        jquery_1_11_3_min_p("#coaForm").css('display', 'block');
        jquery_1_11_3_min_p("#coaGrid").css('display', 'none');
        jquery_1_11_3_min_p("#btnNew").css('display', 'none');
          jquery_1_11_3_min_p("#treeMainDiv").css('display', 'block');
          jquery_1_11_3_min_p("#btnBack").css('display', 'block');
        BindEntityCountrydDetails();
        BindParents();
//        BindAccountTree(searchValue);
  
    });
    jquery_1_11_3_min_p('#btnBack').click(function () {
       window.location.replace("COA.aspx");
    });
    $(document).on("dblclick","#COAgrid tbody tr",function() {
   var row = jquery_1_11_3_min_p(this);
   dblclickflag=1;
   dblAccountID=row.find('td:nth-child(1)').text().trim();
   var EntityId= row.find('td:nth-child(2)').text().trim();
   var CountryId= row.find('td:nth-child(3)').text().trim();
   jquery_1_11_3_min_p("#coaForm").css('display', 'block');
        jquery_1_11_3_min_p("#coaGrid").css('display', 'none');
        jquery_1_11_3_min_p("#btnNew").css('display', 'none');
          jquery_1_11_3_min_p("#treeMainDiv").css('display', 'block');
          jquery_1_11_3_min_p("#btnBack").css('display', 'block');
          BindEntityCountrydDetails();
          kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value(CountryId);
         kendo_all_min_js('#ddlentity').data("kendoDropDownList").value(EntityId);
         kendo_all_min_js('#ddlcountry').data("kendoDropDownList").readonly();
         kendo_all_min_js('#ddlentity').data("kendoDropDownList").readonly();
         BindParents();
         BindAccountTreeOndblClick(row.find('td:nth-child(1)').text().trim(),searchValue);
});

    $("#txtSearch").keyup(function(event) {
    if (event.keyCode === 13) {
     searchValue=  $("#txtSearch").val().trim(); 
     if(dblclickflag==1)
     {
     BindAccountTreeOndblClick(dblAccountID, searchValue)
     }
     else{
    BindAccountTree(searchValue);
    }
    }
});

 jquery_1_11_3_min_p('#btnsearch').click(function () {
  searchValue=  $("#txtSearch").val().trim(); 
     if(dblclickflag==1)
     {
     BindAccountTreeOndblClick(dblAccountID, searchValue)
     }
     else{
    BindAccountTree(searchValue);
    }
 });
     jquery_1_11_3_min_p('#btnsubmit').click(function () {
       if (Formvalidation()==true ) {
         swal({
                 title: "Do you want to Submit?",
                 text: "",
                 icon: "warning",
                 buttons: true,
                 dangerMode: true,
                 })
                 .then((willDelete) => {
                 if (willDelete) {
              
              SaveCOA();
            }
                 });
        }
    });

});

function BindEntityCountrydDetails() {
    var Country = []; var Entity = [];var AcType = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/COA.asmx/BindEntityCountrydDetails",
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
            AcType.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table2, function (rec) {
                AcType.push({ value: jsonData.Table2[i].AcTypeId, text: jsonData.Table2[i].AcType });
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
             BindParents();
             BindAccountTree(searchValue);
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
             BindParents();
             BindAccountTree(searchValue);
        }
    });
    kendo_all_min_js('#ddlactype').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: AcType,
        change: function () {
            kendo_all_min_js('#ddlactype').data("kendoDropDownList").span.css('background', 'none');
            var AssetId = kendo_all_min_js('#ddlactype').data("kendoDropDownList").value();

        }
    });
}


function BindParents() {
    var Parents = []; 
        var CountryId= kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value();
        var EntityId= kendo_all_min_js('#ddlentity').data("kendoDropDownList").value();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/COA.asmx/BindParents",
        data: "{'CountryId':'"+CountryId+"','EntityId':'"+EntityId+"'}",
        dataType: "json",
        async: false,
        success: function (result) {
            jsonData = eval(result.d);
            var i = 0;
            Parents.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table, function (rec) {
                Parents.push({ value: jsonData.Table[i].AccountId, text: jsonData.Table[i].Acname});
                i++;
            });
            
        },
        error: function (result) {
        }
    });

    kendo_all_min_js('#ddlparents').kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: Parents,
        change: function () {
            kendo_all_min_js('#ddlparents').data("kendoDropDownList").span.css('background', 'none');
        }
    });

}



function Formvalidation() {
    var allow = true;
    var i = 0;
    if (kendo_all_min_js("#ddlcountry").val() == 0) {
        kendo_all_min_js("#ddlcountry").data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
    }
    if (kendo_all_min_js("#ddlentity").val() == 0) {
        kendo_all_min_js("#ddlentity").data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
    }
    if (kendo_all_min_js("#ddlactype").val() == 0) {
        kendo_all_min_js("#ddlactype").data("kendoDropDownList").span.css('background', '#f9e5e5');
        allow = false;
    }
    if (jquery_1_11_3_min_p("#AccountCode").val() == "") {
        jquery_1_11_3_min_p("#AccountCode").addClass('validate');
        jquery_1_11_3_min_p("#AccountCode").attr("placeholder", "Enter Account Code");
        allow = false;
    }
    if (jquery_1_11_3_min_p("#AccountName").val() == 0) {
        jquery_1_11_3_min_p("#AccountName").addClass('validate');
        jquery_1_11_3_min_p("#AccountName").attr("placeholder", "Enter Account Name");
        allow = false;
    }
    if (jquery_1_11_3_min_p("#ActiveFrom").val() == "") {
        jquery_1_11_3_min_p("#ActiveFrom").addClass('validate');
        jquery_1_11_3_min_p("#ActiveFrom").attr("placeholder", "");
        allow = false;
    }
    if (jquery_1_11_3_min_p("#ActiveTo").val() == "") {
        jquery_1_11_3_min_p("#ActiveTo").addClass('validate');
        jquery_1_11_3_min_p("#ActiveTo").attr("placeholder", "");
        allow = false;
    }

    return allow;
}

function RemoveClass() {
    if (jquery_1_11_3_min_p("#ActiveTo").val() != "") {
        jquery_1_11_3_min_p("#ActiveTo").removeClass('validate');

    }
    if (jquery_1_11_3_min_p("#ActiveFrom").val() != 0) {
        jquery_1_11_3_min_p("#ActiveFrom").removeClass('validate');

    }
    if (jquery_1_11_3_min_p("#AccountName").val() != "") {
        jquery_1_11_3_min_p("#AccountName").removeClass('validate');

    }
    if (jquery_1_11_3_min_p("#AccountCode").val() != "") {
        jquery_1_11_3_min_p("#AccountCode").removeClass('validate');

    }
}


function SaveCOA() {
    var countryid = kendo_all_min_js("#ddlcountry").val();
    var entityid =kendo_all_min_js("#ddlentity").val();
     var createdBy =jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim();
     var Issuspended=0;
     if($('#Suspended').is(":checked"))
     {
     Issuspended=1;
     }
     else{
     Issuspended=0;
     }
    var COAData=[];
    var COAJson='';
    COAData.push({EntityId: entityid,CountryId:countryid,CreatedBy:createdBy,AccountCode:jquery_1_11_3_min_p("#AccountCode").val(),AccountName:jquery_1_11_3_min_p("#AccountName").val(),AccountType:kendo_all_min_js("#ddlactype").val(),Parent:kendo_all_min_js("#ddlparents").val(),ActiveFrom:jquery_1_11_3_min_p("#ActiveFrom").val(),ActiveTo:jquery_1_11_3_min_p("#ActiveTo").val(),IsSuspended:Issuspended });
    COAJson=JSON.stringify(COAData);

    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/COA.asmx/SaveCOAData",
        data: "{'COAJson':'" + COAJson + "'}",
        dataType: "json",
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
            if(jsonData.Table[0].Response=="-1")
            {
            jquery_1_11_3_min_p("#AccountCode").val("");
             jquery_1_11_3_min_p("#AccountCode").attr("placeholder","Account Code Already Exists!");
            }
            else{
             swal("Saved Successfully","Your data Saved successfully!","success")
            .then((value) => {
            BindAccountTree(searchValue);
       
             BindParents();
          
            });
            }
            
           
        }

    });
}


function BindAccountTree(searchValue) {
    var countryid = kendo_all_min_js("#ddlcountry").val();
    var entityid =kendo_all_min_js("#ddlentity").val();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/COA.asmx/BindAccountTree",
        data: "{'searchValue':'"+searchValue+"','countryid':'"+countryid+"','entityid':'"+entityid+"'}",
        dataType: "json",
        success: function (result) {
            var i = 0;
            var AccountValue=0.000;
            grandtotal=0;
            var jsonData = eval(result.d);
             $("#mainUl").empty(); Arrayid=[]; var mainparentid=0;
            jQuery.each(jsonData.Table, function (rec) {
            
          //  var Splitdata=jsonData.Table[i].ID_Path.split(',');
             if(jsonData.Table[i].parentId=="0")
             {
             var markup="<li id='li_"+jsonData.Table[i].AccountId+"'> <label class='nav-header'><input type='checkbox' id='Chk_"+jsonData.Table[i].AccountId+"' onclick='' class='innerchk' /></label><label style='display:none' id='lblId_"+jsonData.Table[i].AccountId+"'></label> <label class='tree-toggler nav-header'>"+jsonData.Table[i].Code+"</label><label class='total'>"+AccountValue+"</label><label class='description'>Description</label><label class='accountParent'>"+jsonData.Table[i].ParentName+"</label><label class='accountName'>"+jsonData.Table[i].Name+"</label></li>";
             $("#mainUl").append(markup);
             Arrayid.push(jsonData.Table[i].AccountId);
             mainparentid=jsonData.Table[i].AccountId;
             grandtotal+=AccountValue;
             }
             else
             {
//                 var x=0;
//                 for(var x=0;x<Splitdata.length-1;x++)
//                 {
                  if(mainparentid==Arrayid[0])
                  {
                   var LiId="li_"+jsonData.Table[i].parentId+"";
                   var markup="<ul id='li_U"+jsonData.Table[i].AccountId+"'  class='tree'><li id='li_"+jsonData.Table[i].AccountId+"'><label class='nav-header'><input type='checkbox' id='Chk_"+jsonData.Table[i].AccountId+"' onclick='' class='innerchk'/></label><label style='display:none' id='lblId_"+jsonData.Table[i].AccountId+"'></label> <label class='tree-toggler nav-header'>"+jsonData.Table[i].Code+"</label><label class='total'>"+AccountValue+"</label><label class='description'>Description</label><label class='accountParent'>"+jsonData.Table[i].ParentName+"</label><label class='accountName'>"+jsonData.Table[i].Name+"</label><ul id='li_UC"+jsonData.Table[i].AccountId+"'  class='tree'></li>";
                   $('#'+LiId).append(markup);
                   Arrayid=[];
                   Arrayid.push(jsonData.Table[i].AccountId);
                   grandtotal+=AccountValue;
                  }
                  else
                  {
                  if(jsonData.Table[i].parentId==Arrayid[0])
                  {
                    var LiId="li_UC"+jsonData.Table[i].parentId+"";
                   if($("#" + LiId).length == 0) {
                    var LiId="li_"+jsonData.Table[i].parentId+"";
                   var markup=" <li id='li_"+jsonData.Table[i].AccountId+"'><label class='nav-header'><input type='checkbox' id='Chk_"+jsonData.Table[i].AccountId+"' onclick='' class='innerchk' /></label><label style='display:none' id='lblId_"+jsonData.Table[i].AccountId+"'></label> <label class='tree-toggler nav-header'>"+jsonData.Table[i].Code+"</label><label class='total'>"+AccountValue+"</label><label class='description'>Description</label><label class='accountParent'>"+jsonData.Table[i].ParentName+"</label><label class='accountName'>"+jsonData.Table[i].Name+"</label></li>";
                   $('#'+LiId).append(markup);
                   grandtotal+=AccountValue;
                   }
                   else
                   {
                    var LiId="li_UC"+jsonData.Table[i].parentId+"";
                   var markup=" <li id='li_"+jsonData.Table[i].AccountId+"'><label class='nav-header'><input type='checkbox' id='Chk_"+jsonData.Table[i].AccountId+"' onclick='' class='innerchk'/></label><label style='display:none' id='lblId_"+jsonData.Table[i].AccountId+"'></label> <label class='tree-toggler nav-header'>"+jsonData.Table[i].Code+"</label><label class='total'>"+AccountValue+"</label><label class='description'>Description</label><label class='accountParent'>"+jsonData.Table[i].ParentName+"</label><label class='accountName'>"+jsonData.Table[i].Name+"</label></li>";
                   $('#'+LiId).append(markup);
                   grandtotal+=AccountValue;
                   }

                   Arrayid=[];
                   Arrayid.push(jsonData.Table[i].parentId);


                  }
                  else{
                   Arrayid=[];
                   Arrayid.push(jsonData.Table[i].parentId);
                   var LiId="li_"+jsonData.Table[i].parentId+"";
                   var markup="<ul id='li_UC"+jsonData.Table[i].parentId+"'  class='tree'><li id='li_"+jsonData.Table[i].AccountId+"'><label class='nav-header'><input type='checkbox' id='Chk_"+jsonData.Table[i].AccountId+"' onclick='' class='innerchk'/></label><label style='display:none' id='lblId_"+jsonData.Table[i].AccountId+"'></label> <label class='tree-toggler nav-header'>"+jsonData.Table[i].Code+"</label><label class='total'>"+AccountValue+"</label><label class='description'>Description</label><label class='accountParent'>"+jsonData.Table[i].ParentName+"</label><label class='accountName'>"+jsonData.Table[i].Name+"</label></li>";
                   $('#'+LiId).append(markup);
                   grandtotal+=AccountValue;
                

                   }
                 //  }
                 }
                $("#grandtotal").text(grandtotal);
            }

             i++;
             });
              jquery_1_11_3_min_p('label.tree-toggler').click(function () {
                       $(this).parent().children('ul.tree').toggle(300);
                     
                   });
        }

    });

}

function BindAccountTreeOndblClick(AccountId, searchvalue ) {
    var countryid = kendo_all_min_js("#ddlcountry").val();
    var entityid =kendo_all_min_js("#ddlentity").val();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/COA.asmx/BindAccountTreeOndblClick",
        data: "{'AccountId':'"+AccountId+"','countryid':'"+countryid+"','entityid':'"+entityid+"','searchvalue':'"+searchvalue+"'}",
        dataType: "json",
        success: function (result) {
            var i = 0;
            var AccountValue=0.000;
            grandtotal=0;
            var jsonData = eval(result.d);
             $("#mainUl").empty(); Arrayid=[]; var mainparentid=0;
            jQuery.each(jsonData.Table, function (rec) {
            
          //  var Splitdata=jsonData.Table[i].ID_Path.split(',');
             if(jsonData.Table[i].parentId=="0")
             {
             var markup="<li id='li_"+jsonData.Table[i].AccountId+"'> <label class='nav-header'><input type='checkbox' id='Chk_"+jsonData.Table[i].AccountId+"' onclick='' class='innerchk' /></label><label style='display:none' id='lblId_"+jsonData.Table[i].AccountId+"'></label> <label class='tree-toggler nav-header'>"+jsonData.Table[i].Code+"</label><label class='total'>"+AccountValue+"</label><label class='description'>Description</label><label class='accountParent'>"+jsonData.Table[i].ParentName+"</label><label class='accountName'>"+jsonData.Table[i].Name+"</label></li>";
             $("#mainUl").append(markup);
             Arrayid.push(jsonData.Table[i].AccountId);
             mainparentid=jsonData.Table[i].AccountId;
             grandtotal+=AccountValue;
             }
             else
             {
//                 var x=0;
//                 for(var x=0;x<Splitdata.length-1;x++)
//                 {
                  if(mainparentid==Arrayid[0])
                  {
                   var LiId="li_"+jsonData.Table[i].parentId+"";
                   var markup="<ul id='li_U"+jsonData.Table[i].AccountId+"'  class='tree'><li id='li_"+jsonData.Table[i].AccountId+"'><label class='nav-header'><input type='checkbox' id='Chk_"+jsonData.Table[i].AccountId+"' onclick='' class='innerchk'/></label><label style='display:none' id='lblId_"+jsonData.Table[i].AccountId+"'></label> <label class='tree-toggler nav-header'>"+jsonData.Table[i].Code+"</label><label class='total'>"+AccountValue+"</label><label class='description'>Description</label><label class='accountParent'>"+jsonData.Table[i].ParentName+"</label><label class='accountName'>"+jsonData.Table[i].Name+"</label><ul id='li_UC"+jsonData.Table[i].AccountId+"'  class='tree'></li>";
                   $('#'+LiId).append(markup);
                   Arrayid=[];
                   Arrayid.push(jsonData.Table[i].AccountId);
                   grandtotal+=AccountValue;
                  }
                  else
                  {
                  if(jsonData.Table[i].parentId==Arrayid[0])
                  {
                    var LiId="li_UC"+jsonData.Table[i].parentId+"";
                   if($("#" + LiId).length == 0) {
                    var LiId="li_"+jsonData.Table[i].parentId+"";
                   var markup=" <li id='li_"+jsonData.Table[i].AccountId+"'><label class='nav-header'><input type='checkbox' id='Chk_"+jsonData.Table[i].AccountId+"' onclick='' class='innerchk' /></label><label style='display:none' id='lblId_"+jsonData.Table[i].AccountId+"'></label> <label class='tree-toggler nav-header'>"+jsonData.Table[i].Code+"</label><label class='total'>"+AccountValue+"</label><label class='description'>Description</label><label class='accountParent'>"+jsonData.Table[i].ParentName+"</label><label class='accountName'>"+jsonData.Table[i].Name+"</label></li>";
                   $('#'+LiId).append(markup);
                   grandtotal+=AccountValue;
                   }
                   else
                   {
                    var LiId="li_UC"+jsonData.Table[i].parentId+"";
                   var markup=" <li id='li_"+jsonData.Table[i].AccountId+"'><label class='nav-header'><input type='checkbox' id='Chk_"+jsonData.Table[i].AccountId+"' onclick='' class='innerchk'/></label><label style='display:none' id='lblId_"+jsonData.Table[i].AccountId+"'></label> <label class='tree-toggler nav-header'>"+jsonData.Table[i].Code+"</label><label class='total'>"+AccountValue+"</label><label class='description'>Description</label><label class='accountParent'>"+jsonData.Table[i].ParentName+"</label><label class='accountName'>"+jsonData.Table[i].Name+"</label></li>";
                   $('#'+LiId).append(markup);
                   grandtotal+=AccountValue;
                   }

                   Arrayid=[];
                   Arrayid.push(jsonData.Table[i].parentId);


                  }
                  else{
                   Arrayid=[];
                   Arrayid.push(jsonData.Table[i].parentId);
                   var LiId="li_"+jsonData.Table[i].parentId+"";
                   var markup="<ul id='li_UC"+jsonData.Table[i].parentId+"'  class='tree'><li id='li_"+jsonData.Table[i].AccountId+"'><label class='nav-header'><input type='checkbox' id='Chk_"+jsonData.Table[i].AccountId+"' onclick='' class='innerchk'/></label><label style='display:none' id='lblId_"+jsonData.Table[i].AccountId+"'></label> <label class='tree-toggler nav-header'>"+jsonData.Table[i].Code+"</label><label class='total'>"+AccountValue+"</label><label class='description'>Description</label><label class='accountParent'>"+jsonData.Table[i].ParentName+"</label><label class='accountName'>"+jsonData.Table[i].Name+"</label></li>";
                   $('#'+LiId).append(markup);
                   grandtotal+=AccountValue;
                

                   }
                 //  }
                 }
                $("#grandtotal").text(grandtotal);
            }

             i++;
             });
              jquery_1_11_3_min_p('label.tree-toggler').click(function () {
                       $(this).parent().children('ul.tree').toggle(300);
                     
                   });
        }

    });

}





function BindAccountsGrid(txtsearchValue) {
 jquery_1_11_3_min_p("#COAgrid tbody").empty();
    var wh = jquery_1_11_3_min_p(document).height();
    var gh = wh - 260;
    var SearchValue = txtsearchValue;
    LoadData = jquery_1_11_3_min_p("#hdnLoad").val();
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/COA.asmx/BindAccountsGrid",
        data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue + "'}",
        dataType: "json",
        success: function (result) {
            jquery_1_11_3_min_p('#preloader').css('display', 'none');
            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
            jquery_1_11_3_min_p('#divGrid').css('display', 'block');
            var i = 0;
            var jsonData = result.d;
            jquery_1_11_3_min_p("#COAgrid tbody").empty();
            jQuery.each(jsonData.Table, function (rec) {
                var markup = "<tr><td style='display:none'> " + jsonData.Table[i].AccountId + "</td><td style='display:none'> " + jsonData.Table[i].EntityId + "</td><td style='display:none'> " + jsonData.Table[i].CountryId + "</td><td> <input id='chkbox' type='checkbox' class='checkAll'  /></td><td>" + jsonData.Table[i].AccountCode + "</td><td>" + jsonData.Table[i].AccountName + "</td> <td >" + jsonData.Table[i].AcType + "</td><td >" + jsonData.Table[i].CountryName + "</td><td >" + jsonData.Table[i].Entityname + "</td><td >" + jsonData.Table[i].ActiveFrom + "</td><td >" + jsonData.Table[i].ActiveTo + "</td></tr>";

                jquery_1_11_3_min_p("#COAgrid tbody").append(markup);

         

                i++;
            });
//            var k = 0;
//            if (jsonData.Table.length > 0) { var columnsIn = jsonData.Table[0]; for (var key in columnsIn) { if (k > 0) { ColumnName.push(key); } k++; } } else {
//                ColumnName.push(k); k++;
//            }
//            var j = 0; jquery_1_11_3_min_p("#DivSearch").empty();

//            jquery_1_11_3_min_p('#tblFieldSetupGrid thead tr th').each(function () {
//                if (j > 1) {


//                    var SearchDiv = "<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='searchcheckAll' id='chk_" + ColumnName[j - 2] + "' ><label for='check3' class='coldata'>" + $(this).text() + "</label></span></div>";
//                    jquery_1_11_3_min_p("#DivSearch").append(SearchDiv);


//                }
//                j++;

//            });
//            var Searchfinaldiv="<div class='dropdownBottom'><label class='pull-left' id='selectall' onclick='searchcheckAll()' >Select All</label><label class='pull-right' id='reset' onclick='searchUncheckAll()' >Reset</label></div>";
//jquery_1_11_3_min_p("#DivSearch").append(Searchfinaldiv);
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


function checkAll()
{

 if($('#chkheader').is(':checked'))
 {
 $('.innerchk').prop('checked',true);
 }
 else{
 $('.innerchk').prop('checked',false);
 }
 }




//function BindSequence() {
//    var countryid = 1;
//    var entityid = 1;
//    var pageid = 16;
//    var fieldid = 18;
//    jquery_1_11_3_min_p.ajax({
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        url: "../WebServices/COA.asmx/BindSequence",
//        data: "{'Pageid':'" + pageid + "','Fileid':'" + fieldid + "','Countryid':'" + countryid + "','EntityId':'" + entityid + "'}",
//        dataType: "json",
//        success: function (result) {
//            var i = 0;
//            var jsonData = eval(result.d);
//            jquery_1_11_3_min_p("#AccountCode").val(jsonData.Table[0].Sequence);
//           
//        }

//    });
//}