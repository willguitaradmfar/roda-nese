inject.define("dragdrops.dragdrop", [
        "utils.dao.compDB",
        "utils.legend",
    function (dao, legend) {
        var self = {};    

        var sortable = function(targets) {
            for (var i in targets) {
                var target = targets[i];
                $(target).sortable({
                    connectWith: $(target),
                    opacity: .35
                });
            }
        };

        var draggable = function(source, targets, drag) {

            var limpaComponentePalleta = function ($this) {
              console.debug('LIMPANDO O ATRIBUTO (data-comp-id) DO COMPONENTE');          
              $($this).removeAttr(legend.attrComp);
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
                    drag: drag,
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

            var attr = ($this.attr(legend.attrComp) ? legend.attrComp : legend.attrPalleta);
            var comp = dao.getCompDBById($this, attr);
            comp.location = legend.attrComp;
            dao.updateCompDB($this, comp);
        };

        var dropComponentNonvisual = function(event, ui) {
            var $this = $(ui.draggable);
            if (!$this.hasClass('nonvisual')) {
                console.debug('COMPONENTE NÃO POSSUI A CLASS nonvisual [return]');
                return;
            }

            var attr = ($this.attr(legend.attrComp) ? legend.attrComp : legend.attrPalleta);
            var comp = dao.getCompDBById($this, attr);
            comp.location = legend.attrComp;
            dao.updateCompDB($this, comp);
        };

        var dropComponentProjectLayout = function(event, ui) {
            var $this = $(ui.draggable);
            if (!$this.hasClass('des-layout')) {
                console.debug('COMPONENTE NÃO POSSUI A CLASS des-layout [return]');
                return;
            }

            var attr = ($this.attr(legend.attrComp) ? legend.attrComp : legend.attrPalleta);
            var comp = dao.getCompDBById($this, attr);
            comp.location = legend.attrComp;
            dao.updateCompDB($this, comp);

            sortable(['.des-container', '.des-datasource', '.des-layout']);

            draggable($('#palleta .component'), ['#project .des-layout'],
                function(event, ui) {                   
                    //ui.helper.width(450);
                });

            droppable(['.des-layout'], dropComponent);
        };

        self.dragdrop = function() {
            sortable(['.des-container', '.des-datasource', '.des-layout']);

            draggable($('#palleta .des-layout'), ['#project.des-container'], 
                function(event, ui) {
                    //ui.helper.width(450)
                });

            droppable(['.des-container'], dropComponentProjectLayout);

            draggable($('.nonvisual'), ['.des-datasource']);

            droppable(['.des-datasource'], dropComponentNonvisual);
        };

        return self;
    }]);
