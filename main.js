$(document).on('ready', function() {
	var timeCount = 0;
	var countToSignUp;
	var signedUp = false;
	var intervalID;
	var scrollRangeList = [];
	var windowHeight = $(window).height();

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
		window.bodyHeight = $("body").height();
		console.log('body height',window.bodyHeight)
		window.heatmapSectionTotal = Math.ceil(bodyHeight/300);
		// console.log('section',window.heatmapSectionTotal)
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

	$(document).on('scroll', function(){
		scrollRangeList.push([$('body').scrollTop(), $('body').scrollTop() + windowHeight]);
		// console.log('list',scrollRangeList);
		
	});


	// end 
	
	var enteredTime = 0;
	
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

// Object.keys returns an array of a given objects own enumerable properties
	Object.keys(mapping).forEach(function(selector) {	
	  $(selector).hover(function(evt) {
	  	console.log('mapping',mapping);
		console.log('selector',selector);
	    enteredTime = new Date();
	  }, function() {
	    var ctime = new Date();
	    var time = (ctime.getTime() - enteredTime.getTime())/1000;
	    mapping[selector].times.push(time);
	    mapping[selector].total = mapping[selector].times.reduce(add, 0);
	    
	  	});
	})

	function add(a,b) {
			return a +b;
	}

	// $('.stats-button').on('click', function() {
	// 	var total = Math.round(jumbotronArray.reduce(add,0) )
	// 	$('.jumbotronTotal').empty().append(total);
	// })

});



// $('.jumbotron').hover(function(evt) {
// 	  enteredTime = new Date();
// 	}, function() {
// 	  var ctime = new Date();
// 	  var time = (ctime.getTime() - enteredTime.getTime())/1000;

// 	  jumbotronArray.push(time);
// 	  console.log('this', $(this));
// 	  // console.log('added',Math.round(jumbotronArray.reduce(add,0) ));
// 	})
// 	console.log('jumbo array', jumbotronArray);
// 	$('.panel-heading').hover(function(evt) {
// 	  enteredTime = new Date();
// 	  // console.log('e',enteredTime)
// 	}, function() {
// 	  var ctime = new Date();
// 	  var time = (ctime.getTime() - enteredTime.getTime())/1000;

// 	  panelHeadingArray.push(time);

// 	})
// 	$('.panel-body').hover(function(evt) {
// 	  enteredTime = new Date();
// 	}, function() {
// 	  var ctime = new Date();
// 	  var time = (ctime.getTime() - enteredTime.getTime())/1000;

// 	  panelBodyArray.push(time);
	
// 	})

// 	$('.list-group').hover(function(evt) {
// 	  enteredTime = new Date();
// 	}, function() {
// 	  var ctime = new Date();
// 	  var time = (ctime.getTime() - enteredTime.getTime())/1000;

// 	  listGroupArray.push(time);
	 
// 	})
// 	
// 	
// 	
// 	**************************
// 	
	// ideal refactor mode.  Right now cannot individual push time into own arrays//
	
	// $('.jumbotron').bind('mouseenter mouseleave', timeMonitering.inAndOut);

	// $('.navbar').bind('mouseenter mouseleave', timeMonitering.inAndOut);

	// $('.panel-heading').bind('mouseenter mouseleave', timeMonitering.inAndOut);

	// $('.panel-body').bind('mouseenter mouseleave', timeMonitering.inAndOut);

	// $('.list-group').bind('mouseenter mouseleave', timeMonitering.inAndOut);