function EditCtrl($stateParams, WineService, $cordovaCamera) {
	var vm = this;
	var id = $stateParams.wineId || 0;
	vm.item = {};

	// Filter items array by id to get the correct item
	vm.item = WineService.getWine(id);
	vm.item.picture = vm.item.picture || 'img/bottle.png';

	vm.addWine = function(isValid) {
		if(isValid) {
			WineService.save(vm.item, id);
		}
	}

	vm.takePicture = function() {
    var options = { 
      quality : 100, 
      destinationType : Camera.DestinationType.FILE_URI, 
      sourceType : Camera.PictureSourceType.CAMERA, 
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 200,
      targetHeight: 200,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      vm.item.picture = imageData;
    }, function(err) {
      // An error occured. Show a message to the user
    });
  }
}
angular
  .module('myWine')
  .controller('EditCtrl', EditCtrl);