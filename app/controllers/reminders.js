var args = arguments[0] || {};
Alloy.Globals.module = "reminders";
if(OS_ANDROID){
	MENU.construct($,$.reminderView.contentView);  
	MENU.initMenu();
}else{
	MENU.construct($,"");
}
COMMON.construct($); 
COMMON.addSwipeUpEvent();
$.reminderView.headerView.titleLabel.text= Ti.App.Properties.getString('Title') + " " +Ti.App.Properties.getString('FirstName') + " "+Ti.App.Properties.getString('LastName')+", here are your reminders:";
  