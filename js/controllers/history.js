function HistoryCtrl(WineService) {
	var vm = this;
	vm.items = WineService.getHistoryWines();
}

angular
  .module('myWine')
  .controller('HistoryCtrl', HistoryCtrl);