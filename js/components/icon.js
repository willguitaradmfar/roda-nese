var componentes = componentes || {};

componentes.icon = (function () {

	var templ = '<span class="glyphicon glyphicon-user"></span>';

	var property = {};
	property.icone = {val : 'off', options : ['asterisk', 'plus', 'euro', 'minus', 'cloud', 'envelope', 'pencil', 'glass', 'music', 'search', 'heart', 'star', 'empty', 'user', 'film', 'large', 'th', 'list', 'ok', 'remove', 'in', 'out', 'off', 'signal', 'cog', 'trash', 'home', 'file', 'time', 'road', 'alt', 'download', 'upload', 'inbox', 'circle', 'repeat', 'refresh', 'alt', 'lock', 'flag', 'headphones', 'off', 'down', 'up', 'qrcode', 'barcode', 'tag', 'tags', 'book', 'bookmark', 'print', 'camera', 'font', 'bold', 'italic', 'height', 'width', 'left', 'center', 'right', 'justify', 'list', 'left', 'right', 'video', 'picture', 'marker', 'adjust', 'tint', 'edit', 'share', 'check', 'move', '3backward', 'play', 'pause', 'stop', '3forward', 'eject', 'left', 'right', '6sign', 'screenshot', '3circle', 'left', 'right', 'up', 'down', 'alt', 'full', 'small', 'sign', 'gift', 'leaf', 'fire', 'open', 'close', 'sign', 'plane', 'calendar', 'random', 'comment', 'magnet', 'up', 'down', 'retweet', 'cart', 'close', 'open', 'vertical', 'horizontal', 'hdd', 'bullhorn', 'bell', 'certificate', 'up', 'down', 'right', 'left', 'up', 'down', 'right', 'left', 'up', 'down', 'globe', 'wrench', 'tasks', 'filter', 'briefcase', 'fullscreen', 'dashboard', 'paperclip', 'empty', 'link', 'phone', 'pushpin', 'usd', 'gbp', 'sort', 'alphabet', 'alt', 'order', 'alt', 'attributes', 'alt', 'unchecked', 'expand', 'down', 'up', 'in', 'flash', 'out', 'window', 'record', 'save', 'open', 'saved', 'import', 'export', 'send', 'disk', 'saved', 'remove', 'save', 'open', 'card', 'transfer', 'cutlery', 'header', 'compressed', 'earphone', 'alt', 'tower', 'stats', '2video', 'subtitles', 'stereo', 'dolby', '31', '2mark', 'download', 'upload', 'conifer', 'deciduous']};

	var update = function (target, comp) {
		$(target).attr('class', 'component glyphicon glyphicon-'+comp.property.icone.val);
	};

	return {
		'templ' : templ,
		'name' : 'icon',
		'property' : property,
		'update' : update,
		'category' : 'label'
	};
})();