(function(global) {
	global.desenhador = global.desenhador || {};
	global.desenhador.property = global.desenhador.property || {};

	var self = global.desenhador.property;	

	self.listenerToolsProperty = function () {

		$('#project').on('mouseenter', '.component, .des-layout', function(){
			var tools = $('.tools');

			var btn_label = tools.find('.tools-label');				

			var offset = $(this).offset();
			var top = offset.top;
			var left = offset.left;
			var id = $(this).attr('data-comp-id');
			
			tools.attr('style', 'opacity: 0.5;z-index: 10; position: absolute; top:'+top+'; left: '+left+'; width : '+($(this).width()));
			tools.data('data-comp-id-selected', $(this));

			var comp = desenhador.util.getCompDBById($(this), 'data-comp-id');
			btn_label.text(comp.name + ' ID:'+comp.___id);
		});

		$(document).on('click', '.tools-property', function () {
			var $this = $(this).parents('.tools').data('data-comp-id-selected');
			self.dblclickProperty($this);
		});

		$(document).on('click', '.tools-remove', function () {
			var $this = $(this).parents('.tools').data('data-comp-id-selected');
			var comp = desenhador.util.getCompDBById($this, 'data-comp-id');
			self.removerComponente($this, comp);				
			$('.tools').attr('style', 'display:none');
		});

		$('.des-datasource').on('click', '.nonvisual', function () {
			var $this = $(this);
			self.dblclickProperty($this);
		});
	};
})(window);