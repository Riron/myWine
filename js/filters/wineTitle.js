angular.module('myWine')
.filter('wineTitle', function() {
  return function(input, total) {
    if(input)
    	return '| ' + input;
    return null;
  };
});