logQueue.urlPost = "http://localhost:3000/";
logQueue.objHeader.tenant = 'DESENHADOR';      
logQueue.showMessageConsole = true;
logQueue.qtdeMessageSent = 500;
logQueue.debug = false;
logQueue.trace = true;
logQueue.sleepThread = 1000;
logQueue.start();


//.replace(/^(.*)(\$largura\$)(.*)$/, '$112$3')

var _montaPropriedades = function (str) {
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

var montaPropriedades = function (comp) {
	console.debug('HTML CLICADO '+comp.name);

	var table = $('<table class="table"><thead><tr><th>Propriedade</th></tr></thead><tbody></tbody></table>');
	for(var i in comp.property){
		console.debug(i+'::'+comp.property[i]);
		var tr = $('<tr></tr>');
		tr.append('<td>'+i+'</td>');
		tr.append('<td><input name="'+i+'" type="text" class="form-control" value="'+comp.property[i]+'"></input></td>');
		table.find('tbody').append(tr);	
	}
	
	return table.html();
};


$(function () {

	var palleta = $('#palleta');

	for(var i in templates){
		var template = templates[i];
		console.debug('ADD COMPONENT TO PALLETA ('+i+')');
		var templ = $(template.templ);
		templ.addClass('component');
		palleta.append(templ);
		templ.attr('comp', JSON.stringify(template, function(key, value) {
			if (typeof value === 'function') {
				return value.toString();
			} else {
				return value;
			}
		}));
	}
		

	$( "#project" ).sortable({
      revert: true
    });

	$('.component').draggable({
	    connectToSortable: "#project",
	    cursor: "move",
	    helper: "clone",
	    revert: "invalid",
	    	start: function(event, ui) {	        
	        	console.debug('start draggable '+$(this));	        	
	      	},
	      	drag: function(event, ui) {
				
		    },
	    	stop: function(event, ui) {	    		
	        	console.debug('stop draggable'+$(this).html());	        	
	        	console.debug($(this));        	
	        	
	      	}
	});

	$('#project').on('dblclick', '.component', function () {
		console.debug('dblclick em componente já arrastado !!! :: '+$(this).attr('comp'));

		var comp = JSON.parse($(this).attr('comp'));
		comp.update = eval('('+comp.update+')');

		var $this = $(this);

		$( "#dialog" ).html('');
		$( "#dialog" ).html(montaPropriedades(comp));
		$( "#dialog" ).dialog( "open" );

		$( "#dialog" ).off('focusout', 'input');
		$( "#dialog" ).on('focusout', 'input', function() {
			var name = $(this).attr('name');
			var val = $(this).val();
			comp.property[name] = val;
		
			$this.attr('comp', JSON.stringify(comp, function(key, value) {
				if (typeof value === 'function') {
					return value.toString();
				} else {
					return value;
				}
			}));

			comp.update($this, comp);
			console.debug('LOST-FOCUS '+name+':'+val);
		});
		
	});

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