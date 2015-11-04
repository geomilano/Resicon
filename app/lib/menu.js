var mainView = null;
var mainViewAndroid = null;

exports.construct = function(mv,androidPage){ 
	mainView = mv;
	if(OS_ANDROID){ 
		mainViewAndroid = androidPage;
	}
};
exports.deconstruct = function(){  
	mainView = null;
	if(OS_ANDROID){ 
		mainViewAndroid = null;
	}
}; 
var loadMenu  = "0";
var popStatus = "0";
var popupWin = Ti.UI.createWindow({ 
	backgroundImage : '/images/ht.png',
	opacity            : 1
});


var popup_view = Titanium.UI.createView({
	width:Ti.UI.FILL,
	backgroundColor:'#DDF0F3',
	left:0,
	bottom:0,
	layout: "vertical",
	zIndex: 99,
	height:Ti.UI.SIZE
});

if(OS_IOS){
	popupWin.addEventListener('swipe', function(e) {
		if (e.direction == 'down') {
	      slideMenu();
	   } 
	}); 
}else{
	popup_view.addEventListener('swipe', function(e) {
		if (e.direction == 'down') {
	      slideMenu();
	   } 
	});  
}


var titleView = Titanium.UI.createView({
	width:Ti.UI.FILL,
	backgroundColor:'#DDF0F3',
	left:0,
	bottom:0, 
	height:45
});

exports.loadMenu = function(){
	//popupWin.opacity = 1;	 
	slideMenu();
};

exports.initMenu = function(){ 
	
	if(OS_IOS){ 
		if(loadMenu == "1"){
			return false;
		}
		popupWin.opacity = 0;	 
	}else{
		 popup_view = Titanium.UI.createView({
			width:Ti.UI.FILL,
			backgroundColor:'#DDF0F3',
			left:0,
			bottom:0,
			layout: "vertical",
			zIndex: 99,
			height:Ti.UI.SIZE
		});
		     
		titleView = Titanium.UI.createView({
			width:Ti.UI.FILL,
			backgroundColor:'#DDF0F3', 
			bottom:0, 
			height:45
		});

	}
	
	//
	// you could then add any interface elements, labels, etc to this.
	var popup_label = Titanium.UI.createLabel({
	    color:'#60BACA',
	    text:'Less Options',
	    top:10,
	    height:20
	});
	var popup_arrow = Titanium.UI.createImageView({ 
	    image:'/images/btn-bottom.png', 
	    height:15,
	    width:15,
	    top:15,
	    zIndex: 99,
	    right: 15 
	}); 
	popup_arrow.addEventListener('click', function(e) {
		slideMenu();
	}); 
	titleView.add(popup_label);
	titleView.add(popup_arrow);
	/****** CREATE POP UP TABLE*********/ 
	var TheTable = Titanium.UI.createTableView({
		width:'100%',
		separatorColor: '#60BACA',
		scrollable: false,
		height: Ti.UI.SIZE
	});
	
	var data = MENU.getMenuData();
	
	TheTable.setData(data);
	popup_view.add(titleView);
	popup_view.add(TheTable);
	popup_view.addEventListener('click', function(e) {
		slideMenu();
	}); 
	popup_label.addEventListener('click', function(e){
		slideMenu();
	});
	
	loadMenu = "1";
	if(OS_ANDROID){
		popup_view.opacity = 0;
		popup_view.height = 0;
		mainViewAndroid.add(popup_view);
	}else{
		popupWin.add(popup_view);	  
		popupWin.open({fullscreen:true, navBarHidden: true});  
	}
	
	
};

exports.getMenuData = function(){
	var CustomData = Alloy.Globals.MenuData;
	 
	var data=[];
	for (var i = 0; i < CustomData.length; i++) { 
		var row = Titanium.UI.createTableViewRow({
		    touchEnabled: true,
		    height: 45,
		    backgroundSelectedColor: "#D2E8EB",
		    source: CustomData[i].source, 
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
			color: "#848484",
			width:'auto',
			textAlign:'left',
			top:8,
			left:40,
			height:25
		});
		
		
		row.addEventListener('click', function(e) {
		  navByType(e);
		});
		 
		row.add(leftImage);
		row.add(popUpTitle);
		 
		data.push(row);
	};
	
	return data;
};

function slideMenu(){
	var popup_animation = Titanium.UI.createAnimation();
	if(OS_ANDROID){
		if(popStatus == "0"){
			popup_view.opacity = 1;
			popup_animation.bottom = 0;
			popStatus = "1"; 
			popup_view.height = Ti.UI.SIZE;
			popup_animation.duration = 500;
			popup_view.animate(popup_animation); 
			
			var pv = mainView.pageMenu || "";   
			if(pv != ""){
				mainView.pageMenu.opacity = 0; 
			}  
		}else{
			popup_animation.bottom = -380;
			popStatus = "0"; 
			popup_animation.duration = 500;
			popup_view.animate(popup_animation);
			setTimeout(function(){
				popup_view.opacity = 0;	
				popup_view.height = 0;
				var pv = mainView.pageMenu || "";   
				if(pv != ""){
					mainView.pageMenu.opacity = 1; 
				}  
				
			}, 500);
			
		}
	}else{
		if(popStatus == "0"){
			popup_animation.bottom = 0;
			popStatus = "1";
			popupWin.opacity = 1;
			popup_animation.duration = 500;
			popup_view.animate(popup_animation);  
		}else{
			popup_animation.bottom = -380;
			popStatus = "0";
			popup_animation.duration = 500;
			popup_view.animate(popup_animation);
			setTimeout(function(){popupWin.opacity = 0;	 }, 500);
			
		}
	}
	
 
	
}
function navByType(evt){ 
	var currentWin = mainView.myWin;  
	if(Alloy.Globals.module != evt.source.source){
		setTimeout(function(){COMMON.closeWindow(currentWin);  }, 500); 
		var win = Alloy.createController(evt.source.source).getView(); 
		COMMON.openWindow(win); 
	}
	
	slideMenu();
}