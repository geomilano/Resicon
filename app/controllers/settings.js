
Alloy.Globals.module = "settings";
if(OS_ANDROID){
	MENU.construct($,$.settingsView.contentView);  
	MENU.initMenu();
} 
COMMON.construct($); 
COMMON.addSwipeUpEvent();

$.settingsView.headerView.titleLabel.text= Ti.App.Properties.getString('Title') + " " +Ti.App.Properties.getString('FirstName') + " "+Ti.App.Properties.getString('LastName')+", would you like to modify your settings?";
var settingData = [
{ image:'/images/profile.png', title:"Profile", source:'profile' },
{ image:'/images/tenants.png', title:"Manage Tenants", source:'tenants' },
{ image:'/images/notification.png', title:"Notifications", source:'notification' },
{ image:'/images/about.png', title:"About Resicon",  source:'about'},
{ image:'/images/help.png', title:"Help",  source:'help'}, 
];

var goTo = function(e){ 
	if(e.source.source != "notification"){
		var win = Alloy.createController(e.source.source).getView(); 
		COMMON.openWindow(win); 
	} 
	
};

var TheTable = Titanium.UI.createTableView({
	width: Ti.UI.FILL,
	height: Ti.UI.SIZE,
	top: 10,
	separatorColor: '#60BACA',
	scrollable: false
});

var data=[];
for (var i = 0; i < settingData.length; i++) { 
	var row = Titanium.UI.createTableViewRow({
	    touchEnabled: true,
	    height: 45,
	    backgroundSelectedColor: "#D2E8EB",
	    source: settingData[i].source, 
	  });
	
	var leftImage =  Titanium.UI.createImageView({
		image:settingData[i].image,
		source: settingData[i].source,
		width:25,
		height:25,
		left:10,
		top:10
	});
	
	var contentView = Titanium.UI.createView({
		width: Ti.UI.FILL,
		source: settingData[i].source,
		height: Ti.UI.SIZE,
		layout:"horizontal"
	});

	var popUpTitle = Titanium.UI.createLabel({
		text:settingData[i].title,
		source: settingData[i].source,
		font:{fontSize:16},
		color: "#60BACA",
		width:"70%",
		textAlign:'left',
		top:8,
		left:40,
		height:25
	});
	contentView.add(popUpTitle);
	if(settingData[i].source == "notification"){
		var basicSwitch = Ti.UI.createSwitch({
		  value:true ,
		  width: Ti.UI.SIZE 
		});
		contentView.add(basicSwitch);
	}
	
	row.addEventListener('touchend', function(e) {
	  goTo(e);
	});
	
	row.add(leftImage);
	row.add(contentView);
	  
	data.push(row);
};
TheTable.setData(data);
$.settingsView.pageContent.add(TheTable);

$.settingsView.logoutButton.addEventListener('click', function(){
	Ti.App.Properties.removeProperty('AccountId');
	Ti.App.Properties.removeProperty('AccountTypeId');
	Ti.App.Properties.removeProperty('FirstName');
	Ti.App.Properties.removeProperty('LastName'); 
	Ti.App.Properties.removeProperty('Title');
	Ti.App.Properties.removeProperty('OrganizationCode');
	Ti.App.Properties.removeProperty('OrganizationName');
	Ti.App.Properties.removeProperty('Signature');
	Ti.App.Properties.removeProperty('Unit');
	Ti.App.Properties.removeProperty('UnitId');
	COMMON.closeWindow($.myWin); 
	var win = Alloy.createController("login").getView(); 
	COMMON.openWindow(win);  
	return false; 
});
 