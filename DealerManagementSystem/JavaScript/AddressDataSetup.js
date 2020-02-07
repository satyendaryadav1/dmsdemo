jquery_1_11_3_min_p(document).ready(function () {
});


function BindFieldSetupGrid(entityId ,countryId) {

    var entityId = entityId;
    var countryId = countryId;
    
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/Setup.asmx/BindFieldSetupGrid",
        data: "{'entityId':'" + entityId + "','countryId':'" + countryId + "'}",
        dataType: "json",
        success: function (result) {
//            jquery_1_11_3_min_p('#preloader').css('display', 'none');
//            jquery_1_11_3_min_p('#Overlay_Load').css('display', 'none');
//            jquery_1_11_3_min_p('#divGrid').css('display', 'block');
            var i = 0;
            var jsonData = result.d;
           
            jQuery.each(jsonData.Table, function (rec) {

                var markup = "<li class='nav-item'><a class='nav-link  active' id='A4' data-toggle='tab'  href='#AddressLine1' > " + jsonData.Table[i].FieldName + "</a></li>"


                jquery_1_11_3_min_p("#BindField").append(markup);



                i++;
            });

        }


    });



}