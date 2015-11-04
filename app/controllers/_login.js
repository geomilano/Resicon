var args = arguments[0] || {};
var contentTextCode;  
 
var goCreateAccount = function(){
	var containerView = Ti.UI.createView({
		layout: "composite",
		height:"100%",
		width:"100%",
		backgroundColor: "#FFFFFF"
	}); 

	var confirmView = Ti.UI.createView({
		layout: "vertical",
		height:"100%",
		width:"100%"
	});
	  
	var contentView = Ti.UI.createScrollView({
		layout: "vertical",
		height:"74.5%",
		backgroundColor:"#FFFFFF", 
		width:"95%" 
	});
	
	var contentLabel = $.UI.create('Label',{
		classes :['description'],
		top:20, 
		text : 	"Please enter the following : ",  
	});
	
 
	contentTextCode = $.UI.create('TextField',{
		classes : ['username'],
		top:10,
		width: "100%",
		font:{
			fontSize: '12dp'
		},
		value: "53C42ECEA8D9",
		height:25, 
		hintText : "Authentication Code", 
	});
	var centerImageView = Ti.UI.createView({
		layout: "composite",
		height:"20", 
		width: "100%",
		backgroundColor:"#ffffff", 
	});
	var okayBtn = Ti.UI.createButton({
		title: "OK",
		height: "20",
		color :"#60BACA" 
	});
	contentView.add(contentLabel); 
	contentView.add(contentTextCode);
	centerImageView.add(okayBtn); 
	confirmView.add(contentView);
	confirmView.add(centerImageView);
	containerView.add(confirmView);
	var config = [];
	config.width = "70%";
	config.height = "30%";
	pop = COMMON.popup(containerView,config);
	pop.open({fullscreen:true, navBarHidden: true}); 
	addFirstTimeLoginEvent(okayBtn,pop, contentTextCode);  
};

var addFirstTimeLoginEvent = function(okayBtn, pop,  contentTextCode){
	okayBtn.addEventListener('click', function(){ 
		 
		var textCode = contentTextCode.value;  
		
		if(textCode.trim() == "" ){
			COMMON.createAlert("Error","Please fill in your authentication code");
			return false;
		} 
		
		var param = {
			"Header" : {
				"UUID" : Ti.App.Properties.getString('deviceToken')
			},
			"InvitationCode" : textCode.trim() 
		};
		API.callByPost({url:"validateCodeUrl", params: param}, function(responseText){
			COMMON.hideLoading(); 
			var res = JSON.parse(responseText); 
			if(res.ValidInvitationCode == 1){
				Ti.App.Properties.setString('InvatationCode', textCode.trim() ); 
				showRegisterForm();
				pop.close();
				return false;
			}else{
				COMMON.createAlert("Error", "Invalid invitation code");
				return false;
			} 
		}); 
	});
};

var doForgotPassword = function(){
	var containerView = Ti.UI.createView({
		layout: "composite",
		height:"100%",
		width:"100%",
		backgroundColor: "#FFFFFF"
	}); 

	var confirmView = Ti.UI.createView({
		layout: "vertical",
		height:"100%",
		width:"100%"
	});
	  
	var contentView = Ti.UI.createScrollView({
		layout: "vertical",
		height:"74.5%",
		backgroundColor:"#FFFFFF", 
		width:"95%" 
	});
	
	var contentLabel = $.UI.create('Label',{
		classes :['description'],
		top:20, 
		text : 	"Please enter your email address below so that we can email you your password : ",  
	});
	
	var contentTextEmail = $.UI.create('TextField',{
		classes : ['username'],
		top:10,
		width: "100%",
		font:{
			fontSize: '12dp'
		},
		height:25,
		hintText : "Email Address", 
	});
	
	var centerImageView = Ti.UI.createView({
		layout: "composite",
		height:"20", 
		width: "100%",
		backgroundColor:"#ffffff", 
	});
	var okayBtn = Ti.UI.createButton({
		title: "OK",
		height: "20",
		color :"#60BACA" 
	});
	contentView.add(contentLabel);
	contentView.add(contentTextEmail);
	centerImageView.add(okayBtn); 
	confirmView.add(contentView);
	confirmView.add(centerImageView);
	containerView.add(confirmView);
	var config = [];
	config.width = "70%";
	config.height = "30%";
	pop = COMMON.popup(containerView,config);
	pop.open({fullscreen:true, navBarHidden: true}); 
	addDoneEvent(okayBtn,pop,contentTextEmail);  
};

var addDoneEvent = function(okayBtn, pop, email){ 
	okayBtn.addEventListener('click', function(){ 
		var username = email.value; 
		if(username.trim() == "" ){
			COMMON.createAlert("Error","Please fill in your username");
			return false;
		} 
		var param = {
			"Header" : {
				"UUID" : Ti.App.Properties.getString('deviceToken')
			},
			"Username" : username.trim() 
		};
		API.callByPost({url:"forgetPasswordUrl", params: param}, function(responseText){
			COMMON.hideLoading();
			
			var res = JSON.parse(responseText);
			if(res.Header.Error == null){
				COMMON.createAlert("Success","Please check your email for your account access");
				pop.close();
				return false;
			}else{
				COMMON.createAlert("Error",res.Header.Error.ErrorMessage);
				return false;
			} 
		}); 
	}); 
};

function showRegisterForm(){
	var win = Alloy.createController('registerForm').getView();
	win.open({
		modal:true
	});
}
