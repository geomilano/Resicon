var args = arguments[0] || {};  
var referenceModel = Alloy.createCollection('resicon_references');  
function showGenderPicker(e){  
	$.gender_value.color = "#60BACA";
	$.genderPicker.visible = "true"; 
	$.selectorView.height = Ti.UI.SIZE;
} 

function changeGender(e){  
	$.gender_value.text = "  "+e.selectedValue[0]; 
	$.genderPicker.visible = "false"; 
	$.selectorView.height =0;
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
			 $.country_value.text = arr[e.index];
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
			 $.title_value.text = arr[e.index];
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

function changeIdType(e){  
	$.idType_value.text = "  "+e.selectedValue[0]; 
	$.idTypePicker.visible = "false"; 
	$.selectorIdTypeView.height =0;
}


function save(){
	
}
