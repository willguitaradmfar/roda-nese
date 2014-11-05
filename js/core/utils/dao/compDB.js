inject.define("core.utils.dao.compDB", [
		"core.utils.util", 
		"core.utils.dao.db", 
		"core.utils.legend", 
	function (util, db, legend) {
	    var self = {};
	    self.bkpDB = function () {
	    	var dbList = db.bkp();
	    	var _bkp = [];
	    	
	    	for(var i in dbList){
	    		var comp = dbList[i];
	    		if(comp.location != legend.attrPalleta){	    			
	    			_bkp.push(comp);
	    		}	    		
	    	}
			return _bkp;
		};

		self.restoreBkpDB = function (__db) {
			for(var i in __db){
				var comp = __db[i];
				if(comp && comp.update){
					comp.update = eval('('+comp.update+')');
				}
			}			
			return db.restoreBkp(__db);
		};


		self.updateCompDB = function ($this, comp, field) {
			var _field = field || legend.attrComp;
			
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
			var _field = field || legend.attrComp;

			var id = $($this).attr(_field);		
			var r = db.remove(id);
			if(r == 1){
				console.debug('COMPONENTE ('+id+') REMOVIDO DA BASE DE DADOS attr('+_field+')');
			}else{
				console.error('O COMPONENTE '+id+' NÃO PODE SER REMOVIDO OU NÃO FOI ENCONTRADO attr('+_field+')');
			}
		};

		self.getCompDBById = function ($this, field) {
			var _field = field || legend.attrComp;

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