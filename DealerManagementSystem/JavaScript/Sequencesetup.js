var Fieldjsonval = '';var Fields = [];var lengthcounter = 0;var Pageid = ''; var assignedblocks=[]; var Sequenceflag=''; var returnvalue='';
var splitparam="";
jquery_1_11_3_min_p(document).ready(function () {
    BindPages();

    jquery_1_11_3_min_p("#btnnew").click(function () {
        Fields = [];
        Fields.push({ value: "0", text: "Select" });
        var sel = false;
        var ch = jquery_1_11_3_min_p('#' + 'tblPageFields').find('tbody input[type=checkbox]');
        ch.each(function () {
            var $this = jquery_1_11_3_min_p(this);
            if ($this.is(':checked')) {
                sel = true; //set to true if there is/are selected row
                var row = jquery_1_11_3_min_p(this).closest('tr');
                Pageid = row.find('td:nth-child(2)').text().trim();
                Fields.push({ value: row.find('td:nth-child(1)').text().trim(), text: row.find('td:nth-child(4)').text().trim() });
            }
        });
        if (!sel) {
            swal("No data checked", "Please checked data!", "warning")
        }
        else {
            jquery_1_11_3_min_p('#CreateSequenceNew').css('display', 'block');
            jquery_1_11_3_min_p('#CreateSequenceGrid').css('display', 'none');
            jquery_1_11_3_min_p('#CreateSequenceForm').css('display', 'none');
            jquery_1_11_3_min_p('#btnnew').css('display', 'none');
            jquery_1_11_3_min_p('#btnback').css('display', 'block');
            kendo_all_min_js('#ddlfields').kendoDropDownList({
                filter: "contains",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: Fields,
                change: function () {
                    kendo_all_min_js('#ddlfields').data("kendoDropDownList").span.css('background', 'none');
                     if (kendo_all_min_js('#ddlentity').data("kendoDropDownList").value() == 0) {
                     kendo_all_min_js('#ddlfields').data("kendoDropDownList").value(0);
                     kendo_all_min_js("#ddlentity").data("kendoDropDownList").span.css('background', '#f9e5e5');
                     }
                     else {

                    if (kendo_all_min_js('#ddlfields').data("kendoDropDownList").value() == 0) {
                        jquery_1_11_3_min_p('.combinesequencerow').css('display', 'none');
                        jquery_1_11_3_min_p('.noData').css('display', 'block');
                        kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value(1);
                        jquery_1_11_3_min_p('.constantDiv').css('display', 'none');
                        jquery_1_11_3_min_p('.runningDiv').css('display', 'none');
                        jquery_1_11_3_min_p('.SeperatorDiv').css('display', 'none');
                        jquery_1_11_3_min_p('.dateDiv').css('display', 'none');
                        jquery_1_11_3_min_p('#txtfixedno').val(''); jquery_1_11_3_min_p('#txtfirstposition').val(''); jquery_1_11_3_min_p('#txtfixedvalue').val('');
                        jquery_1_11_3_min_p('#txtrunningno').val(''); jquery_1_11_3_min_p('#txtrunfirstposition').val(''); jquery_1_11_3_min_p('#txtrunfirstno').val('');
                        jquery_1_11_3_min_p('#txtrunincreementval').val(''); 
                        jquery_1_11_3_min_p('#txtfixedno1').val(''); jquery_1_11_3_min_p('#txtfirstposition1').val(''); jquery_1_11_3_min_p('#txtfixedvalue1').val('');
                        kendo_all_min_js('#txtformat').data("kendoDropDownList").value(1); jquery_1_11_3_min_p('#txtdateplaceofdigit').val(''); 
                        
                        //jquery_1_11_3_min_p('#txtstartno').val('');
                        jquery_1_11_3_min_p('#txtfixedno2').val('');
                        DeleteTemp();assignedblocks=[];
                    }
                    else {

                        var returnval=  Checkexistdata(Pageid,kendo_all_min_js('#ddlfields').data("kendoDropDownList").value(),entityid=kendo_all_min_js('#ddlentity').data("kendoDropDownList").value(),kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value());
                        
                        if(returnval==1)
                        {
                        jquery_1_11_3_min_p('#lblfieldname').text(kendo_all_min_js('#ddlfields').data("kendoDropDownList").text());
                        jquery_1_11_3_min_p('.noData').css('display', 'none');
                        lengthcounter = 0; jquery_1_11_3_min_p('#lblremaincount').text(0);
                        jquery_1_11_3_min_p('#txtsequencelength').val('');
                        jquery_1_11_3_min_p("#RunningDiv").empty();
                        jquery_1_11_3_min_p('.sequencetype').css('display', 'none');
                        jquery_1_11_3_min_p('#txtsequencelength').prop("disabled", false);
                        jquery_1_11_3_min_p('.combinesequencerow').css('display', 'block');
                        jquery_1_11_3_min_p('.constantDiv').css('display', 'none');
                        jquery_1_11_3_min_p('.runningDiv').css('display', 'none');
                        jquery_1_11_3_min_p('.dateDiv').css('display', 'none');
                        jquery_1_11_3_min_p('.SeperatorDiv').css('display', 'none');
                        jquery_1_11_3_min_p('#Fieldblock').css('display', 'none');
                        jquery_1_11_3_min_p('#txtfixedno').val(''); jquery_1_11_3_min_p('#txtfirstposition').val(''); jquery_1_11_3_min_p('#txtfixedvalue').val('');
                        jquery_1_11_3_min_p('#txtrunningno').val(''); jquery_1_11_3_min_p('#txtrunfirstposition').val(''); jquery_1_11_3_min_p('#txtrunfirstno').val('');
                        jquery_1_11_3_min_p('#txtrunincreementval').val(''); 
                       jquery_1_11_3_min_p('#txtfixedno1').val(''); jquery_1_11_3_min_p('#txtfirstposition1').val(''); jquery_1_11_3_min_p('#txtfixedvalue1').val('');
                       kendo_all_min_js('#txtformat').data("kendoDropDownList").value(1); jquery_1_11_3_min_p('#txtdateplaceofdigit').val(''); 
                        //jquery_1_11_3_min_p('#txtstartno').val('');jquery_1_11_3_min_p('#txtfixedno2').val('');
                         assignedblocks=[];
                          DeleteTemp();
                     }
                     else
                     {
                     kendo_all_min_js('#ddlfields').data("kendoDropDownList").value(0);
                     swal("Already exists","Please choose different field!","warning")
                     }
                    }
                }
                }
            });
        }

    });
    jquery_1_11_3_min_p('#btnback').click(function () {
        window.location.replace("CreateSequence.aspx");
    });


    $("#txtfixedno").on("keypress",function (event) {    
           $('#txtfixedno').val($(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });

        
    $("#txtfirstposition").on("keypress",function (event) {    
           $('#txtfirstposition').val($(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });

         $("#txtfixedno1").on("keypress",function (event) {    
           $('#txtfixedno1').val($(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });

        
    $("#txtfirstposition1").on("keypress",function (event) {    
           $('#txtfirstposition1').val($(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });

         $("#txtdateplaceofdigit").on("keypress",function (event) {    
           $('#txtdateplaceofdigit').val($(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });



         $("#txtrunningno").on("keypress",function (event) {    
           $('#txtrunningno').val($(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });

        
    $("#txtrunfirstposition").on("keypress",function (event) {    
           $('#txtrunfirstposition').val($(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });

         $("#txtrunincreementval").on("keypress",function (event) {    
           $('#txtrunincreementval').val($(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });


       


    jquery_1_11_3_min_p('#btnadd').click(function () {
        if (ValidateSeq() == true) {
           swal({
             title: "Do you want to proceed?",
             text: "",
             icon: "warning",
             buttons: true,
             dangerMode: true,
             })
             .then((willDelete) => {
             if (willDelete) {

               SaveSequence();
               if(parseInt(jquery_1_11_3_min_p('#txtsequencelength').val())>0 && parseInt(jquery_1_11_3_min_p('#lblremaincount').text())==0)
               {
               jquery_1_11_3_min_p('#btnsubmit').css('display', 'block');
               }
             else
              {
             jquery_1_11_3_min_p('#btnsubmit').css('display', 'none');
               }


               }
              
             });
        }
    });


     jquery_1_11_3_min_p('#btnsubmit').click(function () {
        if (ValidateHeaderSeq() == true) {
           swal({
             title: "Do you want to proceed?",
             text: "",
             icon: "warning",
             buttons: true,
             dangerMode: true,
             })
             .then((willDelete) => {
             if (willDelete) {
               SaveHeaderSequence();
              
               }
              
             });
        }
    });

    $(document).on("dblclick", "#CreateSequenceTable tbody tr", function () {
        var row = jquery_1_11_3_min_p(this);
        var Sequenceid = row.find('td:nth-child(1)').text().trim();
        jquery_1_11_3_min_p('#CreateSequenceGrid').css('display', 'none');
        jquery_1_11_3_min_p('#CreateSequenceForm').css('display', 'block');
        jquery_1_11_3_min_p('#btnnew').css('display', 'block');
        jquery_1_11_3_min_p('#btnback').css('display', 'block');
        var i = 0; jquery_1_11_3_min_p("#tblPageFields tbody tr").empty();
        jQuery.each(Fieldjsonval.Table2, function (rec) {
            if (Fieldjsonval.Table2[i].Pageid == Sequenceid) {
                var markup = "<tr> <td style='display:none'> " + Fieldjsonval.Table2[i].Fieldid + "</td><td style='display:none'> " + Fieldjsonval.Table2[i].Pageid + "</td><td> <input id='chkbox' type='checkbox' class='FcheckAll'  /></td><td>" + Fieldjsonval.Table2[i].FieldName + "</td> </tr>";

                jquery_1_11_3_min_p("#tblPageFields tbody").append(markup);
            }
            i++;
        });

    });
       jquery_1_11_3_min_p('#btndetailclose').click(function () {
       jquery_1_11_3_min_p("#FieldSequencePopupTable tbody tr").empty();
        $("#FieldSequencePopup").modal('hide');
       });

        $(document).on("dblclick", "#tblPageFields tbody tr", function () {
        var row = jquery_1_11_3_min_p(this);
         $("#tblPageFields tbody tr").removeClass("selectedRow"); 
         row.addClass("selectedRow");
        var Sequenceid = row.find('td:nth-child(1)').text().trim();
        var Pageid = row.find('td:nth-child(2)').text().trim();
        var fieldname=row.find('td:nth-child(4)').text().trim();
        jquery_1_11_3_min_p('#lblseqfieldname').text(fieldname);
          jquery_1_11_3_min_p("#FieldSequencePopupTable tbody ").empty();
        BindSequence(Pageid,Sequenceid);
         $("#FieldSequencePopup").modal('show');

    });


});
function BindSequence(pageid,Sequenceid)
{
 jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Sequence.asmx/Bindcreatedsequence",
        data: "{'Pageid':'" + pageid + "','Fieldid':'" + Sequenceid + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
         if(jsonData.Table.length>0){
         
       
           jQuery.each(jsonData.Table, function (rec) {
           var btncount=i+1;
            var markup = "<tr><td style='display:none'> "+jsonData.Table[i].Seqheadid+"</td> <td> <input id='chkbox' type='checkbox' class='FcheckAll'  /></td><td>" + jsonData.Table[i].FieldName + "</td><td>" + jsonData.Table[i].SequenceFormat + "</td><td>" + jsonData.Table[i].Entityname + "</td><td>" + jsonData.Table[i].CountryName + "</td><td><button type='button' id='btn_"+btncount+"' class='btn btn-primary' onclick='SeqDisabled(this)'><i class='fa fa-ban'></i> Deactive</button></td> </tr>";

               jquery_1_11_3_min_p("#FieldSequencePopupTable tbody").append(markup);
               if(jsonData.Table[i].IsActive==false)
               {
               jquery_1_11_3_min_p("#btn_"+btncount).html(" <i class='fa fa-ban'></i> Active");
               }
               i++;

               });
               }
               else{
                var markup = "<tr><td colspan='5' class='text-center'>There is no record.</td></tr>";
               jquery_1_11_3_min_p("#FieldSequencePopupTable tbody").append(markup);
               }
            }
            });
}

function ValidateHeaderSeq()
{
var allow = true;
if (kendo_all_min_js('#ddlentity').data("kendoDropDownList").value() == 0) {
 kendo_all_min_js("#ddlentity").data("kendoDropDownList").span.css('background', '#f9e5e5');
allow= false;
}

else if (kendo_all_min_js('#ddlfields').data("kendoDropDownList").value() == 0) {
 kendo_all_min_js("#ddlfields").data("kendoDropDownList").span.css('background', '#f9e5e5');
allow= false;
}
return allow;
}

function ValidateSeq() {
    var allow = true;
    if (kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value() == 1) {
        if (jquery_1_11_3_min_p('#txtfixedno').val() == '') {
            jquery_1_11_3_min_p('#txtfixedno').addClass("validate");
            allow= false;
        }
        if (jquery_1_11_3_min_p('#txtfirstposition').val() == '') {
            jquery_1_11_3_min_p('#txtfirstposition').addClass("validate");
            allow = false;
        }
         if (jquery_1_11_3_min_p('#txtfixedvalue').val() == '') {
            jquery_1_11_3_min_p('#txtfixedvalue').addClass("validate");
            allow = false;
        }
    }
    else  if (kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value() == 2) {
        if (jquery_1_11_3_min_p('#txtrunningno').val() == '') {
            jquery_1_11_3_min_p('#txtrunningno').addClass("validate");
            allow= false;
        }
        if (jquery_1_11_3_min_p('#txtrunfirstposition').val() == '') {
            jquery_1_11_3_min_p('#txtrunfirstposition').addClass("validate");
            allow = false;
        }
         if (jquery_1_11_3_min_p('#txtrunfirstno').val() == '') {
            jquery_1_11_3_min_p('#txtrunfirstno').addClass("validate");
            allow = false;
        }
         if (jquery_1_11_3_min_p('#txtrunincreementval').val() == '') {
            jquery_1_11_3_min_p('#txtrunincreementval').addClass("validate");
            allow = false;
        }
    }

    else  if (kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value() == 3) {
      if (jquery_1_11_3_min_p('#txtfixedno1').val() == '') {
            jquery_1_11_3_min_p('#txtfixedno1').addClass("validate");
            allow= false;
        }
        if (jquery_1_11_3_min_p('#txtfirstposition1').val() == '') {
            jquery_1_11_3_min_p('#txtfirstposition1').addClass("validate");
            allow = false;
        }
         if (jquery_1_11_3_min_p('#txtfixedvalue1').val() == '') {
            jquery_1_11_3_min_p('#txtfixedvalue1').addClass("validate");
            allow = false;
        }
        }

         if (kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value() == 4) {
        if (jquery_1_11_3_min_p('#txtdateplaceofdigit').val() == '') {
            jquery_1_11_3_min_p('#txtdateplaceofdigit').addClass("validate");
            allow= false;
        }

            var splittextdata=kendo_all_min_js('#txtformat').data("kendoDropDownList").text().split('/');
             for(var i=0;i<splittextdata.length;i++)
             {
              datemarkup="";
             var getnewsplit=splittextdata[i].split('');
            for(var j=0;j<splittextdata[i].length;j++)
            {
            id="txtblock_" + getnewsplit[j]+ "_"+j;
            if(jquery_1_11_3_min_p('#'+id).val()=='')
            {
            jquery_1_11_3_min_p('#'+id).addClass("validate");
            allow= false;
            }
           

            }
            
            }

        
    }
    return allow;
}

function SaveHeaderSequence()
{
   var blocks='';
   for(var i=1;i<=parseInt(jquery_1_11_3_min_p('#txtsequencelength').val());i++)
   {
    id="txtblock_" + i;
    blocks +=jquery_1_11_3_min_p('#'+id).val();
   }

  var SeqHeadvalue=[];var SeqHeadjson='';
  SeqHeadvalue.push({ Pageid: Pageid,Fieldid: kendo_all_min_js('#ddlfields').data("kendoDropDownList").value(),CountryId: kendo_all_min_js('#ddlcountry').data("kendoDropDownList").value(),EntityId: kendo_all_min_js('#ddlentity').data("kendoDropDownList").value(),Sequencelen: jquery_1_11_3_min_p('#txtsequencelength').val(),SequenceFormat: blocks,CreatedBy: jquery_1_11_3_min_p('#ContentPlaceHolder1_lblUserId').text().trim()});
  SeqHeadjson=JSON.stringify(SeqHeadvalue);
  jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Sequence.asmx/SaveHSequence",
      data: "{'Headerjson':'" + SeqHeadjson + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
             if(jsonData.Table[0].Response=="1")
            {
            swal("Sequence created","Saved successfully!","success")
            .then((value) => {
            window.location.replace("CreateSequence.aspx");
            });
            }
            
            }
            });

}

function  SaveSequence()
{
 if (kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value() == 1) {

   if(parseInt(jquery_1_11_3_min_p('#txtfixedvalue').val().length)==parseInt(jquery_1_11_3_min_p('#txtfixedno').val()))
   {
  var Seqvalue=[];var Seqjson='';
  Seqvalue.push({ SeqLength: jquery_1_11_3_min_p('#txtsequencelength').val(),RemainCount: jquery_1_11_3_min_p('#lblremaincount').text(),Sequencetype: kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value(),Fixedno: jquery_1_11_3_min_p('#txtfixedno').val(),Placeofdigits: jquery_1_11_3_min_p('#txtfirstposition').val(),Value: jquery_1_11_3_min_p('#txtfixedvalue').val()});
  Seqjson=JSON.stringify(Seqvalue);

  if(assignedblocks.length == 0){
   Sequenceflag=1;
   jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Sequence.asmx/SaveSequence",
      data: "{'Fixedjson':'" + Seqjson + "','SeqFlag':'" + Sequenceflag + "' }",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
             if(jsonData.Table[0].Response=="1")
            {
              
             jquery_1_11_3_min_p('#txtsequencelength').attr('disabled', true);
             jquery_1_11_3_min_p('#lblremaincount').text(parseInt(jquery_1_11_3_min_p('#lblremaincount').text())-parseInt(jquery_1_11_3_min_p('#txtfixedvalue').val().length));
             
             var Seqdata=jquery_1_11_3_min_p('#txtfixedvalue').val().split(''); var x=0;
             for(var i=parseInt(jquery_1_11_3_min_p('#txtfirstposition').val());i<=parseInt(lengthcounter);i++)
             {
              if((parseInt(jquery_1_11_3_min_p('#txtfixedno').val())+parseInt(jquery_1_11_3_min_p('#txtfirstposition').val()))==parseInt(i))
             {
           //  return true;
               break;
             }
             else
             {
             jquery_1_11_3_min_p('#txtblock_'+i).val(Seqdata[x]);
             jquery_1_11_3_min_p('#txtblock_'+i).addClass("Seqassign");
             
             x++;
             }
             }
             for(var i=parseInt(jquery_1_11_3_min_p('#txtfirstposition').val());i<=(parseInt(jquery_1_11_3_min_p('#txtfixedno').val())+ parseInt(jquery_1_11_3_min_p('#txtfirstposition').val())-1);i++)
             {
             assignedblocks.push({Reserve:i});
             }

            

            }
        }
    });
    }
    else
    {
    var flag=0;
    for(var i=0;i<assignedblocks.length;i++)
    {
      for(var j=parseInt(jquery_1_11_3_min_p('#txtfirstposition').val());j<=(parseInt(jquery_1_11_3_min_p('#txtfixedno').val())+ parseInt(jquery_1_11_3_min_p('#txtfirstposition').val())-1);j++)
             {
              if(assignedblocks[i].Reserve==j)
              {
              flag=1;
              swal("Sorry","This position is already reserverd!", "warning")
              }

             }
    }

    if(flag==0)
    {
    for(var y=parseInt(jquery_1_11_3_min_p('#txtfirstposition').val());y<=(parseInt(jquery_1_11_3_min_p('#txtfixedno').val())+ parseInt(jquery_1_11_3_min_p('#txtfirstposition').val())-1);y++)
             {
             assignedblocks.push({Reserve:y});
             } 

var Seqvalue=[];var Seqjson='';
  Seqvalue.push({ SeqLength: jquery_1_11_3_min_p('#txtsequencelength').val(),RemainCount: jquery_1_11_3_min_p('#lblremaincount').text(),Sequencetype: kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value(),Fixedno: jquery_1_11_3_min_p('#txtfixedno').val(),Placeofdigits: jquery_1_11_3_min_p('#txtfirstposition').val(),Value: jquery_1_11_3_min_p('#txtfixedvalue').val()});
  Seqjson=JSON.stringify(Seqvalue);
  Sequenceflag=1;
jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Sequence.asmx/SaveSequence",
      data: "{'Fixedjson':'" + Seqjson + "','SeqFlag':'" + Sequenceflag + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
             if(jsonData.Table[0].Response=="1")
            {
              
             jquery_1_11_3_min_p('#txtsequencelength').attr('disabled', true);
             jquery_1_11_3_min_p('#lblremaincount').text(parseInt(jquery_1_11_3_min_p('#lblremaincount').text())-parseInt(jquery_1_11_3_min_p('#txtfixedvalue').val().length));
             
             var Seqdata=jquery_1_11_3_min_p('#txtfixedvalue').val().split(''); var x1=0;
             for(var jj=parseInt(jquery_1_11_3_min_p('#txtfirstposition').val());jj<=parseInt(lengthcounter);jj++)
             {
             if((parseInt(jquery_1_11_3_min_p('#txtfixedno').val())+parseInt(jquery_1_11_3_min_p('#txtfirstposition').val()))==parseInt(jj))
             {
             break;
             }
             else
             {
             jquery_1_11_3_min_p('#txtblock_'+jj).val(Seqdata[x1]);
             jquery_1_11_3_min_p('#txtblock_'+jj).addClass("Seqassign");
             x1++;
             }
             }
             }
             }
             });
    }
     
    }
  }
  else
  {
   swal("Sorry","Values can't accept less than fixed no !", "warning")
  }
 }
 else if (kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value() == 2) {
 if(parseInt(jquery_1_11_3_min_p('#txtrunfirstno').val().length)==parseInt(jquery_1_11_3_min_p('#txtrunningno').val()))
   {
  var Seqvalue=[];var Seqjson='';
  Seqvalue.push({ SeqLength: jquery_1_11_3_min_p('#txtsequencelength').val(),RemainCount: jquery_1_11_3_min_p('#lblremaincount').text(),Sequencetype: kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value(),Fixedno: jquery_1_11_3_min_p('#txtrunningno').val(),Placeofdigits: jquery_1_11_3_min_p('#txtrunfirstposition').val(),Value: jquery_1_11_3_min_p('#txtrunfirstno').val(),IncreeValue: jquery_1_11_3_min_p('#txtrunincreementval').val()});
  Seqjson=JSON.stringify(Seqvalue);

  if(assignedblocks.length == 0){
  Sequenceflag=2;
   jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Sequence.asmx/SaveSequence",
      data: "{'Fixedjson':'" + Seqjson + "','SeqFlag':'" + Sequenceflag + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
             if(jsonData.Table[0].Response=="1")
            {
              
             jquery_1_11_3_min_p('#txtsequencelength').attr('disabled', true);
             jquery_1_11_3_min_p('#lblremaincount').text(parseInt(jquery_1_11_3_min_p('#lblremaincount').text())-parseInt(jquery_1_11_3_min_p('#txtrunfirstno').val().length));
             
             var Seqdata=jquery_1_11_3_min_p('#txtrunfirstno').val().split(''); var x=0;
             for(var i=parseInt(jquery_1_11_3_min_p('#txtrunfirstposition').val());i<=parseInt(lengthcounter);i++)
             {
              if((parseInt(jquery_1_11_3_min_p('#txtrunningno').val())+parseInt(jquery_1_11_3_min_p('#txtrunfirstposition').val()))==parseInt(i))
             {
             break;
             }
             else
             {
             jquery_1_11_3_min_p('#txtblock_'+i).val(Seqdata[x]);
             jquery_1_11_3_min_p('#txtblock_'+i).addClass("Seqassign");
             
             x++;
             }
             }
             for(var i=parseInt(jquery_1_11_3_min_p('#txtrunfirstposition').val());i<=(parseInt(jquery_1_11_3_min_p('#txtrunningno').val())+ parseInt(jquery_1_11_3_min_p('#txtrunfirstposition').val())-1);i++)
             {
             assignedblocks.push({Reserve:i});
             }

            

            }
        }
    });
    }
    else
    {
    var flag=0;
    for(var i=0;i<assignedblocks.length;i++)
    {
      for(var j=parseInt(jquery_1_11_3_min_p('#txtrunfirstposition').val());j<=(parseInt(jquery_1_11_3_min_p('#txtrunningno').val())+ parseInt(jquery_1_11_3_min_p('#txtrunfirstposition').val())-1);j++)
             {
              if(assignedblocks[i].Reserve==j)
              {
              flag=1;
              swal("Sorry","This position is already reserverd!", "warning")
              }

             }
    }

    if(flag==0)
    {
    for(var y=parseInt(jquery_1_11_3_min_p('#txtrunfirstposition').val());y<=(parseInt(jquery_1_11_3_min_p('#txtrunningno').val())+ parseInt(jquery_1_11_3_min_p('#txtrunfirstposition').val())-1);y++)
             {
             assignedblocks.push({Reserve:y});
             } 

var Seqvalue=[];var Seqjson='';
Seqvalue.push({ SeqLength: jquery_1_11_3_min_p('#txtsequencelength').val(),RemainCount: jquery_1_11_3_min_p('#lblremaincount').text(),Sequencetype: kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value(),Fixedno: jquery_1_11_3_min_p('#txtrunningno').val(),Placeofdigits: jquery_1_11_3_min_p('#txtrunfirstposition').val(),Value: jquery_1_11_3_min_p('#txtrunfirstno').val(),IncreeValue: jquery_1_11_3_min_p('#txtrunincreementval').val()});
  Seqjson=JSON.stringify(Seqvalue);
  Sequenceflag=2;
jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Sequence.asmx/SaveSequence",
      data: "{'Fixedjson':'" + Seqjson + "','SeqFlag':'" + Sequenceflag + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
             if(jsonData.Table[0].Response=="1")
            {
              
             jquery_1_11_3_min_p('#txtsequencelength').attr('disabled', true);
             jquery_1_11_3_min_p('#lblremaincount').text(parseInt(jquery_1_11_3_min_p('#lblremaincount').text())-parseInt(jquery_1_11_3_min_p('#txtrunfirstno').val().length));
             
             var Seqdata=jquery_1_11_3_min_p('#txtrunfirstno').val().split(''); var x1=0;
             for(var jj=parseInt(jquery_1_11_3_min_p('#txtrunfirstposition').val());jj<=parseInt(lengthcounter);jj++)
             {
             if((parseInt(jquery_1_11_3_min_p('#txtrunningno').val())+parseInt(jquery_1_11_3_min_p('#txtrunfirstposition').val()))==parseInt(jj))
             {
             break;
             }
             else
             {
             jquery_1_11_3_min_p('#txtblock_'+jj).val(Seqdata[x1]);
             jquery_1_11_3_min_p('#txtblock_'+jj).addClass("Seqassign");
             x1++;
             }
             }
             }
             }
             });
    }
     
    }
    }
    else
    {
    swal("Sorry","Values can't accept less than fixed no !", "warning")
    }
 }
 if (kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value() == 3) {
 if(parseInt(jquery_1_11_3_min_p('#txtfixedvalue1').val().length)==parseInt(jquery_1_11_3_min_p('#txtfixedno1').val()))
   {
  var Seqvalue=[];var Seqjson='';
  Seqvalue.push({ SeqLength: jquery_1_11_3_min_p('#txtsequencelength').val(),RemainCount: jquery_1_11_3_min_p('#lblremaincount').text(),Sequencetype: kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value(),Fixedno: jquery_1_11_3_min_p('#txtfixedno1').val(),Placeofdigits: jquery_1_11_3_min_p('#txtfirstposition1').val(),Value: jquery_1_11_3_min_p('#txtfixedvalue1').val()});
  Seqjson=JSON.stringify(Seqvalue);

  if(assignedblocks.length == 0){
   Sequenceflag=1;
   jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Sequence.asmx/SaveSequence",
      data: "{'Fixedjson':'" + Seqjson + "','SeqFlag':'" + Sequenceflag + "' }",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
             if(jsonData.Table[0].Response=="1")
            {
              
             jquery_1_11_3_min_p('#txtsequencelength').attr('disabled', true);
             jquery_1_11_3_min_p('#lblremaincount').text(parseInt(jquery_1_11_3_min_p('#lblremaincount').text())-parseInt(jquery_1_11_3_min_p('#txtfixedvalue1').val().length));
             
             var Seqdata=jquery_1_11_3_min_p('#txtfixedvalue1').val().split(''); var x=0;
             for(var i=parseInt(jquery_1_11_3_min_p('#txtfirstposition1').val());i<=parseInt(lengthcounter);i++)
             {
              if((parseInt(jquery_1_11_3_min_p('#txtfixedno1').val())+parseInt(jquery_1_11_3_min_p('#txtfirstposition1').val()))==parseInt(i))
             {
           //  return true;
               break;
             }
             else
             {
             jquery_1_11_3_min_p('#txtblock_'+i).val(Seqdata[x]);
             jquery_1_11_3_min_p('#txtblock_'+i).addClass("Seqassign");
             
             x++;
             }
             }
             for(var i=parseInt(jquery_1_11_3_min_p('#txtfirstposition1').val());i<=(parseInt(jquery_1_11_3_min_p('#txtfixedno1').val())+ parseInt(jquery_1_11_3_min_p('#txtfirstposition1').val())-1);i++)
             {
             assignedblocks.push({Reserve:i});
             }

            

            }
        }
    });
    }
    else
    {
    var flag=0;
    for(var i=0;i<assignedblocks.length;i++)
    {
      for(var j=parseInt(jquery_1_11_3_min_p('#txtfirstposition1').val());j<=(parseInt(jquery_1_11_3_min_p('#txtfixedno1').val())+ parseInt(jquery_1_11_3_min_p('#txtfirstposition1').val())-1);j++)
             {
              if(assignedblocks[i].Reserve==j)
              {
              flag=1;
              swal("Sorry","This position is already reserverd!", "warning")
              }

             }
    }

    if(flag==0)
    {
    for(var y=parseInt(jquery_1_11_3_min_p('#txtfirstposition1').val());y<=(parseInt(jquery_1_11_3_min_p('#txtfixedno1').val())+ parseInt(jquery_1_11_3_min_p('#txtfirstposition1').val())-1);y++)
             {
             assignedblocks.push({Reserve:y});
             } 

var Seqvalue=[];var Seqjson='';
  Seqvalue.push({ SeqLength: jquery_1_11_3_min_p('#txtsequencelength').val(),RemainCount: jquery_1_11_3_min_p('#lblremaincount').text(),Sequencetype: kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value(),Fixedno: jquery_1_11_3_min_p('#txtfixedno1').val(),Placeofdigits: jquery_1_11_3_min_p('#txtfirstposition1').val(),Value: jquery_1_11_3_min_p('#txtfixedvalue1').val()});
  Seqjson=JSON.stringify(Seqvalue);
  Sequenceflag=1;
jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Sequence.asmx/SaveSequence",
      data: "{'Fixedjson':'" + Seqjson + "','SeqFlag':'" + Sequenceflag + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
             if(jsonData.Table[0].Response=="1")
            {
              
             jquery_1_11_3_min_p('#txtsequencelength').attr('disabled', true);
             jquery_1_11_3_min_p('#lblremaincount').text(parseInt(jquery_1_11_3_min_p('#lblremaincount').text())-parseInt(jquery_1_11_3_min_p('#txtfixedvalue1').val().length));
             
             var Seqdata=jquery_1_11_3_min_p('#txtfixedvalue1').val().split(''); var x1=0;
             for(var jj=parseInt(jquery_1_11_3_min_p('#txtfirstposition1').val());jj<=parseInt(lengthcounter);jj++)
             {
             if((parseInt(jquery_1_11_3_min_p('#txtfixedno1').val())+parseInt(jquery_1_11_3_min_p('#txtfirstposition1').val()))==parseInt(jj))
             {
             break;
             }
             else
             {
             jquery_1_11_3_min_p('#txtblock_'+jj).val(Seqdata[x1]);
             jquery_1_11_3_min_p('#txtblock_'+jj).addClass("Seqassign");
             x1++;
             }
             }
             }
             }
             });
    }
     
    }
  }
  else
  {
  swal("Sorry","Values can't accept less than fixed no !", "warning")
  }
 }

  if (kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value() == 4) {

  var fixedvalue="";var Increeval="";
  if(jquery_1_11_3_min_p('input:radio[name=rdoautoincree]:checked').val()=='Y')
   {
   Increeval=1;
   }
   else if(jquery_1_11_3_min_p('input:radio[name=rdoautoincree]:checked').val()=='N')
   {
   Increeval=2;
   }

            var splittextdata=kendo_all_min_js('#txtformat').data("kendoDropDownList").text().split(splitparam);
             for(var i=0;i<splittextdata.length;i++)
             {
              datemarkup="";
             var getnewsplit=splittextdata[i].split('');
            for(var j=0;j<splittextdata[i].length;j++)
            {
            id="txtblock_" + getnewsplit[j]+ "_"+j;
            fixedvalue +=jquery_1_11_3_min_p('#'+id).val();
            }
            if(i !=splittextdata.length-1)
            {
            fixedvalue +=splitparam;
            }
            
            }



  var Seqvalue=[];var Seqjson='';
  Seqvalue.push({ SeqLength: jquery_1_11_3_min_p('#txtsequencelength').val(),RemainCount: jquery_1_11_3_min_p('#lblremaincount').text(),Sequencetype: kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value(),Dateformat: kendo_all_min_js('#txtformat').data("kendoDropDownList").value(),Fixedno: jquery_1_11_3_min_p('#txtfixedno2').val(),Placeofdigits: jquery_1_11_3_min_p('#txtdateplaceofdigit').val(),Value: fixedvalue,IncreeValue:Increeval});
  Seqjson=JSON.stringify(Seqvalue);

  if(assignedblocks.length == 0){
   Sequenceflag=4;
   jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Sequence.asmx/SaveSequence",
      data: "{'Fixedjson':'" + Seqjson + "','SeqFlag':'" + Sequenceflag + "' }",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
             if(jsonData.Table[0].Response=="1")
            {
              
             jquery_1_11_3_min_p('#txtsequencelength').attr('disabled', true);
             jquery_1_11_3_min_p('#lblremaincount').text(parseInt(jquery_1_11_3_min_p('#lblremaincount').text())-parseInt(kendo_all_min_js('#txtformat').data("kendoDropDownList").text().length));
             
             var Seqdata=kendo_all_min_js('#txtformat').data("kendoDropDownList").text().split(''); var x=0; var splitfinalval=''; var  getdatevalue='';
             for(var i=parseInt(jquery_1_11_3_min_p('#txtdateplaceofdigit').val());i<=parseInt(lengthcounter);i++)
             {
              if((parseInt(jquery_1_11_3_min_p('#txtfixedno2').val())+parseInt(jquery_1_11_3_min_p('#txtdateplaceofdigit').val()))==parseInt(i))
             {
           //  return true;
               break;
             }
             else
             {
              if(getdatevalue =='')
              {
             var splittextdata=kendo_all_min_js('#txtformat').data("kendoDropDownList").text().split(splitparam);
              for(var m=0;m<splittextdata.length;m++)
             {
             var getnewsplit=splittextdata[m].split('');
             for(var j=0;j<splittextdata[m].length;j++)
             {
            id="txtblock_" + getnewsplit[j]+ "_"+j;
            getdatevalue +=jquery_1_11_3_min_p('#'+id).val();
            }
             if(i !=splittextdata.length-1)
            {
            getdatevalue +=splitparam;
            }
             }
             splitfinalval=getdatevalue.split('');
             }
             
            jquery_1_11_3_min_p('#txtblock_'+i).val(splitfinalval[x]);
            // jquery_1_11_3_min_p('#txtblock_'+i).val(Seqdata[x]);
             jquery_1_11_3_min_p('#txtblock_'+i).addClass("Seqassign");
             
             x++;
             }
             }
             for(var i=parseInt(jquery_1_11_3_min_p('#txtdateplaceofdigit').val());i<=(parseInt(jquery_1_11_3_min_p('#txtfixedno2').val())+ parseInt(jquery_1_11_3_min_p('#txtdateplaceofdigit').val())-1);i++)
             {
             assignedblocks.push({Reserve:i});
             }

            

            }
        }
    });
    }
    else
    {
    var flag=0;
    for(var i=0;i<assignedblocks.length;i++)
    {
      for(var j=parseInt(jquery_1_11_3_min_p('#txtdateplaceofdigit').val());j<=(parseInt(jquery_1_11_3_min_p('#txtfixedno2').val())+ parseInt(jquery_1_11_3_min_p('#txtdateplaceofdigit').val())-1);j++)
             {
              if(assignedblocks[i].Reserve==j)
              {
              flag=1;
              swal("Sorry","This position is already reserverd!", "warning")
              }

             }
    }

    if(flag==0)
    {
    for(var y=parseInt(jquery_1_11_3_min_p('#txtdateplaceofdigit').val());y<=(parseInt(jquery_1_11_3_min_p('#txtfixedno2').val())+ parseInt(jquery_1_11_3_min_p('#txtdateplaceofdigit').val())-1);y++)
             {
             assignedblocks.push({Reserve:y});
             } 

var Seqvalue=[];var Seqjson='';
  var fixedvalue="";var Increeval="";
  if(jquery_1_11_3_min_p('input:radio[name=rdoautoincree]:checked').val()=='Y')
   {
   Increeval=1;
   }
   else if(jquery_1_11_3_min_p('input:radio[name=rdoautoincree]:checked').val()=='N')
   {
   Increeval=2;
   }

            var splittextdata=kendo_all_min_js('#txtformat').data("kendoDropDownList").text().split(splitparam);
             for(var i=0;i<splittextdata.length;i++)
             {
              datemarkup="";
             var getnewsplit=splittextdata[i].split('');
            for(var j=0;j<splittextdata[i].length;j++)
            {
            id="txtblock_" + getnewsplit[j]+ "_"+j;
            fixedvalue +=jquery_1_11_3_min_p('#'+id).val();
            }
            if(i !=splittextdata.length-1)
            {
            fixedvalue +=splitparam;
            }
            
            }



  var Seqvalue=[];var Seqjson='';
  Seqvalue.push({ SeqLength: jquery_1_11_3_min_p('#txtsequencelength').val(),RemainCount: jquery_1_11_3_min_p('#lblremaincount').text(),Sequencetype: kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value(),Dateformat: kendo_all_min_js('#txtformat').data("kendoDropDownList").value(),Fixedno: jquery_1_11_3_min_p('#txtfixedno2').val(),Placeofdigits: jquery_1_11_3_min_p('#txtdateplaceofdigit').val(),Value: fixedvalue,IncreeValue:Increeval});
  Seqjson=JSON.stringify(Seqvalue);
  Sequenceflag=4;
jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Sequence.asmx/SaveSequence",
      data: "{'Fixedjson':'" + Seqjson + "','SeqFlag':'" + Sequenceflag + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
             if(jsonData.Table[0].Response=="1")
            {
              
             jquery_1_11_3_min_p('#txtsequencelength').attr('disabled', true);
             jquery_1_11_3_min_p('#lblremaincount').text(parseInt(jquery_1_11_3_min_p('#lblremaincount').text())-parseInt(kendo_all_min_js('#txtformat').data("kendoDropDownList").text().length));
             
             var Seqdata=kendo_all_min_js('#txtformat').data("kendoDropDownList").text().split(''); var x1=0;  var splitfinalval=''; var  getdatevalue='';
             for(var jj=parseInt(jquery_1_11_3_min_p('#txtdateplaceofdigit').val());jj<=parseInt(lengthcounter);jj++)
             {
             if((parseInt(jquery_1_11_3_min_p('#txtfixedno2').val())+parseInt(jquery_1_11_3_min_p('#txtdateplaceofdigit').val()))==parseInt(jj))
             {
             break;
             }
             else
             {
              if(getdatevalue =='')
              {
             var splittextdata=kendo_all_min_js('#txtformat').data("kendoDropDownList").text().split(splitparam);
              for(var m=0;m<splittextdata.length;m++)
             {
             var getnewsplit=splittextdata[m].split('');
             for(var j=0;j<splittextdata[m].length;j++)
             {
            id="txtblock_" + getnewsplit[j]+ "_"+j;
            getdatevalue +=jquery_1_11_3_min_p('#'+id).val();
            }
             if(i !=splittextdata.length-1)
            {
            getdatevalue +=splitparam;
            }
             }
             splitfinalval=getdatevalue.split('');
             }
             
            jquery_1_11_3_min_p('#txtblock_'+jj).val(splitfinalval[x1]);
            // jquery_1_11_3_min_p('#txtblock_'+jj).val(Seqdata[x1]);
             jquery_1_11_3_min_p('#txtblock_'+jj).addClass("Seqassign");
             x1++;
             }
             }
             }
             }
             });
    }

    }
  
 }
  

}



