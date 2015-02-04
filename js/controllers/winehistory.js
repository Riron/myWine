function WineHistoryCtrl($stateParams, WineService) {
	var vm = this;
	var idHistory = $stateParams.wineId;

	vm.item = WineService.getHistoryWine(idHistory);
	vm.item.picture = vm.item.picture || 'img/bottle.png';

	vm.backToCave = function () {
		WineService.backToCave(vm.item);
	}
}
angular
  .module('myWine')
  .controller('WineHistoryCtrl', WineHistoryCtrl);