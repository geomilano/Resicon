var args = arguments[0] || {};
Alloy.Globals.module = "help";
if(OS_ANDROID){
	MENU.construct($,$.reminderView.contentView);  
	MENU.initMenu();
}else{
	MENU.construct($,"");
}
COMMON.construct($);  
COMMON.addSwipeUpEvent();

$.helpView.headerView.titleLabel.text= Ti.App.Properties.getString('Title') + " " +Ti.App.Properties.getString('FirstName') + " "+Ti.App.Properties.getString('LastName')+", please find help here";

$.helpView.settings.addEventListener('click', function(){
	Alloy.Globals.module = "settings";
	COMMON.closeWindow($.myWin); 
});