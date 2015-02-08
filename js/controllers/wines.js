function WinesCtrl(WineService, $scope) {
	var vm = this;

	vm.items = WineService.getWines();
	vm.order = WineService.getOrder();
	vm.searchText = null;

	vm.drink = function(id) {
		WineService.drink(id);
	}

	var getIndex = function(arr, prop, value){
		var lengthArray = arr.length;
		for(var i=0; i<lengthArray; i++) {
			if(arr[i][prop] == value) {
				return i;
			}
		}
		return null;
	};

	$scope.$on('$ionicView.enter', function() {
		var newItems = WineService.getWines();
		var newOrder = WineService.getOrder();
		var lengthArray = newItems.length;
		for(var i=0; i<lengthArray; i++) {
			var j = getIndex(vm.items, 'id', newItems[i].id);
			if(JSON.stringify(newItems[i]) != JSON.stringify(vm.items[j]) || newOrder != vm.order) {
				vm.order = newOrder;
				vm.items = newItems;
				$scope.$broadcast('refresh-ui');
				break;
			}
		};
	})
}

angular
  .module('myWine')
  .controller('WinesCtrl', WinesCtrl);