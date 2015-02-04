function autoComplete() {
	return {
		restrict: 'EA',
		templateUrl: 'js/directives/autoComplete.html',
		scope: {items: '=', placeholder: '@', name: '@', ngModel: '='},
		link: function(scope, ele, attrs) {
			scope.selected = true;
			scope.current = 0;

			scope.handleSelection = function(item) {
				scope.ngModel = item;
				scope.selected = true;
			}
			scope.isCurrent = function(index) {
		    return scope.current == index;
		  };
		  scope.setCurrent = function(index) {
		    scope.current = index;
  		};
		}
	};
}

angular.module('myWine')
	.directive('autoComplete', autoComplete);