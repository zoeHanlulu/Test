window.onload=drag;
function drag() {
    var box=document.getElementById('box');
    //读取存储在sessionStorage中的数据
    if (window.sessionStorage){
        var to=window.sessionStorage.getItem("top"),
            lef=window.sessionStorage.getItem("left"),
            widt=window.sessionStorage.getItem("width"),
            heigh=window.sessionStorage.getItem("height");
        box.style.top=to;
        box.style.left=lef;
        box.style.width=widt;
        box.style.height=heigh;
    }
    var title=document.getElementById('til');
    title.addEventListener('mousedown',fnDown,false);
    //title.onmousedown=fnDown;    //拖曳

    box.addEventListener('mouseover',over,false);
    box.addEventListener('mousedown',doDown,false);

}
//按下鼠标实现拖拽
function fnDown(event) {
    event=event || window.event;
    var box=document.getElementById('box'),
        //鼠标按下后光标和面板之间的距离
        disX=event.clientX-box.offsetLeft,
        disY=event.clientY-box.offsetTop;
    //移动
    function movedrag(event) {
        fnMove(event,disX,disY);
    }
    document.addEventListener("mousemove",movedrag,false);
    //释放鼠标
    function moveup() {
        document.removeEventListener("mousemove",movedrag,false);
    }
    document.addEventListener("mouseup",moveup,false);
}

//移动鼠标实现拖拽
function fnMove(event,posX,posY) {
    var box=document.getElementById('box'),
        //移动后的box位置
        lef=event.clientX-posX,
        to=event.clientY-posY;
    var  winW=document.documentElement.clientWidth || document.body.clientWidth,
        winH=document.documentElement.clientHeight || document.body.clientHeight,
        maxW=winW-box.offsetWidth,
        maxH=winH-box.offsetHeight;
    if(lef<0){
        lef=0;
    }else if(lef>maxW){
        lef=maxW;
    }
    if(to<0){
        to=0;
    }else if(to>maxH){
        to=maxH;
    }
    box.style.left=lef+'px';
    box.style.top=to+'px';
    saveToStorage();
}

//将数据保存到sessionStorage对象中
function saveToStorage() {
    if (window.sessionStorage) {
        var box=document.getElementById('box'),
            to=box.style.top,
            lef=box.style.left,
            widt=box.style.width,
            heig=box.style.height;
        window.sessionStorage.setItem("top",to);
        window.sessionStorage.setItem("left",lef);
        window.sessionStorage.setItem("width",widt);
        window.sessionStorage.setItem("height",heig);
    }
}

//返回鼠标所在的方向
function getDirection(evevt) {
    var box=document.getElementById('box'),
        dir='';
    var to=parseInt(box.style.top),
        lef=parseInt(box.style.left);
    var maxH=to+box.offsetHeight-1,
        maxW=lef+box.offsetWidth-2;   //(maxW,maxH)为box最下面点的坐标
    if(evevt.clientX<=maxW+1 && evevt.clientX>=maxW-2){
        dir+='e';
    }
    if(evevt.clientY<=maxH+1 && evevt.clientY>=maxH-2){
        dir+='n';
    }
    return dir;
}

//鼠标放在上面
function over(event) {
    var box=document.getElementById('box');
    var dir=getDirection(event);
    if(dir=="") {
        dir='default';
    }else {
        dir+="-resize";
    }
    box.style.cursor=dir;
}

//按下鼠标并实现放大缩小
function doDown(event) {
    event=event || window.event;
    var box=document.getElementById('box') ;
        startx=event.clientX,
        starty=event.clientY;

    document.addEventListener("mousemove",domove,false);
      function moveupchang() {
          document.removeEventListener("mousemove",domove,false);
      }
      document.addEventListener("mouseup",moveupchang,false);
}

function domove() {
    event=event || window.event;
    var dir=getDirection(event);
    var box=document.getElementById('box'),wi,he;
    if (dir==''){
        return ;
    }else if(dir=='e'){
       /* wi=box.offsetWidth+event.clientX-startx;*/
        wi=event.clientX-box.offsetLeft;
        box.style.width=wi +'px';
    }else if (dir=='n'){
        /*he=box.offsetHeight+event.clientY-starty;*/
        he=event.clientY-box.offsetTop;
        box.style.height=he+'px';
    }
    saveToStorage();
}



