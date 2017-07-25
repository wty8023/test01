/**
 * Created by 王天禹 on 2017/7/24.
 */
var ROW = 4, COL = 6, NUM = ROW * COL,
    THUMB_WIDTH = 125, THUMB_HEIGHT = 125,
    BIG_WIDTH = 750, BIG_HEIGHT = 500;
var count = 0;
var oContainer = document.getElementById("container");
var oPrev = document.getElementById("prev");
var oNext = document.getElementById("next");
var aImg;
var nowIndex = 1;//保存的当前显示的图片，取值1~24

//图片预加载
for(var i=0; i<NUM; i++){
    //预加载小图
    var oThumbImg = new Image();
    oThumbImg.onload = function(){
        count++;
        if(count == NUM * 2){
            loadSuccess();
        }
    };
    oThumbImg.src = "img/thumbs/"+ (i + 1) +".jpg";

    //预加载大图
    var oBigImg = new Image();
    oBigImg.onload = function(){
        count++;
        if(count == NUM * 2){
            loadSuccess();
        }
    };
    oBigImg.src = "img/"+ (i + 1) +".jpg";
}

var index = 0;
var oImgWidth;
var oImgHeight;
var fColGap;
var fRorGap;
function loadSuccess(){
    //创建24个div，背景图是小的缩略图
    for(var i=0; i<ROW; i++){
        for(var j=0; j<COL; j++){
            index++;
            var oDiv = document.createElement("div");
            oDiv.style.backgroundImage = "url(img/thumbs/"+ index +".jpg)";
            oDiv.className = "img";
            oDiv.innerHTML = "<span></span>";
            //自定义属性是个对象，存储当前的位置
            oDiv.pos = {
                col : j,
                row : i
            };
            oDiv.index = index;//保存图片名称
            oContainer.appendChild(oDiv);
        }
    }

    //计算空隙大小
    aImg = document.getElementsByClassName("img");//24个div
    oImgHeight = aImg[0].offsetHeight;
    oImgWidth = aImg[0].offsetWidth;
    fColGap = (oContainer.offsetWidth - oImgWidth * COL) / (COL + 1);
    fRorGap = (oContainer.offsetHeight - oImgHeight * ROW) / (ROW + 1);
    for(var i=23; i >= 0; i--){
        aImg[i].style.transitionDelay = (NUM - i) * 100 + "ms";
        aImg[i].style.top = (fRorGap + oImgHeight) * aImg[i].pos.row + fRorGap + "px";
        aImg[i].style.left = (fColGap + oImgWidth) * aImg[i].pos.col +fColGap + "px";
        aImg[i].style.transform = "rotate("+ (Math.random() * 40 - 20) +"deg)";
    }
}

var fBigRowGap = (oContainer.offsetHeight - BIG_HEIGHT) / 2;
var fBigColGap = (oContainer.offsetWidth - BIG_WIDTH) / 2;
var bFlag = true;//标志位 true表示当前是散开 false表示当前是合上
//把小图片的点击事件委托给父元素绑定
oContainer.onclick = function(e){
    if(this === e.target){
        return false;
    }
    if(bFlag){
        for(var i=0; i<aImg.length; i++){
            aImg[i].style.transitionDelay = "0ms";
            aImg[i].style.top = fBigRowGap + THUMB_HEIGHT * aImg[i].pos.row + "px";
            aImg[i].style.left = fBigColGap + THUMB_WIDTH * aImg[i].pos.col + "px";
            aImg[i].style.transform = "rotate(0)";
            aImg[i].style.borderWidth = "1px";

            var oSpan = aImg[i].getElementsByTagName("span")[0];
            oSpan.style.opacity = 1;
            var imgURL;
            if(e.target.className == "img"){//div
                imgURL = e.target.index;
            }else{//span
                imgURL = e.target.parentNode.index;
            }
            oSpan.style.backgroundImage = "url(img/"+ imgURL +".jpg)";
            oSpan.style.backgroundPosition = -THUMB_WIDTH * aImg[i].pos.col + "px "+ (-THUMB_HEIGHT * aImg[i].pos.row) +"px";
            oSpan.style.transitionDelay = "0ms";

            nowIndex = imgURL;//取值1-24
        }
        oPrev.style.display = oNext.style.display = "block";
    }else{
        for(var i=0; i<NUM; i++){
            aImg[i].style.top = (fRorGap + oImgHeight) * aImg[i].pos.row + fRorGap + "px";
            aImg[i].style.left = (fColGap + oImgWidth) * aImg[i].pos.col + fColGap + "px";
            aImg[i].style.transform = "rotate("+ (Math.random() * 40 - 20) +"deg)";
            aImg[i].style.borderWidth = "5px";
            var oSpan = aImg[i].getElementsByTagName("span")[0];
            oSpan.style.opacity = 0;
            oSpan.style.transitionDelay = "0ms";
        }
        oPrev.style.display = oNext.style.display = "none";
    }
    bFlag = !bFlag;
};
oPrev.onclick = oNext.onclick = function(){
    if(this === oNext){
        nowIndex++;
        if(nowIndex == NUM + 1){
            nowIndex = 1;
        }
    }else{
        nowIndex--;
        if(nowIndex == 0){
            nowIndex = NUM;
        }
    }
    var arr = [];//0~23
    for(var i=0; i<NUM; i++){
        arr.push(i);
    }
    arr.sort(function(a, b){
        return Math.random()-0.5;
    });
    for(var i=0; i<arr.length; i++){
        var oSpan = aImg[arr[i]].getElementsByTagName("span")[0];
        oSpan.style.transitionDelay = (i + 1) * 50 + "ms";
        oSpan.style.backgroundImage = "url(img/"+ nowIndex +".jpg)";
    }
};

