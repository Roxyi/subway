var layerStyle = {
	ridership_16: {
		color: [
			'interpolate',
	    	['linear'],
	    	['get', 'wkday_16'],
	    	300,
	    	'#ff6e6e',
	    	20000,
	    	'#ff5252',
	    	70000,
	    	'#ff2a2a'
		],
		radius: [
			'interpolate',
		  	['exponential', 1.75],
		  	['zoom'],
		  	11,
		  	[
		    	'interpolate',
		    	['linear'],
		    	['get', 'wkday_16'],
		    	300,
		    	1,
		    	20000,
		    	4,
		    	70000,
		    	7
		  	],
		  	14,
		  	[
		    	'interpolate',
		    	['linear'],
		    	['get', 'wkday_16'],
		    	300,
		    	10,
		    	20000,
		    	15,
		    	70000,
		    	30
		  	],
		  	16,
		  	[
		    	'interpolate',
		    	['linear'],
		    	['get', 'wkday_16'],
		    	300,
		    	20,
		    	20000,
		    	30,
		    	70000,
		    	70
		  	]
		]
	},
	ridership_growth_1yr: {
		color: [
			'interpolate',
	    	['linear'],
	    	['get', 'wkday_1yr_'],
	    	-0.75,
	    	'#ff6e6e',
	    	0,
	    	'#ff5252',
	    	0.1,
	    	'#ff2a2a'
		],
		radius: [
			'interpolate',
		  	['exponential', 1.75],
		  	['zoom'],
		  	11,
		  	[
		    	'interpolate',
		    	['linear'],
		    	['get', 'wkday_16'],
		    	-0.75,
		    	1,
		    	0,
		    	4,
		    	0.1,
		    	7
		  	],
		  	14,
		  	[
		    	'interpolate',
		    	['linear'],
		    	['get', 'wkday_16'],
		    	-0.75,
		    	10,
		    	0,
		    	15,
		    	0.1,
		    	30
		  	],
		  	16,
		  	[
		    	'interpolate',
		    	['linear'],
		    	['get', 'wkday_16'],
		    	-0.75,
		    	20,
		    	0,
		    	30,
		    	0.1,
		    	70
		  	]
		]
	},
	ridership_growth_5r: {
		color: [
			'interpolate',
	    	['linear'],
	    	['get', 'wkday_1yr_'],
	    	-0.75,
	    	'#ff6e6e',
	    	0,
	    	'#ff5252',
	    	0.5,
	    	'#ff2a2a'
		],
		radius: [
			'interpolate',
		  	['exponential', 1.75],
		  	['zoom'],
		  	11,
		  	[
		    	'interpolate',
		    	['linear'],
		    	['get', 'wkday_16'],
		    	-0.75,
		    	1,
		    	0,
		    	4,
		    	0.5,
		    	7
		  	],
		  	14,
		  	[
		    	'interpolate',
		    	['linear'],
		    	['get', 'wkday_16'],
		    	-0.75,
		    	10,
		    	0,
		    	15,
		    	0.5,
		    	30
		  	],
		  	16,
		  	[
		    	'interpolate',
		    	['linear'],
		    	['get', 'wkday_16'],
		    	-0.75,
		    	20,
		    	0,
		    	30,
		    	0.5,
		    	70
		  	]
		]
	}
};

mapboxgl.accessToken = 'pk.eyJ1Ijoicm94eWkiLCJhIjoiY2lrcThzbDZuMDA2eHVhbTdtd242OGMwaiJ9.59dG5F-n8Sp3_YjZfgeQRw';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/roxyi/cjklgdkzk0udo2sqksclk10sj',
    center: [-73.98, 40.75],
	zoom: 12
});

