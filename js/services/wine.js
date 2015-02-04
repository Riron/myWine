function WineService ($localStorage, $filter, $state, $ionicHistory, $ionicPopup, $cordovaFile) {
  var WineService = {};
  WineService.temp = {};
  var defaultOptions = 
    {order: '', fields: {
      country: {text: 'Pays', checked: false }, 
      alcohol: {text: '° d\'alcool', checked: true }, 
      place: {text: 'Emplacement en cave', checked: true },
      volume: {text: 'Contenace', checked: false },
      cuvee: {text: 'Cuvée', checked: false }
    }};

  $localStorage.myWineOptions = $localStorage.myWineOptions || defaultOptions;
    
  var options = $localStorage.myWineOptions;
  var colors = {'blanc': 'White Wine', 'rouge': 'Red Wine', 'rose': 'Rosé Wine', 'autre': 'Autre'};
  var date = new Date();
  date = date.getFullYear();

  /*********************
  UPGRADE
  *********************/
  (function() {
    // New fields to default options
    if(angular.isDefined(options) && Object.keys(options.fields).length < Object.keys(defaultOptions.fields).length) {
      $localStorage.myWineOptions = defaultOptions;
    }
  })();

  var getKey = function(obj, value){
    for(var key in obj){
      if(obj[key] == value){
        return key;
      }
    }
    return null;
  };

  var sameDayBetweenDates = function(first, second) {
    first = new Date(first);
    second = new Date(second);
    if(first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDay() === second.getDay()) {
      return true;
    }
    return false;
  }

  WineService.getWines = function() {
    return $localStorage.myWineItems || [];
  };

  WineService.getHistoryWines = function() {
    $localStorage.myWineHistory = $localStorage.myWineHistory || [];
  	return $localStorage.myWineHistory;
  };

  WineService.getWine = function(id) {
    if(id != 0) {
      return $filter('filter')($localStorage.myWineItems, function (i) {return i.id == id;})[0]; 
    }
    var res = WineService.temp;
    WineService.temp = {};
    return res;
  };

  WineService.getHistoryWine = function(id) {
    if(id != 0) {
      return $filter('filter')($localStorage.myWineHistory, function (i) {return i.idHistory == id;})[0]; 
    }
    var res = WineService.temp;
    WineService.temp = {};
    return res;
  };

  WineService.getStarred = function() {
    return $filter('filter')($localStorage.myWineItems, function (i) {return i.star == true;}) || []
  };

  WineService.getReadyWines = function() {
    var before =  $filter('filter')($localStorage.myWineItems, function (i) {return i.best_start <= date;}) || [];
    return $filter('filter')(before, function (i) {return i.best_end >= date;}) || []
  };

  WineService.getFieldsOptions = function() {
    return options.fields;
  };

  WineService.save = function (item, id) {
  	$localStorage.myWineItems = $localStorage.myWineItems || [];
		item.id = item.id || Math.random().toString(36).substr(2, 9);
		// If item already exist, retrive position and modify
		if(id) {
			index = $localStorage.myWineItems.indexOf(item);
			$localStorage.myWineItems[index] = item;
		}
		// Else, push new item to array
		else {
			$localStorage.myWineItems.push(item);
		}
		// Disable back button whatever the case
		$ionicHistory.nextViewOptions({
      disableBack: true
    });
    // Redirect to home
		$state.go('app.wines');
  };

  WineService.backToCave = function (item) {
    var item = WineService.getHistoryWine(item.idHistory);
    var caveItem = WineService.getWine(item.id);

    if(angular.isUndefined(caveItem)) {
      var alertPopup = $ionicPopup.alert({
        title: 'Erreur',
        template: 'Ce vin n\'existe plus dans la cave'
      });
    }
    else {
      if(item.number > 0) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Réintégrer une bouteille',
          template: 'Confirmez-vous votre choix ?'
        });
        confirmPopup.then(function(res) {
          if(res) {
            item.number--;
            caveItem.number++;
            WineService.clearHistory();
          }
        });
      }
      else {
        var alertPopup = $ionicPopup.alert({
          title: 'Réserve épuisée',
          template: 'Plus aucun vin de ce type dans l\'historique'
        });
      }
    }
  };

  WineService.drink = function(id) {
  	var item = WineService.getWine(id);
    if(item.number > 0) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Sortir une bouteille',
        template: 'Confirmez-vous votre choix ?'
      });
      confirmPopup.then(function(res) {
        if(res) {
          item.number--;
          WineService.addToHistory(item);
        }
      });
    }
    else {
    	var alertPopup = $ionicPopup.alert({
        title: 'Réserve épuisée',
        template: 'Aucun vin de ce type en stock...'
      });
    }
  };

  WineService.addToHistory = function(w) {
    var wine = angular.copy(w);
    var wines = WineService.getHistoryWines();
    var addWineToExistingObject = false;

    angular.forEach(wines, function(value, key) {
      var sameDay = sameDayBetweenDates(Date.now(), value.date);
      if(sameDay && value.title === wine.title) {
        addWineToExistingObject = true;
        value.number++;
      }
    });

    if(!addWineToExistingObject) {
      wine.number = 1;
      wine.date = Date.now();
      wine.idHistory = new Date().getTime();
      $localStorage.myWineHistory.push(wine);
    }
  }

  WineService.clearHistory = function () {
    var items = WineService.getHistoryWines();
    angular.forEach(items, function (value, key) {
      if(value.number == 0) {
        items.splice(key,1);
        $state.go('app.history');
      }
    });
  }

  WineService.addBottle = function(id) {
    var item = WineService.getWine(id);
    var confirmPopup = $ionicPopup.confirm({
      title: 'Ajouter une bouteille',
      template: 'Confirmez-vous votre choix ?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        item.number++;
      }
    });
  };

  WineService.clear = function() {
  	var confirmPopup = $ionicPopup.confirm({
      title: 'Supprimer la cave',
      template: 'Confirmez-vous votre choix ?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        delete $localStorage.myWineItems;
      }
    });
  };

  WineService.getStats = function() {
    var stats = {'types': {}, 'bottles': {}, 'price': {}};
  	var items = WineService.getWines();
  	stats.wine_nb = items.length;

  	angular.forEach(items, function(value, key) {
      stats.types[value.type] = stats.types[value.type]++ || 1;
      stats.bottles[value.type] = (stats.bottles[value.type]+value.number) || value.number;
      stats.price[value.type] = (stats.price[value.type]+value.price*value.number) || value.price*value.number;
  	});

    stats.bottles['blanc'] = stats.bottles['blanc'] || 0;
    stats.bottles['rouge'] = stats.bottles['rouge'] || 0;
    stats.bottles['rose'] = stats.bottles['rose'] || 0;
  	return stats;
  }

  WineService.toTemp = function(element) {
    // Store element into temp
    WineService.temp.title = element.name || '';
    WineService.temp.producer = element.winery || '';
    WineService.temp.price = parseFloat(element.price) || '';
    WineService.temp.millesime = element.vintage || '';
    WineService.temp.cepage = element.varietal || '';
    WineService.temp.type = getKey(colors, element.type) || '';
    // ----- Download image
    // Options
    var split = element.image.split('/')
    var filepath = cordova.file.dataDirectory + 'img/' + split[split.length - 1];
    $cordovaFile.downloadFile(element.image, filepath, true, {})
    .then(function(result) {
      WineService.temp.picture = result.toURL()
      // Redirect to edit in any case
      $state.go('app.add')
    }, function(err) {
      console.log(err);
      // Redirect to edit in any case
      $state.go('app.add')
    }, function (progress) {
      console.log(progress)
    });
  }

  WineService.getOrder = function() {
    return options.order;
  }

  WineService.setOrder = function(o) {
    options.order = o;
  }

  WineService.deleteWine = function(id) {
    var item = WineService.getWine(id);
    var items = WineService.getWines();
    var key = getKey(items,item);
    var confirmPopup = $ionicPopup.confirm({
      title: 'Suppression du vin',
      template: 'Confirmez-vous votre choix ?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        items.splice(key, 1);
        // Disable back button whatever the case
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        // Redirect to home
        $state.go('app.wines');
      }
    });
  }

  WineService.star = function(id) {
    var item = WineService.getWine(id);
    item.star = item.star || false;
    item.star = !item.star;
  }

  return WineService;
}
angular
  .module('myWine')
  .factory('WineService', WineService);