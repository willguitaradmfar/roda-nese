(function (global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.layouts = global.desenhador.layouts || {};
	global.desenhador.layouts.tab = global.desenhador.layouts.tab || {};
	var self = global.desenhador.layouts.tab;

	self.name = 'tab';
	self.category = 'layout';

	self.templ = '<div class="tabbable" style="margin-bottom: 9px;">'
			        +'<ul class="nav nav-tabs">'
			          +'<li class="active"><a href="#1" data-toggle="tab">Tab1</a></li>'
			          +'<li><a href="#2" data-toggle="tab">Tab2</a></li>'			          
			        +'</ul>'
			        +'<div class="tab-content">'
			          +'<div class="tab-pane active" id="1">'
			            +'<p>Body Tab1</p>'
			          +'</div>'
			          +'<div class="tab-pane" id="2">'
			            +'<p>Body Tab2</p>'
			          +'</div>'			          
			        +'</div>'
			      +'</div>';

	self.property = {};	
	self.property.context = 'context';

	self.binds = {};
	self.binds.field = 'model';

	self.update = function (target, comp) {		
		
	};
})(window);