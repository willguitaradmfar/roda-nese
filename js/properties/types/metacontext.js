inject.define("properties.types.metacontext", [
		"utils.dao.compDB",
		"utils.legend",
	function (dao, legend) {
	    var self = {}; 

		self.make = function (comp, field, property, td) {

			var name = 'property.'+field;

			var select = $('<select name="'+name+'" class="form-control input-sm"></select>');

			select.append('<option value="" selected>Selecione ...</option>');

			var comps = $('.des-datasource').find('.nonvisual');		

			for(var y = 0 ; y < comps.length ; y++){
				var comp = dao.getCompDBById($(comps[y]), legend.attrComp);

				if(!comp)continue;
				
				if(!comp.property || !comp.property.context){
					console.error('DATASOURCE SEM PROPERTY CONTEXT');					
					continue;
				}

				var key = comp.property.context;
				var value = comp.property.context;

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

			td.append(select);
			select.chosen({width:"100%"});
			
		};	

		return self;
	}]);