function wineColor() {
	var colors = {'rouge': 'assertive', 'rose': 'pink', 'blanc': 'energized'};
	return {
		restrict: 'EA',
		template: '<span class="badge badge-{{ color }}">{{ number }}</span>',
		scope: {type: '=', number: '='},
		link: function(scope, ele, attrs) {
			scope.color = colors[scope.type];
		}
	};
}

angular.module('myWine')
	.directive('wineColor', wineColor);