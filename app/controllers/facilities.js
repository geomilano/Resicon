
Alloy.Globals.module = "facilities";
COMMON.construct($); 
COMMON.showLoading();
COMMON.addSwipeUpEvent();
if(OS_ANDROID){
	MENU.construct($,$.facilitiesView.contentView);  
	MENU.initMenu();
}else{
	MENU.construct($,"");
}

//Initialized
init();

function init(){
	$.facilitiesView.headerView.titleLabel.text= Ti.App.Properties.getString('Title') + " " +Ti.App.Properties.getString('FirstName') + " "+Ti.App.Properties.getString('LastName')+", here is what's happening:";
 
	var param = {
		"Header" : {
			"AccountSignature" :{
				"AccountId" : 0,
				"Signature" : Ti.App.Properties.getString('Signature')
			},
			"UUID" : Ti.App.Properties.getString('deviceToken')
		} 
	};
	 
	API.callByPost({url:"getFacilitiesUrl", params: param}, function(responseText){
		COMMON.hideLoading();
		var res = JSON.parse(responseText);  
		var data=[];  
		var arr = res.Facilities; 
		if(arr.length < 1){
			alert("No facility found");
			return false;
		}
		arr.forEach(function(entry) {
			var row = Titanium.UI.createTableViewRow({
			    touchEnabled: true,
			    height: Ti.UI.SIZE,
			    source: entry.FacilityId,
			    backgroundSelectedColor: "#FFE1E1", 
				color: "transparent"
			   });
			
			var contentView = $.UI.create('View',{
				classes: ['vert','hsize','wfill'],
				source: entry.FacilityId, 
			}); 
			
			var facLbl = $.UI.create('Label',{
				text:entry.Facility,
				font:{fontSize:14},
				classes: ['darkgreyText','hsize','wsize'],
				source: entry.FacilityId, 
				textAlign:'left',  
				top:5,
				left:15
			}); 
			contentView.add(facLbl);
				
			var timeLbl = $.UI.create('Label',{
				classes: ['small_font','font_light_grey','hsize'],
				text:"From: " +entry.OperationStart + " - " +entry.OperationEnd,
				source: entry.FacilityId, 
				textAlign:'left', 
				left:15,
				bottom:5
			}); 
			contentView.add(timeLbl);
			
			var rightForwardBtn =  Titanium.UI.createImageView({
				image:"/images/btn-right.png",
				source: entry.FacilityId,
				width:15,
				right:20 
			});
				
			row.add(contentView);
			row.add(rightForwardBtn); 
			row.addEventListener('click', function(e) {  
				var win = Alloy.createController("booking",{id:e.source.source }).getView(); 
				COMMON.openWindow(win);  
			}); 
			data.push(row);
			$.facilitiesView.facilitiesTbl.setData(data);
	   	 
		});
		COMMON.hideLoading();
	});
}
 
