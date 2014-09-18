function WineCtrl($stateParams, WineService) {
	var vm = this;
	var id = $stateParams.wineId;

	vm.item = WineService.getWine(id);
	vm.item.picture = vm.item.picture || 'img/bottle.png';

	vm.drink = function(id) {
		WineService.drink(id);
	}

	vm.star = function(id) {
		WineService.star(id);
	}

	vm.delete = function(id) {
		WineService.deleteWine(id);
	}
}
angular
  .module('myWine')
  .controller('WineCtrl', WineCtrl);