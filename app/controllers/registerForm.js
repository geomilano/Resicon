var args = arguments[0] || {};
var genderArr;
var referenceModel = Alloy.createCollection('resicon_references');  
function showGenderPicker(e){  
	var ct = referenceModel.getReferenceByType("Genders");
	var arr = [];  
	ct.forEach(function(entry) {
		arr.push(entry.field1);
	});
	arr.push("Cancel"); 
	var cancelBtn = arr.length -1;
	var dialog = Ti.UI.createOptionDialog({
		  cancel: arr.length -1,
		  options: arr,
		  selectedIndex: 0,
		  title: 'Choose Gender'
	});
		
	dialog.show();
		
	dialog.addEventListener("click", function(e){   
		if(cancelBtn != e.index){
			 $.gender_value.text = "  "+arr[e.index];
			 $.gender_value.color = "#60BACA";
		}
	});
} 

function changeGender(e){  
	var gender = e.selectedValue[0];
	var genderData = referenceModel.getReference("Genders", "field2",  gender); 
	
	$.gender_value.text =   "  "+genderData.field1;
	$.genderPicker.visible = "false"; 
	$.selectorView.height = 0;
}
 
function showCountryPicker(e){
	var ct = referenceModel.getReferenceByType("Countries");
	var arr = [];  
	ct.forEach(function(entry) {
		arr.push(entry.field2); 
	});
	arr.push("Cancel"); 
	var cancelBtn = arr.length -1;
	var dialog = Ti.UI.createOptionDialog({
		  cancel: arr.length -1,
		  options: arr,
		  selectedIndex: 0,
		  title: 'Choose Country'
	});
		
	dialog.show();
		
	dialog.addEventListener("click", function(e){   
		if(cancelBtn != e.index){
			 $.country_value.text = "  "+arr[e.index];
			 $.country_value.color = "#60BACA";
		}
	});
}

function showTitlePicker(e){  
	var ta = referenceModel.getReferenceByType("Titles");
	//$.title_value.color = "#60BACA";
	//$.titlePicker.visible = "true"; 
	//$.selectorTitleView.height = Ti.UI.SIZE; 
	var arr = [];  
	ta.forEach(function(entry) {
		arr.push(entry.field1);
	});
	arr.push("Cancel"); 
	var cancelBtn = arr.length -1;
	var dialog = Ti.UI.createOptionDialog({
		  cancel: arr.length -1,
		  options: arr,
		  selectedIndex: 0,
		  title: 'Choose Title'
	});
		
	dialog.show();
		
	dialog.addEventListener("click", function(e){   
		if(cancelBtn != e.index){
			 $.title_value.text = "  "+arr[e.index];
			 $.title_value.color = "#60BACA";
		}
	});
} 

function changeTitle(e){  
	$.title_value.text = "  "+e.selectedValue[0]; 
	$.titlePicker.visible = "false"; 
	$.selectorTitleView.height =0;
}


function showIdTypePicker(e){  
	var ta = referenceModel.getReferenceByType("DocumentType"); 
	var arr = [];  
	ta.forEach(function(entry) {
		arr.push(entry.field1);
	});
	arr.push("Cancel"); 
	var cancelBtn = arr.length -1;
	var dialog = Ti.UI.createOptionDialog({
		  cancel: arr.length -1,
		  options: arr,
		  selectedIndex: 0,
		  title: 'Choose Document Type'
	});
		
	dialog.show();
		
	dialog.addEventListener("click", function(e){   
		if(cancelBtn != e.index){ 
			 $.idType_value.text = "  "+arr[e.index];
			 $.idType_value.color = "#60BACA";
		}
	});
} 
 

function showDatePicker(){  
	
	if(OS_ANDROID){ 
		var curDate = currentDateTime();
		var ed =  curDate.substr(0, 10);
		if(h_id != ""){
			ed = details.deadline;
		}
		
		var res_ed = ed.split('-'); 
		if(res_ed[1] == "08"){
			res_ed[1] = "8";
		}
		if(res_ed[1] == "09"){
			res_ed[1] = "9";
		}
		var datePicker = Ti.UI.createPicker({
			  type: Ti.UI.PICKER_TYPE_DATE,
			 // minDate: new Date(1930,0,1),
			  id: "datePicker",
			  visible: false
		});
		datePicker.showDatePickerDialog({
			value: new Date(res_ed[0],parseInt(res_ed[1]) -1,res_ed[2]),
			callback: function(e) {
			if (e.cancel) { 
				} else {
					changeDate(e);
				}
			}
		});
	}else{  
		$.datePicker.visible = true;
		$.dateToolbar.visible = true;
		$.selectorView.height = Ti.UI.SIZE;
	} 
	
	hideKeyboard();
}

