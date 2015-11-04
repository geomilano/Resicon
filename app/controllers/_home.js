//Init menu
MENU.construct($);

var navByType = function(e){  
	var win = Alloy.createController(e.source.source).getView(); 
	COMMON.openWindow(win);  
};

/****** CREATE POP UP TABLE*********/

var TheTable = Titanium.UI.createTableView({
	width: Ti.UI.FILL,
	height: Ti.UI.SIZE,
	top: 10,
	separatorColor: '#60BACA',
	scrollable: false
});

var CustomData = Alloy.Globals.MenuData;
 
var data=[];

for (var i = 0; i < CustomData.length; i++) {
	if(CustomData[i].source != "home"){
		var row = Titanium.UI.createTableViewRow({ 
		    height: 45,
		    backgroundSelectedColor: "#D2E8EB",
		    source: CustomData[i].source,
			backgroundColor: "#ffffff"
		  });
		
		var leftImage =  Titanium.UI.createImageView({
			image:CustomData[i].image,
			source: CustomData[i].source,
			width:25,
			height:25,
			left:10,
			top:10
		});
	 
		var popUpTitle = Titanium.UI.createLabel({
			text:CustomData[i].title,
			source: CustomData[i].source,
			font:{fontSize:16},
			color: "#60BACA",
			width:'auto',
			textAlign:'left',
			top:8,
			left:40,
			height:25
		}); 
		row.add(leftImage);
		row.add(popUpTitle);
	 	row.addEventListener('click', function(e) { 
		  navByType(e);
		});
		data.push(row);
	}
	 
};

TheTable.setData(data);
$.tableMenu.add(TheTable);

