angular.module('myWine')
.filter('wineCategory', function() {
	var colors = {'blanc': 'Blanc', 'rouge': 'Rouge', 'rose': 'Rosé', 'autre': 'Autre'}
	return function(input, total) {
		return colors[input] || input;
	};
});