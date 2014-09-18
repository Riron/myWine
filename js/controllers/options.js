function OptionsCtrl(WineService) {
	var vm = this;
	vm.order = WineService.getOrder();

	vm.clearData = function() {
		WineService.clear();
	}

	vm.setOrder = function() {
		WineService.setOrder(vm.order);
	}
}

angular
  .module('myWine')
  .controller('OptionsCtrl', OptionsCtrl);