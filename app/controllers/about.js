var args = arguments[0] || {};
Alloy.Globals.module = "about"; 
COMMON.construct($); 
COMMON.addSwipeUpEvent();
$.aboutView.headerView.titleLabel.text= "Mr Wong, please check about Resicon";
$.aboutView.settings.addEventListener('click', function(){
	Alloy.Globals.module = "settings";
	COMMON.closeWindow($.myWin); 
});