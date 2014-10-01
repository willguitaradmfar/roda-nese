var desenhador = desenhador || {};

(function(desenhador) {
	desenhador.dragdrop = desenhador.dragdrop || {};

  var sortable = function (target) {
    $( target ).sortable({      
      revert: true
    });
  };

  var draggable = function (target, source) {
      $(source).draggable({
        connectToSortable: target,
        cursor: "move",
        helper: "clone",
        revert: "invalid",
        scroll: true,
        start: function(event, ui) {
          console.debug('start draggable '+$(this));
        }, drag: function(event, ui) {

        }, stop: function(event, ui) {
          console.debug('stop draggable'+$(this));
        }
      });
  };

 var overComponent = function (event, ui) {
        var $this = $(ui.draggable);
        if(!$this.hasClass('component')){
          console.debug('COMPONENTE NÃO POSSUI A CLASS component [return]');
          return;
        }

        var attr = ($this.attr('data-comp-id') ? 'data-comp-id' : 'data-palleta-id');
        var comp = desenhador.util.getCompDBById($this, attr);        
        if(comp.drag){
          console.debug('CHAMANDO FUNCTION drag() ....');
          comp.drag($this, comp);
        }
        desenhador.util.updateCompDB($this, comp);
  };

  var overComponentNonvisual = function (event, ui) {
      var $this = $(ui.draggable);
      if(!$this.hasClass('nonvisual')){
        console.debug('COMPONENTE NÃO POSSUI A CLASS nonvisual [return]');
        return;
      }

      var attr = ($this.attr('data-comp-id') ? 'data-comp-id' : 'data-palleta-id');
      var comp = desenhador.util.getCompDBById($this, attr);
      if(comp.drag){
        console.debug('CHAMANDO FUNCTION drag() ....');
        comp.drag($this, comp);
      }

      desenhador.util.updateCompDB($this, comp);
  };

  var overComponentProjectLayout = function (event, ui) {
      var $this = $(ui.draggable);
      if(!$this.hasClass('project-layout')){
        console.debug('COMPONENTE NÃO POSSUI A CLASS project-layout [return]');
        return;
      }

      var attr = ($this.attr('data-comp-id') ? 'data-comp-id' : 'data-palleta-id');
      var comp = desenhador.util.getCompDBById($this, attr);      

      if(comp.drag){
        console.debug('CHAMANDO FUNCTION drag() ....');
        comp.drag($this, comp);
      }

      desenhador.util.updateCompDB($this, comp);

      sortable($this);
      draggable($this, $('.component'));
      droppable($this, overComponent);
  };

  var droppable = function (target, over) {
      $(target).droppable({  
        tolerance: 'pointer',
        over : over
      });
  };

	desenhador.dragdrop = function () {

    sortable($('.project-container'));    
    sortable($('.datasource-container'));
    draggable($('.project-layout'), $('.component'));
    draggable($('.project-container'), $('.project-layout'));
    draggable($('.datasource-container'), $('.nonvisual'));
    droppable($('.project-container'), overComponentProjectLayout);
    droppable($('.datasource-container'), overComponentNonvisual);

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