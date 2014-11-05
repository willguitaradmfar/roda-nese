inject.define("core.dragdrops.dragdropDatasource", [
        "core.utils.dao.compDB",
        "core.utils.legend",
        "core.dragdrops.dragdrop",
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
          
          dragdrop.registerEvent(
            $('#datasource[data-body-datasource]'), 
            $('#palleta [data-body-component-datasource]'), 
            cbDropDataSource);         

        };
        return self;
    }]);
