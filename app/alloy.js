// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
var API = require('api');
var COMMON = require('common');
var MENU = require('menu');
var CAL = require('calendar');
var PUSH = require('push');
PUSH.registerPush();
Alloy.Globals.MenuData = [
{ image:'/images/home.png', title:"Home", source:'home' },
{ image:'/images/announcement.png', title:"Announcements", source:'announcement' },
{ image:'/images/reminder.png', title:"Reminders", source:'reminders' },
{ image:'/images/booking.png', title:"Facilities Booking",  source:'facilities'},
{ image:'/images/report.png', title:"Report Fault",  source:'report'},
{ image:'/images/register.png', title:"Visitor Registration",  source:'visitors'},
{ image:'/images/search.png', title:"Search",  source:'search'},
{ image:'/images/settings.png', title:"Settings",  source:'settings'}
];


function showMenu(){
	MENU.loadMenu();
}


function removeAllChildren(viewObject){
    //copy array of child object references because view's "children" property is live collection of child object references
    var children = viewObject.children.slice(0);
 
    for (var i = 0; i < children.length; ++i) {
        viewObject.remove(children[i]);
    }
}


function dateConvert(date){
	var pickerdate = date; 
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
    return day + "/" + month + "/" + year; 
}


function timeFormat(datetime){
	var timeStamp = datetime.split(" ");  
	var newFormat;
	var ampm = "am";
	var date = timeStamp[0].split("-");  
	if(timeStamp.length == 1){
		newFormat = date[2]+"/"+date[1]+"/"+date[0] ;
	}else{
		var time = timeStamp[1].split(":");  
		if(time[0] > 12){
			ampm = "pm";
			time[0] = time[0] - 12;
		}
		
		newFormat = date[2]+"/"+date[1]+"/"+date[0] + " "+ time[0]+":"+time[1]+ " "+ ampm;
	}
	
	return newFormat;
}

function convertToDBDateFormat(datetime){
	var timeStamp = datetime.split(" ");  
	var newFormat;
	 
	var date = timeStamp[0].split("/");  
	if(timeStamp.length == 1){
		newFormat = date[2]+"-"+date[1]+"-"+date[0] ;
	}else{
		 
		newFormat = date[2]+"-"+date[1]+"-"+date[0] + " "+ timeStamp[1];
	}
	
	return newFormat;
}

function convertFromDBDateFormat(datetime){
	var timeStamp = datetime.split(" ");  
	var newFormat;
	 
	var date = timeStamp[0].split("-");  
	if(timeStamp.length == 1){
		newFormat = date[2]+"/"+date[1]+"/"+date[0] ;
	}else{
		 
		newFormat = date[2]+"/"+date[1]+"/"+date[0] + " "+ timeStamp[1];
	}
	
	return newFormat;
}

