function StarCtrl(WineService) {
	var vm = this;
	vm.items = WineService.getWines();
	vm.order = WineService.getOrder();
	vm.starred = WineService.getStarred()
	vm.ready = WineService.getReadyWines()

	vm.drink = function(id) {
		WineService.drink(id);
	}
}

angular
  .module('myWine')
  .controller('StarCtrl', StarCtrl);