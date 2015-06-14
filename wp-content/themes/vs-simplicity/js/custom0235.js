
jQuery(function($){
$(document).ready(function() {   

//build Navigation menu dropdown
$("<select />").appendTo("#primary-navigation .menu-header");

// Create default option
$("<option />", {
"selected": "selected",
"value": "",
"text": "Navigate:" //Change default text
}).appendTo("#primary-navigation .menu-header select");

// Populate dropdowns with dash for child pages
$("#primary-navigation .menu-header a").each(function() {
var el = $(this);
var padding = "";
for (var i = 0; i < el.parentsUntil('div > ul').length - 1; i++)
padding += "&ndash;";
$("<option />", {
"value": el.attr("href"),
"html": padding + el.text(),
}).appendTo("#primary-navigation .menu-header select");
});

$("#menu-secondary-menu a").each(function() {
var el = $(this);
var padding = "";
for (var i = 0; i < el.parentsUntil('div > ul').length - 1; i++)
padding += "&ndash;";
$("<option />", {
"value": el.attr("href"),
"html": padding + el.text(),
}).appendTo("#primary-navigation .menu-header select");
});

//make responsive dropdown menu actually work
$("#primary-navigation .menu-header select").change(function() {
window.location = $(this).find("option:selected").val();
});

/* Most images on mobile sites lose their float and are centred
  However some images are too small for this and still look better floated */
$("img").each(function() {
   width = $(this).width();

   if (width < 160 && $(this).hasClass('alignleft')) {
     $(this).removeClass('alignleft').addClass('alignleft-width320');
   }
   if (width < 160 && $(this).hasClass('alignright')) {
     $(this).removeClass('alignright').addClass('alignright-width320');
   }
   if (width < 240 && $(this).hasClass('alignleft')) {
     $(this).removeClass('alignleft').addClass('alignleft-width480');
   }
   if (width < 240 && $(this).hasClass('alignright')) {
     $(this).removeClass('alignright').addClass('alignright-width480');
   }
   if (width < 320 && $(this).hasClass('alignleft')) {
     $(this).removeClass('alignleft').addClass('alignleft-width650');
   }
   if (width < 320 && $(this).hasClass('alignright')) {
     $(this).removeClass('alignright').addClass('alignright-width650');
   }
});

$('#content img').not('[id*="jwplayer"]').addClass('contentimg');

bannerwidth = $('#site-title img').width(); 
if(bannerwidth < 650 && $(window).width() > 650) { $('#site-title img').addClass('smallbanner') }


 set3ColHeights =function() {    
         theight = Math.max($(this).height(), $(this).prev().height(), $(this).prev().prev().height() );
         $(this).css('min-height', theight + 'px');
         $(this).prev().css('min-height', theight + 'px');
         $(this).prev().prev().css('min-height', theight + 'px');  
    };  
    
  setHeights = function() {
       $('#front-featured-inside .widget-area:nth-child(3n)').css('min-height', '0px'); 
        
       if ( $( window ).width() > 650 ) {
         $('#front-featured-inside .widget-area:nth-child(3n)').each(set3ColHeights);
       }  
       
       setVideo();
  }; 
 
  function getStyle(elem, name) {
    // J/S Pro Techniques p136
    if (elem.style[name]) {
        return elem.style[name];
    } else if (elem.currentStyle) {
        return elem.currentStyle[name];
    }
    else if (document.defaultView && document.defaultView.getComputedStyle) {
        name = name.replace(/([A-Z])/g, "-$1");
        name = name.toLowerCase();
        s = document.defaultView.getComputedStyle(elem, "");
        return s && s.getPropertyValue(name);
    } else {
        return null;
    }
  };  
  
  setVideo = function() {
     $('div[id^="jwplayer"]').filter(function() {
          return this.id.split('-')[2] == 'div';
     }).addClass('jwcontainer').each(function() {

         // Todo: These are not set properly in HTML 5
         $(this).children('div').each(function() {
            videowidth = parseInt(getStyle(this, 'width').slice(0,-2));
            videoheight = parseInt(getStyle(this, 'height').slice(0,-2));
          });
          displayheight = videoheight - 24;
          
          ratio = videoheight * 100 / videowidth;
          
          newvideowidth = Math.min($(this).parent().width(), $(window).width());
          newvideoheight = parseInt(newvideowidth * ratio / 100);
          newdisplayheight = newvideoheight - 24;
          
          //alert('old width: ' + videowidth + 'oldheight: ' + videoheight + 'new width: ' + newvideowidth + ' new height: ' + newvideoheight + 'ratio: ' + ratio); 
          
         $(this).children('div')/*.filter(function() {
              return getStyle(this, 'width') == videowidth + 'px';
          })*/.each(function() {
              styletag = $(this).attr('style');
              if (typeof styletag !== 'undefined' && styletag !== false) {
                newstyletag = styletag.replace('width: ' + videowidth + 'px', 'width: ' + newvideowidth + 'px');
                $(this).attr('style', newstyletag);
              }  
          });
          
          if(videoheight != 24 && newvideoheight > 24) {
            $(this).children('div')/*.filter(function() {
              return getStyle(this, 'height') == videoheight + 'px';
            })*/.each(function() {
              styletag = $(this).attr('style');
              newstyletag = styletag.replace('height: ' + videoheight + 'px', 'height: ' + newvideoheight + 'px');
              $(this).attr('style', newstyletag);
            });
            /*$(this).find('div').filter(function() {
              return getStyle(this, 'height') == displayheight + 'px';
            }).each(function() {
              styletag = $(this).attr('style');
              newstyletag = styletag.replace('height: ' + displayheight + 'px', 'height: ' + newdisplayheight + 'px');
              $(this).attr('style', newstyletag);
            }); */
          }   
     });         
  }; 
  

  setHeights();
  $( window ).resize( setHeights );   
  
  
  

  
   


/* setHeights = function() {
  
    var sliderheight, slideheight, maxslideheight = 0;
    if( $( window ).width() > 360) {

      $('.wpss_slide').each(function() {
        slideheight = Math.max($(this).children('.wpss_content_half').height(), $(this).children('.wpss_img_half').height());
        if (slideheight > maxslideheight) { maxslideheight = slideheight; } 
      });

    } else {
        
      $('.wpss_slide').each(function() {
          slideheight = $(this).children('.wpss_content_half').height() + $(this).children('.wpss_img_half').height(); 
          if (slideheight > maxslideheight) { maxslideheight = slideheight; } 
      });

    }  
    
    sliderheight = Math.min(maxslideheight, $( window ).height() );
    $('.wpss_slideshow_').css('min-height', sliderheight + 'px');
    $('#wpss_slideshow-front-page').css('min-height', sliderheight + 'px');    
    $('.wpss_slide').css('min-height', sliderheight + 'px');

  }; 
  
  setHeights();
  $( window ).resize( setHeights ); */

});  }); /* Double brackets in order to namespace $ */

