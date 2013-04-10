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

  if (!localStorage) {
    $('.container').append("<button class='btn btn-success login'>Log in</button>");
  }

  chrome.cookies.get({'url': 'https://www.facebook.com/connect/login_success.html#_=_', 'name':'c_user'}, function(cookie) {
    console.log(cookie.value);
    $('.container').append(cookie.value);
  })

});