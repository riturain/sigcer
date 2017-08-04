$(document).ready(function(){
	$('.button-collapse').sideNav({
		menuWidth: 240, // Default is 240
		edge: 'left', // Choose the horizontal origin
		closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
	});
	$('.collapsible').collapsible();
	$('select').material_select();
	$('.materialboxed').materialbox();
    $('.modal-trigger').leanModal();
});