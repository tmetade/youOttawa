document.addEventListener("DOMContentLoaded", function(event) {

	$.getJSON( "applications.json", function(data) {
		var applications = data;

		$('.ui.search')
		  .search({
		    source: applications,
		    maxResults: 4
		  });
	});


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
		$(".link-container").toggleClass("invisible");
		$(this).toggleClass("button-toggle")
	})

	$(".ledge").on("click", function(){
		$(this).parent().find(".drawer").toggleClass("invisible")

		if($(this).find(".icon.angle").hasClass("up"))
			$(this).find(".icon.angle").removeClass("up").addClass("down")
		else 
			$(this).find(".icon.angle").removeClass("down").addClass("up")
	})

});


