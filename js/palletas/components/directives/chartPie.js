inject.define("palletas.components.directives.chartPie", [function () {
    var self = {};
    
	self.scope = {};


	self.scope.pieChart = function() {
      var directiveDefinitionObject = {

         restrict: 'A',

         replace: true,

         template: '<canvas/>',

         scope: {
            data: '=chartData',
            height: '=height',
            width: '=width',
            labelField: '@labelField',
            valueField: '@valueField',
            colorField: '@colorField'            
         },
        link: function(scope, element, attrs) {

            scope.data = scope.data || [];

            function getRandomColor() {
               var letters = '0123456789ABCDEF'.split('');
               var color = '#';
               for (var i = 0; i < 6; i++) {
                  color += letters[Math.floor(Math.random() * 16)];
               }
               return color;
            }
            if(scope.data && scope.data.forEach){
              scope.data.forEach(function(dNew) {
                dNew.label = dNew[scope.labelField];
                dNew.value = parseFloat(dNew[scope.valueField]);

                var color = getRandomColor();
                
                if (!dNew.color) {
                    dNew.color = dNew[scope.colorField] || color;
                 }
               
                 if (!dNew.highlight) {
                    dNew.highlight = dNew[scope.colorField] || color;                  
                 }
              });  
            }
            

            var elem = element[0];            

            elem.height = scope.height || 200;
            elem.width = scope.width || 200;

            var ctx = elem.getContext("2d");
            var chart = new Chart(ctx).Pie(scope.data);

            scope.$watch('data', function() {               
               if(scope.data && scope.data.length && scope.data.length > chart.segments.length){
                  
                  var arr = scope.data.slice(length, scope.data.length);

                  for(var i in arr){
                     var a = arr[i];
                     var segment = {};
                     segment.label = a[scope.labelField];
                     segment.value = parseFloat(a[scope.valueField]);
                     segment.color = a[scope.colorField] || getRandomColor();
                     segment.highlight = a[scope.colorField] || getRandomColor();
                     chart.addData(segment);
                  }                   
               }

               chart.segments.forEach(function(dOld) {
                  scope.data.forEach(function(dNew) {
                     if (dOld.label == dNew[scope.labelField]) {
                        dOld.value = parseFloat(dNew[scope.valueField]);
                     }
                  });
               })
               chart.update();
            });
         }
      };
      return directiveDefinitionObject;
   }
	
    return self;
}]);