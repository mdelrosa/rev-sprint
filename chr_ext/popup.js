// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// document.addEventListener('DOMContentLoaded', function () {
//   // kittenGenerator.requestKittens();
//   console.log('jquery here')

//   var start = new Date();

//   function timer() {
//     var now = new Date() - start;
//     $('div').text(now.toString)
//   }

//   $('img').mouseenter(function() {
//     console.log('mousein');
//     $(this).fadeTo('slow', 0.5);
//   });

//   $('img').mouseout(function() {
//     console.log('mouseout');
//     $(this).fadeTo('slow', 1);
//   });  

// });


$(document).ready(function() {
  
  console.log('Document ready.');
  $('.home').click(function() {
    chrome.tabs.create({'url': 'http://localhost:3000', 'active': true})
  })

  $('.login').click(function() {
    chrome.tabs.create({'url': 'https://www.facebook.com/dialog/oauth?client_id=182707635213483&response_type=token&redirect_uri=http://www.facebook.com/connect/login_success.html'})
  })

//supposed to close login tab after successful login.... needs work
  // chrome.tabs.onCreated.addListener(function(tab) {
  //   console.log('tab', tab)
  //   chrome.tabs.onUpdated.addListener(function(tabID) {
  //     console.log('tabID', tabID)
  //     chrome.tabs.get(tabID, function(tab) {
  //       if (tab.url.indexOf('www.facebook.com/connect/login_success.html') > -1) {
  //         chrome.tabs.get()
  //         console.log('remove')
  //         chrome.tabs.remove(tab.id)
  //       }
  //     })
  //   });
  // });

  // grabs facebook id from cookies
  chrome.cookies.get({'url': 'https://www.facebook.com/connect/login_success.html#_=_', 'name':'c_user'}, function(cookie) {
    console.log(cookie.value);
    if (!cookie.value) {
      //get stuff from server
    }
    else {
      $('.login').remove();
      $.get('http://localhost:3000/current/ext', {check: true}).done(function(res) {
        console.log(res);
        if (res===true) {
          $('.container').append('YAY');
        }
      });
    }
  })

});