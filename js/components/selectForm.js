var templates = templates || {};

templates.selectForm = (function () {

	var templ = '<div class="input-group">'
					+'<label>Select</label>'
					+'<select name="selectbasic" class="form-control">'
				      +'<option>Option 1</option>'				      
				      +'<option>Option 2</option>'
				      +'<option>Option 3</option>'
				    +'</select>'
				+'</div>';

	var property = {};
	property.label = 'Select';
	property.options = 'Option 1,Option 2,Option 3';

	var update = function (target, comp) {
		console.debug('UPDATE COMPONENT :'+comp.name);		
		$(target).attr('class', 'input-group component');
		$(target).find('label').text(comp.property.label);
		$(target).find('select').html('');
		var options = comp.property.options.split(',');
		for(var i in options){
			$(target).find('select').append('<option value="'+options[i]+'">'+options[i]+'</option>');
		}
	};

	return {
		'templ' : templ,
		'name' : 'selectForm',
		'property' : property,
		'update' : update,
		'category' : 'input'
	};
})();