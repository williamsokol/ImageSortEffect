const mainIframe = document.getElementById("myiframe");

var image = "Picture1.png";
var sorter = "Quick Sort";
var speed = 50;

function fixIframe()
{
    console.log(mainIframe.contentDocument.getElementById("canvas"));
    mainIframe.width = mainIframe.contentDocument.body.scrollWidth + 30;
    mainIframe.height = mainIframe.contentDocument.body.scrollHeight+ 30;
    //
}

async function loadFile(event) {

    image = URL.createObjectURL(event.target.files[0]);
    mainIframe.contentWindow.location.reload();
}

function loadSort() {

    sortType = mylist.options[mylist.selectedIndex].text;
    mainIframe.contentWindow.location.reload();
}

function loadSpeed(){

    speed = document.getElementById("myText").value;
    mainIframe.contentWindow.location.reload();
}