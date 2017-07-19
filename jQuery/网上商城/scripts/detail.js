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
});