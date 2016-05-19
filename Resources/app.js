var Cloud = require('ti.cloud');
Cloud.debug = true;
var user = null;
var userName = null;

var createNewUser = require('addUser');
var ListPage = require('ListPage');
var MainPage = require('MainPage');

// Cloudpush set-up
// var CloudPush = require('ti.cloudpush');
// var deviceToken = null;
//  
// Initialize the module
// CloudPush.retrieveDeviceToken({
    // success: deviceTokenSuccess,
    // error: deviceTokenError
// });

// Enable push notifications for this device
// Save the device token for subsequent API calls
// function deviceTokenSuccess(e) {
    // deviceToken = e.deviceToken;
// }
// function deviceTokenError(e) {
    // alert('Failed to register for push notifications! ' + e.error);
// }
//  
// Process incoming push notifications
// CloudPush.addEventListener('callback', function (evt) {
    // alert("Notification received: " + evt.payload);
// });
/*
function subscribeToChannel () {
    // Subscribes the device to the 'news_alerts' channel
    // Specify the push type as either 'android' for Android or 'ios' for iOS
    Cloud.PushNotifications.subscribeToken({
        device_token: deviceToken,
        channel: 'brew_alerts',
        type: 'android' 
    }, function (e) {
        if (e.success) {
            alert('Subscribed to Brew Alerts');
            Ti.App.Properties.setString('subscribed','true');
        } else {
            alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        }
    });
}
*/
// var apm = undefined;
// try {
// apm = require("com.appcelerator.apm");
// }
// catch (e) {
// Ti.API.info("com.appcelerator.apm module is not available");
// }

// Initialize the module if it is defined
// apm && apm.init();
// END: APM code injection

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000000');

var win = Ti.UI.createWindow({
	backgroundColor:'#000000',
	navBarHidden: false,
	//zIndex:0,
	//exitOnClose: true,
	layout: 'vertical'
});

var home = Ti.UI.createScrollView({
	contentHeight: 'auto',
	//backgroundColor:'#006600',
	backgroundImage: '/goods.jpg',
	layout: 'vertical',
	scrollType: 'vertical'
});

var welcomeText = Ti.UI.createLabel({
	text: 'Welcome to Homebrew Hub!',
	font: {
		fontSize: '24sp',
		fontWeight: 'bold'
	},
	shadowColor: '#000000',
 	shadowOffset: {x:2, y:2},
  	shadowRadius: 1,
  	color:'#CCCCCC',
  	top: 25,
});

//var welcomeImage = Ti.UI.createImageView({
	//image: '/cheers.png',
	//height:400,
	//width: 300,
	//top: 35,
	//zIndex: 2
//});
home.add(welcomeText);
//home.add(welcomeImage);

var usernameWrap = Ti.UI.createView({
	width: 250,
	height: 60,
	top: 75,
	borderRadius: 15,
	backgroundColor: '#ccc',
	opacity: 0.5,
	//zIndex: 2
});
var usernameText = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	borderRadius: 15,
	height: 50,
	top:5,
	width:230,
	left:10,
	right:10,
	hintText: 'Username',
	color: '#000',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    autocorrect: false,
	//zIndex: 3
});

var passwordWrap = Ti.UI.createView({
	width: 250,
	height: 60,
	top: 35,
	borderRadius: 15,
	backgroundColor: '#ccc',
	opacity: 0.5,
	//zIndex: 2
});
var passwordText = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	borderRadius: 15,
	height: 50,
	top:5,
	width:230,
	left:10,
	right:10,
	hintText: 'Password',
	enableReturnKey: true,
	color: '#000',
	passwordMask: true,
	//zIndex: 3,
	clearOnEdit: true,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    autocorrect: false,
});

var submit = Ti.UI.createButton({
	width: 300,
	height: 60,
	top: 65,
	borderRadius: 15,
	borderWidth:2,
	borderColor:'#003D3D',
	backgroundColor: '#006666',
	title: 'Login to Homebrew Hub',
	color: '#fff',
	//zIndex: 2
});

var create = Ti.UI.createButton({
	width: 300,
	height: 60,
	top: 35,
	bottom: 30,
	borderRadius: 15,
	borderWidth:2,
	borderColor:'#3D001F',
	backgroundColor: '#660033',
	title: 'Create a New User',
	color: '#fff',
	//zIndex: 2
});

usernameWrap.add(usernameText);
home.add(usernameWrap);
passwordWrap.add(passwordText);
home.add(passwordWrap);
home.add(submit);

home.add(create);
win.add(home);
win.open();

if (Ti.App.Properties.hasProperty('lastUserLogin') && Ti.App.Properties.hasProperty('lastUserPassword')) {
	usernameText.value = Ti.App.Properties.getString('lastUserLogin');
	passwordText.value = Ti.App.Properties.getString('lastUserPassword');
	if(Ti.Platform.osname === 'android'){
         Ti.UI.Android.hideSoftKeyboard(); //Doesn't work
    } else {
	usernameText.blur();
	}
}

var CurrentUser = {};

submit.addEventListener('click', function(e) {
	 if (usernameText.value != '' && passwordText.value != '') {
 		Cloud.Users.login({
 			login:usernameText.value,
 			password:passwordText.value
		}, function(e) {
			if (!e.success) {
				 Ti.API.info("Error: "+ ((e.error && e.message) || JSON.stringify(e)));
				 alert(e.message);
			} else {
				  Ti.API.info("Logged in user, id = " + e.users[0].id + ", session ID = " + Cloud.sessionId);
				  Ti.App.Properties.setString('lastUserLogin',usernameText.value);
				  Ti.App.Properties.setString('lastUserPassword',passwordText.value);
				  if (Ti.Platform.name == 'android' && !Ti.App.Properties.hasProperty('subscribed')) {
				  	//subscribeToChannel();
				  }
				  //alert('Logged in successfully');
				  //setCurrentUserData();
				  //userName = e.users[0].name;
				  ListPage();
				  //MainPage();
				  win.close();
				  
			};
		});
	} else {
		alert("Please enter your Username and Password before submitting");
	}
});
create.addEventListener('click', createNewUser);

/*
exports.setCurrentUserData = function() {
	Cloud.Users.showMe(function (e) {
		if (e.success) {
			var CurrentUser = e.users[0];
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
};

exports.getCurrentUserData = function() {
	Cloud.Users.showMe(function (e) {
		if (e.success) {
			var CurrentUser = e.users[0];
			return CurrentUser;
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
};
*/