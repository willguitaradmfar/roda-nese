var logQueue = logQueue || {};

logQueue.queue = [];
logQueue.urlPost = "http://httpbin.org/post";
logQueue.sleepThread = 1000;
logQueue.qtdeMessageSent = 50;
logQueue.debug = false;
logQueue.trace = true;
logQueue.showMessageConsole = false;
logQueue.objHeader = {};

logQueue.start = function (argument) {    

  if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
    logQueue.xmlhttp=new XMLHttpRequest();
  }else{// code for IE6, IE5
    logQueue.xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

  (function takeOverConsole(){
      var console = window.console;
      if (!console) return;
      function intercept(method){
          var original = console[method];
          console[method] = function(){
              var message = Array.prototype.slice.apply(arguments).join(' ');
              var messagePost = Array.prototype.slice.apply(arguments).join(' ');
              // do sneaky stuff
              var o = {};
              o.date = new Date();
              o.method = method;
              if(logQueue.trace){
                try{
                  throw new Error('tracert');
                }catch(e){                
                  o.stack = e.stack.split('\n')[2].replace(/.* \((.*)\)$/, "$1");
                  message += '\t'+o.stack;
                }  
              }
              
              o.message = messagePost;              

              logQueue.queue.push(o);

              if(logQueue.showMessageConsole)
                original.call(console, message);
          }
      }

      var methods = ['log', 'warn', 'error', 'info', 'debug', 'trace']
      /*for (var i = 0; i < methods.length; i++)
          intercept(methods[i]);*/
      methods.forEach(function(entry) {          
          intercept(entry);
      });


      var flush = function () {
        
          var arr = JSON.parse(localStorage.getItem('logQueue')) || [];

          var _arr = logQueue.queue.splice(0, logQueue.queue.length);
          
          /*for(var i in _arr){
            arr.push(_arr[i]);
          } */
          _arr.forEach(function(entry) {          
              arr.push(entry);
          });  
          localStorage['logQueue'] = JSON.stringify(arr);      
      };
      
      var sendPostHTTP = function () {
        var arr = JSON.parse(localStorage.getItem('logQueue'));
        var msgs = arr.splice(0, (logQueue.qtdeMessageSent > 0 ? logQueue.qtdeMessageSent : arr.length));

        if(msgs.length == 0){
          return;
        }
        
        logQueue.xmlhttp.open("POST", logQueue.urlPost, true);
        logQueue.xmlhttp.setRequestHeader("Content-Type", "application/json");


        logQueue.xmlhttp.onerror = function() {
          if(logQueue.debug)
            console.log("ERROR! [onerror]");
        };

        logQueue.xmlhttp.onload = function(e) {            
          if(logQueue.xmlhttp.readyState === 4 && logQueue.xmlhttp.status === 200){            
              localStorage['logQueue'] = JSON.stringify(arr);
            }else{
              if(logQueue.debug)
                console.error('Erro: '+logQueue.xmlhttp.readyState + ' || '+ogQueue.xmlhttp.status);
            }
        };

        try{
          var obj = {};
          obj.header = logQueue.objHeader;
          if(logQueue.debug){
            obj.debug = {};
            obj.debug.qtdeRestantelogQueue = arr.length;
          }
          obj.msgs = msgs;
          logQueue.xmlhttp.send(JSON.stringify(obj));        
        }catch(e){
          if(logQueue.debug)
            console.error(e);
        }
      };

      var repeat = function () {
        try{
          display();
          flush();
          display();
          sendPostHTTP();
        }finally{
          
          setTimeout(repeat, logQueue.sleepThread);
        }
      }

      var display = function () {
        if(logQueue.debug){
          var displ = '';      
          var arr = JSON.parse(localStorage.getItem('logQueue')) || [];
          displ += '\nqtde var temp : '+logQueue.queue.length;
          displ += '\nqtde var LS   : '+arr.length;
          displ += '\n===================================';
          console.log(displ);  
        }      
      };

      repeat();
  })();
};

logQueue.objHeader.navigator = (function(){
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\bOPR\/(\d+)/)
        if(tem!= null) return 'Opera '+tem[1];
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();