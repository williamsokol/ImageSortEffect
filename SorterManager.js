const mainIframe = document.getElementById("myiframe");
const perfData = performance.getEntriesByType("navigation");



// settings for sorter in iframe
var image = "Picture1.png";
var sorter = "Quick Sort";
var speed = document.getElementById("myText").value;
var recording = false;

// audio stuff
var context;
var compressor;

function fixIframe()
{
    // fix size of iframe on loading
    mainIframe.width = mainIframe.contentDocument.body.scrollWidth + 30;
    mainIframe.height = mainIframe.contentDocument.body.scrollHeight+ 30;

    //document.getElementById("test").click();
    
}

function loadFile(event) {

    image = URL.createObjectURL(event.target.files[0]);
    mainIframe.contentWindow.location.reload();
}

function loadSort() {

    // i guess you don't need to do getElementById
    sortType = mylist.options[mylist.selectedIndex].text;
    mainIframe.contentWindow.location.reload();
}

function loadSpeed(){

    speed = document.getElementById("myText").value;
    mainIframe.contentWindow.location.reload();
}

async function loadRecord(){

    recording = true; 
    mainIframe.contentWindow.location.reload();

    
    // wait for reload duration of page
    await sleep(perfData[0].domComplete); 

    //await navigator.mediaDevices.getUserMedia({ audio: true });

    var stream = mainIframe.contentDocument.getElementById("canvas").captureStream(60);
    if(context != null){
        stream.addTrack(context.aStream.getAudioTracks()[0]);
    }
    // console.log(context != null)

    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.start();

    var chunks = [];
    mediaRecorder.ondataavailable = function(e) {
    chunks.push(e.data);
    };

    mediaRecorder.onstop = function (event) {
        var blob = new Blob(chunks, {type: "video/mp4" });
        var url = URL.createObjectURL(blob);

        const a = document.createElement('a');  // dowload the recording
        a.style.display = 'none';
        a.href = url;
        a.download = 'test.mp4';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }
}

function createAudio()
{
    //add context to iframe
    context = new AudioContext()
    var dest = context.createMediaStreamDestination();
    context.aStream = dest.stream;

    
    
    compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -50;
    compressor.knee.value = 5;
    compressor.ratio.value = 15;
    compressor.attack.value = 0;
    compressor.release.value = 0.2;
    compressor.connect(context.destination);

    compressor.connect(dest);
}