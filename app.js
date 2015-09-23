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
// 	
// 	
// 	
// 	
// 	// $('.jumbotron').hover(function(evt) {
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