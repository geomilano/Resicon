var args = arguments[0] || {};
COMMON.construct($);  
if(OS_IOS){
	MENU.construct($,"");
	MENU.initMenu();
}
Alloy.Globals.module = "home";
$.homeView.headerView.titleLabel.text= "Welcome "+Ti.App.Properties.getString('FirstName') + " "+Ti.App.Properties.getString('LastName');
$.homeView.headerView.unitLabel.text =  Ti.App.Properties.getString('Unit') + " @ " + Ti.App.Properties.getString('OrganizationName');
