document.addEventListener("DOMContentLoaded", function(event) {
    $('#profile')
	  .popup({
	    on: 'click'
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
		$(this).toggleClass("button-toggle")
	})

});


