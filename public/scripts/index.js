document.addEventListener("DOMContentLoaded", function(event) {
    $('#profile')
	  .popup({
	    on: 'click',
	        title   : 'Popup Title',
    		content : 'Hello I am a popup'
	  });

	$(".ui.segment.raised")
	.popup({
		on: 'hover'
	});

	// $(".ui.segment").on("click", function(){
	// 	window.location.href = $(this).find("a").attr("href");
	// })

	$(".ui.rating").rating();

	$("#appsToggle").on("click", function(){
		$("#applications").toggleClass("invisible");
		$(this).toggleClass("button-toggle");
	})

	$(".ui.rating.start").on("click", function(){

	})


});


