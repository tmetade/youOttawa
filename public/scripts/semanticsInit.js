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

//GMAIL API

	// Client ID and API key from the Developer Console
      var CLIENT_ID = '504330624418-0afein99vhgpp1fselqu25ps8acapdb1.apps.googleusercontent.com';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

      var authorizeButton = document.getElementById('authorize-button');
      var signoutButton = document.getElementById('signout-button');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
      	console.log("HOLY FUCK");
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          discoveryDocs: DISCOVERY_DOCS,
          clientId: CLIENT_ID,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          listLabels();
        } else {
          authorizeButton.style.display = 'flex';
          signoutButton.style.display = 'none';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

      /**
       * Displaying all the messages in the users inbox
       */
      function displayInbox() {
	  var request = gapi.client.gmail.users.messages.list({
	    'userId': 'me',
	    'labelIds': 'INBOX',
	    'maxResults': 10
	  });

	  request.execute(function(response) {
	    $.each(response.messages, function() {
	      var messageRequest = gapi.client.gmail.users.messages.get({
	        'userId': 'me',
	        'id': this.id
	      });

	      messageRequest.execute(appendMessageRow);
	    });
	  });
	}

	function appendMessageRow(message) {
        $('.table-inbox tbody').append(
          '<tr>\
            <td>'+getHeader(message.payload.headers, 'From')+'</td>\
            <td>\
              <a href="#message-modal-' + message.id +
                '" data-toggle="modal" id="message-link-' + message.id+'">' +
                getHeader(message.payload.headers, 'Subject') +
              '</a>\
            </td>\
            <td>'+getHeader(message.payload.headers, 'Date')+'</td>\
          </tr>'
        );
        $('body').append(
          '<div class="modal fade" id="message-modal-' + message.id +
              '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\
            <div class="modal-dialog modal-lg">\
              <div class="modal-content">\
                <div class="modal-header">\
                  <button type="button"\
                          class="close"\
                          data-dismiss="modal"\
                          aria-label="Close">\
                    <span aria-hidden="true">&times;</span></button>\
                  <h4 class="modal-title" id="myModalLabel">' +
                    getHeader(message.payload.headers, 'Subject') +
                  '</h4>\
                </div>\
                <div class="modal-body">\
                  <iframe id="message-iframe-'+message.id+'" srcdoc="<p>Loading...</p>">\
                  </iframe>\
                </div>\
              </div>\
            </div>\
          </div>'
        );
        $('#message-link-'+message.id).on('click', function(){
          var ifrm = $('#message-iframe-'+message.id)[0].contentWindow.document;
          $('body', ifrm).html(getBody(message.payload));
        });
      }

