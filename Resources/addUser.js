function addUser() {
	var win = Ti.UI.createWindow({
		modal: true,
		//backgroundColor:'#34B233',
		navBarHidden: true,
		exitOnClose: false,
		layout: 'vertical'
	});
	var AddView = Ti.UI.createScrollView({
		contentHeight: 'auto',
		backgroundImage:'/tableback-nofoam.jpg',
		layout: 'vertical'
	});
	var header = Ti.UI.createView({
		backgroundImage: '/foam.jpg',
		top: 0,
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL
	});
	var backButton = Ti.UI.createButton({
		borderColor:'#003D3D',
		backgroundColor: '#006666',
		borderWidth: 2,
		borderRadius: 8,
		title:'Back',
		left: 10,
		top:5,
		bottom:5,
	});
	var heading = Ti.UI.createLabel({
		color:'#773333',
		font:{
			fontSize: '24sp',
			fontWeight: 'bold'
		},
		shadowColor: '#000000',
 		shadowOffset: {x:1, y:1},
  		shadowRadius: 1,
		title: 'Create New User',
		text:'Create New User',
		top:5,
		bottom:5
	});
	header.add(backButton); 
	header.add(heading);
	AddView.add(header);

	var newUsernameWrap = Ti.UI.createView({
		width : 250,
		height : 60,
		top : 35,
		borderRadius : 15,
		backgroundColor : '#ccc',
		opacity : 0.5
	});
	var newUsernameText = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 15,
		height : 50,
		top : 5,
		width : 230,
		left : 10,
		right : 10,
		hintText : 'Username',
		color : '#000',
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		autocorrect : false
	});
	
	var newEmailWrap = Ti.UI.createView({
		width : 320,
		height : 60,
		top : 35,
		borderRadius : 15,
		backgroundColor : '#ccc',
		opacity : 0.5
	});
	var newEmailText = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 15,
		height : 50,
		top : 5,
		width : 300,
		left : 10,
		right : 10,
		hintText : 'E-mail address',
		color : '#000',
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		autocorrect : false
	});
	
	var newFirstNameWrap = Ti.UI.createView({
		width : 250,
		height : 60,
		top : 35,
		borderRadius : 15,
		backgroundColor : '#ccc',
		opacity : 0.5
	});
	var newFirstNameText = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 15,
		height : 50,
		top : 5,
		width : 230,
		left : 10,
		right : 10,
		hintText : 'First Name',
		color : '#000',
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		autocorrect : false
	});
	
	var newLastNameWrap = Ti.UI.createView({
		width : 250,
		height : 60,
		top : 35,
		borderRadius : 15,
		backgroundColor : '#ccc',
		opacity : 0.5
	});
	var newLastNameText = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 15,
		height : 50,
		top : 5,
		width : 230,
		left : 10,
		right : 10,
		hintText : 'Last Name',
		color : '#000',
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		autocorrect : false
	});
	
	
	var newPasswordWrap = Ti.UI.createView({
		width: 250,
		height: 60,
		top: 35,
		borderRadius: 15,
		backgroundColor: '#ccc',
		opacity: 0.5
	});
	var newPasswordText = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 15,
		height : 50,
		top : 5,
		width : 230,
		left : 10,
		right : 10,
		hintText : 'Password',
		enableReturnKey : true,
		color : '#000',
		passwordMask : true,
		clearOnEdit : true,
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		autocorrect : false
	});
	
	var newPasswordConfWrap = Ti.UI.createView({
		width: 250,
		height: 60,
		top: 35,
		borderRadius: 15,
		backgroundColor: '#ccc',
		opacity: 0.5
	});
	var newPasswordConfText = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 15,
		height : 50,
		top : 5,
		width : 230,
		left : 10,
		right : 10,
		hintText : 'Confirm Password',
		enableReturnKey : true,
		color : '#000',
		passwordMask : true,
		clearOnEdit : true,
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		autocorrect : false
	});
	
	var createBtn = Ti.UI.createButton({
		width: 300,
		height: 60,
		top: 30,
		bottom: 30,
		borderRadius: 15,
		borderWidth:2,
		borderColor:'#3D001F',
		backgroundColor: '#660033',
		title: 'Create New User',
		color: '#fff',
		font:{
			fontWeight: 'bold'
		}
	});
	
	newUsernameWrap.add(newUsernameText);
	AddView.add(newUsernameWrap);
	
	newEmailWrap.add(newEmailText);
	AddView.add(newEmailWrap);
	
	newFirstNameWrap.add(newFirstNameText);
	AddView.add(newFirstNameWrap);
	
	newLastNameWrap.add(newLastNameText);
	AddView.add(newLastNameWrap);
	
	newPasswordWrap.add(newPasswordText);
	AddView.add(newPasswordWrap);
	
	newPasswordConfWrap.add(newPasswordConfText);
	AddView.add(newPasswordConfWrap);
	
	AddView.add(createBtn);
	win.add(AddView);
	win.open();
	
	backButton.addEventListener('click', function() {win.close();});
	createBtn.addEventListener('click', function(e) {
		Cloud.Users.create({
			username: newUsernameText.value,
			email : newEmailText.value,
			first_name : newFirstNameText.value,
			last_name : newLastNameText.value,
			password : newPasswordText.value,
			password_confirmation : newPasswordConfText.value
			
		}, function(e) {
			if (e.success) {
				var user = e.users[0];
				alert('Success:\n' + 'id: ' + user.id + '\n' + 'sessionId: ' + Cloud.sessionId + '\n' + 'first name: ' + user.first_name + '\n' + 'last name: ' + user.last_name);
				win.close();
				//FrontPage();
			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		}); 
		
	});
	
	return win;
}
module.exports = addUser;
