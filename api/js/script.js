
// After load DOM
$(document).ready(function(){
    if(window.location.href.indexOf('ssocr') != -1) $('html').load("aza/ocr.html");
    $(".courtain").each(function(){
        $(this).fadeOut(750)
    });
});