window.onload= function () {
    box=document.querySelector("#box"),
        til=document.querySelector("#til");
    //在p标签内实现拖拽
    til.addEventListener('mousemove',drag);
    //在box选择边框实现拉大拉小操作
    box.addEventListener('mousemove',shrink);

}

//实现拖曳
function drag() {
    til.style.cursor="move";
    til.onmousedown=function (e) {
        //获取光标距离面板的距离坐标
        var disX=e.clientX-box.offsetLeft,
            disY=e.clientY-box.offsetTop;
        //求面板能够移动的最大距离
        var maxW=(document.body.clientWidth || document.documentElement.clientWidth)-box.offsetWidth,
            maxH=(document.body.clientHeight || document.documentElement.clientHeight)-box.offsetHeight;
        //当光标移动的时候
        document.onmousemove=function (e) {
            //获取面板移动后的相对位置
            var left=e.clientX-disX,
                top=e.clientY-disY;
            if(left<0){
                left=0;
            }else if(left>maxW){
                left=maxW;
            }
            if(top<0){
                top=0;
            }else if (top>maxH){
                top=maxH;
            }
            box.style.left=left+"px";
            box.style.top=top+"px";
        }
    }
    MoveUp();
}


//选择边框进行收缩操作
function shrink(e) {
    e=event || window.event;
    //获取光标距离面板的距离
    var disX=event.clientX-box.offsetLeft,
        disY=event.clientY-box.offsetTop;
    //取得box的长宽
    var widthX=box.offsetWidth,
        heightY=box.offsetHeight;
    //判断光标的方向
    if (disX>widthX-10 && disX<widthX+10){
        mouseMove("ew-resize",e,"width","clientX","offsetLeft");
    }else if (disY>heightY-10 && disY<heightY+10){
        mouseMove("ns-resize",e,"height","clientY","offsetTop")
    }
}

function mouseMove(cursor,attr,e,clientxy,offsetlt) {
    e=event || window.event;
    box.style.cursor=cursor;
    box.onmousedown =function (e) {
        document.onmousemove=function (e) {
            box.style[attr]=e[clientxy]-box[offsetlt];
        }
    }
}

function MoveUp() {
    document.onmouseup=function () {
        document.onmousemove=null;
        document.onmouseup=null;
    }
}