inject.define("utils.dynamicMetadata", [function () {
    var self = {};
    self.dynamicMetadata = function (_obj) {
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
    return self;
}]);