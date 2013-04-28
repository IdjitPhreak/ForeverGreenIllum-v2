/*jshint devel: true, browser: true, jquery: true, strict: true */
/*global App: false */

App.Main = (function() {
	'use strict';
	// Application Constructor
	function Main() {
		console.log("debug: App constructor called");
		bindEvents();
		var clientForm = null;
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
	

	var resultFormOne = template({
        legalBusinessName: initBusinessName,
        contactName: initContactName,
        contactTitle: initContactTitle,
        contactEmail: initContactEmail,
        contactPhone: initContactPhone,
        hoursOfOperation: initHoursOfOperation,//three different text fields separate accordingly
        facilityType: initFacilityType,
        qualifiedEPACT: initQualifiedEPACT,
        fuelType: initFuelType,
        utilityCompany: initUtilityCompany,
        meterNumber: initMeterNumber,
        accountNumber: initAccountNumber
    }); 
	var resultFormTwo = template({
        buildingAge: initBuildingAge,// separated into month and year input fields combine into one field named buildingAge
        lightingAge: initLightingAge,
        energyBudget: initEnergyBudget,
        taxDeduction: initTaxDeduction,
        existingLightControl: initExistingLightControl,
        decisionMakerName: initDecisionMakerName,
        reviewedSamples: initReviewedSamples,
        installationRequired: initInstallationRequired,
        outsideContractor: initOutsideContractor
    });   
	
	var resultFormRooms = template({
		spaceID: initSpaceID,
		spaceLength: initSpaceLength,
		spaceWidth: initSpaceWidth,
		spaceHeight: initSpaceHeight,
		interiorExterior: initInteriorExterior,
		numLightSwitches:  initNumLightSwitches
    });    
//	function resetForm($form) {
//	    $form.find('input:text, input:password, input:file, select, textarea').val('');
//	    $form.find('input:radio, input:checkbox')
//	         .removeAttr('checked').removeAttr('selected');
//	};
//	App.Main.prototype.doSomething = 
	return Main;
	
	
	
	App.Main.prototype.saveForm = function($form) {
		var data = { details: 'ClientInfoForm', data: JSON.stringify(clientForm) };
		$.ajax(
		{
			type: "POST",
			url: '/saveClientForm',
			dataType: "json",
			cache: 'False',
			data: data, 
			success: function(data) {
				display.showDebug(data.result);
			},
			error: display.showError			
		});	
	}
	
	
	
	
	
})();

$(document).ready(function() {
	"use strict";
	new App.Main();
	jQuery.validator.setDefaults({ 
	    debug: true 
	});
	//11111111111111111111111111111111111111111
	function showValues($form) {
	      var str = $("form").serialize();
	      $("#results").text( str );
	    }
	
	$('form').submit(function() {
	    $.ajax({
	       type: 'POST', 
	       dataType: 'json', 
	       url: 'clientForm.php', 
	       data: $(this).serialize(), 
	       success: function(data) { 
	           alert(data.message); 
	       },
	       failure: function (data) {
	           alert('Please try again');
	       }
	    });
	 });
	//111111111111111111111111111111111111111111
	var roomCount = {
			//insert form information into array
	};   
	
	
	 $("#clientInfo").validate();
	 $("a.check").click(function() {
	   if( $("#clientInfo").valid() == true){
	   return true;}
	   else{
		   alert("Field entry still required!");
		   return false;
	   }
	   showValues(clientInfo);
	 });
	
	
	var i =0;
	$('#addroom').click(function(e){
		e.preventDefault();
		var myForm = $('#roomForm').validate();
		// alert("Valid: " + $("#roomForm").valid());
		if( myForm == true){
		roomCount[i] = $('#roomForm').vals();
		roomCount++;
		//saves to 
		$(function() {      
	        $.ajax({
	            type: "POST",//append to json file ///Post when to server
	            url: "/www/Json/RoomSpecsForm",
	            dataType: "Json",
	            data: {spaceID: $('#spaceid').val(),
	            	length: $('#spacelength').val(),
	            	width: $('#spacewidth').val(),
	            	height: $('#spaceheight').val(),
	            	photo: ,//get photo path 
	            	sqFootage: $('#spacesqfoot').val(),
	            	roomType: $('#Interior').val()},//if else for interior or exterior based off of clicked event
	            	roomPurpose: $('#spaceactivity').val(),
	            	naturalLighting: $('#spacesqfoot').val(),//if else for lighting based off of clicked event
	            	numberLightSwitches: $('#spacesqfoot').val(),
	            	sampleReviewed: $('#spacesqfoot').val(),
	            success: function(){
	                alert( "Data Saved: " );
	            }
	         });
	    });
		//clear form 
		$("#rxInfoForm").children('input, select, textarea').val('');
		  $("#rxInfoForm").children('input[type=radio], input[type=checkbox]').each(function()
		  {
		     this.checked = false;
		     // or
		     $(this).attr('checked', false);
		  });
		};
		//enable duplication, deletion buttons
		
	});
	
	
	  // $('#contractor').hide();
							// if($('installYes').click() == true)
							//$('#contractor').show();
	//make this more elegant - have the functions stored above in the private methods
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
		for (i; i <= 6; i++) {
			// var set = "chkBox-0"+i;
			//console.log(set);
			//var temp = document.getElementById('set').checked;
			if (document.getElementById("chkBox-0" + i).checked == true)
				//if (set==true)
				tempVar++;

			else
				tempVar--;

			if (tempVar == 6) {
				$("#startBtn").show();
			} else
				$("#startBtn").hide();
		}

	});
	
	//display sqFootage
//	$("#spaceheight").focus(function(){
//	var lng = $("#spacelength").val();
//	var wid = $("#spacewidth").val();
//	var sqFoot = lng * wid;
//	$("#spacesqfoot").css("visable");
//	$("#spacesqfoot").val(sqFoot);
//	});
	
	});

