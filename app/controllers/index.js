var referenceModel = Alloy.createCollection('resicon_references'); 
if(OS_IOS){
	Alloy.Globals.navMenu = $.navMenu;
} 

init();

if(Ti.Platform.osname == "android"){ 
	$.indexView.root.open(); 
}else{ 
	$.navMenu.open({fullscreen:true});
} 

function init(){
	//Get reference info
	var param = {
		"Header" : {
			"UUID" : Ti.App.Properties.getString('deviceToken')
		}
	};
   
	API.callByPost({url:"referenceUrl", params: param}, function(responseText){
		//var model = Alloy.createCollection("item_response");
		var res = JSON.parse(responseText);
		referenceModel.resetReference();
		
		//AccountStatuses
		var AccountStatuses = res.AccountStatuses;
		AccountStatuses.forEach(function(entry) {
			referenceModel.addData("AccountStatuses" , entry.AccountStatus, entry.AccountStatusId, "","" );
		});
		
		//AccountTypes
		var AccountTypes = res.AccountTypes;
		AccountTypes.forEach(function(entry) {
			referenceModel.addData("AccountStatuses" , entry.AccountType, entry.AccountTypeId, "","" );
		});
		 
		//Countries
		var Countries = res.Countries;
		Countries.forEach(function(entry) {
			referenceModel.addData("Countries" , entry.CountryCode, entry.CountryName, entry.CurrencyCode,entry.PhoneCode );
		});
		
		//DeviceTypes
		var DeviceTypes = res.DeviceTypes;
		DeviceTypes.forEach(function(entry) {
			referenceModel.addData("DeviceTypes" , entry.DeviceType, entry.DeviceTypeId,"", "" );
		});
		
		//DocumentType
		var DocumentType = res.DocumentType;
		DocumentType.forEach(function(entry) {
			referenceModel.addData("DocumentType" , entry.DocumentType, entry.DocumentTypeCode,"", "" );
		});
		
		//FaultyStatuses
		var FaultyStatuses = res.FaultyStatuses;
		FaultyStatuses.forEach(function(entry) {
			referenceModel.addData("FaultyStatuses" , entry.FaultyStatus, entry.FaultyStatusId,"", "" );
		});
		
		//Genders
		var Genders = res.Genders;
		Genders.forEach(function(entry) {
			referenceModel.addData("Genders" , entry.Gender, entry.GenderCode,"", "" );
		});
		
		//Languages
		var Languages = res.Languages;
		Languages.forEach(function(entry) {
			referenceModel.addData("Languages" , entry.Language, entry.LanguageCode,"", "" );
		});
		
		//MessageTypes
		var MessageTypes = res.MessageTypes;
		MessageTypes.forEach(function(entry) {
			referenceModel.addData("MessageTypes" , entry.MessageType, entry.MessageTypeId,"", "" );
		});
		
		//PhoneTypes
		var PhoneTypes = res.PhoneTypes;
		PhoneTypes.forEach(function(entry) {
			referenceModel.addData("PhoneTypes" , entry.PhoneType, entry.PhoneTypeCode,"", "" );
		});
		
		//ProcessStatuses
		var ProcessStatuses = res.ProcessStatuses;
		ProcessStatuses.forEach(function(entry) {
			referenceModel.addData("ProcessStatuses" , entry.ProcessStatus, entry.ProcessStatusId,"", "" );
		});
		
		//States
		var States = res.States;
		States.forEach(function(entry) {
			referenceModel.addData("States" , entry.CountryCode, entry.StateCode, entry.StateName, "" );
		});
		
		//Titles
		var Titles = res.Titles;
		Titles.forEach(function(entry) {
			referenceModel.addData("Titles" , entry.Title, entry.TitleCode, "", "" );
		});
		
		var u_id = Ti.App.Properties.getString('AccountId') || "";
		if(u_id == ""){
			var win = Alloy.createController("login").getView(); 
		}else{
			var win = Alloy.createController("home").getView(); 
		}
  		
		COMMON.openWindow(win); 
	}, function(){
		var win = Alloy.createController("login").getView(); 
		COMMON.openWindow(win); 
	});
}


function isArray(value){
	if (value instanceof Array) {
		return true;
	} else {
	  return false;
	}

}

