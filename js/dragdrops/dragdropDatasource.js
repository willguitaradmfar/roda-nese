inject.define("dragdrops.dragdropDatasource", [
        "utils.dao.compDB",
        "utils.legend",
        "dragdrops.dragdrop",
    function (dao, legend, dragdrop) {
        var self = {};

        self.dragdrop = function() {

           var cbDropDataSource = function (event, ui) {
            var $this = $(ui.draggable);
            var attr = ($this.attr(legend.attrComp) ? legend.attrComp : legend.attrPalleta);
            var comp = dao.getCompDBById($this, attr);
            comp.location = legend.attrComp;
            dao.updateCompDB($this, comp);
          };
          
          dragdrop.registerEvent($('#datasource'), $('#palleta [data-capsule-datasource]'), cbDropDataSource);

        };
        return self;
    }]);
