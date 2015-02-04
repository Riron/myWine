function OptionsCtrl(WineService, FirebaseService, ExportService) {
	var vm = this;
	vm.order = WineService.getOrder();
	vm.auth = FirebaseService.auth;
	// Fields options
	vm.fields = WineService.getFieldsOptions();

	vm.fieldLabels = { country: 'Pays', alcohol: '° d\'alcool', place: 'Emplacement en cave'}

	vm.clearData = function() {
		WineService.clear();
	}

	vm.setOrder = function() {
		WineService.setOrder(vm.order);
	}

	vm.exportCSV = function() {
		ExportService.exportCSV();
	}

	vm.importCSV = function(file) {
		ExportService.importCSV(file);
	}

  // Logs a user in with inputted provider
  vm.login = function() {
    //vm.auth.$login('google');
    window.plugins.GoogleLogin.login(function(d){console.log(d)},function(d){console.log(d)})
  };

}

angular
  .module('myWine')
  .controller('OptionsCtrl', OptionsCtrl);