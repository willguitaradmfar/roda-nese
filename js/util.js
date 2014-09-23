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
	
	console.log(desenhador);

})(desenhador);