map.on('load', function() {
	map.addLayer({
		id: 'ridership',
		type: 'circle',
		source: {
			type: 'vector',
			url: 'mapbox://roxyi.7q09tsrf'
		},
		'source-layer': 'subway_ridership',
		paint: {
			'circle-color': layerStyle.ridership_16.color,
			'circle-radius': layerStyle.ridership_16.radius,
  			'circle-opacity': 0.7
		}
	});

	// map.on('click', 'ridership', function(e) {
	// 	var feature = e.features[0];
	// 	var diff = ((feature.properties.wkday_16 - 13404) * 100 / 13404).toFixed(1);
	// 	var wkday_1yr_growth = (feature.properties.wkday_1yr_ * 100).toFixed(1);
	// 	var wkday_5yr_growth = (feature.properties.wkday_5yr_ * 100).toFixed(1);
	// 	var wknd_1yr_growth = (feature.properties.wknd_5yr_a * 100).toFixed(1);
	// 	var wknd_5yr_growth = (feature.properties.wknd_5yr_a * 100).toFixed(1);
	// 	new mapboxgl.Popup().setLngLat([feature.geometry.coordinates[0], feature.geometry.coordinates[1]])
	// 	.setHTML(`	<p class="popup_title">${feature.properties.Station_Na} | ${controller.getTime()}</p>
	// 				<p class="popup_text">Lines: ${feature.properties.lines}</p>
	// 				<p class="popup_text">Avg. Daily Subway Ridership: <strong>${feature.properties.wkday_16.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong></p>
	// 				<p class="popup_text"><span style="color: ${diff >=0 ? '#1fa543' : '#ff1f1f'}"><strong>${diff}%</strong></span> ${diff >= 0 ? 'Above' : 'Below'} Average</p>
 //                  	<p class="popup_text">Rank: <strong>${feature.properties.wkday_rank}</strong></p>
 //                  	<p class="marker_text_line" style="font-weight:bold;border-top: 1px solid #ddd; padding-top:10px;">In 2016</p>
 //                  	<p class="popup_text"></p>
 //                  	<p class="popup_text" style="font-weight:bold;">Last 5 years</p>
 //                  	<p class="popup_text"></p>
	// 		`)
	// 	.addTo(map);
	// });

	map.on('mouseenter', 'ridership', function() {
		map.getCanvas().style.cursor = 'pointer';
	});

	map.on('mouseleave', 'ridership', function() {
		map.getCanvas().style.cursor = '';
	});
});

var layerSelectorModel = {
	currentType: null,

	ramp: {
		ridership2016: [300, 20000, 70000],
		oneYearGrowth: [-0.75, 0, 0.1],
		fiveYearGrowth: [-0.75, 0, 0.5]
	}
};

var mapModel = {
	weekday: {
		ridership2016: 'wkday_16',
		oneYearGrowth: 'wkday_1yr_',
		fiveYearGrowth: 'wkday_5yr_'
	},

	weekend: {
		ridership2016: 'wknd_16',
		oneYearGrowth: 'wknd_1yr_a',
		fiveYearGrowth: 'wknd_5yr_a'
	},

	getStyle: function(property, ramp) {
		return {
			color: [
				'interpolate',
		    	['linear'],
		    	['get', property],
		    	ramp[0],
		    	'#ff6e6e',
		    	ramp[1],
		    	'#ff5252',
		    	ramp[2],
		    	'#ff2a2a'
			],
			radius: [
				'interpolate',
			  	['exponential', 1.75],
			  	['zoom'],
			  	11,
			  	[
			    	'interpolate',
			    	['linear'],
			    	['get', property],
			    	ramp[0],
			    	1,
			    	ramp[1],
			    	4,
			    	ramp[2],
			    	7
			  	],
			  	14,
			  	[
			    	'interpolate',
			    	['linear'],
			    	['get', property],
			    	ramp[0],
			    	10,
			    	ramp[1],
			    	15,
			    	ramp[2],
			    	30
			  	],
			  	16,
			  	[
			    	'interpolate',
			    	['linear'],
			    	['get', property],
			    	ramp[0],
			    	20,
			    	ramp[1],
			    	30,
			    	ramp[2],
			    	70
			  	]
			]
		}
	}
}

var controller = {
	init: function() {
		layerSelectorModel.currentType = 'ridership2016';
		layerSelectorView.render();
	},

	getCurrentTypeData: function() {
		return layerSelectorModel.ramp[layerSelectorModel.currentType];
	},

	getTime: function() {
		return 'Weekday';
	},

	updateMap: function(property, ramp) {
		map.setPaintProperty('ridership', 'circle-color', mapModel.getStyle(property, ramp).color);
		map.setPaintProperty('ridership', 'circle-radius', mapModel.getStyle(property, ramp).radius);
	},

	updateSelector: function(type) {
		layerSelectorModel.currentType = type;
		layerSelectorView.render();
	}
};

var layerSelectorView = {
	firstStop: document.getElementById('firstStop'),
	secondStop: document.getElementById('secondStop'),
	thirdStop: document.getElementById('thirdStop'),

	render: function() {
		this.firstStop.textContent = `> ${controller.getCurrentTypeData()[0]}`;
		this.secondStop.textContent = `> ${controller.getCurrentTypeData()[1]}`;
		this.thirdStop.textContent = `> ${controller.getCurrentTypeData()[2]}`;
	}
};

document.querySelector('.radio-group').addEventListener('change', function(e) {
	var selected1 = document.querySelector(`input[name='selector1']:checked`).value;
	var selected2 = document.querySelector(`input[name='selector2']:checked`).value;
	controller.updateMap(mapModel[selected1][selected2], layerSelectorModel.ramp[selected2]);
	controller.updateSelector(selected2);
});

controller.init();