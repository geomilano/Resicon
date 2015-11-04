
Alloy.Globals.module = "visitor";
COMMON.construct($); 
COMMON.showLoading();
COMMON.addSwipeUpEvent();
if(OS_ANDROID){
	MENU.construct($,$.visitorView.contentView);  
	MENU.initMenu();
}else{
	MENU.construct($,"");
}


//Initialized
init();

function init(){
	$.visitorView.headerView.titleLabel.text= Ti.App.Properties.getString('Title') + " " +Ti.App.Properties.getString('FirstName') + " "+Ti.App.Properties.getString('LastName')+", here is what's happening:";

	var param = {
		"Header" : {
			"AccountSignature" :{
				"AccountId" : 0,
				"Signature" : Ti.App.Properties.getString('Signature')
			},
			"UUID" : Ti.App.Properties.getString('deviceToken')
		},
		
		"OrderBy" : "1",
		"RecordRow" : "0",
		"SortBy"  : "0",
		"TotalRecords" : "10"
	};
	 
	API.callByPost({url:"getVisitorListUrl", params: param}, function(responseText){
		COMMON.hideLoading();
		var res = JSON.parse(responseText);  
		var arr = res.Visitors; 
		if(arr != null){
			$.visitorView.totalText.text = res.Count + " record(s)";
			arr.forEach(function(entry) {  
				var contentView = $.UI.create('View',{
					classes: ['vert','hsize','wfill','padding','box'],
					source: entry.VisitorId, 
					top:0,
				}); 
				
				var facLbl = $.UI.create('Label',{
					text:entry.VisitorName,
					font:{fontSize:14},
					classes: ['darkgreyText','hsize'],
					source: entry.VisitorId, 
					textAlign:'left',  
					width: Ti.UI.FILL,
					top:5,
					left:15,  
				});  
				contentView.add(facLbl);
				
				var vecLbl = $.UI.create('Label',{
					text:entry.VehicleNumber,
					font:{fontSize:14},
					classes: ['darkgreyText','hsize'],
					source: entry.VisitorId, 
					textAlign:'left',  
					width: Ti.UI.FILL,
					top:5,
					left:15,  
				});  
				contentView.add(vecLbl);
				
				var timeLbl = $.UI.create('Label',{
					classes: ['small_font','font_light_grey','hsize'],
					text:"Visit date @ " + timeFormat(entry.VisitingDate),
					source: entry.VisitorId, 
					textAlign:'left', 
					left:15,
					bottom:5
				}); 
				contentView.add(timeLbl);
				
				var rightForwardBtn =  Titanium.UI.createImageView({
					image:"/images/btn-right.png",
					source: entry.VisitorId,
					width:15,
					right:20 
				});
					 
				contentView.addEventListener('click', function(e) {   
					var elbl = JSON.stringify(e.source); 
					var res = JSON.parse(elbl);     
					var win = Alloy.createController("visitorRegistration",{id : res.source }).getView(); 
					COMMON.openWindow(win);   
				}); 
			 
				$.visitorView.list.add(contentView); 
			});
		}else{
			$.visitorView.totalText.text = "0 record";
		}
		
		COMMON.hideLoading();
	});
} 


$.visitorView.newVisitor.addEventListener('click', function(){
	var win = Alloy.createController("visitorRegistration",{id: ""}).getView(); 
	COMMON.openWindow(win);  
});

function refreshVisitorList(){
	COMMON.removeAllChildren($.visitorView.list);
	init(); 
}

$.myWin.addEventListener('close', function(){ 
	Ti.App.removeEventListener('refreshVisitorList' , refreshVisitorList);
});

Ti.App.addEventListener('refreshVisitorList' , refreshVisitorList);
 