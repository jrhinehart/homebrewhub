function MainPage() {
	var mainWin = Ti.UI.createWindow({
		backgroundColor:'#34B233',
		navBarHidden: true
	});
	var landingPage = Ti.UI.createScrollView({
		backgroundColor: '#34B233',
		scrollType: 'vertical',
		});

	var landingTitle = Ti.UI.createLabel({
		text : 'Welcome, ' + CurrentUser.name + '! \nThis is the Landing Page',
		font : {
			fontSize : '16sp',
			fontWeight : 'bold'
		},
		color : 'black',
		top: 10
	}); 
	landingPage.add(landingTitle);
	
	var ListPage = Ti.UI.createView({});
	var ListPageGuts = require('ListPage');
	ListPage.add(ListPageGuts);

	var pages = [landingPage,ListPage];
	var scrollableView = Ti.UI.createScrollableView({
		showPagingControl: true,
		views: pages
		
	});
	
	mainWin.add(scrollableView);
	mainWin.open();
	return mainWin;
}
module.exports = MainPage;