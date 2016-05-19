function AddReview(selectedBrew) {
	var win = Ti.UI.createWindow({
		modal : true
	});
	var selectedBrew = selectedBrew;

	var self = Ti.UI.createScrollView({
		backgroundImage : 'tableback-nofoam.jpg',
		contentWidth : 'auto',
		contentHeight : 'auto',
		width : Ti.UI.FILL,
		scrollingEnabled : true,
		layout : 'vertical'
	});
	var header_bar = Ti.UI.createView({
		//layout:'horizontal',
		//backgroundColor: '#773333',
		backgroundImage : '/foam.jpg',
		top : 0,
		height : Ti.UI.SIZE,
		width : '100%',
		//color:'#000000',
		font : {
			fontSize : '22sp',
			fontWeight : 'bold'
		}
	});

	var header = Ti.UI.createView({
		top : 5,
		bottom : 5,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		font : {
			fontSize : '22sp',
			fontWeight : 'bold'
		},
		horizontalWrap : true,
	});
	var header_lbl = Ti.UI.createLabel({
		height : Ti.UI.SIZE,
		width : '80%',
		//top:10,
		//bottom: 10,
		left : 10,
		text : 'Review of ' + selectedBrew.name,
		font : {
			fontSize : '24sp',
			fontWeight : 'bold'
		},
		shadowColor : '#000000',
		shadowOffset : {
			x : 1,
			y : 1
		},
		shadowRadius : 1,
		color : '#773333'
	});
	var backButton = Ti.UI.createButton({
		borderColor:'#773333',
		backgroundColor:'#44FFFFFF',
		borderWidth : 2,
		borderRadius : 8,
		title : 'Back',
		left : 10,
		top : 5,
		width: 40
	});
	header.add(header_lbl);
	header_bar.add(header);
	self.add(header_bar);
	self.add(backButton);

	var newReview = [];
	var newContent = Ti.UI.createTextArea({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 10,
		editable : true,
		hintText : 'Your Thoughts?',
		width : '90%',
		height : 300,
		scrollable : true,
		top : 5,
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		autocorrect : false,
	});
	var newRating = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 10,
		editable : true,
		hintText : 'Rating',
		width : 130,
		height : 50,
		top : 5,
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		autocorrect : false,
	});

	var addBtn = Ti.UI.createButton({
		top : 20,
		width : 160,
		height : 60,
		title : 'Add Review'
	});

	self.add(newContent);
	self.add(newRating);
	self.add(addBtn);
	win.add(self);
	win.open();

	addBtn.addEventListener('click', createNewReview);
	backButton.addEventListener('click', function() {win.close();});

	function createNewReview() {
		Cloud.Reviews.create({
			custom_object_id : selectedBrew.id,
			rating : newRating.value,
			content : newContent.value,
		}, function(e) {
			if (e.success) {
				var review = e.reviews[0];
				alert('Success:\n' + 'id: ' + review.id + '\n' + 'rating: ' + review.rating + '\n' + 'content: ' + review.content + '\n' + 'updated_at: ' + review.updated_at);
			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
		win.close();
	}

	return win;
}

module.exports = AddReview; 