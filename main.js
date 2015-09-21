
// var enteredTime = 0;
// var inandOut = function (evt) {
// 	  enteredTime = new Date();
// 	  console.log('e',enteredTime)
// 	}, function() {
// 	  var ctime = new Date();
// 	  var time = ctime.getTime() - enteredTime.getTime();
// 	  console.log('time spend ' + time/1000 + 'sec')
// }
// 
var mouseenterTime = 0;

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
			console.log('time', time/1000);
			return time/1000;
	}

$(document).on('ready', function() {

	var timeCount = 0;
	var countToSignUp;
	var signedUp = false;
	var intervalID;
	var scrollRangeList = [];
	var navbarTime = [];
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

	var enteredTime = 0;
	$('.jumbotron').hover(function(evt) {
	  enteredTime = new Date();
	  console.log('e',enteredTime)
	}, function() {
	  var ctime = new Date();
	  var time = ctime.getTime() - enteredTime.getTime();
	  console.log('time spend ' + time/1000 + 'sec')
	})

	var mouseenterTime = 0;
	$('.navbar').bind('mouseenter mouseleave', inAndOut)

});



