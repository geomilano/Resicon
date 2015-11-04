var args = arguments[0] || {};
var referenceModel = Alloy.createCollection('resicon_references');  
Alloy.Globals.module = "profile";
if(OS_ANDROID){
	MENU.construct($,$.reminderView.contentView);  
	MENU.initMenu();
}else{
	MENU.construct($,"");
}
COMMON.construct($); 

$.profileView.headerView.titleLabel.text= Ti.App.Properties.getString('Title') + " " +Ti.App.Properties.getString('FirstName') + " "+Ti.App.Properties.getString('LastName')+", please create or update your profile:";
$.profileView.headerView.unitLabel.height = 0;


COMMON.showLoading();
//Initialized
init();

function init(){
	var param = {
		"Header" : {
			"AccountSignature" :{
				"AccountId" : 0,
				"Signature" : Ti.App.Properties.getString('Signature')
			},
			"UUID" : Ti.App.Properties.getString('deviceToken')
		},
		
		"SearchId" : Ti.App.Properties.getString('AccountId'),
		"SearchPersonBy" : "0"
	};
	 
	API.callByPost({url:"getPersonUrl", params: param}, function(responseText){
		COMMON.hideLoading();
		var res = JSON.parse(responseText);
		//console.log(res);
		$.profileView.firstname.value = res.Person.FirstName;
		$.profileView.lastname.value = res.Person.LastName; 
		$.profileView.email.value = res.Person.EmailAddresses[0].EmailAddress;
		$.profileView.mobile.value = res.Person.PhoneNumbers[0].Number;
		$.profileView.ic.value  = res.Person.DocumentNumber;
		
		var docType = referenceModel.getReference("DocumentType", "field2",  res.Person.DocumentTypeCode); 
		$.profileView.idType_value.text = "  "+docType.field1;

		var negara = referenceModel.getReference("Countries","field1",  res.Person.DocumentCountryCode);
		$.profileView.country_value.text = "  "+negara.field2;
		
		var tit = referenceModel.getReference("Titles","field2",  res.Person.TitleCode);
		$.profileView.title_value.text = "  "+tit.field1;
		 

	});
}


$.profileView.settings.addEventListener('click', function(){
	Alloy.Globals.module = "settings";
	COMMON.closeWindow($.myWin); 
});


$.myWin.addEventListener('swipe', function(e){
	if (e.direction == 'up') {
      MENU.loadMenu();
   } 
});

$.profileView.saveButton.addEventListener('click', function(){
	COMMON.showLoading();
	setTimeout(function(){
		COMMON.hideLoading();
		 
	}, 2500);
	 
}); 