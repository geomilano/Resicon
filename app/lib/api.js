/*********************
*** SETTING / API ***
**********************/
var API_DOMAIN = "stg.wsvc.tt-i.co"; 
// APP authenticate user and key
var referenceUrl        = "http://"+API_DOMAIN+"/jsonServices.svc/GetReferenceData"; 
var loginUrl            = "http://"+API_DOMAIN+"/jsonServices.svc/Login"; 
var getPersonUrl		= "http://"+API_DOMAIN+"/jsonServices.svc/GetPerson"; 
var getFacilitiesUrl	= "http://"+API_DOMAIN+"/jsonServices.svc/GetFacilities"; 
var getFacilityAvailabilityUrl	= "http://"+API_DOMAIN+"/jsonServices.svc/GetFacilityAvailability"; 
var getAnnouncementsUrl = "http://"+API_DOMAIN+"/jsonServices.svc/GetAnnouncements"; 
var updateFacilityBookingUrl = "http://"+API_DOMAIN+"/jsonServices.svc/UpdateFacilityBooking"; 
var getFaultyListUrl    = "http://"+API_DOMAIN+"/jsonServices.svc/GetFaultyList"; 
var getFaultyUrl        = "http://"+API_DOMAIN+"/jsonServices.svc/GetFaulty"; 
var getFaultyTypesUrl   = "http://"+API_DOMAIN+"/jsonServices.svc/GetFaultyTypes"; 
var updateFaultyUrl		= "http://"+API_DOMAIN+"/jsonServices.svc/UpdateFaulty"; 
var updateVisitorUrl	= "http://"+API_DOMAIN+"/jsonServices.svc/UpdateVisitor"; 
var getVisitorListUrl	= "http://"+API_DOMAIN+"/jsonServices.svc/GetVisitorList"; 
var getVisitorUrl       = "http://"+API_DOMAIN+"/jsonServices.svc/GetVisitor"; 
var createAccountUrl	= "http://"+API_DOMAIN+"/jsonServices.svc/CreateAccount"; 
var forgetPasswordUrl   = "http://"+API_DOMAIN+"/jsonServices.svc/ForgetPassword";
var validateCodeUrl		= "http://"+API_DOMAIN+"/jsonServices.svc/ValidateInvitationCode";
var validateUsernameUrl	= "http://"+API_DOMAIN+"/jsonServices.svc/ValidateUsername";

/*********************
**** API FUNCTION*****
**********************/ 

exports.callByPost = function(e, onload, onerror){
	var url =  eval(e.url);
	console.log(url);
	var _result = contactServerByPost(url, e.params || {});   
	_result.onload = function(e) {   
		onload && onload(this.responseText); 
	};
		
	_result.onerror = function(e) { 
		onerror && onerror(); 
	};	
};
 
 
exports.getDomain = function(){
	return "http://"+API_DOMAIN+"/";	
};


/*********************
 * Private function***
 *********************/
function contactServer(url) { 
	var client = Ti.Network.createHTTPClient({
		timeout : 10000
	});
	client.open("POST", url);
	client.send(); 
	return client;
};

/*********************
 * Private function***
 *********************/
function contactServerByPost(url,records) {  
	var client = Ti.Network.createHTTPClient({
		timeout : 5000
	});
  
	client.open("POST", url); 
	client.setRequestHeader('Content-Type', 'application/json');   
	client.send(JSON.stringify(records));
	return client;
};

function onErrorCallback(e) { 
	// Handle your errors in here
	COMMON.createAlert("Error", e);
};
