jquery_1_11_3_min_p(document).ready(function () {
    BindRequestNumber();
});

function BindRequestNumber() {
    jquery_1_11_3_min_p.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/ItemRequisition.asmx/BindRequestNumber",
        dataType: "json",
        success: function (result) {
            var i = 0;
            var jsonData = eval(result.d);
            jQuery.each(jsonData.Table, function (rec) {
                jquery_1_11_3_min_p('#txtRequestNum').attr('disabled', 'disabled');
                jquery_1_11_3_min_p('#txtRequestNum').val(jsonData.Table[i].RequestNum);
                i++;
            });

        }
    });
}
