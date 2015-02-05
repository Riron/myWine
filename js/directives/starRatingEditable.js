function starRatingEditable() {
	var max = 5;
	return {
		restrict: 'EA',
		template: '<i class="icon ion-star bigger" ng-class="star" ng-repeat="star in stars track by star.id" ng-click="toggle($index)"></i>',
		scope: {rating: '='},
		controller: function($scope) {
			$scope.rating = $scope.rating || 3;

			$scope.toggle = function(index) {
			  	$scope.rating = index + 1;
		 	};

		 	var updateStars = function() {
				$scope.stars = [];
				for(var i=0; i<max; i++) {
					$scope.stars.push({
						id: i,
						assertive: i < $scope.rating
					})
				}
			};

		 	$scope.$watch('rating', function(oldVal, newVal) {
		 		if(newVal) {
		 			updateStars();
		 		}
		 	});
	}
	};
}

angular.module('myWine')
	.directive('starRatingEditable', starRatingEditable);