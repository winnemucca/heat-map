$(document).on('ready', function() {
	// overall timer
	var timeCount = 0;
	var countToSignUp;
	var signedUp = false;
	var intervalID;
	var distanceScrolled = [];
	// 
	var windowHeight = $(window).height();
	// div time
	var enteredTime = 0;
	// var off =  dw_getScrollOffsets();
	var doc = document.documentElement;
	var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
	console.log( top);


	var start = function() {

	}
	
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
	}

	var timer = function(command) {
		if(command === 'start') {

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
		console.log(window.bodyHeight)
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

		console.log('ranges',window.heatmapSectionRanges)
	}, 500);



// Object.keys returns an array of a given objects own enumerable properties
	Object.keys(mapping).forEach(function(selector) {	
	  $(selector).hover(function(evt) {
	    enteredTime = new Date();
	  }, function() {
	    var ctime = new Date();
	    var time = (ctime.getTime() - enteredTime.getTime())/1000;
	    mapping[selector].times.push(time);
	    mapping[selector].total = Math.round(mapping[selector].times.reduce(add, 0) );
	    
	  	});
	})

	function add(a,b) {
			return a +b;
	}

	function sortNumber(a,b) {
		return b -a;
	}

	function measure() {
		distanceScrolled.sort(add);
		var height = ($(this).height());
		console.log(typeof height)
		distanceScrolled.push(height);
		console.log(distanceScrolled);
	}

	function stats() {
		var user = distanceScrolled.sort(sortNumber);

		$('.jumbotronTotal').empty().append(mapping[".jumbotron"].total);
		$('.navbarTotal').empty().append(mapping[".navbar"].total);
		$('.list').empty().append(mapping[".list-group"].total);
		$('.panelHead').empty().append(mapping[".panel-heading"].total);
		$('.panelBody').empty().append(mapping[".panel-body"].total);
		$('.timeCount').empty().append(timeCount);
		$('.distanceTotal').empty().append(user[0])


	}

	

	$('footer').on('mouseover', function() {
		var height=window.bodyHeight - top;
		distanceScrolled.push(height);
	})

	$('.jumbotron').on('mouseover', measure);
	$('.navbarTotal').on('mouseover', measure);
	$('.panel-body').on('mouseover', measure);
	$('.panel-heading').on('mouseover', measure);

	//totals statistics on user time 
	$('.stats-button').on('click', stats);

});



// function dw_getScrollOffsets() {
	//     var doc = document, w = window;
	//     var x, y, docEl;
	    
	//     if ( typeof w.pageYOffset === 'number' ) {
	//         x = w.pageXOffset;
	//         y = w.pageYOffset;
	//     } else {
	//         docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat')?
	//                 doc.documentElement: doc.body;
	//         x = docEl.scrollLeft;
	//         y = docEl.scrollTop;
	//     }
	//     return {x:x, y:y};
	// }
	// var start;
	// console.log(off.y)
	