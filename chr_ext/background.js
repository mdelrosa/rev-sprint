//background.js

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
//           chrome.tabs.remove(tabs[i].id);
//         }
//       }
//     });
//   }
// }

  try {
    function postCookie(tab) {
      try {
        console.log('taburl', tab.url);
        chrome.cookies.get({'url': 'https://www.facebook.com/connect/login_success.html#_=_', 'name':'c_user'}, function(cookie) {
          chrome.cookies.set({'url': tab.url, 'name':'c_user', 'value': cookie.value}, function() {
            console.log('c_user set @', tab.url)
            console.log('c_user set as:', cookie.value);
          })
        })
      }
      catch(err) {console.log('tab was bad')}
    }
    
    chrome.tabs.onCreated.addListener(function(tab) {
      console.log('tab opened')
      postCookie(tab);
    });

    chrome.tabs.onUpdated.addListener(function(tabID) {
      console.log('tab updated')
      console.log('updated tab',tabID)
      chrome.tabs.get(tabID, function(tab) {
        postCookie(tab);
      });
    });

    chrome.tabs.activated.addListener(function(tab) {
      console.log('tab activated')
      postCookie(tab);
    });
  }
  catch(err){}