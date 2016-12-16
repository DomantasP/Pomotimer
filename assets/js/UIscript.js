define(['jquery'],function($){
var hidePopup = function(popup){
  popup.addClass('visuallyhidden');   
  
  popup.one('transitionend', function(e) {
    popup.addClass('hidden');
  });
}

var displayPopup = function(popup){
    popup.removeClass('hidden');

    setTimeout(function () {
      popup.removeClass('visuallyhidden');
    }, 20);
}

$('#open-popup').click(function(){
	displayPopup($('.time-info'));
  $('.background').addClass('background-blur');
})

$('#close-popup').click(function(){
	$('.background').removeClass('background-blur');   
  hidePopup($('.time-info'));
})

$('#open-info').click(function(){
  displayPopup($(".info"));
})

$('#open-settings').click(function(){
	displayPopup($('.settings'));
})

$('#close-settings').click(function(){
	hidePopup($('.settings'));
})

$('#close-popup-settings').click(function(){
  $('.background').removeClass('background-blur');  
  hidePopup($('.time-info'));
  hidePopup($('.settings'));
})

$("#close-popup-info").click(function(){
  $('.background').removeClass('background-blur');
  hidePopup($(".info"));
  hidePopup($(".time-info"));
})

$('#close-info').click(function(){
  hidePopup($(".info"));
})

$('input').on('focus', function(){
  $(this).val('');
})
});