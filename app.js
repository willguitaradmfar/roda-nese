$(function () {

	$( "#project" ).sortable({
      revert: true
    });

	$('a').draggable({
	    connectToSortable: "#project",
	    helper: "clone",
	    revert: "invalid"
	});

});