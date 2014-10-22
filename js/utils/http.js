inject.define("utils.http", [
   function(util) {
      var self = {};

       function delay(ms) {
           var cur_d = new Date();
           var cur_ticks = cur_d.getTime();
           var ms_passed = 0;
           while(ms_passed < ms) {
               var d = new Date();  // Possible memory leak?
               var ticks = d.getTime();
               ms_passed = ticks - cur_ticks;
               // d = null;  // Prevent memory leak?
           }
       }

      self.getContentfile = function(path) {
         var xmlhttp;         

         if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
         } else { // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
         }            
         
         xmlhttp.open("GET", path, false);
         xmlhttp.send();

         return xmlhttp.responseText;
      };
      return self;
   }
]);