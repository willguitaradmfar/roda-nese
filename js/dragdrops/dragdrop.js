inject.define("dragdrops.dragdrop", [
        "core.utils.dao.compDB",
        "core.utils.legend",
    function (dao, legend) {
        var self = {};        

        self.registerEvent = function (sortable, draggable, cb) {
          $(sortable).sortable({
              connectWith : sortable,
              revert: false
            });

            $(draggable).draggable({
              connectToSortable: sortable,
              helper: "clone",
              revert: "invalid"
            });

             $(sortable).droppable({                
                tolerance: 'touch',
                drop: cb
              });
        };

        return self;
    }]);
