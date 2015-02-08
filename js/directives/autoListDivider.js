function autoListDivider($timeout, $filter) {  
	var lastDivideKey = "";

	return {
		link: function(scope, element, attrs) {
			// List of orders for which we dont't want to display a category separation
			var hideCat = {'name': true, 'number': true};

			var key = attrs.autoListDividerValue;
			var empty = 'Non classé';

			var defaultDivideFunction = function(k){
				return k;
			}
      
			var doDivide = function(){
				var divideFunction = scope.$apply(attrs.autoListDividerFunction) || defaultDivideFunction;
				var divideKey = divideFunction(key);
				
				if(divideKey != lastDivideKey && !hideCat[attrs.autoListDividerBy]) {
					var keyToDisplay = $filter('wineCategory')(divideKey) || empty;
					var contentTr = angular.element("<div class='item item-divider'>" + keyToDisplay + "</div>");
					element[0].parentNode.insertBefore(contentTr[0], element[0]);
				}

				lastDivideKey = divideKey;
			}
		  
			$timeout(doDivide,0)
		}
	}
};

angular.module('myWine')
	.directive('autoListDivider', autoListDivider);