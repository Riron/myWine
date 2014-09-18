function WinesCtrl(WineService) {
	var vm = this;
	vm.items = WineService.getWines();
	vm.order = WineService.getOrder();

	vm.drink = function(id) {
		WineService.drink(id);
	}
}

angular
  .module('myWine')
  .controller('WinesCtrl', WinesCtrl);