function FirebaseService($http, $firebase, $firebaseSimpleLogin, $rootScope, WineService) {
  var FirebaseService = {};
	/*var firebaseRef = new Firebase("https://mywine.firebaseio.com/");

	// Create a Firebase Simple Login object
	FirebaseService.auth = $firebaseSimpleLogin(firebaseRef);
	// Initially set no user to be logged in
	FirebaseService.user = null;

	FirebaseService.sync = $firebase(firebaseRef);

	$rootScope.$on('$firebaseSimpleLogin:login', function(){});
  $rootScope.$on('$firebaseSimpleLogin:logout', function(){});

  FirebaseService.setOnline = function() {
  	FirebaseService.sync.$set(WineService.getWines());
  }

  FirebaseService.getOnline = function() {
  	var data = sync.$asArray();
  }*/

  return FirebaseService;
}
angular
  .module('myWine')
  .factory('FirebaseService', FirebaseService);