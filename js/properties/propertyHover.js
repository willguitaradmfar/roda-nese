inject.define("properties.propertyHover", [
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
				property.dblclickProperty($this.find('.body-component'), comp);
			}

			
		    $.contextMenu({
		        selector: '#project .capsule', 
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
		            "quit": {name: "Quit", icon: "quit"}
		        }
		    });


			$('.des-datasource').on('click', '.nonvisual', function () {
				var $this = $(this);
				property.dblclickProperty($this);
			});
		};

		return property;
	}]);