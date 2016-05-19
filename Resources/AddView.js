function AddView() {
	var win = Ti.UI.createWindow({
		modal: true
	});
	
	var self = Ti.UI.createScrollView({
		backgroundImage:'tableback-nofoam.jpg',
		contentWidth: 'auto',
		contentHeight: 'auto',
		width: Ti.UI.FILL,
		scrollingEnabled: true,
		layout:'vertical'
	});
	var backButton = Ti.UI.createButton({
		title : 'Back',
		height : 40,
		top : 15,
		width: 120
	});	
	var newBrew = [];
	var newTitle = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius: 10,
		editable: true,
		hintText: 'Brew Title',
		width: 300,
		height: 50,
		top: 25,
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    	autocorrect: false,
	});
	var newABV = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius: 10,
		editable: true,
		hintText: 'ABV',
		width: 100,
		height: 50,
		top: 5,
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    	autocorrect: false,
	});
	var newOG = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius: 10,
		editable: true,
		hintText: 'OG',
		width: 100,
		height: 50,
		top: 5,
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    	autocorrect: false,
	});
	var newDate = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius: 10,
		editable: true,
		hintText: 'MMMMM DD YYYY',
		width: 300,
		height: 50,
		top: 5,
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    	autocorrect: false,
	});
	var newBrewcrew = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius: 10,
		editable: true,
		hintText: 'The Brew Crew',
		width: 300,
		height: 50,
		top: 5,
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    	autocorrect: false,
	});
	var newDesc = Ti.UI.createTextArea({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius: 10,
		editable: true,
		hintText: 'Description',
		width: '90%',
		height: 300,
		scrollable: true,
		top: 5,
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    	autocorrect: false,
	});
		var newRating = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius: 10,
		editable: true,
		hintText: 'Rating',
		width: 130,
		height: 50,
		top: 5,
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
    	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
    	autocorrect: false,
	});
	
	var addBtn = Ti.UI.createButton({
		top: 20,
		width: 120,
		height: 40,
		title:'Add Brew'
	});
	self.add(newTitle);
	self.add(newABV);
	self.add(newOG);
	self.add(newDate);
	self.add(newBrewcrew);
	self.add(newDesc);
	self.add(newRating);
	self.add(addBtn);
	self.add(backButton);
	win.add(self);
	win.open();
	
	addBtn.addEventListener('click', setCustomBrew);
	backButton.addEventListener('click', closeAddView);

	function closeAddView() {
		win.close();
	}

	function setCustomBrew() {
		Cloud.Objects.create({
			classname : 'beers',
			fields : {
				name : newTitle.value,
				abv : newABV.value,
				og : newOG.value,
				date : newDate.value,
				brewCrew : newBrewcrew.value,
				desc : newDesc.value,
				rating : newRating.value
			}
		}, function(e) {
			if (e.success) {
				var beer = e.beers[0];
				alert('New Beer, ' + e.beers[0].name +'\nSuccessfully Created');
				newTitle.value = '';
				newABV.value = '';
				newOG.value = '';
				newDate.value = '';
				newBrewcrew.value = '';
				newDesc.value = '';
				newRating.value = '';
			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
		win.close();
	}

 

	//win.addEventListener('back', function(e) {
		//win.close();
	//});
	return win;
};

module.exports = AddView;