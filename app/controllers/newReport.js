var args = arguments[0] || {};
var id = args.id || "";
var fTypeArr = [];
var fTypeIdArr = []; 
var faultTypeId;
var faultyStatus = 1;//status = 1 (add)
var referenceModel = Alloy.createCollection('resicon_references'); 

Alloy.Globals.module = "newReport"; 
if(OS_ANDROID){
	MENU.construct($,$.newReportView.contentView);  
	MENU.initMenu();
} 
COMMON.construct($); 
COMMON.addSwipeUpEvent();
COMMON.showLoading();
init();

function init(){
	
	/***GET FAULTY TYPE**/ 
	var param = {
		"Header" : {
			"AccountSignature" :{ 
				"Signature" : Ti.App.Properties.getString('Signature')
			},
			"UUID" : Ti.App.Properties.getString('deviceToken')
		}
	}; 
	API.callByPost({url:"getFaultyTypesUrl", params: param}, function(responseText){
		var res = JSON.parse(responseText);  
		var ty = res.FaultyTypes;
		ty.forEach(function(entry) {
			if(entry.state != ""){
				fTypeArr.push(entry.FaultyType);
				fTypeIdArr.push(entry.FaultyTypeId);
			} 
		});
		fTypeArr.push("Cancel"); 
		renderData();
		COMMON.hideLoading();
	}); 
}

function renderData(){  
	if(id != ""){
		var param = {
			"Header" : {
				"AccountSignature" :{ 
					"Signature" : Ti.App.Properties.getString('Signature')
				},
				"UUID" : Ti.App.Properties.getString('deviceToken')
			}, 
			"FaultyId" : id
		};
		 
		API.callByPost({url:"getFaultyUrl", params: param}, function(responseText){
			var res = JSON.parse(responseText); 
			var faulty = res.Faulty;
			$.newReportView.location.value = faulty.Location;
			$.newReportView.remark.value = faulty.Remarks['Text'];
			$.newReportView.faultyType_value.text = "  "+faulty.FaultyType.FaultyType;
			faultTypeId = faulty.FaultyType.FaultyTypeId; 
			//status = 2 (edit)
			faultyStatus = 2;
	 	});
		$.newReportView.reportInd.text ="Edit Report";
	}
}

$.newReportView.faultyType_value.addEventListener('click', function(){
	var cancelBtn = fTypeArr.length -1;
	var dialog = Ti.UI.createOptionDialog({
		  cancel: fTypeArr.length -1,
		  options: fTypeArr, 
		  title: 'Choose Faulty Type'
	});
		
	dialog.show();	 
	dialog.addEventListener("click", function(e){   
		if(cancelBtn != e.index){ 
			$.newReportView.faultyType_value.text = "  "+fTypeArr[e.index];
			$.newReportView.faultyType_value.color= "#60BACA";
			faultTypeId  = fTypeIdArr[e.index]; 
		}
	});
}); 


$.newReportView.saveButton.addEventListener('click', function(){
	var location = $.newReportView.location.value;
	var remark = $.newReportView.remark.value; 
	
	if(location.trim() == ""){
		COMMON.resultPopUp("Error", "Please fill in faulty location.");
		return false;
	}
	
	var param = {
			"Header" : {
				"AccountSignature" :{ 
					"Signature" : Ti.App.Properties.getString('Signature')
				},
				"UUID" : Ti.App.Properties.getString('deviceToken')
			}, 
			"Faulty" : {
				"Location" : location,
				"Status" : faultyStatus,
				"Remarks" : {
					"MessageType" : 0,
					"Status"	  : 1,
					"Text"		  : remark
				},
				"FaultyType" : {
					"FaultyTypeId" : faultTypeId
				} ,
			}
	};
	console.log(param);
	API.callByPost({url:"updateFaultyUrl", params: param}, function(responseText){
		var res = JSON.parse(responseText);   
		var arr = res.Header; 
		if(arr.ResponseCode == 0){
			COMMON.resultPopUp("Success", "Report submitted successfully.");
			COMMON.createAlert("Success", "Report submitted successfully.");
		}else{
			console.log(res);
		}	
	});
});

$.newReportView.headerView.titleLabel.text= Ti.App.Properties.getString('Title') + " " +Ti.App.Properties.getString('FirstName') + " "+Ti.App.Properties.getString('LastName')+", what would you like to report?";
$.newReportView.reports.addEventListener('click', function(){
	Alloy.Globals.module = "report";
	COMMON.closeWindow($.myWin); 
});
 