var desenhador = desenhador || {};

(function(desenhador) {
	desenhador.util = desenhador.util || {};

	/*
	desenhador.util.updateCompSerializable = function ($this, comp) {

		var hand = function(key, value) {
			if (typeof value === 'function') {
				return value.toString();
			} else {
				return value;
			}
		};

		var stringify = JSON.stringify(comp, hand);
		$this.attr('comp', stringify);
	};*/

	desenhador.util.updateCompDB = function ($this, comp, field) {
		var _field = field || 'data-comp-id';

		var id = $($this).attr(_field);
		if(id) {
			desenhador.db.update(id, comp);
			return id;
		}else{
			id = desenhador.db.insert(comp).___id;
			$($this).attr(_field, id);
			return id;
		}		
	};

	desenhador.util.removeCompDB = function ($this, field) {
		var _field = field || 'data-comp-id';

		var id = $($this).attr(_field);		
		var r = desenhador.db.remove(id);
		if(r == 1){
			console.debug('COMPONENTE REMOVIDO DA BASE DE DADOS');
		}else{
			console.error('O COMPONENTE '+id+' NÃO PODE SER REMOVIDO OU NÃO FOI ENCONTRADO');
		}
	};

	desenhador.util.getCompDBById = function ($this, field) {

		var _field = field || 'data-comp-id';

		var id = $($this).attr(_field);
		if(id) {
			return desenhador.db.find(id);
		}	
	};

	desenhador.util.eval = function (script) {
		return eval('('+script+')');
	};

	/*
	desenhador.util.removeAttrComp = function (contentTmp) {
		return contentTmp
			.find('[comp]')
			.each(function(i, c){
				$(c).removeAttr('comp')
			});
			//TODO : CORRIGIR POIS ESTA EXCLUINDO O comp DO PROJETO TODO, É SÓ PRA EXCLUIR DO VISUALIZAR
			return contentTmp;
	};*/

	desenhador.util.dynamicMetadata = function (_obj) {
		this.metadata = {};
		this.models = {};
		this.arrays = {};

		this.nav = function (obj, parent) {
			for(var i in obj){
				var o = obj[i];
				var otype = (typeof o);

				if(!o)return;

				if(otype === 'object'){
					this.nav(o, parent+'.'+i);
					otype = (o.length ? 'array' : otype);
				}

				var path = (parent+'.'+i);
				path = path.replace(/\.\d+/g, '');
				this.metadata[path] = otype;
			}
		};

		this.nav(_obj, 'root');

		for(var i in this.metadata){
			var otype = this.metadata[i];
			var path = i;
			if(otype == 'object'){
				var _parts = path.split('.');
				this.models[_parts[_parts.length-1]] = '';
			}
			if(otype == 'array'){
				var _parts = path.split('.');
				this.arrays[_parts[_parts.length-1]] = '';
			}
		}

		for(var y in this.models){
			var model = this.models[y];
			this.models[y] = {};
			this.models[y].before = {};
			this.models[y].after = {};
			for(var i in this.metadata){
				var otype = this.metadata[i];
				var path = i;
				if(otype != 'object' && otype != 'array'){
					if(path.indexOf(y+'.') > 0){
						var _parts = path.split(y+'.');
						var before = _parts[0].replace('root\.', '');						
						this.models[y].before[before] = '';
						this.models[y].after[_parts[1]] = otype;
					}
				}
			}
		}

		for(var y in this.arrays){
			var array = this.arrays[y];
			this.arrays[y] = {};
			this.arrays[y].before = {};
			this.arrays[y].after = {};
			for(var i in this.metadata){
				var otype = this.metadata[i];
				var path = i;
				if(otype != 'object' && otype != 'array'){
					if(path.indexOf(y+'.') > 0){
						var _parts = path.split(y+'.');
						var before = _parts[0].replace('root\.', '');						
						this.arrays[y].before[before] = '';
						this.arrays[y].after[_parts[1]] = otype;
					}
				}
			}
		}

	};

	desenhador.util.processTemplate = function (keys, values, template) {
		if(!template) throw 'Template indefinido';		
		var result = template.toString();
		for(var i in keys){
			var key = keys[i];
			var regex = new RegExp('\\$'+key+'\\$', "ig");
			result = result.replace(regex, values[i]);
		}
		return result;
	};

	desenhador.util.rest = function (config) {

		var url = config.url || 'http://httpbin.org/get'
		var data = config.data || {};
		var dataType = config.dataType;
		var method = config.method;

		var _success = config.success || function (res) {
			console.warn('FUNCTION success NÃO IMPLEMENTADA res: ('+JSON.stringify(res)+')');
		};

		var _error = config.error || function (res) {
			console.warn('FUNCTION error NÃO IMPLEMENTADA res: ('+JSON.stringify(res)+')');
		};

		$.ajax({
			url: url,
			jsonp: "callback",
			dataType: dataType,
			method : method,
			data: data,
			success: function( res ) {
				console.debug('SUCESSO NA CONSULTA PARA CRIAR METADATA');				
				_success(res);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.error('ERRO NA CONSULTA PARA CRIAR METADATA');
				var e = {};
				e.jqXHR = jqXHR;
				e.textStatus = textStatus;
				e.errorThrown = errorThrown;
				_error(e);
			}
		});
	};
})(desenhador);