inject.define("properties.property", ["utils.util", "properties.proxy", function (util, proxy) {
	
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
		util.removeCompDB($this);
		$this.remove();
		if(comp.remove)comp.remove($this, comp);					
		$( "#dialog" ).dialog( "close" );
	};

	self.dblclickProperty = function ($this) {
		var comp = util.getCompDBById($this, 'data-comp-id');
		console.debug('dblclick em componente já arrastado '+comp.___id+' !!! :: ');		

		accordion = self.buildAccordion();

		accordion.add("Config", proxy.buildProperty(comp));		

		var frame = self.buildBarraDeBotoes();
		frame.append(accordion.accordion);

		$( "#dialog" ).html('');
		$( "#dialog" ).html(frame);

		var titleDialog = (comp.name || comp.property.nameService) + ' '+comp.___id;
		$( "#dialog" ).dialog({title : titleDialog});		
		$( "#dialog" ).dialog( "open" );

		var updatePropertyPerField = function (_this, _comp) {					
			var name = $(_this).attr('name');
			var val = $(_this).val();

			var sufix = name.split('.')[1];
			var prefix = name.split('.')[0];					

			if(_comp.property && _comp.property[sufix] && _comp.property[sufix].val){
				_comp.property[sufix].val = val;
			}  else	{
				comp[prefix][sufix] = val;				
			}					
		};

		var updatePropertyComp = function($_this, _comp) {					
			util.updateCompDB($_this, _comp);
			console.debug('UPDATE COMPONENT : ('+(_comp.name || _comp.property.nameService) + ' '+comp.___id+')');
			_comp.update($_this, _comp, function () {
				util.updateCompDB($_this, _comp);
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

