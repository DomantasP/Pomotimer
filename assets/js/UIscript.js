$("#open-popup").click(function(){

	var bg = $(".background");
	var popup = $(".time-info");
	
    $(".background").interactive_bg({
	   strength: 0,
	   scale: 1,
 	});

    popup.removeClass('hidden');
    setTimeout(function () {
      popup.removeClass('visuallyhidden');
    }, 20);

    bg.addClass("background-blur");
    var ok = $("#main-tomato").data('okshadow');
    ok.pause();
})

$("#close-popup").click(function(){

	var bg = $(".background");
	var popup = $(".time-info");

	bg.removeClass("background-blur");
    
    popup.addClass('visuallyhidden');
    
    popup.one('transitionend', function(e) {

      popup.addClass('hidden');

    });
    var ok = $("#main-tomato").data('okshadow');
    ok.unpause();

    $(".background").interactive_bg({
	   strength: 25,
	   scale: 1,
 	});

})

$("#open-info").click(function(){

  var bg = $(".background");
  var popup = $(".info");
 
    popup.removeClass('hidden');
    setTimeout(function () {
      popup.removeClass('visuallyhidden');
    }, 20);
})

$("#open-settings").click(function(){

	var bg = $(".background");
	var popup = $(".settings");
 
    popup.removeClass('hidden');
    setTimeout(function () {
      popup.removeClass('visuallyhidden');
    }, 20);
})

$("#close-settings").click(function(){

	var popup = $(".settings");
    
    popup.addClass('visuallyhidden');
    
    popup.one('transitionend', function(e) {

      popup.addClass('hidden');

    });
})

$("#close-popup-settings").click(function(){

    var bg = $(".background");
    var popup = $(".time-info");
    var popup2 = $(".settings");

    bg.removeClass("background-blur");
    popup2.addClass('visuallyhidden');    


    popup2.one('transitionend', function(e) {

      popup2.addClass('hidden');

    });

    popup.one('transitionend', function(e) {

      popup.addClass('hidden');

    });

    popup.addClass('visuallyhidden');

    var ok = $("#main-tomato").data('okshadow');
    ok.unpause();

    $(".background").interactive_bg({
       strength: 75,
       scale: 1,
    });
})

$("#close-popup-info").click(function(){

    var bg = $(".background");
    var popup = $(".time-info");
    var popup2 = $(".info");

    bg.removeClass("background-blur");
    popup2.addClass('visuallyhidden');    


    popup2.one('transitionend', function(e) {

      popup2.addClass('hidden');

    });

    popup.one('transitionend', function(e) {

      popup.addClass('hidden');

    });

    popup.addClass('visuallyhidden');

    var ok = $("#main-tomato").data('okshadow');
    ok.unpause();

    $(".background").interactive_bg({
       strength: 75,
       scale: 1,
    });
})
$("#close-info").click(function(){

  var popup = $(".info");
    
    popup.addClass('visuallyhidden');
    
    popup.one('transitionend', function(e) {

      popup.addClass('hidden');

    });
})
$(function(){
    $('#main-tomato').okshadow({
    	color: "rgba(0,0,0,0.4)",
	});


   $(".background").interactive_bg({
	   strength: 75,
	   scale: 1,
	   animationSpeed: "50ms",
	   contain: false,
	   wrapContent: false
 	});

});

