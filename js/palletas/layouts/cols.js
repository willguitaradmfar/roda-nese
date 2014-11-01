inject.define("palletas.layouts.cols", [function () {
    var self = {};
    self.name = 'cols';
	self.category = 'layout';

	self.templ = '<div class="col-lg-6 col-xs-12 col-sm-12 col-md-6"></div>';				 

	self.property = {};
	
	self.property.txt_bigDesktops = {
        val : '6',
        update : function (target, val, comp) {
            var _class = [];
			_class.push('des-layout');
			if(val){
				_class.push('col-lg-'+val);
			}
			$(target).attr('class', _class.join(' '));
        }
    };

	self.property.txt_phones = {
        val : '12',
        update : function (target, val, comp) {
            var _class = [];
			_class.push('des-layout');
			if(val){
				_class.push('col-xs-'+val);
			}
			$(target).attr('class', _class.join(' '));
        }
    };

	self.property.txt_tablets = {
        val : '12',
        update : function (target, val, comp) {
            var _class = [];
			_class.push('des-layout');
			if(val){
				_class.push('col-sm-'+val);
			}
			$(target).attr('class', _class.join(' '));
        }
    };

	self.property.txt_desktops = {
        val : '6',
        update : function (target, val, comp) {
            var _class = [];
			_class.push('des-layout');
			if(val){
				_class.push('col-md-'+val);
			}
			$(target).attr('class', _class.join(' '));
        }
    };

	self.drag = function (target, comp) {
		
	}
    return self;
}]);