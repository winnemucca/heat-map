// var timeMonitering = (function() {
// 	var mouseenterTime = 0;
// 	var timeArray = [];
// 	var panelHeadingArray = [];
// 	var panelBodyArray = [];
// 	var nav = [];
	
// 	return {
// 		inAndOut: inAndOut
// 	}

// 	function inAndOut(evt) {
// 		var currentTime = new Date();
// 		var mouseoverTime;
// 		if(evt.type === 'mouseenter') {
// 			mouseenterTime = currentTime.getTime();
// 		}
// 		else if (evt.type === 'mouseleave') {
// 			mouseoverTime =currentTime.getTime(); 
			
// 		}

// 		var time =mouseoverTime - mouseenterTime;
// 		if(time >0) {
// 			timeArray.push(time/1000);
// 		}
// 		// console.log('time array added',Math.round(timeArray.reduce(add,0) ));
// 		return time/1000;
// 	}

// 	function add(a,b) {
// 		return a +b;
// 	}
// 	
// 	})()