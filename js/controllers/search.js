function SearchCtrl(SnoothService, WineService) {
	var vm = this;

	vm.results = [];

	vm.search = function() {
		SnoothService.search(vm.searchText).success(function(data, status, headers, config) {
			vm.results = data.wines;
		});
	}

	vm.addWine = function(index) {
		WineService.toTemp(vm.results[index]);
	}
}

angular
  .module('myWine')
  .controller('SearchCtrl', SearchCtrl);