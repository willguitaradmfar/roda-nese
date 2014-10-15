inject.define("dragdrops.dragdrop", ["utils.dao.component", function (dao) {
    var self = {};    

    var sortable = function(targets) {
        for (var i in targets) {
            var target = targets[i];
            $(target).sortable({
                
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

    var droppable = function(targets, drop) {
        for (var i in targets) {
            var target = targets[i];
            $(target).droppable({
                hoverClass : 'des-hover',
                tolerance: 'touch',
                drop: drop
            });
        }
    };

    var dropComponent = function(event, ui) {
        var $this = $(ui.draggable);
        if (!$this.hasClass('component')) {
            console.debug('COMPONENTE NÃO POSSUI A CLASS component [return]');
            return;
        }

        var attr = ($this.attr('data-comp-id') ? 'data-comp-id' : 'data-palleta-id');
        var comp = dao.getCompDBById($this, attr);
        if (comp.drag) {
            console.debug('CHAMANDO FUNCTION drag() ....');
            comp.drag($this, comp);
        }
        dao.updateCompDB($this, comp);
    };

    var dropComponentNonvisual = function(event, ui) {
        var $this = $(ui.draggable);
        if (!$this.hasClass('nonvisual')) {
            console.debug('COMPONENTE NÃO POSSUI A CLASS nonvisual [return]');
            return;
        }

        var attr = ($this.attr('data-comp-id') ? 'data-comp-id' : 'data-palleta-id');
        var comp = dao.getCompDBById($this, attr);
        if (comp.drag) {
            console.debug('CHAMANDO FUNCTION drag() ....');
            comp.drag($this, comp);
        }
        dao.updateCompDB($this, comp);
    };

    var dropComponentProjectLayout = function(event, ui) {
        var $this = $(ui.draggable);
        if (!$this.hasClass('des-layout')) {
            console.debug('COMPONENTE NÃO POSSUI A CLASS des-layout [return]');
            return;
        }

        var attr = ($this.attr('data-comp-id') ? 'data-comp-id' : 'data-palleta-id');
        var comp = dao.getCompDBById($this, attr);

        if (comp.drag) {
            console.debug('CHAMANDO FUNCTION drag() ....');
            comp.drag($this, comp);
        }

        dao.updateCompDB($this, comp);

        sortable(['.des-container', '.des-datasource', '.des-layout']);

        draggable($('#palleta .component'), ['#project .des-layout']);

        droppable(['.des-layout'], dropComponent);
    };



    self.dragdrop = function() {
        sortable(['.des-container', '.des-datasource', '.des-layout']);
        draggable($('#palleta .des-layout'), ['#project.des-container']);
        droppable(['.des-container'], dropComponentProjectLayout);

        draggable($('.nonvisual'), ['.des-datasource']);        
        droppable(['.des-datasource'], dropComponentNonvisual);

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

    return self;
}]);