
Alloy.Globals.module = "report";
if(OS_ANDROID){
	MENU.construct($,$.reportView.contentView);  
	MENU.initMenu();
}else{
	MENU.construct($); 
}
COMMON.construct($); 
COMMON.addSwipeUpEvent();
$.reportView.headerView.titleLabel.text= Ti.App.Properties.getString('Title') + " " +Ti.App.Properties.getString('FirstName') + " "+Ti.App.Properties.getString('LastName')+", what would you like to report?";

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
		
		"OrderBy" : "10",
		"RecordRow" : "0",
		"SortBy"  : "0",
		"TotalRecords" : "10"
	};
	 
	API.callByPost({url:"getFaultyListUrl", params: param}, function(responseText){
		COMMON.hideLoading();
		var res = JSON.parse(responseText);   
		var arr = res.FaultyList; 
		$.reportView.totalText.text = res.Count + " record(s)";
		arr.forEach(function(entry) { 
		 
			var contentView = $.UI.create('View',{
				classes: ['vert','hsize','wfill','padding','box'],
				source: entry.FaultyId, 
				top:0
			}); 
			
			var statusColor = "#005FCB"; //new
			if(entry.Status == "1"){ //pending
				statusColor = "#8A6500";
			}else if(entry.Status == "2"){ //review
				statusColor = "#A3CB00";
			}else if(entry.Status == "3"){ //resolved
				statusColor = "#2C8A00";
			}
			 
			var horzView = $.UI.create('View',{
				classes: ['horz','wfill'], 
				source: entry.FaultyId,  
				height: 60 
			});
			
			var statustView = $.UI.create('View',{
				classes: ['hfill'],
				source: entry.FaultyId,
				width: 10,
				backgroundColor: statusColor
			});
			horzView.add(statustView);
			
			var vertView = $.UI.create('View',{
				classes: ['vert','wfill'], 
				source: entry.FaultyId 
			});
			
			var facLbl = $.UI.create('Label',{
				text:entry.FaultyType.FaultyType,
				font:{fontSize:14},
				classes: ['darkgreyText','hsize','wfill'],
				source: entry.FaultyId, 
				textAlign:'left',   
				top:5,
				left:15,  
			});  
			vertView.add(facLbl);
				
			var locationLbl = $.UI.create('Label',{
				classes: ['small_font','font_light_grey','hsize'],
				text:"Location : " +entry.Location,
				source: entry.FaultyId, 
				textAlign:'left', 
				left:15, 
			}); 
			vertView.add(locationLbl);
			
			var remarkLbl = $.UI.create('Label',{
				classes: ['small_font','font_light_grey','hsize'],
				text:"Last updated : " + timeFormat(entry.ModifiedDate) || "N/A",
				source: entry.FaultyId, 
				textAlign:'left', 
				left:15,
				bottom:5
			}); 
			vertView.add(remarkLbl);
			
			var rightForwardBtn =  Titanium.UI.createImageView({
				image:"/images/btn-right.png",
				source: entry.FaultyId,
				width:15,
				right:20 
			});
				 
			contentView.addEventListener('click', function(e) { 
				var elbl = JSON.stringify(e.source); 
				var res = JSON.parse(elbl);     
				var win = Alloy.createController("newReport",{id : res.source }).getView(); 
				COMMON.openWindow(win);   
			}); 
			horzView.add(vertView);
		 	contentView.add(horzView);
			$.reportView.list.add(contentView); 
		});
		COMMON.hideLoading();
	});
}

$.reportView.newReport.addEventListener('click', function(){
	var win = Alloy.createController("newReport",{id: ""}).getView(); 
	COMMON.openWindow(win);  
});
 