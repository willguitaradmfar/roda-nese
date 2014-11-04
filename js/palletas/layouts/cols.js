inject.define("palletas.layouts.cols", [function () {
    var self = {};
    self.name = 'cols';
	self.category = 'layout';

	
	self.templ = '<div class="col-md-6 col-xs-12 col-lg-4 col-sm-12"></div>';

	self.property = {};	

	self.drag = function (target, comp) {
		
	}
    return self;
}]);