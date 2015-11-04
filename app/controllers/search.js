var args = arguments[0] || {};
Alloy.Globals.module = "search";
if(OS_ANDROID){
	MENU.construct($,$.searchView.contentView);  
	MENU.initMenu();
}else{
	MENU.construct($,"");
}
COMMON.construct($); 
COMMON.addSwipeUpEvent();
$.searchView.headerView.titleLabel.text= Ti.App.Properties.getString('Title') + " " +Ti.App.Properties.getString('FirstName') + " "+Ti.App.Properties.getString('LastName')+", what would you like to seach for?";

$.searchView.saveButton.addEventListener('click', function(){
	COMMON.showLoading();
	setTimeout(function(){
		COMMON.hideLoading();
		 
	}, 2500); 
}); 
  