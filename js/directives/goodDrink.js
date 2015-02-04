function goodDrink() {
	var date = new Date();
	date = date.getFullYear();
	return {
		restrict: 'EA',
		template: '<i class="icon {{ class }}"></i> A boire entre {{ start || "?" }} et {{ end || "?" }}',
		scope: {start: '=', end: '='},
		link: function(scope, ele, attrs) {
			if(scope.start <= date && scope.end >= date ) {
				scope.class = 'ion-checkmark-round balanced';
			}
			else {
				scope.class = 'ion-close-round assertive';
			}
		}
	};
}

angular.module('myWine')
	.directive('goodDrink', goodDrink);