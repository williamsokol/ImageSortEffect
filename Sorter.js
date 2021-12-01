
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// add a colum number value to have a value to sort by
ImageData.prototype.colNum = "should be number";


var imgcols = new Array(); // colloms of image pixels
var img = new Image();     // image
var sortType
var offset =0;


SetUpSorter(parent.image, parent.sortType);


async function SetUpSorter(imgSrc = img.src, sortType = "Quick Sort"){

    // make new img.src if it ex
    img.src = imgSrc;

    // do when finished loading images
    await new Promise(resolve => { img.onload = img.onerror = resolve; }).then(() => {
        //console.log('images finished loading');
    });

    
    ctx.canvas.width  = img.width+ (parent.recording? 0 :  img.width + 10 );
    ctx.canvas.height  = img.height;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // get image data
    for (var i=0; i<img.width; i++)
    {
        imgcols[i] = ctx.getImageData(i, 0, 1, img.height);
        imgcols[i].colNum = i;
        //console.log(imgcols[i].colNum)
    }
    
    offset = parent.recording? 0 : (img.width+10)
    // make randomized image
    imgcols = shuffle(imgcols);
    for (var i=0; i<img.width; i++)
    {
        ctx.putImageData(imgcols[i], i+offset, 0);
    }
    
    // start sorting image
    runSort(sortType);
    
    // start loop
    thing();
}

//console.log(imgcols);

function draw(){
    
    for (var i=0; i<img.width; i++)
    {
       ctx.putImageData(imgcols[i], i+offset, 0);
       
    } 
}
function thing(){
    window.setTimeout(function(){
        
        draw();
        window.requestAnimationFrame(thing);
    },1000/30)    
}



async function runSort(sortType){

    switch (sortType){
        case "Quick Sort":
            await quickSort(imgcols, 0, imgcols.length - 1);
            break;
        case "Bubble Sort":
            await bubbleSort(imgcols, imgcols.length);
            break;
    }
    
    console.log("done sorting");
    if(parent.recording)
    {
        await sleep(1000);
        parent.mediaRecorder.stop();
        parent.recording = false;
    }
}