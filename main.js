mapboxgl.accessToken = 'pk.eyJ1Ijoicm94eWkiLCJhIjoiY2lrcThzbDZuMDA2eHVhbTdtd242OGMwaiJ9.59dG5F-n8Sp3_YjZfgeQRw';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/roxyi/cjklgdkzk0udo2sqksclk10sj',
    center: screen.width <= 1280 ? [-73.98, 40.75] : [-73.94, 40.75],
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
			'circle-color': mapModel.wkday_16_color,
			'circle-radius': mapModel.wkday_16_radius,
  			'circle-opacity': 0.7
		}
	});

	map.on('click', 'ridership', function(e) {
		var feature = e.features[0];
		var diff = ((feature.properties.wkday_16 - 13404) * 100 / 13404).toFixed(2);
		new mapboxgl.Popup().setLngLat([feature.geometry.coordinates[0], feature.geometry.coordinates[1]])
		.setHTML(`	<p class="popup_title">${feature.properties.Station_Na} | ${controller.getTime()}</p>
					<p class="popup_text">Lines: ${feature.properties.lines}</p>
					<p class="popup_text">Avg. Daily Subway Ridership: <strong>${feature.properties.wkday_16.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong></p>
					<p class="">
			`)
		.addTo(map);
	});
});

var layerSelectorModel = {};

var mapModel = {
	wkday_16_color: {
		property: 'wkday_16',
		type: 'interval',
		stops: [
			[300, "#ff6e6e"],
			[20000, "#ff5252"],
			[70000, "#ff2a2a"]
		]
	},
	wkday_16_radius: {
		property: "wkday_16",
		type: "exponential",
        stops: [
      [{
        "zoom": 12,
        "value": 300
      }, 1],
      [{
        "zoom": 12,
        "value": 20000
      }, 10],
      [{
        "zoom": 12,
        "value": 70000
      }, 20],
      [{
        "zoom": 14,
        "value": 300
      }, 10],
      [{
        "zoom": 14,
        "value": 20000
      }, 15],
      [{
        "zoom": 14,
        "value": 70000
      }, 40],
      [{
        "zoom": 16,
        "value": 300
      }, 20],
      [{
        "zoom": 16,
        "value": 20000
      }, 30],
      [{
        "zoom": 16,
        "value": 70000
      }, 80]
    ]
    }
};

var controller = {
	init: function() {
		mapView.init();
	},

	getTime: function() {
		return 'Weekday';
	}
};

var layerSelectorView = {};

var mapView = {
	render: function() {
		
	}
};

// controller.init();