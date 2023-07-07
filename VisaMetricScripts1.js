document.cookie.replace(
    /(?<=^|;).+?(?=\=|;|$)/g, name => location.hostname
        .split(/\.(?=[^\.]+\.)/)
        .reduceRight((acc, val, i, arr) => i ? arr[i] = '.' + val + acc : (arr[i] = '', arr), '')
        .map(domain => document.cookie = `${name}=;max-age=0;path=/;domain=${domain}`)
);

$("#result0").prop("checked", true);
$("#result0").change();
$('#result0').click();
$("#result1").prop("checked", true);
$("#result1").change();
$('#result1').click()
$("#btnSubmit").prop("checked", true);
$("#btnSubmit").change();
$('#btnSubmit').click();
var href = window.location.href;
var correctPage = href.indexOf('appointment-form');

if (correctPage != -1) {
    console.info('start');
    var functionLoader = setInterval(() => {
        var fr = $.ajax({
            url: "https://ir-appointment.visametric.com/ir/appointment-form/getcity",
            method: 'POST',
            data: {
                'applicationType': '3'
            },
            async: false,
            success: function (response) {
                $('#ajaxcity').html(response);
                $(".city").prop("selectedIndex", 3);
                $(".office").prop("selectedIndex", 1);
                $(".officetype").prop("selectedIndex", 1);
                $(".service_type").prop("selectedIndex", 0);
                $(".totalPerson").prop("selectedIndex", 1);
            },
            error: function () { }
        });
        if (fr.status == 200) {alert(1); clearInterval(functionLoader); }
    }, 500);

    console.info('city loaded');
    $("#city").val(3);
    $("#city").change();
    console.info('city selected');

    functionLoader = setInterval(() => {
        var fr = $.ajax({
            url: "https://ir-appointment.visametric.com/ir/appointment-form/getoffice",
            type: "POST",
            async: false,
            data: {
                getCityID: '3',
                getConsular: '3'
            },
            success: function (response) {
                $('#ajaxoffice').html(response);
                $(".officetype").prop("selectedIndex", 0);
                $(".service_type").prop("selectedIndex", 0);
                $(".totalPerson").prop("selectedIndex", 0);
            },
            error: function (jqXHR, textStatus, errorThrown) { }
        }, 500);
        if (fr.status == 200) { clearInterval(functionLoader); }
    });

    console.info('office loaded');
    $("#office").val(1);
    $("#office").change();
    console.info('office selected');

    functionLoader = setInterval(() => {
        var fr = $.ajax({
            url: "https://ir-appointment.visametric.com/ir/appointment-form/getofficetype",
            type: "POST",
            async: false,
            data: {
                getOfficeID: 1,
                getConsular: '3'
            },
            success: function (response) {
                $('#ajaxofficetype').html(response);

                $(".officetype").prop("selectedIndex", 0);
                $(".totalPerson").prop("selectedIndex", 0);
            },
            error: function (jqXHR, textStatus, errorThrown) { }
        });
        if (fr.status == 200) { clearInterval(functionLoader); }
    }, 500);
    console.info('office type loaded');
    $("#officetype").val(1);
    $("#officetype").change();
    console.info('office type selected');

    if ($('#city option').length > 1 && $('#office option').length > 1 && $('#officetype option').length) {
        $("#totalPerson").val(1);
        $("#totalPerson").change();
        if ($('.office').val() !== "0" && $('.officetype').val() !== "0" && $('.city').val() !== "0" && totalPerson > 0) {
            functionLoader = setInterval(() => {
                var fr = $.ajax({
                    url: "https://ir-appointment.visametric.com/ir/appointment-form/getcalendarstatus",
                    type: "POST",
                    async: false,
                    data: {
                        getvisaofficeid: 1,
                        getservicetypeid: 1,
                        getvisacountryid: '3'
                    },
                    success: function (response) {
                        $('.setnewcalendarstatus').val(response);
                        available_day_info_hide_control = response;
                        if (response == 0) { $('#paytype').show(1000); }
                    },
                    error: function (jqXHR, textStatus, errorThrown) { }
                });
                if (fr.status == 200) { clearInterval(functionLoader); }
            }, 500);
            var set_new_calendar_type = $('.setnewcalendarstatus').val();
            functionLoader = setInterval(() => {
                var fr = $.ajax({
                    url: "https://ir-appointment.visametric.com/ir/appointment-form/getprice",
                    type: "POST",
                    async: false,
                    data: {
                        serviceType: 1,
                        totalPerson: 1,
                        getOfficeID: 1,
                        calendarType: set_new_calendar_type,
                        getConsular: '3'
                    },
                    success: function (response) {
                        $('#totalFEE').html('جمع مبلغ: ' + response.data + ' ریال');

                        $('.parentTotalFee').show(1000);
                        $('#paytype').show(1000);


                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        let err = $.parseJSON(jqXHR.responseText).firstAvailableDate;
                        console.log(err);
                    }
                });
                if (fr.status == 200) { clearInterval(functionLoader); }
            }, 500);
        } else {
            $('#availableDayInfo').hide();
            $('.parentTotalFee').hide();
        }
    }
}
$("#atm").prop("checked", true);
$("#atm").change();
$('#paymentCardInput').val('6104337328290687');
$('#popupDatepicker2').val('1402/03/29');
$("#scheba_number").val('IR700120020000004469090091');
$('#scheba_name').val('فراز لولوئی');
$('#name1').val('FARAZ');
$('#surname1').val('LOLOEI');
$('#birthyear1').val('1987');
$('#birthmonth1').val('09');
$('#birthday1').val('19');
$('#passport1').val('U54264182');
$('#phone1').val('09144715949');
$('#email1').val('farazloloei@gmail.com');
$('#btnAppPersonalNext').click();
$('#previewchk').prop('checked', true);
$('#btnAppPersonalNext').click();
