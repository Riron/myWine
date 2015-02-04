function EditCtrl($stateParams, WineService, DataService, $cordovaCamera, $cordovaFile, $ionicPopup) {
	var vm = this;
	var id = $stateParams.wineId || 0;
	vm.item = {};
  vm.data = {};

	// Filter items array by id to get the correct item
	vm.item = WineService.getWine(id);
	vm.item.picture = vm.item.picture || 'img/bottle.png';
  // Default number to 1
  vm.item.number = vm.item.number || 1;

  // Auto Complete data
  vm.data.region = DataService.region;

  // Fields options
  vm.fields = WineService.getFieldsOptions();

	vm.addWine = function(isValid) {
		if(isValid) {
			WineService.save(vm.item, id);
		}
	}

  vm.showPictureChoicePopup = function() {
    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: 'De quelle source voulez vous récupérer la photo ?',
      title: 'Choix de la source',
      subTitle: 'Appareil photo / Gallerie photo',
      buttons: [
        {
          text: 'Appareil',
          type: 'button-positive',
          onTap: function(e) {
            return 'CAMERA';
          }
        },
        {
          text: 'Gallerie',
          type: 'button-positive',
          onTap: function(e) {
            return 'SAVEDPHOTOALBUM';
          }
        }
      ]
    });
    myPopup.then(function(res) {
      vm.takePicture(res);
    });
  };

	vm.takePicture = function(sourceType) {
    var options = { 
      quality : 40, 
      destinationType : Camera.DestinationType.FILE_URI, 
      sourceType : Camera.PictureSourceType[sourceType], 
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      /*targetWidth: 800,
      targetHeight: 800,*/
      saveToPhotoAlbum: false
    };
    console.log(sourceType);
    $cordovaCamera.getPicture(options).then(function(imageData) {
      // Move picture to correct directory
      var split = imageData.split('/')
      var filepath = cordova.file.dataDirectory + 'img/' + split[split.length - 1];
        $cordovaFile.downloadFile(imageData, filepath, true, {})
        .then(function(result) {
          console.log('Picture saved');
          vm.item.picture = result.toURL()
        }, function(err) {
          console.log(err);
        });
    }, function(err) {
      // An error occured. Show a message to the user
      console.log(err);
    });
  }

  vm.changeQuantity = function(v) {
    if(vm.item.number + v > 0) {
      vm.item.number += v;
    }
  }

  // Get wines list for autocompletion
  vm.items = WineService.getWines();
}
angular
  .module('myWine')
  .controller('EditCtrl', EditCtrl);