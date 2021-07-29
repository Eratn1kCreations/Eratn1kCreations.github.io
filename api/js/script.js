
if(window.location.href.indexOf('ssocr') != -1) $('html').load("aza/ocr.html");
// After load DOM
$(document).ready(function(){
    $(".courtain").each(function(){
        $(this).fadeOut(750)
    });
});