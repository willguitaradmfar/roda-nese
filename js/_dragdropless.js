var desenhador = desenhador || {};

(function(desenhador) {
	desenhador.dragdrop = desenhador.dragdrop || {};

	desenhador.dragdrop = function () {

		$( ".des-container" ).sortable({revert: true});

		$( ".des-datasource" ).sortable({revert: true});

		$('.component')
			.not('.nonvisual')
			.on('click', function () {
				var $this = $(this).clone();
				$('.des-container').append($this);

				var comp = desenhador.util.getCompDBById($this, 'data-palleta-id');			

				console.debug('CHAMANDO FUNCTION update() ....');
				comp.update($this, comp);				
				desenhador.util.updateCompDB($this, comp);
		});


		$('.nonvisual').on('click', function () {
			var $this = $(this).clone();

			$('.des-datasource').append($this);
			$('.des-datasource').addClass('des-datasource-evident', 300);
			$('.des-datasource').removeClass('des-datasource-evident', 1000);

			var comp = desenhador.util.getCompDBById($this, 'data-palleta-id');

			console.debug('CHAMANDO FUNCTION update() ....');
			comp.update($this, comp);
			desenhador.util.updateCompDB($this, comp);
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