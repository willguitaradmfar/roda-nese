var desenhador = desenhador || {};

(function(desenhador) {
	desenhador.dragdrop = desenhador.dragdrop || {};

	desenhador.dragdrop = function () {

		$( ".project-container" ).sortable({revert: true});

		$( ".datasource-container" ).sortable({revert: true});

		$('.component')
			.not('.nonvisual')
			.on('click', function () {			
				var $this = $(this).clone();
				$('.project-container').append($this);

				var comp = JSON.parse($this.attr('comp'));
				comp.update = desenhador.util.eval(comp.update);
				
				console.debug('CHAMANDO FUNCTION update() ....');
				comp.update($this, comp);
				desenhador.util.updateCompSerializable($this, comp);				
		});


		$('.nonvisual').on('click', function () {			
			var $this = $(this).clone();

			$('.datasource-container').append($this);
			$('.datasource-container').addClass('datasource-container-evident', 300);
			$('.datasource-container').removeClass('datasource-container-evident', 1000);		        	

			var comp = JSON.parse($this.attr('comp'));
			comp.update = desenhador.util.eval(comp.update);
			
			console.debug('CHAMANDO FUNCTION update() ....');
			comp.update($this, comp);
			desenhador.util.updateCompSerializable($this, comp);
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
			  },
			  close: function( event, ui ) {
			  	console.debug('ATUALIZANDO CONTROLLER OBJECT ....');
				desenhador.controller.makeController();	
			  }
	    });
	};
	
})(desenhador);