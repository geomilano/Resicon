var args = arguments[0] || {};
var res = args.data || "";
var date = args.date || "";
var facility_id = args.facility_id || "";
var startDate;
var endDate;
Alloy.Globals.module = "bookingDetails";
if(OS_ANDROID){
	MENU.construct($,$.bookingDetailsView.contentView);  
	MENU.initMenu();
}else{
	MENU.construct($,"");
}
COMMON.construct($);  
COMMON.addSwipeUpEvent();

init();

function init(){
	var data = [];
	var arr = res.FacilityAvailability[0].FacilityAvailableDateTimes; //.FacilityAvailableDateTimes 
	$.bookingDetailsView.informationText.text = res.FacilityAvailability[0].Facility.Facility + " @ "+date; 
	arr.forEach(function(entry) { 
		if(entry.FacilityStatus == "0"){
			var displayStartTime = entry.StartDateTime.split(" "); 
			var displayEndTime   = entry.EndDateTime.split(" "); 
			var row = Titanium.UI.createTableViewRow({
			    touchEnabled: true,
			    height: Ti.UI.SIZE,
			    from: entry.StartDateTime,
			    to: entry.EndDateTime, 
			    backgroundSelectedColor: "#FFE1E1",  
			   });
			
			var contentView = $.UI.create('View',{
				classes: ['vert','hsize','wfill'],
				from: entry.StartDateTime,
			    to: entry.EndDateTime, 
				source: entry.FacilityId, 
				top:5,
				bottom: 5
			}); 
			
			var timeLbl = $.UI.create('Label',{
				text:  displayStartTime[1] + " - "+ displayEndTime[1],
				font:{fontSize:14},
				classes: ['darkgreyText','hsize','wsize'], 
				from: entry.StartDateTime,
			    to: entry.EndDateTime, 
				textAlign:'left',  
				top:5,
				left:15
			}); 
			contentView.add(timeLbl);  
			row.add(contentView); 
			
			data.push(row);
			$.bookingDetailsView.bookingTbl.setData(data);
		}
	});
	$.bookingDetailsView.headerView.titleLabel.text= Ti.App.Properties.getString('Title') + " " +Ti.App.Properties.getString('FirstName') + " "+Ti.App.Properties.getString('LastName')+", please find help here";
	 	
}

$.bookingDetailsView.bookingTbl.addEventListener('click', function(e) {  
	startDate =  e.source.from;
	endDate = e.source.to; 
	var rows = this.data[0].rows;
	for (var i = 0; i < rows.length; ++i) {
		rows[i].hasCheck = false;
	}
			 
	e.row.hasCheck = true;
}); 
			
$.bookingDetailsView.submitButton.addEventListener('click', function(){
	var remarkText = $.bookingDetailsView.remarkTextArea.value;
	var remindMinutes = $.bookingDetailsView.RemindMinutes.value;
	var toRemind = false;
	if(parseInt(remindMinutes) > 0){
		toRemind = true;
	}
	var param = {
		"Header" : {
			"AccountSignature" :{ 
				"Signature" : Ti.App.Properties.getString('Signature')
			},
			"UUID" : Ti.App.Properties.getString('deviceToken')
		},
		"FacilityBooking" : {
			"BookingEndDate"  :startDate,
			"BookingStartDate" : endDate,
			"Facility" : {
				"FacilityId" : facility_id
			},
			"FacilityBookingId" : 0,
			"Remark" : {
				"Status" : 1,
				'Text'	 : remarkText
			},
			"Status" : 1,
			"RemindMinutes" :  remindMinutes,
			'toRemind' : toRemind,
		} ,  
	};
	
	//console.log(param);
	API.callByPost({url:"updateFacilityBookingUrl", params: param}, function(responseText){
		COMMON.hideLoading();
		var result = JSON.parse(responseText); 
		if(result.Header.Error == null){
			Alloy.Globals.module = "booking";
			COMMON.createAlert("Success", "Booking of "+res.FacilityAvailability[0].Facility.Facility + " was success");
			COMMON.closeWindow($.myWin); 
		}
		 
	});
	 
}); 

$.bookingDetailsView.facilitiesBooking.addEventListener('click', function(){
	Alloy.Globals.module = "booking";
	COMMON.closeWindow($.myWin); 
});
 
	 	