logQueue.urlPost = "http://localhost:3000/";
logQueue.objHeader.tenant = 'DESENHADOR';      
logQueue.showMessageConsole = true;
logQueue.qtdeMessageSent = 500;
logQueue.debug = false;
logQueue.trace = true;
logQueue.sleepThread = 1000;
logQueue.start();


//.replace(/^(.*)(\$largura\$)(.*)$/, '$112$3')

$(function () {

	var palleta = $('#palleta');

	for(var i in templates){
		var template = templates[i];
		console.debug('ADD COMPONENT TO PALLETA ('+i+')');
		palleta.append(template.templ);
	}

	$( "#project" ).sortable({
      revert: true
    });

	$('.component').draggable({
	    connectToSortable: "#project",
	    cursor: "move",
	    helper: "clone",
	    revert: "invalid",
	    	start: function() {	        
	        	console.debug('start draggable '+$(this).html());
	      	},
	      	drag: function() {
				
		    },
	    	stop: function() {
	        	console.debug('stop draggable'+$(this).html());
	        	console.log(this);
	      	}
	});

	$('#project').on('dblclick', '.component', function () {
		console.debug('dblclick em componente já arrastado !!');
		
	})

});