function starRating() {
	var max = 5;
	return {
		restrict: 'EA',
		template: '<i class="icon ion-star bigger" ng-class="star" ng-repeat="star in stars" ng-click="toggle($index)"></i>',
		scope: {rating: '=', editable: '='},
		link: function(scope, ele, attrs) {
			scope.rating = scope.rating || 3;

			scope.toggle = function(index) {
				if(scope.editable) {
			  	scope.rating = index + 1;
				}
		 	};

		 	var updateStars = function() {
				scope.stars = [];
				for(var i=0; i<max; i++) {
					scope.stars.push({
						assertive: i < scope.rating
					})
				}
			};

		 	scope.$watch('rating', function(oldVal, newVal) {
		 		if(newVal) {
		 			updateStars();
		 		}
		 	})
		}
	};
}

angular.module('myWine')
	.directive('starRating', starRating);