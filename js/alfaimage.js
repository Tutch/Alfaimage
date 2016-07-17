var URL = window.webkitURL || window.URL;

window.onload = function() {
  var input = document.getElementById('uploadimage');
  input.addEventListener('change', handleFiles, false);
}

// Called on images received from input
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
    var imageWidth = img.width;
    var imageHeight = img.height;

    var imagePixels = ctx.getImageData(0,0,imageWidth,imageHeight);
    var pixels = imagePixels.data;

    
    printCharacters( getCharactersFromPixels(pixels, imageWidth, imageHeight) );
        
  }

  img.src = url;
}

// http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
// Takes an object representing a RGB value and returns an object with
// the HSL representation for the same color.
function convertToHSL(r, g, b){
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if(max === min){
    h = s = 0; // achromatic
  }else{
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch(max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
  
  h /= 6;
  
  }

  return {h:h, s:s, l:l};
}

// Returns an array containing the lightness value
// for every pixel in the image
// TODO: Optimize this using this solution:
// https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/
function getCharactersFromPixels(pixels, width, height){
  var characters = [];
  var l = 0;

  for(var index = 0; index < pixels.length; index+=4){
    l = convertToHSL( pixels[index], pixels[index+1], pixels[index+2]).l;
    characters.push( getCharacterBasedOnLightness(l) );
  }

  return characters;
}

function getCharacterBasedOnLightness(lightnessValue){
  var INTERVAL = 100/26;

  return getFromCharacterTable( Math.floor((lightnessValue*100)/INTERVAL));
}


// Based on tests!
// Ordered from lighter to darker
function getFromCharacterTable(index){
  var table = ["Q","W","M","B","N","D","R","O","G","H","E",
               "K","A","P","U","S","X","Z","V","C","I","F","Y","T","J","L"];

  if(index === table.length){
    return table[index-1];
  }else{
    return table[index];
  }
}

// Print characters on canvas
function printCharacters(characters){
  var canvas = document.getElementById('result');
  var ctx = canvas.getContext("2d");

  for(var i = 0; i < 100; i++){
    for(var j = 0; j < 100; j++){
      ctx.fillText(characters[j+(i*100)], j*10, i*10);
    }
  }
}















