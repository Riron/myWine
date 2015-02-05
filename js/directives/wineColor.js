function wineColor() {
	var colors = {'rouge': 'assertive', 'rose': 'pink', 'blanc': 'energized', 'autre': 'dark'};
	return {
		restrict: 'EA',
		template: '<span class="badge badge-{{ ::color }}">{{ ::number }}</span>',
		scope: {type: '=', number: '='},
		controller: function($scope) {
			$scope.color = colors[$scope.type];
		}
	};
}

angular.module('myWine')
	.directive('wineColor', wineColor);