var URL = window.webkitURL || window.URL;

window.onload = function() {
    var input = document.getElementById('uploadimage');
    input.addEventListener('change', handleFiles, false);
}

function handleFiles(e) {
    var canvas = document.createElement('canvas');
    
    var ctx = canvas.getContext('2d');
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    var url = URL.createObjectURL(e.target.files[0]);
    var img = new Image();

    img.onload = function() {
        ctx.drawImage(img, 0, 0);   
        
        var rgba = [];
        var imagePixels = ctx.getImageData(0,0,img.width,img.height);



    }


    img.src = url;

}

function convertToHSL(rgba){
  var HSL = {h:"", s:"", l:"", a:""};
  console.log(rgba);
}


function getCharacterBasedOnLightness(lightnessValue){
  var INTERVAL = 100/26;
}


// Based on tests!
// Ordered from darker to lighter
function getFromCharacterTable(index){
  var table = ["Q","W","M","B","N","D","R","O","G","H","E",
               "K","A","P","U","S","X","Z","V","C","I","F","Y","T","J","L"];

  return table(index);
}















