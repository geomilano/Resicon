var args = arguments[0] || {};  

COMMON.construct($); 
$.loginView.loginAccountButton.addEventListener('click', function(){
	
	var username = $.loginView.username.value;
	var password = $.loginView.password.value;
	
	if(username.trim() == "" ){
		COMMON.createAlert("Login Fail","Please fill in your username or email");
		return false;
	}
	
	if(password.trim() == "" ){
		COMMON.createAlert("Login Fail","Please fill in your password");
		return false;
	}
	
	COMMON.showLoading();
	var param = {
		"Header" : {
			"UUID" : Ti.App.Properties.getString('deviceToken')
		},
		"Username" : username.trim(),
		"Password" : password.trim()
	};
	API.callByPost({url:"loginUrl", params: param}, function(responseText){
		COMMON.hideLoading();
		var res = JSON.parse(responseText);
		
		if(res.LoginSession == null){
			COMMON.hideLoading(); 
			COMMON.createAlert("Login Fail",res.Header.Error.ErrorMessage);
			return false;
		}else{ 
			Ti.App.Properties.setString('AccountId', res.LoginSession.AccountId);
			Ti.App.Properties.setString('AccountTypeId', res.LoginSession.AccountTypeId);
			Ti.App.Properties.setString('FirstName', res.LoginSession.Name.FirstName);
			Ti.App.Properties.setString('LastName', res.LoginSession.Name.LastName); 
			Ti.App.Properties.setString('Title', res.LoginSession.Name.Title);
			Ti.App.Properties.setString('OrganizationCode', res.LoginSession.Organization.OrganizationCode);
		 	Ti.App.Properties.setString('OrganizationName', res.LoginSession.Organization.OrganizationName);
			Ti.App.Properties.setString('Signature', res.LoginSession.Signature);
			Ti.App.Properties.setString('Unit', res.LoginSession.Unit.Unit);
			Ti.App.Properties.setString('UnitId', res.LoginSession.Unit.UnitId);
			var win = Alloy.createController("home").getView(); 
			COMMON.openWindow(win);  
			return false; 
		}
		 
	}, function(){
		COMMON.hideLoading();
		COMMON.createAlert("Connection Fail","Something wrong with internet connection interact with server. Please try again later.");
	});
	 
}); 

var doLogin = function(){
		
};
 
var goCreateAccount = function(){
	
};

var doForgotPassword = function(){
	
};
