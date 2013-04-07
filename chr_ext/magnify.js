$(document).ready(function() {

	console.log('magnify.js loaded');

	$('img').mouseover(function() {
		$('this').fadeTo('slow', 0.5);
	});

	$('img').mouseout(function() {
		$('this').fadeTo('slow', 1);
	});	
});