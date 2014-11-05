inject.define("core.properties.types.metaactionsConfig", [
	"core.properties.types.metafields",
	"core.properties.metadata",
	"core.utils.util",
	function (metafields, metadata, util) {
	    var self = {};

	    var templateModal = ['<div class="panel panel-default" style="width: 90%;float: right;">',
	    						'<div class="panel-heading"><b></b></div>',
						        '<div class="panel-body"></div>',
						    '</div>'].join('');
		templateModal = $(templateModal);

		self.make = function (comp, fieldProperty, property, td, $this, val) {

			$(td).find('.panel.panel-default').remove();

			var head = templateModal.find('.panel-heading > b');
			head.text('Parametros: '+val.info);

			var body = templateModal.find('.panel-body');

			body.html('');

			var metadados = metadata.findSync();

			var addParameter = function (parameter, index) {

				var paramIndex = index;

				comp.property[fieldProperty].val = comp.property[fieldProperty].val || {};
				comp.property[fieldProperty].val.params = comp.property[fieldProperty].val.params || {};

				var params = comp.property[fieldProperty].val.params;

				var a = {};
				a.config = {
					types : parameter.types
				};

				a.update = function (target, _val, comp) {
					params[paramIndex] = _val;

					if(property.update)
						property.update($this, comp.property[fieldProperty].val, comp);
				};

				metafields.make(comp, undefined, a, body, $this);

				$(td).append(templateModal);
			}
			if(val && val.metaaction && val.metaaction.parameters){
				for(var iii in val.metaaction.parameters){
					var parameter = val.metaaction.parameters[iii];
					addParameter(parameter, iii);
				}
			}
			
		};
		return self;
	}]);