function DataService($http, $firebase, $firebaseSimpleLogin, $rootScope, WineService) {
  var DataService = {};

  DataService.region = ['Alsace', 'Armagnac et Cognac', 'Beaujolais et Lyonnais', 'Bordeaux', 'Bourgogne', 'Champagne', 'Corse', 'Jura', 'Languedoc', 'Lorraine', 'Poitou-Charentes', 'Provence']

  return DataService;
}
angular
  .module('myWine')
  .factory('DataService', DataService);
