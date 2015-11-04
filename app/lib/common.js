var mainView = null;

exports.construct = function(mv){
	mainView = mv;
};
exports.deconstruct = function(){  
	mainView = null;
};

exports.openWindow = function(win){
	if(Ti.Platform.osname == "android"){ 
	  	win.open(); //{fullscreen:false, navBarHidden: false}
	}else{ 
		var nav = Alloy.Globals.navMenu;
		nav.openWindow(win,{animated:true});  
	} 
};

exports.closeWindow = function(win){
	if(Ti.Platform.osname == "android"){ 
	  	win.close(); 
	}else{ 
		var nav = Alloy.Globals.navMenu;
		nav.closeWindow(win,{animated:true});  
	} 
};

exports.addSwipeUpEvent = function(){
	mainView.myWin.addEventListener('swipe', function(e){
		if (e.direction == 'up') {
	      MENU.loadMenu();
	   } 
	});
};

exports.removeAllChildren = function(viewObject){
    //copy array of child object references because view's "children" property is live collection of child object references
    var children = viewObject.children.slice(0);
 
    for (var i = 0; i < children.length; ++i) {
        viewObject.remove(children[i]);
    }
};

exports.createAlert = function(tt,msg){
	var box = Titanium.UI.createAlertDialog({
		title: tt,
		ok: 'OK',
		message: msg
	});
	box.show();
};

exports.hideLoading = function(){
	mainView.activityIndicator.hide();
	mainView.loadingBar.opacity = "0";
	mainView.loadingBar.height = "0";
//	mainView.loadingBar.top = "0"; 
};

exports.showLoading = function(){ 
	mainView.activityIndicator.show();
	mainView.loadingBar.opacity = 1;
	mainView.loadingBar.zIndex = 100;
	mainView.loadingBar.height = 120;
	 
	if(Ti.Platform.osname == "android"){
		//mainView.loadingBar.top =  (DPUnitsToPixels(Ti.Platform.displayCaps.platformHeight) / 2) -50; 
		mainView.activityIndicator.style = Ti.UI.ActivityIndicatorStyle.BIG;
		//mainView.activityIndicator.top = 0; 
	}else if (Ti.Platform.name === 'iPhone OS'){
	//	mainView.loadingBar.top = (Ti.Platform.displayCaps.platformHeight / 2) -50; 
		mainView.activityIndicator.style = Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
	}  
};

exports.todayDateTime = function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	
	if(dd<10) {
	    dd='0'+dd;
	} 
	
	if(mm<10) {
	    mm='0'+mm;
	} 
	
	today = yyyy+'-'+mm+'-'+ dd + " "+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	return today;
};

exports.popup = function(subView,config){
    //Popup win
	var popupWin = Ti.UI.createWindow({
		backgroundImage : "/images/Transparent.png",
		opacity            : 0, 
		id                : "popupWin"
	});
	
	//View that used to show the msg
	var popupView = Ti.UI.createView({
		width    : config.width,
		height    : config.height,
		backgroundColor : "#000000",
		borderRadius : 10,
		borderColor : "#60BACA",
		borderWidth : 1
	}); 
	 
	popupView.add(subView ); 
	popupWin.add(popupView);
 
	//Event to close the popup window
	popupWin.addEventListener("click", function(e){
		if(e.source.id != null){
			popupWin.close();
		}
	});
		
	var matrix = Ti.UI.create2DMatrix(); 
	matrix = matrix.scale(1.3, 1.3);
	  
	popupWin.addEventListener('open', function(){
	    if (Titanium.Platform.name == 'android') {
    		popupWin.activity.actionBar.hide();
		}
	    
	    var a = Ti.UI.createAnimation({
		    transform : matrix,
		    opacity: 1, 
		    duration : 500, 
		});
		popupWin.animate(a);  
	}); 
	 
	return popupWin;
};


exports.displayHTMLArticle = function(msg){
	var str = '<html  style=" overflow: hidden;">';
	str += '<head>';
	str += '<meta name="viewport" content="user-scalable=0">';
	str += '<script src="jquery.min.js"></script>';
	str += '<style>';
	str += 'html{ -webkit-user-select: none}';
	str += 'a{ text-decoration:none;color:"#EABD2A"} ';
	str += '</style>';
	str += '</head>';
	str += '<body style="overflow: hidden;font-size:14px;color:#676767; font-family:arial;">';
	str += '<div id="myContent" style="">'+msg; 
	str += '</div>';
	str += '</body>';
	str += '</html>';
	str += '<script> ';
	str += 'var contentHeight = $( "div" ).height();';
	str += '$("html").css("height", contentHeight + 10);';
	str += ' $("body").css("height", contentHeight);';
	str += '</script>'; 
	if (OS_IOS) {
		return Ti.UI.createWebView({ 
			html: str,
			width : Ti.UI.FILL,
			height: Ti.UI.SIZE,  
		}) ; 
	}else{
		return Ti.UI.createWebView({ 
			html: str,
			enableZoomControls : false,
			overScrollMode : Titanium.UI.Android.OVER_SCROLL_IF_CONTENT_SCROLLS,
			width : Ti.UI.FILL,
			height: Ti.UI.SIZE,  
		}) ; 
	}
	
}; 

exports.resultPopUp = function(title, msg){
	//Popup win
	var popupWin = Ti.UI.createWindow({
		backgroundImage : "/images/Transparent.png",
		opacity            : 0, 
		id                : "resultPop"
	});
	
	var mask = Titanium.UI.createView({
		width: "100%",
		height: "100%",
		zIndex: 9999,
		backgroundColor: "#000",
		opacity:0.45,
	});
	
	var box = mainView.UI.create('View',{
		classes : ['hsize','vert'],
		width: "90%", 
		opacity:1.0,zIndex: 19999,
	});
	var header = mainView.UI.create('View',{
		classes: ['themeBg', 'wfill','hsize'] 
	});
	var head_title = mainView.UI.create('Label',{
		text: title,
		classes: ['padding'],
		color: "#ffffff", 
	});
	header.add(head_title);
	var content = mainView.UI.create('View',{
		classes : ['hsize','wfill','vert'], 
		backgroundColor: "#fff", 
	});
	var content_text = mainView.UI.create('Label',{
		classes : ['hsize','wfill','padding'], 
		text: msg 
	});
	
	var btnView = mainView.UI.create('View',{
		classes : ['hsize','wfill'],  
		backgroundColor: "#fff", 
		textAlign: 'center' 
	});
	var okButton = Ti.UI.createButton({ 
		title: "OK",
		width: "30%",
		backgroundColor: "#F1F1F1",
		borderColor: "#10844D",
		color: "#10844D",
		borderRadius: 10,
		height: Ti.UI.SIZE,
		bottom: "20dp",
	});
	 
	btnView.add(okButton); 
	content.add(content_text);
	content.add(btnView);
	box.add(header);
	box.add(content); 
	mainView.myWin.add(box);
	mainView.myWin.add(mask); 
	okButton.addEventListener("click", function(){
		mainView.myWin.remove(box);
		mainView.myWin.remove(mask);
	}); 
	
	return popupWin;
};

