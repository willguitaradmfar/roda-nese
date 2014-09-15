logQueue.urlPost = "http://localhost:3000/";
logQueue.objHeader.tenant = 'DESENHADOR';      
logQueue.showMessageConsole = true;
logQueue.qtdeMessageSent = 500;
logQueue.debug = false;
logQueue.trace = true;
logQueue.sleepThread = 1000;
logQueue.start();


//.replace(/^(.*)(\$largura\$)(.*)$/, '$112$3')

var montaPropriedades = function (str) {
	console.debug('HTML CLICADO '+str.match(/\$\w*\$/g));
	var table = $('<table class="table"><thead><tr><th>Propriedade</th></tr></thead><tbody></tbody></table>');
	var allPropertys = str.match(/\$\w*\$/g);
	for(var i in allPropertys){			
		var tr = $('<tr></tr>');
		tr.append('<td>'+allPropertys[i].replace(/\$/g, '')+'</td>');
		tr.append('<td><input type="text" class="form-control"></input></td>');
		table.find('tbody').append(tr);		
	}
	return table.html();
};


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
	        	console.debug(this);
	      	}
	});

	$('#project').on('dblclick', '.component', function () {
		console.debug('dblclick em componente já arrastado !!!');
		$( "#dialog" ).html('');
		$( "#dialog" ).html(montaPropriedades($(this).html()));
		$( "#dialog" ).dialog( "open" );
	})

});


$(function() {
    $( "#dialog" ).dialog({
    	  width : 500,
    	  height : 500,
		  autoOpen: false,
		  show: {
		    effect: "explode",
		    duration: 300
		  },
		  hide: {
		    effect: "explode",
		    duration: 300
		  }
    });
  });