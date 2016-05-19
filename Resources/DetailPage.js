function DetailPage(e) {
	var addReview = require('/addReview');
	var selectedBrew = e.rowData;
	var DetailWindow = Ti.UI.createWindow({
		modal : true,
		backgroundColor : 'black',
		layout : 'vertical',
		//exitOnClose: true, //TODO:Remove if adding other views post-login
	});
	var scroll = Ti.UI.createScrollView({
		backgroundImage : 'tableback-nofoam.jpg',
		scrollType : 'vertical',
		layout : 'vertical',
		scrollType: 'vertical'
	});
	var detailHeader = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		backgroundImage : '/foam.jpg',
		horizontalWrap : true
	});
	var headerTitle = Ti.UI.createLabel({
		text : selectedBrew.name,
		color : '#773333',
		left : '5%',
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
		top : 5,
		bottom : 5,
		height: Ti.UI.SIZE
	});
	var crewTitle = Ti.UI.createButton({
		title : selectedBrew.brewcrew,
		text : selectedBrew.brewcrew,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		borderRadius : 5,
		//borderWidth: 2,
		backgroundColor : '#55532424',
		color : '#CCCCCC',
		font : {
			fontSize : '22sp',
			fontWeight: 'bold'
		},
		zIndex : 2,
		top : 5,
		left : 15
	});
	detailHeader.add(headerTitle);
	scroll.add(detailHeader);
	// scroll.add(crewTitle);
	// crewTitle.addEventListener('click', function(e) {
	// 	alert('Future: \nChange crew, find info about crew, logout, etc');
	// });
	function newDetLabel(title, content) {
		var wrapper = Ti.UI.createView({
			top : 10,
			left : 15,
			height : Ti.UI.SIZE,
			width : Ti.UI.SIZE,
			borderRadius : 5,
			backgroundColor : '#88773333'
		});
		var category = Ti.UI.createLabel({
			text : title,
			font : {
				fontSize : '20sp',
				fontWeight : 'bold'
			},
			color : '#CCCCCC',
			left:5,
			right:5
		});
		var wrapper2 = Ti.UI.createView({
			top : 0,
			left : 20,
			right : 20,
			height : Ti.UI.SIZE,
			width : Ti.UI.SIZE,
			backgroundColor : 'transparent'
		});
		var guts = Ti.UI.createLabel({
			text : content,
			color : '#773333'
		});
		wrapper.add(category);
		scroll.add(wrapper);
		wrapper2.add(guts);
		scroll.add(wrapper2);
		return wrapper;
	}

	var DetAbv = newDetLabel('ABV  +  OG', selectedBrew.abv + '        ' + selectedBrew.og);
	var DetDate = newDetLabel('Brewed:           by:', selectedBrew.brewdate + '        ' + selectedBrew.brewcrew);
	var DetDesc = newDetLabel('Description:', selectedBrew.desc);
	var DetRating = newDetLabel('Rating:', selectedBrew.rating + ' Steins!');

	var addReviewBtn = Ti.UI.createButton({
		title: 'Add Review',
		//borderRadius: 10,
		//borderWidth: 2,
		//borderColor:'#773333',
		//backgroundColor:'#66FFFFFF',
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		top:2,
		bottom:2,
		//color: '#773333',
	});
	
	var backToListBtn = Ti.UI.createButton({
		title: 'Back to List',
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		top:2,
		bottom:2,
	});
	var reviewWrapper = Ti.UI.createView({
		height: Ti.UI.SIZE,
		width: '95%',
		borderRadius: 10,
		borderWidth: 2,
		borderColor:'#773333',
		backgroundColor:'#44FFFFFF',
		layout:'vertical',
	});

	function getReviews() {
		Cloud.Reviews.query({
			custom_object_id : selectedBrew.id,	
		}, function(e) {
			if (e.success) {
				for (var i = 0;i<e.reviews.length;i++) {
					var review = e.reviews[i];
					var reviewBox = Ti.UI.createView({
						//width: Ti.UI.SIZE,
						borderRadius: 10,
						//borderWidth: 2,
						//borderColor:'#773333',
						backgroundColor: 'transparent',
						layout: 'vertical',
						height: Ti.UI.SIZE,
						top:5,
						bottom:5,
						left:5,
						right:5
					});
					var reviewerNameBox = Ti.UI.createView({
						width: Ti.UI.SIZE,
						height: 35,
						left: 10,
						top:5
					});
					var reviewerName = Ti.UI.createLabel({
						text: 'Written by: ' + review.user.username,
						color: '#773333',
					});
					reviewerNameBox.add(reviewerName);
					var reviewGutWrapper = Ti.UI.createView({
						top:2,
						left:10,
						bottom: 10,
						height: Ti.UI.SIZE
					});
					var reviewGuts = Ti.UI.createLabel({
						text: review.content,
						color:'#773333',
						height: Ti.UI.SIZE
					});
					reviewGutWrapper.add(reviewGuts);
					reviewBox.add(reviewerNameBox);
					reviewBox.add(reviewGutWrapper);
					reviewWrapper.add(reviewBox);
				}
				//alert('Success:\n' + 'id: ' + review.id + '\n' + 'rating: ' + review.rating + '\n' + 'content: ' + review.content + '\n' + 'updated_at: ' + review.updated_at);
			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
			
		});
	}
	scroll.add(addReviewBtn);
	scroll.add(backToListBtn);
	addReviewBtn.addEventListener('click', function() {
		addReview(selectedBrew);
	});
	backToListBtn.addEventListener('click', closeDetail);
	scroll.add(reviewWrapper);
	getReviews();
	DetailWindow.add(scroll);
	DetailWindow.open();
	
	function closeDetail() {
		DetailWindow.close();
	}
	
	return DetailWindow;
};

module.exports = DetailPage;