inject.define("utils.dao.component", ["utils.util", "database.db", function (util, db) {
    var self = {};
    self.bkpDB = function () {
		return db.bkp();
	};

	self.restoreBkpDB = function (__db) {
		return db.restoreBkp(__db);
	};


	self.updateCompDB = function ($this, comp, field) {
		var _field = field || 'data-comp-id';
		
		var id = $($this).attr(_field);		
		
		if(id) {
			console.debug('ATUALIZANDO COMPONENTE ('+id+') attr('+_field+')');
			db.update(id, comp);
			return id;
		}else{			
			id = db.insert(util.clone(comp)).___id;
			console.debug('CRIANDO COMPONENTE ('+comp.name+') ('+id+') attr('+_field+')');
			$($this).attr(_field, id);
			return id;
		}		
	};

	self.removeCompDB = function ($this, field) {
		var _field = field || 'data-comp-id';

		var id = $($this).attr(_field);		
		var r = db.remove(id);
		if(r == 1){
			console.debug('COMPONENTE ('+id+') REMOVIDO DA BASE DE DADOS attr('+_field+')');
		}else{
			console.error('O COMPONENTE '+id+' NÃO PODE SER REMOVIDO OU NÃO FOI ENCONTRADO attr('+_field+')');
		}
	};

	self.getCompDBById = function ($this, field) {
		var _field = field || 'data-comp-id';

		var id = $($this).attr(_field);
		if(id) {
			var result = db.findOneById(id);
			if(!result){
				throw 'COMPONENTE ('+id+') NÃO ENCONTRADO NA MASE DE DADOS attr('+_field+')';
			}
			console.debug('COMPONENTE ('+result.___id+') ENCONTRADO COM ARGUMENTO ID '+id+' attr('+_field+')');
			return result;
		}	
	};
    return self;
}]);