inject.define("core.properties.propertyClickRight", [
		"core.properties.propertyBuild", 
		"core.utils.dao.compDB",
		"core.utils.legend",
	function (propertyBuild, dao, legend) {

		propertyBuild.init = function () {

			var keys = {};

			keys.delete = function ($this) {				
				var comp = dao.getCompDBById($this, legend.attrComp);
				propertyBuild.removerComponente($this, comp);
			}

			keys.edit = function ($this) {				
				var comp = dao.getCompDBById($this, legend.attrComp);				
				propertyBuild.open($this, comp);
			}

			keys.log = function ($this) {				
				var comp = dao.getCompDBById($this, legend.attrComp);
				console.debug('LOG COMP', comp);
				console.debug('LOG TARGET', $this);
			}
			
		    $.contextMenu({
		    	zIndex : 2,
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

		return propertyBuild;
	}]);