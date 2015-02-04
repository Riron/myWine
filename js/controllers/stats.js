function StatsCtrl(WineService) {
	var vm = this;
	vm.stats = WineService.getStats();
	var colors = {'blanc': 'Blanc', 'rouge': 'Rouge', 'rose': 'Rosé', 'autre': 'Autre'}
	vm.price = 0;
	vm.bottles = 0;
	angular.forEach(vm.stats.price, function(value, key) {
		if(!isNaN(value)) {
			vm.price += value;
		}
	});

	var data_pie = [];
	angular.forEach(vm.stats.price, function(value, key) {
		this.push({x:colors[key] , y: [value]});
	}, data_pie);

	var data_bar = [{x: 'Vins', y: [] }];
	angular.forEach(vm.stats.bottles, function(value, key) {
		this.push(value);
		vm.bottles += value;
	}, data_bar[0].y);
	
	// Pie chart
	vm.data_1 = {
		"series": ["Vins"],
		"data": data_pie
	};
	vm.config_1 = {
	  title: '',
	  tooltips: false,
	  labels: true,
	  mouseover: function() {},
	  mouseout: function() {},
	  click: function() {},
	  legend: {
	    display: true,
	    //could be 'left, right'
	    position: 'right'
	  },
	  innerRadius: '20%', // applicable on pieCharts, can be a percentage like '50%'
	  lineLegend: 'lineEnd', // can be also 'traditional'
	  colors: ['#ef4e3a', '#FFA6AA', '#f0b840', '#444']
	}

	// Bar chart
	vm.data_2 = {
		"series": ["Rouge", "Rosé", "Blanc"],
		"data": data_bar
	};
	vm.config_2 = {
	  title: '',
	  tooltips: false,
	  labels: false,
	  mouseover: function() {},
	  mouseout: function() {},
	  click: function() {},
	  legend: {
	    display: true,
	    //could be 'left, right'
	    position: 'right'
	  },
	  innerRadius: 0, // applicable on pieCharts, can be a percentage like '50%'
	  lineLegend: 'lineEnd', // can be also 'traditional'
	  colors: ['#ef4e3a', '#FFA6AA', '#f0b840']
	}
}

angular
  .module('myWine')
  .controller('StatsCtrl', StatsCtrl);