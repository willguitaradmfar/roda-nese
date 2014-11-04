inject.define("dragdrops.dragdrop", [
        "utils.dao.compDB",
        "utils.legend",
    function (dao, legend) {
        var self = {};        

        self.registerEvent = function (sortable, draggable, cb) {
          $(sortable).sortable({
              connectWith : sortable,
              revert: true
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
