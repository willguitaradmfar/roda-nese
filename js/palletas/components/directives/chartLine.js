inject.define("palletas.components.directives.chartLine", [function () {
    var self = {};
    
	self.scope = {};

	self.scope.lineChart = function() {
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
            colorField: '@colorField',
            maxPoint: '@maxPoint',
         },
         link: function(scope, element, attrs) {

            function getRandomColor() {
               var letters = '0123456789ABCDEF'.split('');
               var color = '#';
               for (var i = 0; i < 6; i++) {
                  color += letters[Math.floor(Math.random() * 16)];
               }
               return color;
            }

            var getDatasets = function (_data) {
               var data = {};
               data.labels = [];
               data.datasets = [];

               data.datasets.push({
                  data : []
               });              
               return data;
            }

            var diffArray = function(_this, a) {

               if(!_this)return _this;

               if(_this.length == a.length) return [];
               
                return _this.filter(function(i) {                  
                  return a.indexOf(i) < 0;
               });
            };

            var populate = function (_data) {
               for(var i in _data){
                  var dNew = {};
                  dNew[scope.valueField] = _data[i][scope.valueField];
                  dNew[scope.labelField] = _data[i][scope.labelField];
                  
                  if(dNew[scope.valueField])                  
                     chart.addData([dNew[scope.valueField]], dNew[scope.labelField]);                  
               }               
            }

            var dataOld = (scope.data ? scope.data.concat([]) : []);

            var elem = element[0];

            elem.height = scope.height || 200;
            elem.width = scope.width || 200;            
            
            var ctx = elem.getContext("2d");
            var chart = new Chart(ctx).Line(getDatasets(scope.data), {
               animateScale: false
            });
            populate(scope.data);

            scope.$watch('data', function() {               
               var diff = diffArray(scope.data, dataOld);               

               var maxPoint = scope.maxPoint || 20;

               if(scope.data && scope.data.length > maxPoint) {
                  chart.removeData(1);
               }

               if(diff && diff.length > 0){
                  populate(diff);
                  dataOld = scope.data.concat([]);
               }                             
            });
         }
      };
      return directiveDefinitionObject;
   }
	
    return self;
}]);