function hideKeyboard(){ 
 
}


function changeDate(e){ 
	$.dob.value =  dateConvert(e.value); 
	$.dob.color= "#60BACA";
}

function hideDatePicker(){
	$.datePicker.visible = false; 
	$.dateToolbar.visible = false;
	$.selectorView.height = 0;
}

function save(){
	var firstname = $.firstname.value;
	var lastname  = $.lastname.value;	
	var gender    = $.gender_value.text;	
	var email     = $.email.value;	
	var mobile	  = $.mobile.value;		
	var ic        = $.ic.value;	 
	var idType    = $.idType_value.text;
	var country   = $.country_value.text;
	var titles    = $.title_value.text;
	var password1 = $.password1.value;		
	var password2 = $.password2.value;	
	var dob       = $.dob.value;	
	
	var idTypeData = referenceModel.getReference("DocumentType", "field1",  idType.trim());   
	var countryData = referenceModel.getReference("Countries", "field2",  country.trim());  
	var genderData = referenceModel.getReference("Genders", "field1",  gender.trim());  
	var titleData  = referenceModel.getReference("Titles", "field1",  titles.trim());  
 
	//validation
 
	if(titleData  == null){
		COMMON.createAlert("Error","Please choose your title");
		return false;
	} 	
	
	if(firstname.trim() == "" ){
		COMMON.createAlert("Error","Please fill in your firstname");
		return false;
	} 
	
	if(lastname.trim() == "" ){
		COMMON.createAlert("Error","Please fill in your lastname");
		return false;
	} 	
	 
	 
	if(genderData == null ){
		COMMON.createAlert("Error","Please select your gender");
		return false;
	} 	
	
	if(password1.trim()  != password2.trim() ){
		COMMON.createAlert("Error","Both password must be same");
		return false;
	} 		
	
	if(password1.trim()  != password2.trim() ){
		COMMON.createAlert("Error","Both password must be same");
		return false;
	} 	
	
	 
	if(idTypeData  == null ){
		COMMON.createAlert("Error","Please choose ID type");
		return false;
	} 	
	
	if(countryData  == null ){
		COMMON.createAlert("Error","Please choose your country");
		return false;
	} 	
	 
	
	
	
	if(dob != ""){
		dob = convertToDBDateFormat(dob);
	}
	var param = {
			"Header" : {
				"UUID" : Ti.App.Properties.getString('deviceToken')
			},
			"Account" : {
				"Password": password1.trim(),
				"Person" : {
					"DOB" : dob+ " 00:00:00",
					"FirstName" : firstname.trim(),
					"LastName" : lastname.trim(),
					"DocumentCountryCode" : countryData.field1,
					"DocumentNumber" : ic,
					"DocumentTypeCode" : idTypeData.field2,
					"GenderCode" : genderData.field2,
					"PersonId" : "0",
					"Status" : "1",
					"TitleCode" :  titleData.field2,
					"EmailAddresses" : {
						"0" : {
							"EmailAddress" : email.trim(),
							"Status" :1, 
						}
					}
				},
				"Status" : 1,
				"Username" : email.trim(),
			},
			"InvitationCode" : Ti.App.Properties.getString('InvatationCode'),
		};
		 
		COMMON.showLoading();
		API.callByPost({url:"createAccountUrl", params: param}, function(responseText){
			COMMON.hideLoading();
			var res = JSON.parse(responseText);  
			
			if(res.Header.Error == null){
				COMMON.createAlert("Success", "Your account is created");
				$.myWin.close();
				return false;
			}else{
				COMMON.createAlert("Error",res.Header.Error.ErrorMessage );
				return false;
			}
			console.log(res);
		});
	
}

$.btnBack.addEventListener('click', function(){
	$.myWin.close();
}); 
