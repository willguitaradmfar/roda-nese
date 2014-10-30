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

			accordion.add("Config", proxy.buildProperty(comp, $this));

			var frame = self.buildBarraDeBotoes();
			frame.append(accordion.accordion);

			$( "#dialog" ).html('');
			$( "#dialog" ).html(frame);

			var titleDialog = (comp.name || comp.property.nameService.val) + ' '+comp.___id;
			 $("#dialog").dialog({
			 	title : titleDialog,
                width: 600,
                height: 600,
                autoOpen: false                
            });		

			$( "#dialog" ).dialog( "open" );			
		};

		return self;
	}]);

