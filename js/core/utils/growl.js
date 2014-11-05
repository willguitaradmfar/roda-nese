inject.define("core.utils.growl", [function () {
    var self = {};

    var durationDefault = 1000 * 10;

  	self.info = function (msg, title) {
  		var config = {};
      config.duration = self.duration || durationDefault;
  		config.message = msg;
  		config.title = title || 'INFO';
  		$.growl(config);
  	};

  	self.error = function (msg, title) {
  		var config = {};
      config.duration = self.duration || durationDefault;
  		config.message = msg;
  		config.title = title;
  		$.growl.error(config);
  	};

  	self.notice = function (msg, title) {
  		var config = {};
      config.duration = self.duration || durationDefault;
  		config.message = msg;
  		config.title = title;
  		$.growl.notice(config);
  	};

  	self.warning = function (msg, title) {
  		var config = {};
      config.duration = self.duration || durationDefault;
  		config.message = msg;
  		config.title = title;
  		$.growl.warning(config);
  	};

    return self;
}]);