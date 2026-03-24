let mousex;
let mousey;
var pageListIndex = 0;
function Initiate(){
    console.log("Initiating...");
    RefrshPage("Index").then(() => {
        var pageList = document.getElementsByClassName("Page");
        for (let i = 0; i < pageList.length; i++) {
            pageList[i].style.transition = "none";
            pageList[i].style.left = "100%";
            pageList[i].style.transition="all 0.5s ease-in-out";
        }
        pageList[pageListIndex].style.left = "0";
        var Title = document.getElementsByClassName("Title")[0];
        if (Title) {
            Title.style.left = "0%";
            Title.style.transition = "left 0.5s ease-in-out";
        }
        var body = document.getElementsByTagName("html")[0];
        body.addEventListener('touchstart', function(event) {
            //event.preventDefault();
            MouseMove();
        }, { passive: false });
        body.addEventListener('touchend', function(event) {
            //event.preventDefault();
            MouseMove();
        }, { passive: false });
        body.addEventListener('touchmove', function(event) {
            event.preventDefault();
        }, { passive: false });
        body.addEventListener('scroll', function(event) {
            event.preventDefault();
        }, { passive: false });
    });
}
function LoadPage(location,index){
    return fetch(location)
    .then(response => response.text());
}
var IndexSelection = ["/data/IndexSelection/HomePage", "/data/IndexSelection/NewsPage","/data/IndexSelection/AboutPage"];
function RefrshPage(selection){
    return new Promise((resolve, reject) => {
        var pageListParent = document.getElementsByClassName("PageList")[0];
        pageListParent.innerHTML = "";
        var index = 0;
        pageListIndex = 0;
        switch(selection){
            case "Index":
                var promises = [];
                IndexSelection.forEach(element => {
                    console.log(`Loading page: ${element}`);
                    pageListParent.appendChild(document.createElement("div")).setAttribute("class", "Page");
                    pageListParent.lastChild.setAttribute("id", index);
                    pageListParent.lastChild.style.left = "100%";
                    promises.push(LoadPage(element,index));
                    index++;
                });
                Promise.all(promises).then(contents => {
                    var pages = document.getElementsByClassName("Page");
                    contents.forEach((content, i) => {
                        pages[i].innerHTML = content;
                    });
                    resolve();
                }).catch(error => reject(error));
                break;
            default:
                resolve();
        }
    });
}

function SwitchPage(mdx, mdy){
    var direction = "";
    var needChange = false;
    var index=pageListIndex;
    if(Math.abs(mdx) < Math.abs(mdy)) {
        // 垂直方向移动更多，忽略水平移动
        return;
    }
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
            pageListIndex = document.getElementsByClassName("Page").length-1;
        }
        else if(pageListIndex>document.getElementsByClassName("Page").length-1){
            pageListIndex = 0;
        }
        var currentPage = document.getElementsByClassName("Page")[index];
        var nextPage = document.getElementsByClassName("Page")[pageListIndex];
        var Title = document.getElementsByClassName("Title")[0];
        
        switch(direction){
            case "left":
                currentPage.style.transition = "all 0.5s ease-in-out";
                nextPage.style.transition = "none";
                currentPage.style.left = "-100%";
                nextPage.style.left = "100%";
                break;
            case "right":
                currentPage.style.transition = "all 0.5s ease-in-out";
                nextPage.style.transition = "none";
                currentPage.style.left = "100%";
                nextPage.style.left = "-100%";
                break;
        }

        // 强制浏览器应用上面位置（重绘），再开始动画到 0
        nextPage.offsetHeight;
        requestAnimationFrame(() => {
            nextPage.style.transition = "all 0.5s ease-in-out";
            nextPage.style.left = "0";
            // 检查是否循环切换
            var isLoopLeft = (direction === "left" && index === 2 && pageListIndex === 0);
            var isLoopRight = (direction === "right" && index === 0 && pageListIndex === 2);
            if (isLoopLeft) {
                // 左滑到头：从左边出去再从右边进来
                Title.style.transition = "left 0.25s ease-in-out";
                Title.style.left = "-100%";
                setTimeout(() => {
                    Title.style.transition = "none";
                    Title.style.left = "100%";
                    Title.offsetHeight;
                    setTimeout(() => {
                        Title.style.transition = "left 0.5s ease-in-out";
                        Title.style.left = (pageListIndex * -30) + "%";
                    }, 10);
                }, 250);
            } else if (isLoopRight) {
                // 右滑到头：从右边出去再从左边进来
                Title.style.transition = "left 0.5s ease-in-out";
                Title.style.left = "100%";
                setTimeout(() => {
                    Title.style.transition = "none";
                    Title.style.left = "-100%";
                    Title.offsetHeight;
                    setTimeout(() => {
                        Title.style.transition = "left 0.5s ease-in-out";
                        Title.style.left = (pageListIndex * -30) + "%";
                    }, 10);
                }, 500);
            } else {
                // 正常设置 Title left 减少 30%
                Title.style.left = (pageListIndex * -30) + "%";
            }
        });
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