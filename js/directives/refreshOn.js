function refreshOn($compile){
   return {
     restrict: 'A',
     scope: true,
     compile: function(element){
      var template = angular.element('<a></a>').append(element.clone()).html();
      return function(scope, $element, attrs){
        var eventName = attrs.refreshOn || 'refresh'; 
        var destroyListener = scope.$parent.$on(eventName, function(){  
          var newEl = $compile(template)(scope.$parent);
          $element.replaceWith(newEl);
          destroyListener();
          scope.$destroy();
        });
      };
     }
   };           
};

angular.module('myWine')
  .directive('refreshOn', refreshOn);