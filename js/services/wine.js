function WineService ($localStorage, $filter, $state, $ionicViewService, $ionicPopup, $cordovaFile) {
  var WineService = {};
  WineService.temp = {};
  var order = '';
  var colors = {'blanc': 'White Wine', 'rouge': 'Red Wine', 'rose': 'Rosé Wine'};
  var date = new Date();
  date = date.getFullYear();

  var getKey = function(obj, value){
    for(var key in obj){
      if(obj[key] == value){
        return key;
      }
    }
    return null;
  };

  WineService.getWines = function() {
  	return $localStorage.myWineItems || [];
  };

  WineService.getWine = function(id) {
    if(id != 0) {
      return $filter('filter')($localStorage.myWineItems, function (i) {return i.id == id;})[0]; 
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
    console.log(before);
    return $filter('filter')(before, function (i) {return i.best_end >= date;}) || []
  }

  WineService.save = function (item, id) {
  	$localStorage.myWineItems = $localStorage.myWineItems || [];
		item.id = item.id || $localStorage.myWineItems.length + 1;
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
		$ionicViewService.nextViewOptions({
      disableBack: true
    });
    // Redirect to home
		$state.go('app.wines');
  };

  WineService.drink = function(id) {
  	var item = WineService.getWine(id);
  	var confirmPopup = $ionicPopup.confirm({
			title: 'Sortir une bouteille',
			template: 'Confirmez-vous votre choix ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				item.number--;
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
  	var stats = {'red': 0, 'rose': 0, 'blanc': 0, 'red_b': 0, 'rose_b': 0, 'blanc_b': 0};
  	var items = WineService.getWines();
  	stats.wine_nb = items.length;

  	angular.forEach(items, function(value, key) {
  		if(value.type == 'rouge') {
  			stats.red++;
  			stats.red_b += value.number;
  		}
  		else if(value.type == 'rose') {
  			stats.rose++;
  			stats.rose_b += value.number;
  		}
  		else if(value.type == 'blanc') {
  			stats.blanc++;
  			stats.blanc_b += value.number;
  		}
  	});

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
    return order;
  }

  WineService.setOrder = function(o) {
    order = o;
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
        $ionicViewService.nextViewOptions({
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