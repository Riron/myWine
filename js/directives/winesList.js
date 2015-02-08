function winesList() {
	var lastDivideKey = "-1";
	return {
		restrict: 'EA',
		templateUrl: 'js/directives/winesList.html',
		scope: {items: '=', filter: '=', order: '=', drink: '&'},
		controller: function($scope, $element, $filter) {		
			var orderItems = function() {
				$scope.items = $filter('orderBy')($scope.items, $scope.order);
			};

			orderItems();
		}
	};
}

angular.module('myWine')
	.directive('winesList', winesList);