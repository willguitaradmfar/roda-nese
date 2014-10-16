inject.define("palletas.layouts.cols", [function () {
    var self = {};
    self.name = 'cols';
	self.category = 'layout';

	self.templ = '<div class="col-lg-6 col-xs-12 col-sm-12 col-md-6"></div>';				 

	self.property = {};
	self.property.txt_bigDesktops = '6';
	self.property.txt_phones = '12';
	self.property.txt_tablets = '12';
	self.property.txt_desktops = '6';

	self.update = function (target, comp) {
		var _class = [];
		_class.push('des-layout');
		if(comp.property.txt_bigDesktops){
			_class.push('col-lg-'+comp.property.txt_bigDesktops);
		}
		if(comp.property.txt_phones){
			_class.push('col-xs-'+comp.property.txt_phones);
		}
		if(comp.property.txt_tablets){
			_class.push('col-sm-'+comp.property.txt_tablets);
		}
		if(comp.property.txt_desktops){
			_class.push('col-md-'+comp.property.txt_desktops);
		}
		$(target).attr('class', _class.join(' '));		
	};

	self.drag = function (target, comp) {
		
	}
    return self;
}]);