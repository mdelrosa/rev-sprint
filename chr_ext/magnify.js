console.log('magnify.js loaded');

// $.get('localhost:3000/current_user')

// chrome.tabs.onUpdated.addListener(function() {
//   chrome.tabs.getSelected(null,function(tab) {

//     //set badlink, redirect from it
//     var tablink = tab.url;
//     var badlink = 'twitter.com';

//     console.log(tablink.indexOf(badlink))
//     if (tablink.indexOf(badlink) > -1) {
//       console.log('badlink')
//       //for now, will push to localhost site
//       chrome.tabs.create({url: "http://localhost:3000"}, function(popup) {
//   		console.log(popup);
//   		popup.show;
//       });
//     }

//   })
// });

// var successURL = 'www.facebook.com/connect/login_success.html';

// function onFacebookLogin(){
//   if (!localStorage.getItem('accessToken')) {
//     chrome.tabs.query({}, function(tabs) { // get all tabs from every window
//       for (var i = 0; i < tabs.length; i++) {
//         if (tabs[i].url.indexOf(successURL) !== -1) {
//           // below you get string like this: access_token=...&expires_in=...
//           var params = tabs[i].url.split('#')[1];

//           // in my extension I have used mootools method: parseQueryString. The following code is just an example ;)
//           var accessToken = params.split('&')[0];
//           accessToken = accessToken.split('=')[1];

//           localStorage.setItem('accessToken', accessToken);
//           chrome.cookies.getAll(function(cookies) {
//             localStorage.setItem('cookies', cookies);
//           });
//           chrome.tabs.remove(tabs[i].id);
//         }
//       }
//     });
//   }
// }

// chrome.tabs.onUpdated.addListener(onFacebookLogin);
// console.log('localStorage',localStorage);
// console.log('cookie', document)
