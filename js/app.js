logQueue.urlPost = "http://172.16.84.95:3000/";
logQueue.objHeader.tenant = 'DESENHADOR';
logQueue.objHeader.session = 'S-'+Math.round(Math.random()*10000);
logQueue.showMessageConsole = true;
logQueue.qtdeMessageSent = 500;
logQueue.debug = false;
logQueue.trace = true;
logQueue.sleepThread = 1000;
//logQueue.start();

$(function () {

	var visualizar = new desenhador.preview($('.des-container'));

	var palleta = new desenhador.palleta($('#palleta'));

	var dragdrop = desenhador.dragdrop();

	var property = new desenhador.property();
	property.clickOpenProperty();

	var projects = new desenhador.projects();

});