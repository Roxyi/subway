mapboxgl.accessToken = 'pk.eyJ1Ijoicm94eWkiLCJhIjoiY2lrcThzbDZuMDA2eHVhbTdtd242OGMwaiJ9.59dG5F-n8Sp3_YjZfgeQRw';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/roxyi/cjklgdkzk0udo2sqksclk10sj',
    center: [-73.98, 40.75],
	zoom: 12
});

var layerSelector = document.querySelector('.layer_selector');
var radioGroup = document.querySelector('.radio-group');
var legend = document.querySelector('.legend');
var legendText = document.querySelector('.legend_text');
var legendIcon = document.querySelector('#legendIcon');

layerSelector.addEventListener('click', function(e) {
	expandLegend();
});

function expandLegend() {
	layerSelector.style.cssText = `
		bottom: 50px;
        left: 50px;
        height: auto;
        width: auto;
        border-radius: 4px;
        padding: 20px 20px 5px 20px;`;
	radioGroup.style.display = 'block';
	legend.style.display = 'block';
	legendText.style.display = 'flex';
	legendIcon.style.display = 'none';
}

function hideLegend() {
	layerSelector.style.cssText = `
		bottom: 40px;
    	left: 10px;
    	height: 50px;
    	width: 50px;
    	border-radius: 50px;
        padding: 0;`;
	radioGroup.style.display = 'none';
	legend.style.display = 'none';
	legendText.style.display = 'none';
	legendIcon.style.display = 'block';
}

var daySelected = 'weekday';

var popup = new mapboxgl.Popup();

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
			    	5,
			    	ramp[2],
			    	15
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
			    	40
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
		map.on('load', mapView.init);
	},

	getCurrentTypeData: function() {
		return layerSelectorModel.ramp[layerSelectorModel.currentType];
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

var mapView = {
	init: function() {
		map.addLayer({
			id: 'ridership',
			type: 'circle',
			source: {
				type: 'vector',
				url: 'mapbox://roxyi.7q09tsrf'
			},
			'source-layer': 'subway_ridership',
			paint: {
	  			'circle-opacity': 0.7
			}
		});

		controller.updateMap('wkday_16', [300, 20000, 70000]);

		map.on('click', 'ridership', function(e) {
			var feature = e.features[0];
			var ridership = daySelected === 'weekday' ? feature.properties.wkday_16 : feature.properties.wknd_16;
			var day = daySelected === 'weekday' ? 'Weekday' : 'Weekend';
			var one_yr_growth = daySelected === 'weekday' ? parseInt(feature.properties.wkday_1yr_ * 100) : parseInt(feature.properties.wknd_1yr_a * 100);
			var five_yr_growth = daySelected === 'weekday' ? parseInt(feature.properties.wkday_5yr_ * 100) : parseInt(feature.properties.wknd_1yr_a * 100);
			popup.setLngLat([feature.geometry.coordinates[0], feature.geometry.coordinates[1]])
			.setHTML(`<p class="popup_title">${feature.properties.Station_Na} | ${day}</p>
				<p class="popup_text">Lines: <span>${feature.properties.lines}</span></p>
				<p class="popup_text">Avg. Daily Subway Ridership: <strong>${ridership.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong></p>
	            <p class="popup_text">Rank: <strong>${feature.properties.wkday_rank}</strong></p>
	            <p class="popup_text">In 2016 growth: <strong>${one_yr_growth}%</strong></p>
	            <p class="popup_text">Last 5 years growth: <strong>${five_yr_growth}%</strong></p>`)
			.addTo(map);
		});

		map.on('click', function(e) {
			if (window.innerWidth <= 414) {
				hideLegend();
			}
		});

		map.on('mouseenter', 'ridership', function() {
			map.getCanvas().style.cursor = 'pointer';
		});

		map.on('mouseleave', 'ridership', function() {
			map.getCanvas().style.cursor = '';
		});
	}
}

radioGroup.addEventListener('change', function(e) {
	var selected1 = document.querySelector(`input[name='selector1']:checked`).value;
	var selected2 = document.querySelector(`input[name='selector2']:checked`).value;
	controller.updateMap(mapModel[selected1][selected2], layerSelectorModel.ramp[selected2]);
	daySelected = selected1;
	controller.updateSelector(selected2);
	popup.remove();
});

controller.init();