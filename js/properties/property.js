inject.define("properties.property", [
		"utils.dao.compDB", 
		"properties.proxy",
		"utils.legend",
		"utils.util",
	function (dao, proxy, legend, util) {
	
		var self = {};

		var accordion;

		self.buildBarraDeBotoes = function () {
			var barraBotoes = $('<div><div class="dropdown">'
								+'<span class="btn btn-success dropdown-toggle glyphicon glyphicon-refresh refreshComponent" type="button"></span>'							
								+'</div><br/></div>');
			return barraBotoes;
		}

		self.buildAccordion = function () {
			var _accordion = $('<div class="panel-group" id="accordion-property"></div>');

			var add = function (name, content) {
				if(!content)return;
				var property = $('<div class="panel panel-default"></div>');
				var hProperty = $('<div class="panel-heading"><h4 class="panel-title"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-property" href="#'+name+'"> '+name+'</a></h4></div>');
				var bProperty = $('<div id="'+name+'" class="panel-collapse collapse in"><div class="panel-body"></div></div>');
				bProperty.find('.panel-body').append(content);
				property.append(hProperty).append(bProperty);
				_accordion.append(property);
			}
			return {
				'add' : add,
				'accordion' : _accordion
			};
		};	

		self.removerComponente = function ($this, comp) {
			dao.removeCompDB($this);
			$this.remove();
			if(comp.remove)comp.remove($this, comp);					
			$( "#dialog" ).dialog( "close" );
		};

		self.dblclickProperty = function ($this) {
			var comp = dao.getCompDBById($this, legend.attrComp);
			console.debug('dblclick em componente já arrastado '+comp.___id+' !!! :: ');		

			accordion = self.buildAccordion();

			accordion.add("Config", proxy.buildProperty(comp));

			var frame = self.buildBarraDeBotoes();
			frame.append(accordion.accordion);

			$( "#dialog" ).html('');
			$( "#dialog" ).html(frame);

			var titleDialog = (comp.name || comp.property.nameService) + ' '+comp.___id;
			 $("#dialog").dialog({
			 	title : titleDialog,
                width: 600,
                height: 600,
                autoOpen: false                
            });		

			$( "#dialog" ).dialog( "open" );

			var updatePropertyPerField = function (_this, _comp) {					
				var name = $(_this).attr('name');
				var val = $(_this).val();

				if(val){
					try{
						if(typeof val == 'object' && val.length){
							var vals = [];
							for(var i in val){
								vals.push(util.eval(val[i]));
							}
							val = vals;
						}else{
							val = util.eval(val);	
						}
						
					}catch(e){
						console.debug('val '+val+' não é um obj JSON');						
					}
				}

				var sufix = name.split('.')[1];
				var prefix = name.split('.')[0];

				if(_comp.property && _comp.property[sufix] && _comp.property[sufix].val){
					_comp.property[sufix].val = val;
				}  else	{
					comp[prefix][sufix] = val;				
				}					
			};

			var updatePropertyComp = function($_this, _comp) {					
				dao.updateCompDB($_this, _comp);
				console.debug('UPDATE COMPONENT : ('+(_comp.name || _comp.property.nameService) + ' '+comp.___id+')');

				if(_comp.update && typeof _comp.update != 'function'){
					_comp.update = util.eval(_comp.update);
				}

				_comp.update($_this, _comp, function () {
					dao.updateCompDB($_this, _comp);
				});
			}

			var btnrefresh = frame.find('.refreshComponent');

			btnrefresh.on('click', function () {
				var allComponents = frame.find('td > input, td > select');
				allComponents.each(function (i, c) {
					updatePropertyPerField(c, comp);
				});
				updatePropertyComp($this, comp)
			});
		};

		return self;
	}]);

