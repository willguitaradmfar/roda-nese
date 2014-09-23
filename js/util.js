var desenhador = desenhador || {};

(function(desenhador) {
	desenhador.util = desenhador.util || {};

	desenhador.util.updateCompSerializable = function ($this, comp) {
		$this.attr('comp', JSON.stringify(comp, function(key, value) {
			if (typeof value === 'function') {
				return value.toString();
			} else {
				return value;
			}
		}));
	};

	desenhador.util.eval = function (script) {
		return eval('('+script+')');
	};

	desenhador.util.processTemplate = function (keys, values, template) {
		var result = template;
		for(var i in keys){
			var key = keys[i];
			var regex = new RegExp('\\$'+key+'\\$', "ig");
			result = result.replace(regex, values[i]);
		}
		return result;
	};
	
	console.log(desenhador);

})(desenhador);