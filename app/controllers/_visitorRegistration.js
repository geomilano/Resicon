var referenceModel = Alloy.createCollection('resicon_references');  
var updateStatus = 1;
var id; 
function init(e){
	id = e.id || "";
	
	if(id != ""){
		var param = {
			"Header" : {
				"AccountSignature" :{ 
					"Signature" : Ti.App.Properties.getString('Signature')
				},
				"UUID" : Ti.App.Properties.getString('deviceToken')
			}, 
			"VisitorId" : id
		};
		 
		API.callByPost({url:"getVisitorUrl", params: param}, function(responseText){
			var res = JSON.parse(responseText); 
			var visitor = res.Visitor;
			$.firstname.value = visitor.VisitorName;
			$.vehicle.value = visitor.VehicleNumber;
			$.mobile.value = "  "+visitor.PhoneCode+visitor.PhoneNumber;
			$.ic.value =  visitor.DocumentNumber;
			var docType = referenceModel.getReference("DocumentType", "field2",  visitor.DocumentTypeCode); 
			$.idType_value.text = "  "+docType.field1;
			//faultTypeId = faulty.FaultyType.FaultyTypeId; 
			//status = 2 (edit)
			updateStatus = 2;
	 	});
		$.visitorInd.text ="Edit Visitor Form";
	}else{
		$.deleteButton.visible = false;
	} 
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
			 $.idType_value.text = arr[e.index];
			 $.idType_value.color = "#60BACA";
		}
	}); 
} 
 
function changeIdType(e){  
	$.idType_value.text = "  "+e.selectedValue[0]; 
	$.idTypePicker.visible = "false"; 
	$.selectorIdTypeView.height =0;
}

function showDatePicker(e){  
	if(OS_ANDROID){ 
		var pd = curDate.substr(0, 10); 
		if(id != ""){
			pd =  postDetails.publish_date;
		}
		var res_pd = pd.split('-'); 
		var datePicker = Ti.UI.createPicker({
			  type: Ti.UI.PICKER_TYPE_DATE,
			 // minDate: new Date(1930,0,1),
			  id: "datePicker",
			  visible: false
		});
		
		if(res_pd[1] == "08"){
			res_pd[1] = "8";
		}
		if(res_pd[1] == "09"){
			res_pd[1] = "9";
		}
		
		datePicker.showDatePickerDialog({
			value: new Date(res_pd[0],parseInt(res_pd[1])-1,res_pd[2]),
			callback: function(e) {
			if (e.cancel) { 
				} else {
					changeDate(e);
				}
			}
		});
	}else{  
		$.timePicker.visible = false;
		$.datePicker.visible = true;
		$.selectorView.height = Ti.UI.SIZE;
		$.dateToolbar.visible = true;
	} 
} 

function hideDatePicker(){
	$.datePicker.visible = false;
	$.timePicker.visible = false;
	$.dateToolbar.visible = false;
	$.selectorView.height = 0;
}

function showTimePicker(e){  
	if(OS_ANDROID){ 
		var timePicker = Ti.UI.createPicker({
			  type: Ti.UI.PICKER_TYPE_TIME, 
			  id: "timePicker",
			  visible: false
		});
		timePicker.showTimePickerDialog({
			//value: new Date(yyyy,parseInt(mm) - 1, dd),
			callback: function(e) {
			if (e.cancel) { 
				} else {
					changeTime(e);
				}
			}
		});
	}else{ 
		$.timePicker.visible = true;
		$.datePicker.visible = false;
		$.selectorView.height = Ti.UI.SIZE;
		$.dateToolbar.visible = true;
	}
}


function changeDate(e){  
	var pickerdate = e.value; 
    var day = pickerdate.getDate();
    day = day.toString();
 
    if (day.length < 2) {
        day = '0' + day;
    }
  
    var month = pickerdate.getMonth();
    month = month + 1;
    month = month.toString();
 
    if (month.length < 2) {
        month = '0' + month;
    }
 
    var year = pickerdate.getFullYear(); 
    selDate = day + "/" + month + "/" + year; 
     
	$.visitDate.text = "  "+selDate ;  
}

function changeTime(e){
	var pickerdate = e.value; 
    var day = pickerdate.getDate();
    var hour = pickerdate.getHours(); 
    hour = hour.toString();
    
 	var ampm = hour >= 12 ? 'PM' : 'AM';
 	if(hour > 12) {
	    hour = hour-12;
    }
    
    var minute = pickerdate.getMinutes(); 
    if (minute < 10) {
        minute = '0' + minute;
    }
    selTime = hour + ":" + minute + " "+ampm;  
	$.visitTime.text = "  "+selTime; 
}

$.saveButton.addEventListener('click', function(){
	var name    = $.firstname.value;
	var vehicle = $.vehicle.value;
	var mobile	= $.mobile.value;
	var ic      = $.ic.value;
	
	var param = {
			"Header" : {
				"AccountSignature" :{ 
					"Signature" : Ti.App.Properties.getString('Signature')
				},
				"UUID" : Ti.App.Properties.getString('deviceToken')
			}, 
			"Visitor" :{
				"VisitorId" : id,
				"Status"    : updateStatus,
				"VisitorName" : name
			} 
		};
		COMMON.showLoading();
		console.log(param);
		API.callByPost({url:"updateVisitorUrl", params: param}, function(responseText){
			var res = JSON.parse(responseText); 
			console.log(res);
			if(res.Header.Error == null){
				Ti.App.fireEvent("refreshVisitorList");
				COMMON.hideLoading();
				COMMON.createAlert("Success","Successfully updated visitor information");
				return false;
			}else{
				COMMON.createAlert("Error",res.Header.Error.ErrorMessage);
				return false;
			} 
	 	});
} );

exports.init = function(e){
 	init(e);
};
