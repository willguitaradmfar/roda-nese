inject.define("palletas.components.buttonForm", [function () {
    var self = {};
    self.name = 'buttonForm';
	self.category = 'input';

	self.templ = '<span type="button" class="btn btn-default" data-toggle="dropdown">Button</span>'
				;

	self.property = {};

	self.property.label = {
		category : 'basic',
		val : 'Button',
		update : function (target, val, comp) {
			$(target).text(' '+val);
		}
	};

	self.property.combo_type = {
		config : {
			options : ['default', 'info', 'danger', 'success', 'warning']
		},
		val : 'default',
		update : function (target, val, comp) {
			var _class = [];
			_class.push('component');
			_class.push('btn');
			_class.push('btn-'+val);
			_class.push('glyphicon');
			_class.push('glyphicon-'+comp.property.combo_icon.val);
			$(target).attr('class', _class.join(' '));
		}
	};	

	self.property.combo_icon = {
		config : {
			options : ['Sem', 'asterisk', 'plus', 'euro', 'minus', 'cloud', 'envelope', 'pencil', 'glass', 'music', 'search', 'heart', 'star', 'empty', 'user', 'film', 'large', 'th', 'list', 'ok', 'remove', 'in', 'out', 'off', 'signal', 'cog', 'trash', 'home', 'file', 'time', 'road', 'alt', 'download', 'upload', 'inbox', 'circle', 'repeat', 'refresh', 'alt', 'lock', 'flag', 'headphones', 'off', 'down', 'up', 'qrcode', 'barcode', 'tag', 'tags', 'book', 'bookmark', 'print', 'camera', 'font', 'bold', 'italic', 'height', 'width', 'left', 'center', 'right', 'justify', 'list', 'left', 'right', 'video', 'picture', 'marker', 'adjust', 'tint', 'edit', 'share', 'check', 'move', '3backward', 'play', 'pause', 'stop', '3forward', 'eject', 'left', 'right', '6sign', 'screenshot', '3circle', 'left', 'right', 'up', 'down', 'alt', 'full', 'small', 'sign', 'gift', 'leaf', 'fire', 'open', 'close', 'sign', 'plane', 'calendar', 'random', 'comment', 'magnet', 'up', 'down', 'retweet', 'cart', 'close', 'open', 'vertical', 'horizontal', 'hdd', 'bullhorn', 'bell', 'certificate', 'up', 'down', 'right', 'left', 'up', 'down', 'right', 'left', 'up', 'down', 'globe', 'wrench', 'tasks', 'filter', 'briefcase', 'fullscreen', 'dashboard', 'paperclip', 'empty', 'link', 'phone', 'pushpin', 'usd', 'gbp', 'sort', 'alphabet', 'alt', 'order', 'alt', 'attributes', 'alt', 'unchecked', 'expand', 'down', 'up', 'in', 'flash', 'out', 'window', 'record', 'save', 'open', 'saved', 'import', 'export', 'send', 'disk', 'saved', 'remove', 'save', 'open', 'card', 'transfer', 'cutlery', 'header', 'compressed', 'earphone', 'alt', 'tower', 'stats', '2video', 'subtitles', 'stereo', 'dolby', '31', '2mark', 'download', 'upload', 'conifer', 'deciduous']
		},
		val : 'refresh',
		update : function (target, val, comp) {
			var _class = [];
			_class.push('component');
			_class.push('btn');
			_class.push('btn-'+comp.property.combo_type.val);
			_class.push('glyphicon');
			_class.push('glyphicon-'+val);
			$(target).attr('class', _class.join(' '));
		}
	};
		
	self.property.metaactions_actionClick = {
		config : {
			types : ['action']
		},
		update : function (target, val, comp) {
			var action;

			if(val.params){
				var params = Object.keys(val.params)
							.map(function(aa){
								return val.params[aa].key
							}).join(', ');
				action = val.context+'.'+val.field+'('+params+');';			
			}else{
				action = val.context+'.'+val.field+'();';
			}

			
			$(target).attr('data-ng-click', action);
		}
	};
	
    return self;
}]);