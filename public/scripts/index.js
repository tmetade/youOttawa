document.addEventListener("DOMContentLoaded", function(event) {
    $('#profile')
	  .popup({
	    on: 'click',
	        title   : 'Popup Title',
    content : 'Hello I am a popup'
	  });
});