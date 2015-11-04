var args = arguments[0] || {};
var FacilityId = args.id || "";
 
Alloy.Globals.module = "booking";

if(OS_ANDROID){
	MENU.construct($,$.bookingView.contentView);  
	MENU.initMenu();
}else{
	MENU.construct($,"");
}
COMMON.construct($); 
COMMON.addSwipeUpEvent();
$.bookingView.headerView.titleLabel.text= Ti.App.Properties.getString('Title') + " " +Ti.App.Properties.getString('FirstName') + " "+Ti.App.Properties.getString('LastName')+", what facilities would you like to book?";
 
var calendar = CAL.getCalendar(); 
$.bookingView.calendar.add(calendar);
 
var getDateFromCalendar = function(e){ 
	COMMON.showLoading();
	var param = {
		"Header" : {
			"AccountSignature" :{
				"AccountId" : 0,
				"Signature" : Ti.App.Properties.getString('Signature')
			},
			"UUID" : Ti.App.Properties.getString('deviceToken')
		},
		"SearchFacilities" : [{
			"FacilityId" : FacilityId
		}], 
		"SearchStartDate"  : e.date +" 00:00:00",
		"SearchEndDate" : e.date +" 23:59:59"
	};
	 
	API.callByPost({url:"getFacilityAvailabilityUrl", params: param}, function(responseText){
		COMMON.hideLoading();
		var res = JSON.parse(responseText); 
		var win = Alloy.createController("bookingDetails",{data:res, date: e.date2, facility_id : FacilityId }).getView(); 
		COMMON.openWindow(win);   
	});
};

Ti.App.addEventListener('getDateFromCalendar',getDateFromCalendar);

$.bookingView.facilities.addEventListener('click', function(){
	Alloy.Globals.module = "facilities";
	COMMON.closeWindow($.myWin); 
});

$.myWin.addEventListener("close", function(){ 
    Ti.App.removeEventListener('getDateFromCalendar',getDateFromCalendar);
});

