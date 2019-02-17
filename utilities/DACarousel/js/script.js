var ArtIndex = 1;

function addArt(){
  $("#sortable").append(
    $("<div>").addClass("input-group my-2").append(
      $("<input>").addClass("form-control").attr({type:"url",placeholder:"Link url",onchange:"updatePreview(this,"+ArtIndex+",0)"}),
      $("<input>").addClass("form-control").attr({type:"url",placeholder:"Art url",onchange:"updatePreview(this,"+ArtIndex+",1)"}),
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

function updatePreview(e,id,n){
  if(isUrl($(e).val())){
    if(n==0){
      if($('#link'+id).length){
        $('#link'+id).attr({href:$(e).val()})
      } else {
        $("#cframe").append($("<a>").attr({id:'link'+id,href:$(e).val()}).append($("<img>").attr({id:'art'+id,src:"#"})))
      }
    } else {
      if($('#art'+id).length){
        $('#art'+id).attr({src:$(e).val()})
      } else {
        $("#cframe").append($("<a>").attr({id:'link'+id,href:"#"}).append($("<img>").attr({id:'art'+id,src:$(e).val()})))
      }
    }   

    setTimeout(function(){calculate()},1500);

  } else {
    $(e).val("");
    if(n==0){
      if($('#link'+id).length){
        $('#link'+id).attr({href:"#"})
      }
    } else {
      if($('#art'+id).length){
        $('#art'+id).attr({src:"#"})
      }
    }  
    calculate();
  }
}

function calculate(){
  let calcw = 10;
  let chtml = '<div class="headerbox">my arts:<div><div class="carouselbox"><div class="scrollsides aleft"></div><div class="scrollsides aright"></div><div class="container">';
  $('#cframe > a').each(function() {
    console.log(this);
    calcw += this.offsetWidth;
    chtml += '\n<a href="'+this.attributes.href.value+'"><img src="'+this.firstChild.attributes.src.value+'"></a>';
  });
  chtml += '\n</div></div></div></div>';

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