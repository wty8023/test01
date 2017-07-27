requirejs.config({
    paths: {
        jquery: 'jquery-1.11.2'
    }
});
require(["jquery", "dialog1"], function($, Dialog){
    $("#btn").on("click", function(){
        var settings = {
            content: "login.html"
        };
        var dialog = new Dialog(settings);
        dialog.open();
    });
});