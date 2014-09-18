function SnoothService($http, $ionicPopup) {
  var SnoothService = {};
  var url = 'http://api.snooth.com/wines/';
  var akey = '922i0lqrlqe4tuk63aevoy0yu1bpq3mr9no8aypj2utt1ram';

  SnoothService.search = function(s) {
  	return $http.get(url, {params: {akey: akey, xp: 30, lang: 'fr', q: s, ip: '66.28.234.115'}})
  }

  return SnoothService;
}
angular
  .module('myWine')
  .factory('SnoothService', SnoothService);