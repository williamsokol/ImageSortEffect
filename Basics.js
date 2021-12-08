color = "#fff"



function drawRect(x,y,w,h,c){
    ctx.fillStyle = c;
    ctx.fillRect(x, y, w, h);
}
function drawCircle(x,y,r,c,fill=true){
    //ctx.fillStyle = c;

    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    if(fill = true){
        ctx.fill();
        ctx.strokeStyle = c;
    }
    ctx.stroke();

}
function drawLine(x1,y1,x2,y2,c)
{
    //make line:
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    //make visable:
    ctx.strokeStyle = c;
    ctx.stroke();
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function sign(int)
{
    if(int >= 0)
    {
        return 1;
    }else{
        return -1
    }
}

// Fisher–Yates shuffle
function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}

function normalize(val, array){
    let max = array.length;
    let min = 0;

    return (val - min) / (max - min);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




async function playfreq(aindex){

    aindex = normalize( aindex, imgcols);
    //console.log(aindex>1);

    let context = parent.context;
    let o = context.createOscillator()
    o.type = "sine"
    o.frequency.value = 120 + 1200 * (aindex*aindex);

    var  g = context.createGain()
    g.gain.value = 2;
    o.connect(g);
    g.connect(parent.compressor);
    

    context.resume();
    o.start();

    // await sleep(parent.speed/2)
    await sleep(parent.speed)
    g.gain.exponentialRampToValueAtTime(
        0.00001, context.currentTime +  .6
        )

    o.stop(context.currentTime +  .6);
}
