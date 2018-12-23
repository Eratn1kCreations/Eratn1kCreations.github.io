var lang = "pl",
    data = {
        "nav":{
            "pl":["O mnie","Strony","Layouty","Małe projekty","Inne","","Przykro mi ale z wyłączonym javascriptem nic tutaj nie znajdziesz :c"],
            "en":["About me","Websites","Layouts","Small projects","Other","","Sorry but with javascript turned off this website won't work :c"]
        },
        "side":""
    };

function changeLanguage(){
    switch(sessionStorage.getItem('lang')){
      case "en": var lang_n = "en"; $("html").attr('lang',"en"); break;
      default:   var lang_n = "pl"; $("html").attr('lang',"pl"); break;
    }

    if(lang_n !== lang){

        $("#lang_p").toggleClass("lang_0 lang_1").data('lang_p',((lang_n=="en")?"pl":"en"));
        lang = lang_n;

        // navbar
        $("a.nav-link").each(function(i){
            $(this).text(data.nav[lang][i]);
        });
        $("#jsinfo").text(data.nav[lang][6]);
        if(data.side != ""){
            // content - header
            $("#NavAddon").text(" > "+data.side.head[lang][0]);
            $("#ContentHead>h2").first().text(data.side.head[lang][0]);
            $("#ContentHead>h6").first().text(data.side.head[lang][1]);
            // content - side
            $("[data-lswh]").each(function(){
                let id = parseInt($(this).data('lswh'));
                $(this).html(data.side.text[id][lang]);
            });
        }        
    }
}

// After load DOM
$(document).ready(function(){
    let url = window.location.pathname;
    let name = url.substring(url.lastIndexOf('/')+1).split(".")[0];
    if(name!="index"){
        $.getJSON("api/lang/"+name+".json", function(json){
            data.side = json;
            changeLanguage();
        });
    } else {
        changeLanguage();
    }
    

    $("#lang_p").click(function(){
        sessionStorage.setItem('lang',$("#lang_p").data('lang_p'));
        console.log();
        changeLanguage();
    });
    $(".courtain").each(function(){
        $(this).fadeOut(750)
    });

    $("a.nav-link").click(function(e){
        e.preventDefault();
        if (this.href) {
            var target = this.href;
            setTimeout(function(){
                window.location = target;
            }, 500);
            $(".courtain").each(function(){
                $(this).fadeIn(500)
            });
        }
    });

    $("#pages").niceScroll({cursorcolor:"rgba(255,255,255,0.2)",cursorborder:"black"});

    // click -> zoom image
    $('body').on("click", ".img-thumbnail", function() {
        $("body").append(("<div id='zoom' lang='"+lang[0]+lang[1]+"'><img src='"+$(this).attr("src")+"'></div>"));
    });

    $('body').on('click', '#zoom', function() {
        $("#zoom").remove();
    });

    $("#jsinfo").hide();

});