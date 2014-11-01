inject.define("properties.propertyHover", [
		"properties.property", 
		"utils.dao.compDB",
		"utils.legend",
	function (property, dao, legend) {

		property.listenerToolsProperty = function () {

			$('#project').on('mouseenter', '.component, .des-layout', function(){
				var tools = $('.tools');

				var btn_label = tools.find('.tools-label');				

				var offset = $(this).offset();
				var top = offset.top;
				var left = offset.left;
				var id = $(this).attr(legend.attrComp);
				
				tools.attr('style', 'min-width: 100px;opacity: 0.5;z-index: 10; position: absolute; top:'+top+'; left: '+left+'; width : '+($(this).width()));
				tools.data('data-comp-id-selected', $(this));

				var comp = dao.getCompDBById($(this), legend.attrComp);
				btn_label.text(comp.name + ' ID:'+comp.___id);
			});

			$(document).on('click', '.tools-property', function () {
				var $this = $(this).parents('.tools').data('data-comp-id-selected');
				property.dblclickProperty($this);
			});

			$(document).on('click', '.tools-remove', function () {
				var $this = $(this).parents('.tools').data('data-comp-id-selected');
				var comp = dao.getCompDBById($this, legend.attrComp);
				property.removerComponente($this, comp);				
				$('.tools').attr('style', 'display:none');
			});

			$('.des-datasource').on('click', '.nonvisual', function () {
				var $this = $(this);
				property.dblclickProperty($this);
			});
		};

		return property;
	}]);