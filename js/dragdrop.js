(function(global) {
    global.desenhador = global.desenhador || {};   

    var sortable = function(targets) {
        for (var i in targets) {
            var target = targets[i];
            $(target).sortable({
                revert: true
            });
        }
    };

    var draggable = function(source, targets) {

        var limpaComponentePalleta = function ($this) {
          console.debug('LIMPANDO O ATRIBUTO (data-comp-id) DO COMPONENTE');          
          $($this).removeAttr('data-comp-id');
        };

        var _cb = function(target) {
            $(source).draggable({
                connectToSortable: $(target),
                cursor: "move",
                helper: "clone",
                revert: "invalid",
                scroll: true,
                start: function(event, ui) {
                    console.debug('start draggable ' + $(this));                    
                },
                drag: function(event, ui) {

                },
                stop: function(event, ui) {                  
                    console.debug('stop draggable' + $(this));                    
                    limpaComponentePalleta($(this));
                }
            });
        };

        for (var i in targets) {
            var target = targets[i];
            _cb(target);
        }
    };

    var droppable = function(targets, over) {
        for (var i in targets) {
            var target = targets[i];
            $(target).droppable({
                tolerance: 'pointer',
                over: over
            });
        }
    };

    var overComponent = function(event, ui) {
        var $this = $(ui.draggable);
        if (!$this.hasClass('component')) {
            console.debug('COMPONENTE NÃO POSSUI A CLASS component [return]');
            return;
        }

        var attr = ($this.attr('data-comp-id') ? 'data-comp-id' : 'data-palleta-id');
        var comp = desenhador.util.getCompDBById($this, attr);
        if (comp.drag) {
            console.debug('CHAMANDO FUNCTION drag() ....');
            comp.drag($this, comp);
        }
        desenhador.util.updateCompDB($this, comp);
    };

    var overComponentNonvisual = function(event, ui) {
        var $this = $(ui.draggable);
        if (!$this.hasClass('nonvisual')) {
            console.debug('COMPONENTE NÃO POSSUI A CLASS nonvisual [return]');
            return;
        }

        var attr = ($this.attr('data-comp-id') ? 'data-comp-id' : 'data-palleta-id');
        var comp = desenhador.util.getCompDBById($this, attr);
        if (comp.drag) {
            console.debug('CHAMANDO FUNCTION drag() ....');
            comp.drag($this, comp);
        }
        desenhador.util.updateCompDB($this, comp);
    };

    var overComponentProjectLayout = function(event, ui) {
        var $this = $(ui.draggable);
        if (!$this.hasClass('des-layout')) {
            console.debug('COMPONENTE NÃO POSSUI A CLASS des-layout [return]');
            return;
        }

        var attr = ($this.attr('data-comp-id') ? 'data-comp-id' : 'data-palleta-id');
        var comp = desenhador.util.getCompDBById($this, attr);

        if (comp.drag) {
            console.debug('CHAMANDO FUNCTION drag() ....');
            comp.drag($this, comp);
        }

        desenhador.util.updateCompDB($this, comp);

        sortable(['.des-container', '.des-datasource', '.des-layout']);

        draggable($('#palleta .component'), ['#project .des-layout']);

        droppable(['.des-layout'], overComponent);
    };



    global.desenhador.dragdrop = function() {
        sortable(['.des-container', '.des-datasource', '.des-layout']);
        draggable($('#palleta .des-layout'), ['#project.des-container']);
        droppable(['.des-container'], overComponentProjectLayout);

        draggable($('.nonvisual'), ['.des-datasource']);        
        droppable(['.des-datasource'], overComponentNonvisual);

        $("#dialog").dialog({
            width: 500,
            height: 600,
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

})(window);