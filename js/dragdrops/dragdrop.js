inject.define("dragdrops.dragdrop", [
        "utils.dao.compDB",
        "utils.legend",
    function (dao, legend) {
        var self = {};

        self.dragdrop = function() {

            $('#project.body-component, #project .body-component').sortable({
              revert: true
            });

            $('.capsule').draggable({
              connectToSortable: "#project .body-component, #project.body-component",
              helper: "clone",
              revert: "invalid"
            });

             $('#project .body-component, #project.body-component').droppable({                
                tolerance: 'touch',
                drop: function (event, ui) {
                    var $this = $(ui.draggable);                  
                    var attr = ($this.attr(legend.attrComp) ? legend.attrComp : legend.attrPalleta);
                    var comp = dao.getCompDBById($this, attr);
                    comp.location = legend.attrComp;
                    dao.updateCompDB($this, comp);
                  }
            });
        };

        return self;
    }]);
