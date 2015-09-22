var timeMonitering = (function() {
	var mouseenterTime = 0;
	var timeArray = [];
	var panelHeadingArray = [];
	var panelBodyArray = [];
	var nav = [];
	
	return {
		inAndOut: inAndOut
	}

	function inAndOut(evt) {
		var currentTime = new Date();
		var mouseoverTime;
		if(evt.type === 'mouseenter') {
			mouseenterTime = currentTime.getTime();
		}
		else if (evt.type === 'mouseleave') {
			mouseoverTime =currentTime.getTime(); 
			
		}

		var time =mouseoverTime - mouseenterTime;
		if(time >0) {
			timeArray.push(time/1000);
		}
		// console.log('time array added',Math.round(timeArray.reduce(add,0) ));
		return time/1000;
	}

	function add(a,b) {
		return a +b;
	}

	

})();


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



	// ideal refactor mode.  Right now cannot individual push time into own arrays//
	
	$('.jumbotron').bind('mouseenter mouseleave', timeMonitering.inAndOut);

	$('.navbar').bind('mouseenter mouseleave', timeMonitering.inAndOut);

	$('.panel-heading').bind('mouseenter mouseleave', timeMonitering.inAndOut);

	$('.panel-body').bind('mouseenter mouseleave', timeMonitering.inAndOut);

	$('.list-group').bind('mouseenter mouseleave', timeMonitering.inAndOut);
	// end 
	


	var enteredTime = 0;
	var jumbotronArray = [];
	var panelHeadingArray = [];
	var panelBodyArray = [];
	var listGroupArray = [];
	var navArray = [];
	var jumbotronHeight = $('.jumbotron').height();
	var panelHeadingHeight = $('.panel-heading').height();
	var panelBodyHeight = $('.panel-body').height();
	var listGroupHeight = $('.list-group').height();

	$('.stats-button').on('click', function() {
		var total = Math.round(jumbotronArray.reduce(add,0) )
		$('.jumbotronTotal').empty().append(total);
	})


	
	$('.jumbotron').hover(function(evt) {
	  enteredTime = new Date();
	}, function() {
	  var ctime = new Date();
	  var time = (ctime.getTime() - enteredTime.getTime())/1000;

	  jumbotronArray.push(time);
	  console.log('this', $(this));
	  // console.log('added',Math.round(jumbotronArray.reduce(add,0) ));
	})
	console.log('jumbo array', jumbotronArray);
	$('.panel-heading').hover(function(evt) {
	  enteredTime = new Date();
	  // console.log('e',enteredTime)
	}, function() {
	  var ctime = new Date();
	  var time = (ctime.getTime() - enteredTime.getTime())/1000;

	  panelHeadingArray.push(time);
	  // console.log('panelHeadingArray',panelHeadingArray)
	  // console.log('panel added',Math.round(panelHeadingArray.reduce(add,0) ));
	})
	$('.panel-body').hover(function(evt) {
	  enteredTime = new Date();
	}, function() {
	  var ctime = new Date();
	  var time = (ctime.getTime() - enteredTime.getTime())/1000;

	  panelBodyArray.push(time);
	  // console.log('panelBodyArray',panelBodyArray)
	  // console.log('panel-body added',Math.round(panelBodyArray.reduce(add,0) ));
	})

	$('.list-group').hover(function(evt) {
	  enteredTime = new Date();
	}, function() {
	  var ctime = new Date();
	  var time = (ctime.getTime() - enteredTime.getTime())/1000;

	  listGroupArray.push(time);
	  // console.log('listGroupArray',listGroupArray)
	  // console.log('listGroupArray added',Math.round(listGroupArray.reduce(add,0) ));
	})

	function add(a,b) {
			return a +b;
	}

	var navBarArray = [];
	var listArray = [];

	var mapping = {
	  ".navbar": navBarArray,
	  ".list-group": listArray
	};

	




// Object.keys returns an array of a given objects own enumerable properties
	Object.keys(mapping).forEach(function(selector) {	
	  $(selector).hover(function(evt) {
	  	console.log('mapping',mapping);
		console.log('selector',selector);
	    enteredTime = new Date();
	  }, function() {
	    var ctime = new Date();
	    var time = (ctime.getTime() - enteredTime.getTime())/1000;
	    mapping[selector].push(time);

	    var reduce = Math.round(navBarArray.reduce(add,0) );
	    console.log(reduce);
	  	});
	})

});



// Math.round(navBarArray.reduce(add,0) );