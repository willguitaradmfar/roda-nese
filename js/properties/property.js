inject.define("properties.property", [
		"utils.dao.compDB", 
		"properties.proxy",		
		"utils.legend",
		"utils.util",
	function (dao, proxy, legend, util) {
	
		var self = {};
		var tabs;

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

		self.buildTab = function () {
			var _tab = $('<div class="panel-group" id="tab-property"><ul class="nav nav-tabs" role="tablist"></ul><div class="tab-content"></div></div>');

			var isFirst = false;

			var add = function (name, content) {
				if(!content)return;

				var id = 'id-tab-'+name;
				
				var hProperty = $('<li role="presentation" class="'+(!isFirst ? 'active' : '')+'"><a href="#'+id+'" role="tab" data-toggle="tab">'+name+'</a></li>');
				var bProperty = $('<div role="tabpanel" class="tab-pane '+(!isFirst ? 'active' : '')+'" id="'+id+'"></div>');
				bProperty.append(content)
							
				_tab.find('ul').append(hProperty);
				_tab.find('.tab-content').append(bProperty);
				isFirst = true;
			}

			return {
				'add' : add,
				'tab' : _tab
			};
		};	

		self.removerComponente = function ($this, comp) {
			dao.removeCompDB($this);
			$this.remove();
			if(comp.remove)comp.remove($this, comp);
		};

		self.dblclickProperty = function ($this, comp) {

			console.debug('dblclick em componente já arrastado '+comp.___id+' !!! :: ');

			tabs = self.buildTab();

			var proxyResponse = proxy.buildProperty(comp, $this);
			for(var i in proxyResponse){
				tabs.add(i, $(proxyResponse[i]));
			}		
			

			var frame = self.buildBarraDeBotoes();
			frame.append(tabs.tab);

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

