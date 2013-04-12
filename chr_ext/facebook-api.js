//facebook-api.js

console.log('facebook-api.js loaded')

function login() {

	window.fbAsyncInit = function() {

	console.log('async init');
	// init the FB JS SDK
	FB.init({
	  appId      : '182707635213483',                        // App ID from the app dashboard
	  channelUrl : 'localhost:3000/channel.html', // Channel file for x-domain comms
	  status     : true,                                 // Check Facebook Login status
	  xfbml      : true                                  // Look for social plugins on the page
	});

	// Additional initialization code such as adding Event Listeners goes here

	FB.getLoginStatus(function(response) {
	  if (response.status === 'connected') {
	    // connected
	    var uid = response.authResponse.userID;
    	var accessToken = response.authResponse.accessToken;
	    console.log('connected')
	  } else if (response.status === 'not_authorized') {
	    // not_authorized
	    console.log('not authorized')
	    login();
	  } else {
	    // not_logged_in
	    console.log('not logged in')
	    login();
	  }
	});

	FB.login(function(response) {
	    if (response.authResponse) {
	        // connected
	        testAPI();
	    } else {
	        // cancelled
	    }
	});
	} 

	function testAPI() {
	console.log('Welcome! Fetching your information...')
	FB.api('/me', function(response) {
	  console.log('good to see you, ' +response.name +'.')
	})
	}
};

// Load the SDK asynchronously
(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "https://connect.facebook.net/en_US/all.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// $.getScript("https://connect.facebook.net/en_US/all.js")
// .done(function(script, textStatus) {
//   console.log( textStatus );
//   console.log('FB', window.FB)
//   window.fbAsyncInit();
// });