inject.define("properties.types.metaarrays", ["metadatas.metadata", function (metadata) {
    var self = {}; 

	self.make = function (comp, field, property, td) {

		var name = 'property.'+field;		

		var select = $('<select name="'+name+'" class="form-control input-sm"></select>');		
		
		select.append('<option value="" selected>Selecione ...</option>');

		metadata.find({}, function(meta){

				for(var ii in meta.actions){
					var action = meta.actions[ii];
					var result = action.result;						
					var type = result.type; 
					var model = result.model;

					if(type != 'array') continue;

					var key = model+'List';
					var value = meta.resource + ' -> '+model.replace(/:/g, '')+'List ['+type+']';							

					if(typeof property == 'object' 
						&& property.length
						&& property.indexOf(key) >= 0){
						select.append('<option value="'+key+'" selected>'+value+'</option>');
					}else if(key == property){
						select.append('<option value="'+key+'" selected>'+value+'</option>');
					}else{
						select.append('<option value="'+key+'">'+value+'</option>');
					}							
				}
			});			

		td.append(select);
		select.chosen({width:"100%"});
	};	

	return self;
}]);