function DeleteTemp() {
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Sequence.asmx/Deletetemp",
      //  data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue + "'}",
        dataType: "json",
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
        }
    });
}

function Checkexistdata(pageid,fieldid,entityid,countryid) {

    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Sequence.asmx/Checkexist",
       data: "{'Pageid':'" + pageid + "','Fieldid':'" + fieldid + "','Entityid':'" + entityid + "','Countryid':'" + countryid + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
             if(jsonData.Table[0].Response==0)
            {
            returnvalue=0;
            }
            else if(jsonData.Table[0].Response==1)
            {
            returnvalue=1;
            }
        }
    });
    
    return returnvalue;
}


function BindPages() {
    var LoadData = 20; var SearchValue = ""; var ColumnName = []; var Country = []; var Entity = [];var Sequencetype = [];var dateformat = [];
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Sequence.asmx/BindPages",
        data: "{'LoadData':'" + LoadData + "','SearchValue':'" + SearchValue + "'}",
        dataType: "json",
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
            Fieldjsonval = eval(result.d);
            jQuery.each(jsonData.Table, function (rec) {

                var markup = "<tr> <td style='display:none'> " + jsonData.Table[i].Pageid + "</td><td> <input id='chkbox' type='checkbox' class='checkAll'  /></td><td>" + jsonData.Table[i].PageName + "</td> <td >" + jsonData.Table[i].PageUrl + "</td> </tr>";

                jquery_1_11_3_min_p("#CreateSequenceTable tbody").append(markup);
                i++;
            });
            var i = 0;
            jQuery.each(jsonData.Table3, function (rec) {
                Country.push({ value: jsonData.Table3[i].CountryId, text: jsonData.Table3[i].CountryName });
                i++;
            });
            var i = 0;
            Entity.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table4, function (rec) {
                Entity.push({ value: jsonData.Table4[i].Entityid, text: jsonData.Table4[i].Entityname });
                i++;
            });

            var i = 0;
            //  Sequencetype.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table5, function (rec) {
                Sequencetype.push({ value: jsonData.Table5[i].Sequenceid, text: jsonData.Table5[i].SequenceType });
                i++;
            });

            var i = 0;
           // dateformat.push({ value: "0", text: "Select" });
            jQuery.each(jsonData.Table6, function (rec) {
                dateformat.push({ value: jsonData.Table6[i].Formatid, text: jsonData.Table6[i].Format });
                i++;
            });


            var k = 0;
            if (jsonData.Table.length > 0) { var columnsIn = jsonData.Table[0]; for (var key in columnsIn) { if (k > 0) { ColumnName.push(key); } k++; } } else {
                ColumnName.push(k); k++;
            }
            var j = 0; jquery_1_11_3_min_p("#DivSearch").empty();
            //            var SearchDiv1 = "<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='checkAll' id='chk_" + ColumnName[j - 1] + "' onclick='checkAll(this)'><label for='check3' class='coldata'>All</label></span></div>";
            //            jquery_1_11_3_min_p("#DivSearch").append(SearchDiv1);
            jquery_1_11_3_min_p('#CreateSequenceTable thead tr th').each(function () {
                if (j > 1) {

                    var id1 = 'chk_' + ColumnName[j - 2];
                    this.id = id1;
                    var SearchDiv = "<div class='dropdown-item'><span class='skin skin-polaris'><input type='checkbox' class='searchcheckAll' id='chk_" + ColumnName[j - 2] + "' onclick='Addclasstocolumn(this)'><label for='check3' class='coldata'>" + $(this).text() + "</label></span></div>";
                    jquery_1_11_3_min_p("#DivSearch").append(SearchDiv);

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
                }
            });

            kendo_all_min_js('#txtseqtype').kendoDropDownList({
                filter: "contains",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: Sequencetype,
                change: function () {
                    kendo_all_min_js('#txtseqtype').data("kendoDropDownList").span.css('background', 'none');
                  
                    if (kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value() == 1) {
                        jquery_1_11_3_min_p('.constantDiv').css('display', 'block');
                        jquery_1_11_3_min_p('.runningDiv').css('display', 'none');
                        jquery_1_11_3_min_p('.dateDiv').css('display', 'none');
                        jquery_1_11_3_min_p('.SeperatorDiv').css('display', 'none');
                        jquery_1_11_3_min_p('#txtfixedno').val(''); jquery_1_11_3_min_p('#txtfirstposition').val(''); jquery_1_11_3_min_p('#txtfixedvalue').val('');
                    }
                    else if (kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value() == 2) {
                        jquery_1_11_3_min_p('.constantDiv').css('display', 'none');
                        jquery_1_11_3_min_p('.runningDiv').css('display', 'block');
                        jquery_1_11_3_min_p('.dateDiv').css('display', 'none');
                        jquery_1_11_3_min_p('.SeperatorDiv').css('display', 'none');
                        jquery_1_11_3_min_p('#txtrunningno').val(''); jquery_1_11_3_min_p('#txtrunfirstposition').val(''); jquery_1_11_3_min_p('#txtrunfirstno').val('');
                        jquery_1_11_3_min_p('#txtrunincreementval').val('');
                    }
                     else if (kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value() == 3) {
                        jquery_1_11_3_min_p('.constantDiv').css('display', 'none');
                        jquery_1_11_3_min_p('.runningDiv').css('display', 'none');
                        jquery_1_11_3_min_p('.dateDiv').css('display', 'none');
                        jquery_1_11_3_min_p('.SeperatorDiv').css('display', 'block');
                         jquery_1_11_3_min_p('#txtfixedno1').val(''); jquery_1_11_3_min_p('#txtfirstposition1').val(''); jquery_1_11_3_min_p('#txtfixedvalue1').val('');
                    }
                    else if (kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value() == 4) {
                        jquery_1_11_3_min_p('.constantDiv').css('display', 'none');
                        jquery_1_11_3_min_p('.runningDiv').css('display', 'none');
                        jquery_1_11_3_min_p('.dateDiv').css('display', 'block');
                        jquery_1_11_3_min_p('.SeperatorDiv').css('display', 'none');
                      //  kendo_all_min_js('#txtformat').data("kendoDropDownList").value(1); 
                        //jquery_1_11_3_min_p('#txtstartno').val('');
                      


                    }


                }
            });
            
            kendo_all_min_js('#txtformat').kendoDropDownList({
                filter: "contains",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: dateformat,
                change: function () {
                    kendo_all_min_js('#txtformat').data("kendoDropDownList").span.css('background', 'none');
                    jquery_1_11_3_min_p('#txtfixedno2').val(kendo_all_min_js('#txtformat').data("kendoDropDownList").text().length);
                    if(kendo_all_min_js('#txtformat').data("kendoDropDownList").value()==1){splitparam="/";}if(kendo_all_min_js('#txtformat').data("kendoDropDownList").value()==2){splitparam="/";}if(kendo_all_min_js('#txtformat').data("kendoDropDownList").value()==3){splitparam="/";}if(kendo_all_min_js('#txtformat').data("kendoDropDownList").value()==4){splitparam="/";}
                    jquery_1_11_3_min_p(".dateValue").empty();
                     var datemarkup="";
                     
                      var splittextdata=kendo_all_min_js('#txtformat').data("kendoDropDownList").text().split('/');
                      for(var i=0;i<splittextdata.length;i++)
                      {
                      datemarkup="";
                       var getnewsplit=splittextdata[i].split('');
                       for(var j=0;j<splittextdata[i].length;j++)
                       {
                      datemarkup += "<input type='text' id='txtblock_"+getnewsplit[j]+"_"+j+"'  class='runningText' onkeyup='Removeclass(this)' maxlength='1' placeholder='"+getnewsplit[j]+"' />";
                      

                       }
                        jquery_1_11_3_min_p(".dateValue").append(datemarkup);
                       
                      }
                     
                        
                }
            });
            jquery_1_11_3_min_p('#txtfixedno2').val(kendo_all_min_js('#txtformat').data("kendoDropDownList").text().length);
             jquery_1_11_3_min_p(".dateValue").empty();
             var datemarkup=""; if(kendo_all_min_js('#txtformat').data("kendoDropDownList").value()==1){splitparam="/";}if(kendo_all_min_js('#txtformat').data("kendoDropDownList").value()==2){splitparam="/";}if(kendo_all_min_js('#txtformat').data("kendoDropDownList").value()==3){splitparam="/";}if(kendo_all_min_js('#txtformat').data("kendoDropDownList").value()==4){splitparam="/";}
             var splittextdata=kendo_all_min_js('#txtformat').data("kendoDropDownList").text().split(splitparam);
             for(var i=0;i<splittextdata.length;i++)
             {
              datemarkup="";
             var getnewsplit=splittextdata[i].split('');
            for(var j=0;j<splittextdata[i].length;j++)
            {
             datemarkup += "<input type='text' id='txtblock_"+getnewsplit[j]+"_"+j+"'  class='runningText' onkeyup='Removeclass(this)' maxlength='1' placeholder='"+getnewsplit[j]+"' />";
                      
            }
            jquery_1_11_3_min_p(".dateValue").append(datemarkup);
            }
                     

        }

    });

}

