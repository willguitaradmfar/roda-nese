inject.define("core.properties.propertyBuild", [
		"core.utils.dao.compDB", 
		"core.properties.propertyBuildFields",		
		"core.utils.legend",
		"core.utils.util",
	function (dao, proxy, legend, util) {	
		var self = {};
		var tabs;		

		var buildTab = function () {
			var _tab = $('<div class="panel-group" id="tab-property"><ul class="nav nav-tabs" role="tablist"></ul><div class="tab-content"></div></div>');

			var isFirst = false;

			var add = function (name, content) {
				if(!content)return;

				var id = 'id-tab-'+name;				
				var hProperty = $('<li role="presentation" class="'+(!isFirst ? 'active' : '')+'"><a href="#'+id+'" role="tab" data-toggle="tab">'+name+'</a></li>');
				var bProperty = $('<div role="tabpanel" class="tab-pane '+(!isFirst ? 'active' : '')+'" id="'+id+'"></div>');
				bProperty.append(content);
											
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

		self.open = function ($this, comp) {
			console.debug('dblclick em componente já arrastado '+comp.___id+' !!! :: ');
			tabs = buildTab();

			var proxyResponse = proxy.buildProperty(comp, $this);
			for(var i in proxyResponse){
				tabs.add(i, $(proxyResponse[i]));
			}			

			var frame = $('<div></div>');
			frame.append(tabs.tab);

			$( "#dialog" ).html('');
			$( "#dialog" ).html(frame);

			var titleDialog = comp.name + ' ['+comp.___id+']';
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

