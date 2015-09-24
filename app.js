// var data = [131, 32 ,44, 22, 88, 99, 134, 20];
// var w = 400;
// var h = 300;

// var margin ={
// 	top: 10,
// 	bottom: 10,
// 	left: 10,
// 	right: 10
// }

// var width = w - margin.left - margin.right;
// var height = h - margin.top - margin.bottom;
// // use linear to get rid of actual size
// var x = d3.scale.linear()
// 			.domain([0,d3.max(data)])
// 			.range([0,width]);

// var y = d3.scale.linear()
// 			.domain([0,data.length])
// 			.range([0,height]);			

// var svg = d3.select('.totals').append('svg')
// 			.attr("id", "barChart")
// 			.attr("width", w)
// 			.attr("height", h);




// var chart = svg.append("g")
// 				.classed("display",true)
// 				.attr("transform", "translate(" + margin.left +","+ margin.top+")")


// function plot(params) {

// 	this.selectAll('.bar')
// 	.data(params.data)
// 	.enter()
// 		.append("rect")
// 		// more flexible use classed
// 		.classed("bar", true)
// 		.attr("class", "bar")
// 		.attr("x", 0)
// 		.attr("y", function(d,i) {
// 			return y(i);
// 		})
// 		.attr("width", function(d,i) {
// 			// data for d i for index
// 			// x allows us to scale 
// 			return x(d);
// 		})
// 		.attr("height",function() {
// 			return y(1) -1
// 		});
// this.selectAll(".bar-label")
// 	.data(params.data)
// 	.enter()
// 		.append('text')
// 		.classed('bar-label', true)
// 		.attr("x", function(d,i) {
// 			return x(d);
// 		})
// 		.attr('dx', -4)
// 		.attr('y', function(d,i) {
// 			return y(i);
// 		})
// 		.attr("dy", function(d,i) {
// 			return y(1)/1.5+2;
// 		})
// 		.text(function(d,i) {
// 			return d;
// 		});

// }

// plot.call(chart, {
// 	data:data
// });


var heatInfo = (function() {

	var timeCount = 0;
	// var countToSignUp;
	// var signedUp = false;
	// var intervalID;
	// var windowHeight = $(window).height();

	var distanceScrolled = [];
	// 
	// div time
	var enteredTime = 0;
	// var off =  dw_getScrollOffsets();
	var doc = document.documentElement;
	var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

	var jumbotronHeight = $('.jumbotron').height();
	var panelHeadingHeight = $('.panel-heading').height();
	var panelBodyHeight = $('.panel-body').height();
	var listGroupHeight = $('.list-group').height();

	var mapping = {
	    ".navbar": {
	        total: 0,
	        times: []
	    },
	    ".list-group": {
	        total: 0,
	        times: []
	    },
	    ".jumbotron": {
	    	total: 0,
	    	times: []
	    },
	    ".panel-heading": {
	    	total: 0,
	    	times: []
	    },
	    ".panel-body": {
	    	total: 0,
	    	times: []
	    }
	};
	
	return {
		add: add,
		sortNumber: sortNumber,
		measure: measure,
		stats: stats,
		selector: selector,
		mapping: mapping
	}


	// Object.keys returns an array of a given objects own enumerable properties
	function selector(selector) {	
	  $(selector).hover(function(evt) {
	  	console.log('hover')
	    enteredTime = new Date();
	  }, function() {
	    var ctime = new Date();
	    var time = (ctime.getTime() - enteredTime.getTime())/1000;
	    mapping[selector].times.push(time);
	    mapping[selector].total = Math.round(mapping[selector].times.reduce(add, 0) );
	    
	  	});
	}

	function add(a,b) {
			return a +b;
	}
	// reverse sort allows me to get the first instance of the array
	function sortNumber(a,b) {
		return b -a;
	}

	function measure() {


		distanceScrolled.sort(add);
		var height = ($(this).height());
		distanceScrolled.push(height);

		console.log('distanceScrolled', distanceScrolled);
	}

	function stats() {
		var user = distanceScrolled.sort(sortNumber);
		var unique = _.uniq(user, false);
		var reduce = unique.reduce(add);
		var percentViewed = Math.round((reduce/window.bodyHeight)*100)/100;
		

		console.log('percentViewed',percentViewed);
		console.log('reduce',reduce);
		console.log('uniq', unique);



		$('.jumbotronTotal').empty().append(mapping[".jumbotron"].total);
		$('.navbarTotal').empty().append(mapping[".navbar"].total);
		$('.list').empty().append(mapping[".list-group"].total);
		$('.panelHead').empty().append(mapping[".panel-heading"].total);
		$('.panelBody').empty().append(mapping[".panel-body"].total);
		$('.timeCount').empty().append(timeCount);
		$('.distanceTotal').empty().append(user[0]);
		$('.percentage').empty().append(percentViewed);
	}

})();


$(document).on('ready', function() {
	// overall timer	
	var timeCount = 0;
	var countToSignUp;
	var signedUp = false;
	var intervalID;
	var windowHeight = $(window).height();

	var timer = function(command) {
		if(command === 'start') {
			console.log('in', timeCount);
			intervalID = setInterval(function() {timeCount++; heatmapSectionCounter(); }, 1000);
		}
		else {
			clearInterval(intervalID);
		}
	}
	timer("start");

	setTimeout(function(){
		// body height
		window.bodyHeight = $("body").height();
		console.log('windowHeight',window.bodyHeight)
		window.heatmapSectionTotal = Math.ceil(bodyHeight/300);
		console.log('section',window.heatmapSectionTotal)
		window.heatmapSectionRanges = [];
		for (var i = 0; i < heatmapSectionTotal; i++) {
			heatmapSectionRanges.push([windowHeight * i, windowHeight * i + windowHeight, 0]);
			};
		window.heatmapSectionCounter = function() {
		for (var i = 0; i < heatmapSectionTotal; i++) {
			if($("body").scrollTop() < heatmapSectionRanges[i][1]  && $("body").scrollTop() > heatmapSectionRanges[i][0]) {
				heatmapSectionRanges[i][2]++;
				}
			}
		}

	}, 500);


	var mapping = {
	    ".navbar": {
	        total: 0,
	        times: []
	    },
	    ".list-group": {
	        total: 0,
	        times: []
	    },
	    ".jumbotron": {
	    	total: 0,
	    	times: []
	    },
	    ".panel-heading": {
	    	total: 0,
	    	times: []
	    },
	    ".panel-body": {
	    	total: 0,
	    	times: []
	    }
	};

	Object.keys(mapping).forEach(heatInfo.selector);
	// identifies what the user has moused over.  stats will take the hightest one
	$('.jumbotron').on('mouseover', heatInfo.measure);
	$('.navbarTotal').on('mouseover', heatInfo.measure);
	$('.panel-body').on('mouseover', heatInfo.measure);
	$('.panel-heading').on('mouseover', heatInfo.measure);
	$('footer').on('mouseover', heatInfo.measure);

	// $('.col-md-3').on('mouseover', measure);

	//totals statistics on user time 
	$('.stats-button').on('click', heatInfo.stats);

});



