function StatsCtrl(WineService) {
	var vm = this;
	vm.stats = WineService.getStats();
	
	// Pie chart
	vm.data_1 = {
		"series": ["Vins"],
		"data": [
			{
				"x": "Rouge",
				"y": [vm.stats.red_b]
			},
			{
				"x": "Rosé",
				"y": [vm.stats.rose_b]
			},
			{
				"x": "Blanc",
				"y": [vm.stats.blanc_b]
			}
		]
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
	  colors: ['#ef4e3a', '#FFA6AA', '#f0b840']
	}

	// Bar chart
	vm.data_2 = {
		"series": ["Rouge", "Rosé", "Blanc"],
		"data": [
			{
				"x": "Vins",
				"y": [vm.stats.red, vm.stats.rose, vm.stats.blanc]
			},
		]
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