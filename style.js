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