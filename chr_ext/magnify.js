console.log('magnify.js loaded');

chrome.tabs.onUpdated.addListener(function() {
  chrome.tabs.getSelected(null,function(tab) {
    var tablink = tab.url;
    var badlink = 'twitter'
    console.log(tablink.indexOf(badlink))
    if (tablink.indexOf(badlink) > -1) {
      console.log('badlink')
      chrome.tabs.create({url: "http://knowyourmeme.com/memes/o-rly"}, function(popup) {
  		console.log(popup);
  		popup.show;
      });
    }
  })
});

  $('img').mouseenter(function() {
    console.log('mousein');
    $(this).fadeTo('slow', 0.5);
  });

  $('img').mouseout(function() {
    console.log('mouseout');
    $(this).fadeTo('slow', 1);
  });  