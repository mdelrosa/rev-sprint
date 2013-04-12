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
    try {
      chrome.tabs.create({'url': 'http://localhost:3000', 'active': true})
    }
    catch(err) {console.log('too bad')}
  });

  $('.login').click(function() {
    try {
      chrome.tabs.create({'url': 'https://www.facebook.com/dialog/oauth?client_id=182707635213483&response_type=token&redirect_uri=http://www.facebook.com/connect/login_success.html'})
    }
    catch(err) {}
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

  try {
    chrome.cookies.get({'url': 'https://www.facebook.com/connect/login_success.html#_=_', 'name':'c_user'}, function(cookie) {
      if (!cookie.value) {
        //get stuff from server
      }
      else {
        $('.login').remove();
        // chrome.cookies.set({'url': thisPageUrl, 'name': taskFBId})})
      }
     })
  }
  catch(err) {}

  //adding fbid cookie to page

  try {
    function postCookie(tab) {
      try {
        console.log('taburl', tab.url);
        chrome.cookies.get({'url': 'https://www.facebook.com/connect/login_success.html#_=_', 'name':'c_user'}, function(cookie) {
          chrome.cookies.set({'url': tab.url, 'name':'c_user', 'value': cookie.value}, function() {
            console.log('cookie set', cookie.value);
          })
        })
      }
      catch(err) {console.log('tab was bad')}
    }
    
    chrome.tabs.onCreated.addListener(function(tab) {
      postCookie(tab);
    });

    chrome.tabs.onUpdated.addListener(function(tab) {
      postCookie(tab);
    });

    chrome.tabs.activated.addListener(function(tab) {
      postCookie(tab);
    });
  }
  catch(err){}

});

//monitoringTest.js

// http://stackoverflow.com/questions/5667888/counting-occurences-of-javascript-array-elements
function freqs(arr) {
    var a = [], b = [], prev;
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
    return [a, b];
}

//http://stackoverflow.com/questions/2986990/is-there-a-way-to-get-all-text-from-the-rendered-page-with-js
function getText(){
  var theText;
  $('p,h1,h2,h3,h4,h5').each(function(){
    theText += $(this).text().toLowerCase();
  });
  return theText;
}

function getScore(text){
  text = text.replace(/[()!";:,.\/?\\↵-]/g, ' ');
  text = text.replace(/'/g, '');
  var textArr = text.split(" ");
  textArr = textArr.filter(function(e){return e});
  fData = freqs(cleanedArr);
  words = fData[0];
  freqs = fData[1];
  keyFreqs = getKeyFreqs(fData,keywords)
  return keyFreqs.sum()/freqs.sum()*5;
}

function getKeyFreqs(fData,keywords){
  var words = fData[0];
  var freqs = fData[1];
  var keyFreqs = [];
  for (var i = 0; i < keywords.length; i++){
    var word = keywords[i];
    if (words.in(word)){
      var idx = words.indexOf(word);
      keyFreqs[i] = freqs[idx];
    }
    else{
      keyFreqs[i] = 0;
    }
  }
  return keyFreqs;
}

Array.prototype.in = function(el){
  if (this.indexOf(el) != -1){
    return true;
  }
  else{
    return false;
  }
}

//http://stackoverflow.com/questions/1230233/how-to-go-through-an-array-and-add-their-values
Array.prototype.sum = function(){
    var sum = 0;
    this.map(function(item){
        sum += item;
    });
    return sum;
}

$(function () {
  var fbID = 1311120879;
  $.ajax({
    type: "POST",
    url: 'http://localhost:3000/keywords',
    data: {fbID:fbID},
    success: function(data){
      var keywords = data;
      // var keywords = ['javascript','js','jquery'];
      var url = document.URL;
      var start = +new Date;
      var MSActive = 0;
      var lastActive = +new Date;
      var curTab = true;
      var theText;
      $('p,h1,h2,h3,h4,h5').each(function(){
        theText += $(this).text().toLowerCase();
      });
      var cleanedText = theText.replace(/[()!";:,.\/?\\↵-]/g, ' ');
      cleanedText = cleanedText.replace(/'/g, '');
      var strArr = cleanedText.split(" ");
      cleanedArr = strArr.filter(function(e){return e});
      fData = freqs(cleanedArr);
      words = fData[0];
      freqs = fData[1];
      console.log(keywords);
      keyFreqs = getKeyFreqs(fData,keywords)
      console.log(keyFreqs);
      var score = keyFreqs.sum()/freqs.sum()*10;
      if (score == 0){
        score = -0.01;
      }
      window.onfocus = function () { 
        curTab = true; 
      }; 
      window.onblur = function () { 
        curTab = false; 
      }; 
      $(document).mousemove(function(e){
        if (curTab){
          lastActive = (+new Date);
          // console.log('mouse movement',lastActive);
        }
      });
      $(document).keypress(function(e){
        if (curTab){
          lastActive = (+new Date);
          // console.log('key press',lastActive);
        }
      });
      setInterval(function () { 
        if (curTab){
          var activeDelta = (+new Date - lastActive);
          var MSTime = (+new Date - start);
          if (activeDelta < 5000){
            MSActive += 5000;
            var score = keyFreqs.sum()/freqs.sum()*10;
            if (score == 0){
              score = -0.01;
            }
            var pData = {fbID:fbID,url:url,time:+new Date, 
            scoreIncr:score}
            $.ajax({
                type: "POST",
                url: 'http://localhost:3000/check',
                data: pData
              });
          }
          else{
            score = 0;
            var pData = {fbID:fbID,url:url,time:+new Date, 
            scoreIncr:score}
            $.ajax({
                type: "POST",
                url: 'http://localhost:3000/check',
                data: pData
              });
          }
        }
      }, 5000);
    }
  });
});