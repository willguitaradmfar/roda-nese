inject.define("palletas.components.separatorForm", [function () {
    var self = {};
    self.name = 'separatorForm';
	self.category = 'label';

	self.templ = '<hr/>';

	self.property = {};

	self.update = function (target, comp) {
		$(target).attr('class', 'component ');
	};
    return self;
}]);