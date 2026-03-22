let mousex;
let mousey;
var pageListIndex = 0;
function Initiate(){
    console.log("Initiating...");
    RefrshPage("Index");
    var pageList = document.getElementsByClassName("Page");
    for (let i = 0; i < pageList.length; i++) {
        pageList[i].style.transition = "none";
        pageList[i].style.left = "100%";
        pageList[i].style.transition="all 0.5s ease-in-out";
    }
    pageList[pageListIndex].style.left = "0";
    var body = document.getElementsByTagName("html")[0];
    body.addEventListener('touchstart', function(event) {
        event.preventDefault();
        MouseMove();
    }, { passive: false });
    body.addEventListener('touchend', function(event) {
        event.preventDefault();
        MouseMove();
    }, { passive: false });
    body.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, { passive: false });
    body.addEventListener('scroll', function(event) {
        event.preventDefault();
    }, { passive: false });
}
function LoadPage(location,index){
    var pageListParent = document.getElementsByClassName("PageList")[0];
    var content;
    fetch(location)
    .then(response => response.text())
    .then(data => {
        content = data;
        pageListParent.appendChild(document.createElement("div")).setAttribute("class", "Page");
        pageListParent.lastChild.setAttribute("id", index);
        pageListParent.lastChild.style.left = "100%";
        pageListParent.lastChild.innerHTML = content;
    });
}
var IndexSelection = ["/data/IndexSelection/HomePage", "/data/IndexSelection/NewsPage","/data/IndexSelection/AboutPage"];
function RefrshPage(selection){
    var pageListParent = document.getElementsByClassName("PageList")[0];
    pageListParent.innerHTML = "";
    var index = 0;
    pageListIndex = 0;
    switch(selection){
        case "Index":
            IndexSelection.forEach(element => {
                console.log(`Loading page: ${element}`);
                LoadPage(element,index);
                index++;
            });
            break;
    }
}

function SwitchPage(mdx, mdy){
    var direction = "";
    var needChange = false;
    var index=pageListIndex;
    if(mdx>10)
    {
        direction = "left";
        pageListIndex++;
        needChange = true;
    }
    else if(mdx<-10)
    {
        direction = "right";
        pageListIndex--;
        needChange = true;
    }
    if(needChange){
        
        if(pageListIndex<0){
            pageListIndex = 0;
        }
        else if(pageListIndex>document.getElementsByClassName("Page").length-1){
            pageListIndex = document.getElementsByClassName("Page").length-1;
        }
        var currentPage = document.getElementsByClassName("Page")[index];
        var nextPage = document.getElementsByClassName("Page")[pageListIndex];
        
        switch(direction){
            case "left":
            currentPage.style.left = "-100%";
            nextPage.style.transition = "0s";
            nextPage.style.left = "100%";
            break;
            case "right":
            currentPage.style.left = "100%";
            nextPage.style.transition = "0s";
            nextPage.style.left = "-100%";
            break;
        }
        
            nextPage.style.left = "0";
            nextPage.style.transition="all 0.5s ease-in-out";
        //ShowPage(pageListIndex);
        
    }  
}
var mouseDown = false;
var mouseDownX;var mouseDownY;
var mouseUpX;var mouseUpY;
function MouseMove(){
    // 获取触摸点的信息
    var touch = event.changedTouches[0];

    // 获取触摸点相对于页面左上角的位置
    var mousex = touch.pageX;
    var mousey = touch.pageY;
    if(mouseDown){
        mouseDownX = mousex;
        mouseDownY = mousey;
    }
    else{
        mouseUpX = mousex;
        mouseUpY = mousey;
    }
    var deltaX = mouseUpX - mouseDownX;
    var deltaY = mouseUpY - mouseDownY;
    mouseDown = !mouseDown;
    if(mouseDown==false)
    {
        //console.log(`Delta X: ${deltaX}, Delta Y: ${deltaY}`);
        SwitchPage(deltaX, deltaY);
    }
}
onload = Initiate;