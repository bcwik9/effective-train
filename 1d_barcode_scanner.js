$(function() {
    var last_result = undefined
    
    var set_zoom = function(){
        if(capabilities["zoom"]){
            track.applyConstraints({ advanced: [{zoom: capabilities.zoom.max}]})
        } else {
            console.log("Zoom not supported")   
        }
    }
  
    var get_capabilities_and_restart = function(){
        capabilities = track.getCapabilities()
        Quagga.stop()
        // restart with max zoom and resolution
        quagga_init(false, capabilities["width"]["max"], capabilities["height"]["max"])
    }
    
    var quagga_init = function(set_defaults, resolution_width, resolution_height){
        var camera_id = undefined
        Quagga.CameraAccess.enumerateVideoDevices().then(function(cameras) {
          camera_id = cameras[cameras.length - 1]["deviceId"]
        })
        Quagga.init({
            inputStream : {
                name : "Live",
                type : "LiveStream",
                target: document.querySelector('#quagga'),
                constraints: {
                    deviceId: camera_id,
                    width: {
                        min: resolution_width
                    },
                    height: {
                        min: resolution_height
                    }
                }
            },
            decoder : {
                readers : ["code_128_reader", "ean_reader"]
            }
        }, function(err) {
            if (err) {
                console.log(err);
                return
            }
            console.log("Quagga initialization finished. Ready to start");
            Quagga.start();
            if(set_defaults){
                track = Quagga.CameraAccess.getActiveTrack()
                setTimeout(get_capabilities_and_restart, 2000)
            } else {
                set_zoom()
            }
        });
    }
    
    var init = function(){
        quagga_init(true, 640, 480)
        
        Quagga.onProcessed(function(result) {
            var drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    result.boxes.filter(function (box) {
                        return box !== result.box;
                    }).forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                    });
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
                }
            }
        });

        Quagga.onDetected(function(result) {
            var code = result.codeResult.code;
            if (last_result !== code) {
                console.log("Quagga result:")
                console.log(result)
                last_result = code;
                var canvas = Quagga.canvas.dom.image;
                var node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
                node.find("img").attr("src", canvas.toDataURL());
                node.find("h4.code").html(code);
                $("#result_strip ul.thumbnails").prepend(node);
            }
        });
    }
    
    init()
})
