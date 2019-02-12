var ArtIndex = 1;

/*$(function() {
  $("#sortable").sortable();
  $("#sortable").disableSelection();
});*/

function addArt(){
  $("#sortable").append(
    $("<div>").addClass("input-group my-2").append(
      /*$("<div>").addClass("input-group-prepend").append(
        $("<span>").addClass("input-group-text").html("⋮⋮⋮")
      ),*/
      $("<input>").addClass("form-control").attr({type:"url",placeholder:"Art url",onchange:"updatePreview(this,"+ArtIndex+")"}),
      $("<div>").addClass("input-group-append").append(
        $("<button>").addClass("btn btn-danger btn-sm").attr({onclick:"removeArt(this,"+ArtIndex+")"}).html("Remove")
      )
    )
  )
  ArtIndex++;
}

function removeArt(e,id){
  $(e).closest(".input-group").remove();
  if($('#art'+id).length){
    $('#art'+id).closest("a").remove();
    calculate();
  }
}

function updatePreview(e,id){
  if(isUrl($(e).val())){
    if($('#art'+id).length){
      $('#art'+id).attr({src:$(e).val()})
    } else {
      $("#cframe").append($("<a>").attr({src:"#"}).append($("<img>").attr({id:'art'+id,src:$(e).val()})))
    }

    setTimeout(function(){calculate()},1500);

  } else {
    $(e).val("");
    calculate();
  }
}

function calculate(){
  let calcw = 10;
  let chtml = "";
  $('#cframe > a').each(function() {
    if(calcw>10) chtml += '\n';
    calcw += this.offsetWidth;
    chtml += '<a href="#"><img src="'+this.firstChild.currentSrc+'"></a>';
  });

  if(calcw<500) calcw = 500;

  $('#styl').html(
    ".carouselframe{ width: "+calcw+"px; }"+
    ".carouselbox{ max-width: "+calcw+"px; }"+
    ".aright:hover ~ .carouselframe { left: -"+(calcw-500)+"px; }"
  )

  $('#outcss').text(
    ".carouselframe{width:"+calcw+"px;}\n"+
    ".carouselbox{max-width:"+calcw+"px;}\n"+
    ".aright:hover ~ .carouselframe {left:-"+(calcw-500)+"px;}"
  )

  $('#outhtml').text( chtml );

}

function isUrl(s) {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  return regexp.test(s);
}