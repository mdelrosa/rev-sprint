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
	var fbID = '17902347209147';
	var keywords = ['javascript','js','jquery'];
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
		var activeDelta = (+new Date - lastActive);
		var MSTime = (+new Date - start);
		if (activeDelta < 1000){
			MSActive += 1000;
			var score = keyFreqs.sum()/freqs.sum()*10;
			if (score == 0){
				score = -0.01;
			}
			var pData = {fbID:fbID,url:url,time:+new Date, 
			scoreIncr:score}
			$.ajax({
  				type: "POST",
  				url: 'url',
  				data: pData
  			});
		}
		else{
			score = 0;
			var pData = {fbID:fbID,url:url,time:+new Date, 
			scoreIncr:score}
			$.ajax({
  				type: "POST",
  				url: 'url',
  				data: pData
  			});
		}
	}, 1000);
});