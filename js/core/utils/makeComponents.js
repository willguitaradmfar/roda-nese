inject.define("core.utils.makeComponents", [function () {
    var self = {};

    self.makeAccordion = function (target) {
    	var _this = {};
    	target = $(target);

    	var id = 'accordion-comp';

    	var accordion = $('<div class="panel-group" id="'+id+'"></div>');		 
		target.append(accordion);

		 _this.add = function (name, category, content) {
		 	var head = target.find('[data-category="'+category+'"]');
		 	if(head.length == 0){
		 		head = $('<div class="panel panel-default" data-category="'+category+'"></div>');
		 		head.append($('<div class="panel-heading">'
							      +'<h4 class="panel-title">'
							        +'<a class="accordion-toggle glyphicon glyphicon-th" data-toggle="collapse" data-parent="#'+id+'" href="#'+name+'-body"> '+category+'</a>'
							      +'</h4>'
							    +'</div>'));

		 		head.append($('<div id="'+name+'-body" class="panel-collapse collapse">'
							      +'<div class="panel-body">'
							      +'</div>'
							    +'</div>'));
		 		
		 		accordion.append(head);
		 	}
		 	head.find('.panel-body').append(content);
		};
		return _this;
    };
    
    return self;
}]);