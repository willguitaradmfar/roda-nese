inject.define("properties.propertyClickRight", [
		"properties.property", 
		"utils.dao.compDB",
		"utils.legend",
	function (property, dao, legend) {

		property.listenerToolsProperty = function () {

			var keys = {};

			keys.delete = function ($this) {				
				var comp = dao.getCompDBById($this, legend.attrComp);
				property.removerComponente($this, comp);
			}

			keys.edit = function ($this) {				
				var comp = dao.getCompDBById($this, legend.attrComp);				
				property.dblclickProperty($this, comp);
			}

			keys.log = function ($this) {				
				var comp = dao.getCompDBById($this, legend.attrComp);
				console.debug('LOG COMP', comp);
				console.debug('LOG TARGET', $this);
			}
			
		    $.contextMenu({
		        selector: '[data-comp-id]',
		        callback: function(key, options) {
		            keys[key]($(this));
		        },
		        items: {
		            "edit": {name: "Edit", icon: "edit"},
		            //"cut": {name: "Cut", icon: "cut"},
		            //"copy": {name: "Copy", icon: "copy"},
		            //"paste": {name: "Paste", icon: "paste"},
		            "delete": {name: "Delete", icon: "delete"},
		            //"sep1": "---------",
		            "log": {name: "Log", icon: "quit"}
		        }
		    });
		};

		return property;
	}]);