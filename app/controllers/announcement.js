
Alloy.Globals.module = "announcement";
COMMON.construct($); 
COMMON.showLoading();
COMMON.addSwipeUpEvent();
if(OS_ANDROID){
	MENU.construct($,$.announcementView.contentView);  
	MENU.initMenu();
}else{
	MENU.construct($,"");
}


//Initialized
init();

function init(){
	$.announcementView.headerView.titleLabel.text= Ti.App.Properties.getString('Title') + " " +Ti.App.Properties.getString('FirstName') + " "+Ti.App.Properties.getString('LastName')+", here is what's happening:";

	var param = {
		"Header" : {
			"AccountSignature" :{
				"AccountId" : 0,
				"Signature" : Ti.App.Properties.getString('Signature')
			},
			"UUID" : Ti.App.Properties.getString('deviceToken')
		},
		
		"OrderBy" : "2",
		"RecordRow" : "0",
		"SortBy"  : "0",
		"TotalRecords" : "10"
	};
	 
	API.callByPost({url:"getAnnouncementsUrl", params: param}, function(responseText){
		COMMON.hideLoading();
		var res = JSON.parse(responseText); 
	 
		var arr = res.Announcements; 
		$.announcementView.totalText.text = res.Count + " record(s)";
		arr.forEach(function(entry) { 
			var contentView = $.UI.create('View',{
				classes: ['vert','hsize','wfill','padding','box'],
				source: entry.AnnouncementId, 
			}); 
			
			if(OS_IOS){
				var facLbl = COMMON.displayHTMLArticle(entry.Announcement);
				 
			}else{
				var facLbl = $.UI.create('Label',{
					html:entry.Announcement,
					font:{fontSize:14},
					classes: ['darkgreyText','hsize'],
					source: entry.AnnouncementId, 
					textAlign:'left',  
					width: Ti.UI.FILL,
					top:5,
					left:15,  
				}); 
			} 
			
			contentView.add(facLbl);
				
			var timeLbl = $.UI.create('Label',{
				classes: ['small_font','font_light_grey','hsize'],
				text:"Post @ " +entry.AnnouncementDate,
				source: entry.AnnouncementId, 
				textAlign:'left', 
				left:15,
				bottom:5
			}); 
			contentView.add(timeLbl);
			
			var rightForwardBtn =  Titanium.UI.createImageView({
				image:"/images/btn-right.png",
				source: entry.AnnouncementId,
				width:15,
				right:20 
			});
				 
			//contentView.addEventListener('click', function(e) {  
			//}); 
		 
			$.announcementView.announcementSv.add(contentView); 
		});
		COMMON.hideLoading();
	});
} 