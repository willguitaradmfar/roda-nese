inject.define("properties.types.combo", [function () {
    var self = {}; 

	self.make = function (comp, field, property, td) {

		if(!property || !property.options) throw 'NAO PODE SER COMBO POIS NAO EXISTE A PROPRIEDADE options';

		var isMultipleSelect = field.substring(0,5) == 'mult_';
		var name = 'property.'+field;
		
		var select = $('<select '+(isMultipleSelect ? 'multiple' : '')+' name="'+name+'" class="form-control input-sm"></select>');				

		for(var ii in property.options){
			var option = property.options[ii];
			var key = option.value || option;
			var value = option.label || option;

			if(typeof property == 'object' 
				&& property.length
				&& property.indexOf(key) >= 0){
				select.append('<option value="'+key+'" selected>'+value+'</option>');
			}else if(key == property.val){
				select.append('<option value="'+key+'" selected>'+value+'</option>');
			}else{
				select.append('<option value="'+key+'">'+value+'</option>');
			}
		}
		td.append(select);
		select.chosen({width:"100%"});		
	};	

	return self;
}]);