var desenhador = desenhador || {};

(function(desenhador) {
	desenhador.dragdrop = desenhador.dragdrop || {};

	desenhador.dragdrop = function () {

		$( ".project-container" ).sortable({revert: true});

		$( ".datasource-container" ).sortable({revert: true});

		$('.component')      
      .draggable({
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
       	console.debug('stop draggable'+$(this));
     	}
		});

		$('.nonvisual')      
      .draggable({
   connectToSortable: ".datasource-container",
   cursor: "move",
   helper: "clone",
   revert: "invalid",
   	start: function(event, ui) {
       	console.debug('start draggable '+$(this));
       	$('.datasource-container').addClass('datasource-container-evident', 300);
     	},
     	drag: function(event, ui) {

   },
   	stop: function(event, ui) {
       	console.debug('stop draggable'+$(this).html());
       	$('.datasource-container').removeClass('datasource-container-evident', 1000);
     	}
		});

		$('.project-container').droppable({
			over : function (event, ui) {

        var $this = $(ui.draggable);

          if(!$this.hasClass('component'))return;

          var comp = desenhador.util.getCompDBById($this, 'data-palleta-id');

          console.debug('CHAMANDO FUNCTION update() ....');
          comp.update($this, comp, function () {
              //COMPONENTES VISUAIS NÃO INVOCAM CALLBACK
          });

          desenhador.util.updateCompDB($this, comp);
				}
		});

		$('.datasource-container').droppable({
			over : function (event, ui) {
					var $this = $(ui.draggable);

          if(!$this.hasClass('nonvisual'))return;

					var comp = JSON.parse($this.attr('comp'));
          
					comp.update = desenhador.util.eval(comp.update);
					console.debug('CHAMANDO FUNCTION update() ....');
					comp.update($this, comp, function () {
						desenhador.util.updateCompSerializable($this, comp);
					});
				}
		});

    $( "#dialog" ).dialog({
      width : 500,
      height : 600,
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

})(desenhador);