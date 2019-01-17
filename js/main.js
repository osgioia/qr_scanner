document.addEventListener("DOMContentLoaded", function(){
    // console.log("Empezar a trabajar")
    var fileSelector = document.querySelector("input[type=file]")
    var qr = document.querySelector("#qr")


    fileSelector.addEventListener("change", function(){
       // console.log("aaaa")
       var reader = new FileReader()
       reader.addEventListener("load",function(e){
            qrcode.decode(e.target.result)
            qr.style.display = 'block'
            qr.src = e.target.result

       })
       reader.readAsDataURL(fileSelector.files[0])
    })

    var btnCamara = document.querySelector("#btnCamara")
    var btnCaptura = document.querySelector("#btnCapturar")

    btnCamara.addEventListener("click", iniciarCamara)
    btnCaptura.addEventListener("click", capturar)

})

qrcode.callback = function(data) {
    var salida = document.querySelector("output")
    salida.innerHTML = `Los datos del qr son ${data}`
}

function iniciarCamara() {
    if(navigator.getUserMedia != undefined) {
        //navigator.getUserMedia({video: true, facingMode: "environment"  , audio: false},
        navigator.getUserMedia({video: { facingMode: { exact: "environment" } }, audio: false}
        function(localMediaStream){
            var video = document.querySelector("video")
            //video.src = window.URL.createObjectURL(localMediaStream)
            video.srcObject = localMediaStream
            video.play()
        } , function(){
                alert("Error al abrir el video")
            })
        }
    else 
      { 
          alert("No esta disponible la camara") 
        }
}

function capturar() {
        var video = document.querySelector("video")
        var canvas = document.createElement('canvas')
        canvas.width = 640
        canvas.height = 480

        var ctx = canvas.getContext('2d')
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        var image = canvas.toDataURL('image/jpg')
        qrcode.decode(image)

    }
