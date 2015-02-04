function ExportService(WineService, $cordovaFile, $ionicPopup, $q, $localStorage) {
  var ExportService = {};

  var excludedFields = ['picture', 'displayCat'];
  var includedFields = ['id', 'title', 'producer', 'appellation', 'country', 'region', 'type', 'millesime', 'number', 'cepage', 'price', 'cuvee', 'volume', 'best_start', 'best_end', 'alcohol', 'place', 'comment', 'stars', 'star'];

  var buildCSV = function() {
  	var array = WineService.getWines();
  	var str = includedFields.join(',') + '\r\n';

  	angular.forEach(array, function(val, key) {
  		var line = '';
  		angular.forEach(includedFields, function(v, k) {
	  		// Fields
			if (line != '') {
			line += ',';
			}
			// Make sure there is no period in the text we export. Better loose them than break the export
			if(angular.isDefined(val[v])) {
				val[v] = String(val[v]).replace(",", " ");
			}
			line += val[v] || '';
  		})
  		str += line + '\r\n';
  	})
  	return str;
  }

  var checkFile = function(path) {
  	var deferred = $q.defer();
  	$cordovaFile.checkFile(path).then(function(result) {
		$cordovaFile.removeFile(path).then(function(result) {
			console.log('Previous file deleted');
			deferred.resolve();
		}, function(err) {
			var alertPopup = $ionicPopup.alert({
				title: 'Erreur',
				template: 'Erreur lors de la suppression du fichier précédent'
			});
			deferred.reject();
		});
	}, function(err) {
		deferred.resolve();
	});
	return deferred.promise;
  }

  var addWinesToLibrary = function(wines) {
  	var existingWines = WineService.getWines();

  	angular.forEach(wines, function(wine, index) {
  		// Firstly, we need an ID an other fields
  		if(angular.isUndefined(wine.id)) {
  			wine.id = Math.random().toString(36).substr(2, 9)
  		}
  		if(angular.isUndefined(wine.number)) {
  			wine.number = 1;
  		}
  		if(angular.isUndefined(wine.title)) {
  			wine.title = 'Import - undefined';
  		}
  		if(angular.isUndefined(wine.producer)) {
  			wine.producer = 'Import - undefined';
  		}

  		// Cast what needs to be casted
  		wine.number = parseInt(wine.number);

  		// Add the wine to the library
  		// - Replace if already exists
  		// - Else add it
  		if(angular.isUndefined(existingWines[wine.id])) {
  			existingWines.splice(index, 1, wine);
  		}
  		else {
  			existingWines.push(wine);
  		}
  	});
  	$localStorage.myWineItems = existingWines;
  }

  ExportService.exportCSV = function() {
  	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var path = 'Download/myWine-export-' + [dd, mm].join('-') + '.csv';
	var data = buildCSV();

	checkFile(path).then(function () {
		$cordovaFile.createFile(path, true).then(function(result) {
		  	$cordovaFile.writeFile(path, data, {'append':false}).then(function(result) {
				var alertPopup = $ionicPopup.alert({
					title: 'Succès',
					template: 'L\'export a bien été généré<br>(SD Card -> Download)'
				});
			}, function(err) {
				console.log(err);
				var alertPopup = $ionicPopup.alert({
					title: 'Erreur',
					template: 'Erreur lors de l\'écriture du fichier'
				});
			});
		}, function(err) {
			console.log(err);
			var alertPopup = $ionicPopup.alert({
				title: 'Erreur',
				template: 'Erreur lors de la création du fichier'
			});
		});
	});
  }

  ExportService.importCSV = function(filePath) {
  	$cordovaFile.readAsText(filePath).then(function(result) {
		var lines = result.split(/\r?\n/);
		// Delete line titles and last line which is always empty
		lines.splice(0,1);
		lines.splice(-1, 1);

		var wines = [];
		angular.forEach(lines, function(line, key) {
			wines[key] = {};

			line = line.split(',');

			angular.forEach(line, function(value, k) {
				if(value) {
					wines[key][includedFields[k]] = value;
				}
			})
		});

		addWinesToLibrary(wines);
		var alertPopup = $ionicPopup.alert({
			title: 'Succès',
			template: 'L\'export a bien été pris en compte'
		});
	}, function(err) {
		var alertPopup = $ionicPopup.alert({
				title: 'Erreur',
				template: 'Erreur lors de la lecture du fichier'
			});
	});
  }

  return ExportService;
}
angular
  .module('myWine')
  .factory('ExportService', ExportService);
