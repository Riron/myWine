function winesList() {
	return {
		restrict: 'EA',
		templateUrl: 'js/directives/winesList.html',
		scope: {items: '=', filter: '=', order: '=', drink: '&'},
		controller: function($scope, $filter) {
			var lastCat = null;
			// List of orders for which we dont't want to display a category separation
			var hideCat = {'name': true, 'number': true};
			
			var setDisplayCat = function() {
				$scope.items = $filter('orderBy')($scope.items, $scope.order);
				angular.forEach($scope.items, function(value, key) {
					if (lastCat != value[$scope.order] && !hideCat[$scope.order]) {
			            lastCat = value[$scope.order];
			            value.displayCat = true;
			        }
			        else {
			        	value.displayCat = false;
			        }
				});
			};

			setDisplayCat();
		}
	};
}

angular.module('myWine')
	.directive('winesList', winesList);