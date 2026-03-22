let mousex;
let mousey;
var pageListIndex = 0;
function Initiate(){
    console.log("Initiating...");
    var pageList = document.getElementsByClassName("Page");
    for (let i = 0; i < pageList.length; i++) {
        pageList[i].style.transition = "none";
        pageList[i].style.left = "100%";
        pageList[i].style.transition="all 0.5s ease-in-out";
    }
    pageList[pageListIndex].style.left = "0";
    var body = document.getElementsByTagName("html")[0];
    body.addEventListener('touchstart', function(event) {
        MouseMove();
    });
    body.addEventListener('touchend', function(event) {
        MouseMove();
    });
}
function ShowPage(index){
    var pageList = document.getElementsByClassName("Page");
    for (let i = 0; i < pageList.length; i++) {
        pageList[i].style.display = "none";
    }
    pageList[index].style.display = "block";
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
        console.log(`Delta X: ${deltaX}, Delta Y: ${deltaY}`);
        SwitchPage(deltaX, deltaY);
    }
}
onload = Initiate;