inject.define("dragdrops.dragdropLayout", [
        "utils.dao.compDB",
        "utils.legend",
        "dragdrops.dragdrop",
        "properties.propertyClickRight",
    function (dao, legend, dragdrop, propertyClickRight) {
        var self = {};

        self.dragdrop = function() {   

          var cbDrop = function (event, ui) {
            var $this = $(ui.draggable);
            var attr = ($this.attr(legend.attrComp) ? legend.attrComp : legend.attrPalleta);
            var comp = dao.getCompDBById($this, attr);
            if(!comp){
                console.warn('OBJ COMP NÃO ENCONTRADO');
                return;
            }
            comp.location = legend.attrComp;
            dao.updateCompDB($this, comp);
            
            dragdrop.registerEvent(
                $('#project[data-body-project] [data-body-component-layout]'), 
                $('#palleta [data-body-component]'), 
                cbDrop);

          };           

          dragdrop.registerEvent(
            $('#project[data-body-project]'), 
            $('#palleta [data-body-component-layout]'), 
            cbDrop);

        };
        return self;
    }]);
