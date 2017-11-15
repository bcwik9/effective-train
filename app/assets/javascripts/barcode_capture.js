$(function() {
    let scanner = new Instascan.Scanner({ video: document.getElementById('barcode-capture') });
    scanner.addListener('scan', function (content) {
        $("#barcode-result").text(content)
        form = $("#build-list-form form")
        form.find("#vendor_part_id").val(content)
        form.submit()
    });
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            console.error('No cameras found.');
        }
    }).catch(function (e) {
        console.error(e);
    });
})