function Removeclass(Data)
{
var id=Data.id;

jquery_1_11_3_min_p('#' + id ).removeClass('validate');
}

function Comparedata(Data) {
    var val = Data.value;
    var CurrentId = Data.id;
    if (kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value() == 1) {
        jquery_1_11_3_min_p('#' + Data.id).removeClass('validate');
        if (CurrentId == "txtfixedvalue") {
            if (jquery_1_11_3_min_p('#txtfixedno').val() == '' || jquery_1_11_3_min_p('#txtfirstposition').val() == '') {
                jquery_1_11_3_min_p('#' + Data.id).val('');
                swal("Sorry", "Please enter fixed no or position!", "warning")
            }
            else {
                var lencount = val.length;
                if (parseInt(lencount) > parseInt(jquery_1_11_3_min_p('#txtfixedno').val())) {
                    jquery_1_11_3_min_p('#' + Data.id).val('');
                    swal("Exceeds", "Please enter less than fixed value!", "warning")
                }
            }
        }
    }

    else if (kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value() == 2) {
        jquery_1_11_3_min_p('#' + Data.id).removeClass('validate');
        if (CurrentId == "txtrunfirstno") {
            if (jquery_1_11_3_min_p('#txtrunningno').val() == '' || jquery_1_11_3_min_p('#txtrunfirstposition').val() == '') {
                jquery_1_11_3_min_p('#' + Data.id).val('');
                swal("Sorry", "Please enter fixed no or position!", "warning")
            }
            else {
                var lencount = val.length;
                if (parseInt(lencount) > parseInt(jquery_1_11_3_min_p('#txtrunningno').val())) {
                    jquery_1_11_3_min_p('#' + Data.id).val('');
                    swal("Exceeds", "Please enter less than fixed value!", "warning")
                }
            }
        }
    }
      if (kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value() == 3) {
        jquery_1_11_3_min_p('#' + Data.id).removeClass('validate');
        if (CurrentId == "txtfixedvalue1") {
            if (jquery_1_11_3_min_p('#txtfixedno1').val() == '' || jquery_1_11_3_min_p('#txtfirstposition1').val() == '') {
                jquery_1_11_3_min_p('#' + Data.id).val('');
                swal("Sorry", "Please enter fixed no or position!", "warning")
            }
            else {
                var lencount = val.length;
                if (parseInt(lencount) > parseInt(jquery_1_11_3_min_p('#txtfixedno1').val())) {
                    jquery_1_11_3_min_p('#' + Data.id).val('');
                    swal("Exceeds", "Please enter less than fixed value!", "warning")
                }
            }
        }
    }


}


