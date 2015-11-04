var args = arguments[0] || {};
Alloy.Globals.module = "tenants";

COMMON.construct($); 
COMMON.addSwipeUpEvent(); 
if(OS_ANDROID){
	MENU.construct($,$.tenantsView.contentView);  
	MENU.initMenu();
} 
$.tenantsView.headerView.titleLabel.text= Ti.App.Properties.getString('Title') + " " +Ti.App.Properties.getString('FirstName') + " "+Ti.App.Properties.getString('LastName')+", what would you want to do with tenants?";

$.tenantsView.settings.addEventListener('click', function(){
	Alloy.Globals.module = "settings";
	COMMON.closeWindow($.myWin); 
});
 