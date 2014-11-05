inject.define("core.properties.types.combo", [function () {
    var self = {}; 

	self.make = function (comp, field, property, td, $this) {

		if(!property || !property.config || !property.config.options) throw 'NAO PODE SER COMBO POIS NAO EXISTE A PROPRIEDADE options';

		var isMultipleSelect = field.substring(0,5) == 'mult_';
		var name = 'property.'+field;
		
		var select = $('<select '+(isMultipleSelect ? 'multiple' : '')+' name="'+name+'" class="form-control input-sm"></select>');				

		var options = property.config.options

		for(var ii in options){
			var option = options[ii];
			var key = option;
			var value = option;

			if(key == property.val){
				select.append('<option value="'+key+'" selected>'+value+'</option>');
			}else{
				select.append('<option value="'+key+'">'+value+'</option>');
			}
		}
		td.append(select);
		select.selectize({
			onChange : function (val) {
				comp.property[field].val = val;
				
				if(property.update)
					property.update($this, val, comp);
			}
		});
	};	

	return self;
}]);