function NumericAllow(Data) {
    var val = Data.value;
       var re = /^([0-9]+[\.]?[0-9]?[0-9]?[0-9]?|[0-9]+)$/g;
       var re1 = /^([0-9]+[\.]?[0-9]?[0-9]?[0-9]?|[0-9]+)/g;
       if(val>0)
       {
     if (re1.test(val)) {
         var CurrentId = Data.id;

         if (kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value() == 1) {
             jquery_1_11_3_min_p('#' + Data.id).removeClass('validate');
             jquery_1_11_3_min_p('#txtfixedvalue').val('');
             if (CurrentId == "txtfixedno") {
                 if (parseInt(val) > parseInt(lengthcounter)) {
                     jquery_1_11_3_min_p('#' + Data.id).val('');
                     swal("Exceeds", "Please enter less than sequence length!", "warning")
                 }
             }
             else if (CurrentId == "txtfirstposition") {
                 if (jquery_1_11_3_min_p('#txtfixedno').val() == '') {
                     jquery_1_11_3_min_p('#' + Data.id).val('');
                     swal("Sorry", "Please enter fixed no!", "warning")
                 }
                 else {
                     if (parseInt(lengthcounter) - (parseInt(val)-1) >= parseInt(jquery_1_11_3_min_p('#txtfixedno').val())) {

                     }
                     else {
                         jquery_1_11_3_min_p('#' + Data.id).val('');
                         swal("Sorry", "Please enter valid position!", "warning")
                     }

                 }

             }
         }
         else if (kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value() == 2) {
             jquery_1_11_3_min_p('#' + Data.id).removeClass('validate');
             jquery_1_11_3_min_p('#txtrunfirstno').val('');
             if (CurrentId == "txtrunningno") {
                 if (parseInt(val) > parseInt(lengthcounter)) {
                     jquery_1_11_3_min_p('#' + Data.id).val('');
                     swal("Exceeds", "Please enter less than sequence length!", "warning")
                 }
             }
             else if (CurrentId == "txtrunfirstposition") {
                 if (jquery_1_11_3_min_p('#txtrunningno').val() == '') {
                     jquery_1_11_3_min_p('#' + Data.id).val('');
                     swal("Sorry", "Please enter fixed no!", "warning")
                 }
                 else {
                     if (parseInt(lengthcounter) - (parseInt(val)-1) >= parseInt(jquery_1_11_3_min_p('#txtrunningno').val())) {

                     }
                     else {
                         jquery_1_11_3_min_p('#' + Data.id).val('');
                         swal("Sorry", "Please enter valid position!", "warning")
                     }

                 }

             }
         }
       else if (kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value() == 3) {
             jquery_1_11_3_min_p('#' + Data.id).removeClass('validate');
             jquery_1_11_3_min_p('#txtfixedvalue1').val('');
             if (CurrentId == "txtfixedno1") {
                 if (parseInt(val) > parseInt(lengthcounter)) {
                     jquery_1_11_3_min_p('#' + Data.id).val('');
                     swal("Exceeds", "Please enter less than sequence length!", "warning")
                 }
             }
             else if (CurrentId == "txtfirstposition1") {
                 if (jquery_1_11_3_min_p('#txtfixedno1').val() == '') {
                     jquery_1_11_3_min_p('#' + Data.id).val('');
                     swal("Sorry", "Please enter fixed no!", "warning")
                 }
                 else {
                     if (parseInt(lengthcounter) - (parseInt(val)-1) >= parseInt(jquery_1_11_3_min_p('#txtfixedno1').val())) {

                     }
                     else {
                         jquery_1_11_3_min_p('#' + Data.id).val('');
                         swal("Sorry", "Please enter valid position!", "warning")
                     }

                 }

             }
         }

            else   if (kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value() == 4) {
             jquery_1_11_3_min_p('#' + Data.id).removeClass('validate');
             //jquery_1_11_3_min_p('#txtfixedvalue1').val('');
             if (CurrentId == "txtfixedno2") {
                 if (parseInt(val) > parseInt(lengthcounter)) {
                     jquery_1_11_3_min_p('#' + Data.id).val('');
                     swal("Exceeds", "Please enter less than sequence length!", "warning")
                 }
             }
             else if (CurrentId == "txtdateplaceofdigit") {
                 if (jquery_1_11_3_min_p('#txtfixedno2').val() == '') {
                     jquery_1_11_3_min_p('#' + Data.id).val('');
                     swal("Sorry", "Please enter fixed no!", "warning")
                 }
                 else {
                     if (parseInt(lengthcounter) - (parseInt(val)-1) >= parseInt(jquery_1_11_3_min_p('#txtfixedno2').val())) {

                     }
                     else {
                         jquery_1_11_3_min_p('#' + Data.id).val('');
                         swal("Sorry", "Please enter valid position!", "warning")
                     }

                 }

             }
         }

        
        } else {
            val = re1.exec(val);
            if (val) {
                jquery_1_11_3_min_p('#' + Data.id).val(val[0]);
            } else {
                jquery_1_11_3_min_p('#' + Data.id).val('');
            }
        }
        }
        else
        {
        jquery_1_11_3_min_p('#' + Data.id).val('');
        }



}


