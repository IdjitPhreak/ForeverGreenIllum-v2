/*jshint devel: true, browser: true, jquery: true, strict: true */
/*global App: false */

App.Main = (function() {
	'use strict';
	// Application Constructor
	function Main() {
		console.log("debug: App constructor called");
		bindEvents();
	}

	/*     
	 * Bind any events that are required on startup. 
	 * Common events: 'load', 'deviceready', 'offline', and 'online'. 
	 */
	var bindEvents = function() {
		console.log("debug: App bindEvents called");
		document.addEventListener('deviceready', onDeviceReady, false);
		$('#startBtn').hide();
	};

	// Called when device is fully initialized   
	var onDeviceReady = function() {
		console.log("debug: App onDeviceReady called");
		showProgramState();
		showDate();
		
	};

	var showProgramState = function() {
		var listeningElement = $('.listening');
		var receivedElement = $('.received');
		listeningElement.attr('style', 'display:none;');
		receivedElement.attr('style', 'display:block;');
	};

	var showDate = function() {
		console.log('debug: showDate called');
		var util = new App.Utility();
		$("#curDate").html("Current Date: " + util.getToday());
	};

	

	return Main;
})();

$(document).ready(function() {
	"use strict";
	new App.Main();
	var roomCount = {
			//insert form information into array
	}          
	$('#addroom').click(function(){
		//create a new page of room specifications
		
		//add last room to the room list
		//enable duplication, deletion buttons
	})
	
	
	  // $('#contractor').hide();
							// if($('installYes').click() == true)
							//$('#contractor').show();
	
	
	
	//make this more elegant - have the functions stored above in the private methods perhaps
	$('#snapshot').click( function() {
		navigator.camera.getPicture(onCameraSuccess, onCameraError, {quality: 50});//add the server side location of storage here
		console.log('debug: takePhoto called');
	});
	var onBodyLoad = function(){
		document.addEventListener("deviceready", App.Main.onDeviceReady, false);
	}
	var onCameraSuccess = function(imageURL) {
		navigator.notification.alert("onCameraSuccess: " + imageURL);
		console.log('debug: onCameraSuccess called');
	}
	var onCameraError = function(e) {
		navigator.notification.alert("onCameraError: " + e);
		console.log('debug: onCameraError called');
	}
	
	// this function call insures safety check before begining survey
	$('#safetyForm').change(function() {
		console.log('debug: clickEvent called');
		var i = 1;
		var tempVar = 0;
		for (i; i <= 7; i++) {
			// var set = "chkBox-0"+i;
			//console.log(set);
			//var temp = document.getElementById('set').checked;
			if (document.getElementById("chkBox-0" + i).checked == true)
				//if (set==true)
				tempVar++;

			else
				tempVar--;

			if (tempVar == 7) {
				$("#startBtn").show();
			} else
				$("#startBtn").hide();
		}

	});

});
