logQueue.urlPost = "http://localhost:3000/";
logQueue.objHeader.tenant = 'DESENHADOR';      
logQueue.showMessageConsole = true;
logQueue.qtdeMessageSent = 500;
logQueue.debug = false;
logQueue.trace = true;
logQueue.sleepThread = 1000;
logQueue.start();

$(function () {

	var montaPropriedades = function (comp) {
		console.debug('HTML CLICADO '+comp.name);

		var table = $('<table class="table"><thead><tr><th>Propriedade</th></tr></thead><tbody></tbody></table>');
		for(var i in comp.property){
			console.debug(i+'::'+comp.property[i]);
			var tr = $('<tr></tr>');
			tr.append('<td>'+i+'</td>');
			var td = $('<td></td>');
			
			if(typeof comp.property[i] === 'object' && comp.property[i].options){
				var select = $('<select name="'+i+'" class="form-control"></select>');
				
				for(var ii in comp.property[i].options){					
					select.append('<option value="'+comp.property[i].options[ii]+'">'+comp.property[i].options[ii]+'</option>');
				}
				td.append(select);
			}
			else{
				var input = $('<input name="'+i+'" type="text" class="form-control" value="'+comp.property[i]+'"></input>');			
				td.append(input);
			}	
			
			
			tr.append(td);
			table.find('tbody').append(tr);	
		}	
		return table.html();
	};

	var palleta = $('#palleta');

	var montaPalleta = function () {
		for(var i in templates){
			var template = templates[i];
			console.debug('ADD COMPONENT TO PALLETA ('+i+')');
			var templ = $(template.templ);
			templ.addClass('component');
			palleta.append('<br/>');
			palleta.append(templ);
			templ.attr('comp', JSON.stringify(template, function(key, value) {
				if (typeof value === 'function') {
					return value.toString();
				} else {
					return value;
				}
			}));
		}
	};		
		
	var pluginDraggable = function () {
		$( ".project-container" ).sortable({
	      revert: true
	    });

		$('.component').draggable({
		    connectToSortable: ".project-container",
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
	};

	var clickOpenProperty = function () {
		$('.project-container').on('dblclick', '.component', function () {
			console.debug('dblclick em componente já arrastado !!! :: '+$(this).attr('comp'));

			var comp = JSON.parse($(this).attr('comp'));
			comp.update = eval('('+comp.update+')');

			var $this = $(this);

			$( "#dialog" ).html('');			
			$( "#dialog" ).html(montaPropriedades(comp));

			var btnremover = $('<hr/><span class="btn btn-danger glyphicon glyphicon-remove"> Remover</span>');

			btnremover.on('click', function () {
				$this.remove();
				$( "#dialog" ).dialog( "close" );
			});

			$( "#dialog" ).append(btnremover);
			$( "#dialog" ).dialog( "open" );

			$( "#dialog" ).off('focusout', 'input, select');
			$( "#dialog" ).on('focusout', 'input, select', function() {
				var name = $(this).attr('name');				
				var val = $(this).val();

				if(comp.property[name].val)
					comp.property[name].val = val;
				else
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
	};

	var visualizar = function () {
		$('#vFull').on('click', function () {
			console.debug('VISUALIZAR PROJETO');
			$('<div></div>').html($('.project-container').html()).dialog({width : $('html').width(), height : $('html').height(), title : 'Projeto'});
		});

		$('#v240').on('click', function () {
			console.debug('VISUALIZAR PROJETO');
			$('<div></div>').html($('.project-container').html()).dialog({width : 240, height : 420, title : 'v240'});
		});

		$('#v320').on('click', function () {
			console.debug('VISUALIZAR PROJETO');
			$('<div></div>').html($('.project-container').html()).dialog({width : 320, height : 420, title : 'v320'});
		});

		$('#v480').on('click', function () {
			console.debug('VISUALIZAR PROJETO');
			$('<div></div>').html($('.project-container').html()).dialog({width : 480, height : 570, title : 'v480'});
		});

		$('#v768').on('click', function () {
			console.debug('VISUALIZAR PROJETO');
			$('<div></div>').html($('.project-container').html()).dialog({width : 768, height : 570, title : 'v768'});
		});

		$('#v1024').on('click', function () {
			console.debug('VISUALIZAR PROJETO');
			$('<div></div>').html($('.project-container').html()).dialog({width : 1024, height : 570, title : 'v1024'});
		});

	};

	visualizar();
	montaPalleta();
	pluginDraggable();
	clickOpenProperty();
});