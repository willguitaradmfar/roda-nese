(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.layouts = global.desenhador.layouts || {};
	global.desenhador.layouts.cols = global.desenhador.layouts.cols || {};
	var self = global.desenhador.layouts.cols;

	self.name = 'cols';
	self.category = 'layout';

	self.templ = '<div class="col-lg-6 col-xs-12 col-sm-12 col-md-6">layout</div>';				 

	self.property = {};		
	self.property.context = 'context';
	self.property.bigDesktops = '6';
	self.property.phones = '12';
	self.property.tablets = '12';
	self.property.desktops = '6';

	self.update = function (target, comp) {	

		var _class = [];
		_class.push('des-layout');
		if(comp.property.bigDesktops){
			_class.push('col-lg-'+comp.property.bigDesktops);
		}
		if(comp.property.phones){
			_class.push('col-xs-'+comp.property.phones);
		}
		if(comp.property.tablets){
			_class.push('col-sm-'+comp.property.tablets);
		}
		if(comp.property.desktops){
			_class.push('col-md-'+comp.property.desktops);
		}
		$(target).attr('class', _class.join(' '));
	};

	self.drag = function (target, comp) {
		
	}

})(window);