var desenhador = desenhador || {};
desenhador.services = desenhador.services || [];

desenhador.service = function (nameService, fun) {
	var service = JSON.stringify(fun.toString());
	console.debug('REGISTRANDO SERVICO : '+nameService);	
	desenhador.services.push(service);
};