function Getsequence(Data) {
    var val = Data.value;
    var re = /^([0-9]+[\.]?[0-9]?[0-9]?[0-9]?|[0-9]+)$/g;
    var re1 = /^([0-9]+[\.]?[0-9]?[0-9]?[0-9]?|[0-9]+)/g;
    if (re.test(val)) {
       

    } else {
        val = re1.exec(val);
        if (val) {
            jquery_1_11_3_min_p('#' + Data.id).val(val[0]);
        } else {
            jquery_1_11_3_min_p('#' + Data.id).val('');
        }
    }

    if (Data.value > 0) {
        jquery_1_11_3_min_p('#lblremaincount').text(Data.value);
        var markup = ""; lengthcounter = 0;
        lengthcounter = Data.value;
        jquery_1_11_3_min_p("#RunningDiv").empty();
        for (var i = 1; i <= Data.value; i++) {
            markup += "<input type='text' id='txtblock_" + i + "' readonly class='runningText' placeholder='"+i+"' >";
        }
        jquery_1_11_3_min_p('#Fieldblock').css('display', 'block');
        jquery_1_11_3_min_p("#RunningDiv").append(markup);
       // jquery_1_11_3_min_p('.constantDiv').css('display', 'block');
        jquery_1_11_3_min_p('.sequencetype').css('display', 'block');
        kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value(1);
        jquery_1_11_3_min_p('.constantDiv').css('display', 'block');
        jquery_1_11_3_min_p('.runningDiv').css('display', 'none');
        jquery_1_11_3_min_p('.dateDiv').css('display', 'none');
        jquery_1_11_3_min_p('.SeperatorDiv').css('display', 'none');
        jquery_1_11_3_min_p('#txtfixedno').val(''); jquery_1_11_3_min_p('#txtfirstposition').val(''); jquery_1_11_3_min_p('#txtfixedvalue').val('');
        jquery_1_11_3_min_p('#txtrunningno').val(''); jquery_1_11_3_min_p('#txtrunfirstposition').val(''); jquery_1_11_3_min_p('#txtrunfirstno').val('');
        jquery_1_11_3_min_p('#txtrunincreementval').val(''); 
        jquery_1_11_3_min_p('#txtfixedno1').val(''); jquery_1_11_3_min_p('#txtfirstposition1').val(''); jquery_1_11_3_min_p('#txtfixedvalue1').val('');
        kendo_all_min_js('#txtformat').data("kendoDropDownList").value(1); jquery_1_11_3_min_p('#txtdateplaceofdigit').val('');
        // jquery_1_11_3_min_p('#txtstartno').val('');
        jquery_1_11_3_min_p('#btnadd').prop("disabled", false);
    }
    else {
        jquery_1_11_3_min_p('#lblremaincount').text('');
        jquery_1_11_3_min_p('#btnadd').prop("disabled", true);
        jquery_1_11_3_min_p('#Fieldblock').css('display', 'none');
        jquery_1_11_3_min_p('.constantDiv').css('display', 'none');
        jquery_1_11_3_min_p('.sequencetype').css('display', 'none');
        jquery_1_11_3_min_p('.runningDiv').css('display', 'none');
        jquery_1_11_3_min_p('.dateDiv').css('display', 'none');
        jquery_1_11_3_min_p('.SeperatorDiv').css('display', 'none');
        kendo_all_min_js('#txtseqtype').data("kendoDropDownList").value(1);
        jquery_1_11_3_min_p('#txtfixedno').val(''); jquery_1_11_3_min_p('#txtfirstposition').val(''); jquery_1_11_3_min_p('#txtfixedvalue').val('');
        jquery_1_11_3_min_p('#txtrunningno').val(''); jquery_1_11_3_min_p('#txtrunfirstposition').val(''); jquery_1_11_3_min_p('#txtrunfirstno').val('');
        jquery_1_11_3_min_p('#txtrunincreementval').val(''); 
       jquery_1_11_3_min_p('#txtfixedno1').val(''); jquery_1_11_3_min_p('#txtfirstposition1').val(''); jquery_1_11_3_min_p('#txtfixedvalue1').val('');
       kendo_all_min_js('#txtformat').data("kendoDropDownList").value(1); jquery_1_11_3_min_p('#txtdateplaceofdigit').val(''); 
       //jquery_1_11_3_min_p('#txtstartno').val('');
    }
}

function SeqDisabled(Data)
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

            var  seqId=jquery_1_11_3_min_p('#'+Data.id).closest("tr").find('td:nth-child(1)').text().trim();
  var btnText=jquery_1_11_3_min_p('#'+Data.id).text().trim();
  if(btnText=='Active')
  {
  jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Sequence.asmx/SeqActive",
       data: "{'seqId':'" + seqId + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
             if(jsonData.Table[0].Response==1)
            {
             swal("Success", "Sequence has been Enabled!", "Success")
            .then((value) => {
            window.location.replace("CreateSequence.aspx");
            });
           
            }
           
        }
    });
  }
  else{
  jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Sequence.asmx/SeqDisabled",
       data: "{'seqId':'" + seqId + "'}",
        dataType: "json",
        async: false,
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
             if(jsonData.Table[0].Response==1)
            {
               swal("Success", "Sequence has been disabled!", "Success")
            .then((value) => {
            window.location.replace("CreateSequence.aspx");
            });
           
            }
           
        }
    });
}


               }
              
             });


}