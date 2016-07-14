/* TESTING LUCIDA CONSOLE "PIXEL DENSITY"
 * 
 * In this context, "pixel density" is the amount of black pixels the image contains.
 * That is, the more space is occupied by the character in black pixels, the larger its density.
 * This density is used to calculate what are characters appear darker given the same space,
 * in order to calculate their lightness value afterwards.
 *
 * Paramenters:
 * - All images are 100x100 pixels PNGs created in Adobe Photoshop CS6
 * - All images have the same character size of 152pt
 * - Characters were then rasterized, merged with a white background and a Threshhold of 128
 *   to stop non-black or white characters from appearing.
 */


var URL = window.webkitURL || window.URL;
var input = document.getElementById('uploadimage');
var LucidaLetters = [];
var context = null;
      
window.onload = function() {
  console.log("Lucida boys");
  input.addEventListener('change', handleFiles, false);
}


function handleFiles(e) {
  var canvas = document.createElement('canvas');
  var fileAmount = input.files.length;

  context = canvas.getContext('2d');
  context.mozImageSmoothingEnabled = false;
  context.webkitImageSmoothingEnabled = false;
  context.msImageSmoothingEnabled = false;
  context.imageSmoothingEnabled = false;

  imageData(0, e);

  return;
}


function imageData(index, event){
  if(event.target.files[index] === undefined){
    console.log(LucidaLetters);
    console.log(quickSort(LucidaLetters, 0, LucidaLetters.length-1));
    return;
  }

  var url = URL.createObjectURL(event.target.files[index]);
  var img = new Image();

  img.onload = function() {
    context.drawImage(img, 0, 0);   
          
    var imagePixels = context.getImageData(0,0,img.width,img.height);
    
    LucidaLetters.push({name:input.files[index].name})
    letterDensity(imagePixels.data, LucidaLetters, index);        
  
    imageData(++index, event);
  }

  img.src = url;
}


function convertToHSL(rgba){
  var HSL = {h:"", s:"", l:"", a:""};

  console.log(rgba);
}


function letterDensity(pixels, letters, index){
  var blackPixels = 0;

  for (i = 0; i < pixels.length; i += 4) {
    if( pixels[i] === 0 && pixels[i+1] === 0 && pixels[i+2] === 0 ) {
      blackPixels++;
    }
  }

  LucidaLetters[index].blackPixels = blackPixels;
}


/* https://www.nczonline.net/blog/2012/11/27/computer-science-in-javascript-quicksort/
 *
 * Neat quicksorting implementation slightly modified to include blackPixels;
 */

function quickSort(items, left, right) {
  var index;

  if (items.length > 1) {
    index = partition(items, left, right);
    if (left < (index - 1)) {
      quickSort(items, left, index - 1);
    }

    if (index < right) {
      quickSort(items, index, right);
    }
  }

  return items;
}

function partition(items, left, right) {
  // Changing the pivot to use a smallers number in order to ease the pain.
  // Since the smallest characters has 1000 something pixels and the larger has about 2500 pixels,
  // dividing it by 100 seems good enough.
  var normalizer = 100;

  var pivot   = items[Math.floor((right + left) / 2)],
      i       = left,
      j       = right;

  while (i <= j) {
    while (items[i].blackPixels < pivot.blackPixels) {
      i++;
    }

    while (items[j].blackPixels > pivot.blackPixels) {
      j--;
    }

    if (i <= j) {
      swap(items, i, j);
      i++;
      j--;
    }
  }

  return i;
}

function swap(items, firstIndex, secondIndex){
  var temp = Object.assign({},items[firstIndex]);
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
}




















