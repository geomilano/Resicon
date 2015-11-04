Alloy.Globals.module = "visitorRegistration";
var referenceModel = Alloy.createCollection('resicon_references');  
var args = arguments[0] || {};
var id = args.id || "";
COMMON.construct($); 
if(OS_ANDROID){
	MENU.construct($,$.visitorRegistrationView.contentView);  
	MENU.initMenu();
} 
$.visitorRegistrationView.headerView.titleLabel.text= Ti.App.Properties.getString('Title') + " " +Ti.App.Properties.getString('FirstName') + " "+Ti.App.Properties.getString('LastName')+", who will be visiting you? ";
$.visitorRegistrationView.init({id:id}); 
 
$.visitorRegistrationView.saveButton.addEventListener('click', function(){
	COMMON.showLoading();
	setTimeout(function(){
		COMMON.hideLoading(); 
	}, 2500);
	 
}); 

$.visitorRegistrationView.visitor.addEventListener('click', function(){ 
	Alloy.Globals.module = "visitor";
	COMMON.closeWindow($.myWin); 
});


$.visitorRegistrationView.deleteButton.addEventListener('click', function(){
	
	var dialog = Ti.UI.createAlertDialog({
		    cancel: 0,
		    buttonNames: ['Cancel','Confirm'],
		    message: 'Would you like to delete this visitor information?',
		    title: 'Delete confirmation'
		});
		dialog.addEventListener('click', function(e){  
			if (e.index === e.source.cancel){
		      //Do nothing
		    }
		    if (e.index === 1){
		    	 var param = {
					"Header" : {
						"AccountSignature" :{
							"AccountId" : 0,
							"Signature" : Ti.App.Properties.getString('Signature')
						},
						"UUID" : Ti.App.Properties.getString('deviceToken')
					},
					
					"Visitor" :{
						"VisitorId" : id,
						"Status"    : 3
					} 
				};
				 
				COMMON.showLoading();  
				API.callByPost({url:"updateVisitorUrl", params: param}, function(responseText){
					COMMON.hideLoading();
				 
					var res = JSON.parse(responseText); 
					
					if(res.Header.Error == null){
						Ti.App.fireEvent("refreshVisitorList");
						COMMON.closeWindow($.myWin); 
						COMMON.hideLoading();
						COMMON.createAlert("Success","Successfully deleted visitor information!");
						
						return false;
					}else{
						COMMON.createAlert("Error",res.Header.Error.ErrorMessage);
						return false;
					} 
				});
		    }
		});
		dialog.show(); 
});
  
$.myWin.addEventListener('swipe', function(e){
	if (e.direction == 'up') {
      MENU.loadMenu();
   } 
});