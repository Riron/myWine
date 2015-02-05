function starRating() {
	var max = 5;
	return {
		restrict: 'EA',
		template: '<i class="icon ion-star bigger" ng-class="::star" ng-repeat="star in ::stars track by star.id"></i>',
		scope: {rating: '='},
		controller: function($scope) {
			$scope.rating = $scope.rating || 3;

		 	var updateStars = function() {
				$scope.stars = [];
				for(var i=0; i<max; i++) {
					$scope.stars.push({
						id: i,
						assertive: i < $scope.rating
					})
				}
			};

			updateStars();
		}
	};
}

angular.module('myWine')
	.directive('starRating', starRating);