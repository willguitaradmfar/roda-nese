(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.layouts = global.desenhador.layouts || {};
	global.desenhador.layouts.cols = global.desenhador.layouts.cols || {};
	var self = global.desenhador.layouts.cols;

	self.name = 'cols';
	self.category = 'layout';

	self.templ = '<div class="col-xs-6 col-sm-6 col-md-6 project-layout">.col-xs-6 .col-sm-6 .col-md-6</div>';				 

	self.property = {};		
	self.property.context = 'context';
	self.property.xs = '6';
	self.property.sm = '6';
	self.property.md = '6';

	self.update = function (target, comp) {	

		var _class = [];
		_class.push('project-layout');
		if(comp.property.xs){
			_class.push('col-xs-'+comp.property.xs);
		}
		if(comp.property.sm){
			_class.push('col-sm-'+comp.property.sm);
		}
		if(comp.property.md){
			_class.push('col-md-'+comp.property.md);
		}
		$(target).attr('class', _class.join(' '));
	};

	self.drag = function (target, comp) {
		//$(target).find('.container-hiden').remove();
	}

})(window);