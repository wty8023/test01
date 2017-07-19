/**
 * Created by ������ on 2017/7/19.
 */
$(function(){
    //������
    $("#inputSearch").on("focus", function(){
        if(this.value == this.defaultValue){
            this.value = "";
        }
    }).on("blur", function(){
        if(this.value == ""){
            this.value = this.defaultValue;
        }
    });

    //�����˵�
    $("#nav li").hover(function(){
        $(this).children(".jnNav").show();
    }, function(){
        $(this).children(".jnNav").hide();
    });

    //hot
    $(".promoted").append("<span class='hot'></span>");

    //��վ����
    $(function(){
        var $li =$("#skin li");
        $li.click(function(){
            switchSkin( this.id );
        });
        var cookie_skin = $.cookie("MyCssSkin");
        if (cookie_skin) {
            switchSkin( cookie_skin );
        }
    });

    function switchSkin(skinName){
        $("#"+skinName).addClass("selected")                //��ǰ<li>Ԫ��ѡ��
            .siblings().removeClass("selected");  //ȥ������ͬ��<li>Ԫ�ص�ѡ��
        $("#cssfile").attr("href","styles/skin/"+ skinName +".css"); //���ò�ͬƤ��
        $.cookie( "MyCssSkin" ,  skinName , { path: '/', expires: 10 });
    }
    //�ֲ�ͼ

    //����ͼƬ�Ĳ㼶
    var $imgs = $("#JS_imgWrap img");
    $imgs.each(function(index, elem){
        $(elem).css({
            zIndex : 5 - index
        });
    });
    //�л�
    var nowIndex = 0;
    var $menus = $("#menu a");
    $menus.on("mouseover", function(){
        nowIndex = $(this).index();
        changeImg();
    });
    setInterval(function(){
        nowIndex++;
        if(nowIndex == $imgs.length){
            nowIndex = 0;
        }
        changeImg();
    }, 1000);

    function changeImg(){
        $menus.eq(nowIndex).addClass("chos").siblings().removeClass("chos");
        $imgs.eq(nowIndex).stop().fadeIn().siblings().stop().fadeOut();
    }


    //tooltip
    tooltip("#jnNoticeInfo li a");
    tooltip(".jnCatainfo a");

    //Ʒ�ƻ
    $("#jnBrandTab li").on("click", function(){
        $(this).addClass("chos").siblings().removeClass("chos");
        $("#jnBrandList").animate({
            left: -$("#jnBrandList li").innerWidth() * 4 * $(this).index()
        }, 1000);
    });

});









