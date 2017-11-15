$(function() {
    let scanner = new Instascan.Scanner({ video: document.getElementById('barcode-capture') });
    scanner.addListener('scan', function (content) {
        $("#barcode-result").text(content)
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