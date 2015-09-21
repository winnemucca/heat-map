var timeMonitering = (function() {
	var mouseenterTime = 0;
	var timeArray = [];
	var panelHeadingArray = [];
	var panelBodyArray = [];
	
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
		console.log('time array added',Math.round(timeArray.reduce(add,0) ));
		return time/1000;
	}

	function add(a,b) {
		return a +b;
	}

		// var enteredTime = 0;
	// $('.jumbotron').hover(function(evt) {
	//   enteredTime = new Date();
	//   console.log('e',enteredTime)
	// }, function() {
	//   var ctime = new Date();
	//   var time = ctime.getTime() - enteredTime.getTime();
	//   console.log('time spend ' + time/1000 + 'sec')
	// })

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




	$('.jumbotron').bind('mouseenter mouseleave', timeMonitering.inAndOut);

	$('div').on('mouseenter', function() {
		var div = $(this).children().attr('class');
		console.log('div',div);
	})

	function findArray() {

	}
	findArray();

	$('.navbar').bind('mouseenter mouseleave', timeMonitering.inAndOut);

	$('.panel-heading').bind('mouseenter mouseleave', timeMonitering.inAndOut);

	$('.panel-body').bind('mouseenter mouseleave', timeMonitering.inAndOut);

	$('.list-group').bind('mouseenter mouseleave', timeMonitering.inAndOut);



});



