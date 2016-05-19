function ListPage() {
	var AddView = require('AddView');
	var DetailPage = require('DetailPage');
	var self = Ti.UI.createWindow({
		//backgroundColor:'#996633',
		backgroundImage: '/tableback-nofoam.jpg',
		layout:'vertical',
		//exitOnClose: true,
	});
	
	var header_bar = Ti.UI.createView({
		//layout:'horizontal',
		//backgroundColor: '#773333',
		backgroundImage: '/foam.jpg',
		top:0,
		height: Ti.UI.SIZE,
		width: '100%',
		//color:'#000000',
		font:{
			fontSize: '22sp',
			fontWeight: 'bold'
		}	
	});
	
	var header = Ti.UI.createView({
		top:5,
		bottom: 5,
		height:Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		font:{
			fontSize: '22sp',
			fontWeight:'bold'
		}
	});
	var header_lbl = Ti.UI.createLabel({
		height:Ti.UI.SIZE,
		width: '80%',
		//top:10,
		//bottom: 10,
		left:10,
		text: 'All the Homebrews',
		font:{
			fontSize: '24sp',
			fontWeight:'bold'
		},
		shadowColor: '#000000',
 		shadowOffset: {x:1, y:1},
  		shadowRadius: 1,
		color:'#773333'
	});
	
	var table_container = Ti.UI.createView({
		top:0,
		height:Ti.UI.FILL,
		width: '100%'
	});

	var data = [];
	var table = Ti.UI.createTableView({
		font:{
			fontSize: '18sp'
		},
		color: 'black',
		backgroundColor:'transparent'
	});
	
	var button = Ti.UI.createButton({
		backgroundImage: '/add_button.png',
		height: '35dp',
		width: '35dp',
		right:20,
		//left: '82%'
	});
	
	header.add(header_lbl);
	header_bar.add(header);
	header_bar.add(button);
	self.add(header_bar);
	table_container.add(table);
	self.add(table_container);
	self.open();
	
	var data = [];
	//var filterCrit = {};
	
	function fillTable() {
		Cloud.Objects.query({
			classname : 'beers',
			order: '-created_at',
			//where: filterCrit,
			//page: 1,
			//per_page: 20
			
				}, function(e) {
			if (e.success) {
					var data = [];
					for (var i = 0; i < e.beers.length; i++) {
						var beer = e.beers[i];
							var row = Ti.UI.createTableViewRow({
								name: beer.name,
								abv: beer.abv,
								brewdate: beer.date,
								brewcrew: beer.brewCrew,
								desc: beer.desc,
								og: beer.og,
								rating: beer.rating,
								id: beer.id,
								backgroundColor: 'transparent',
								width: Ti.UI.FILL
							});
							var rowWrapper = Ti.UI.createView({
								width: '95%',
								borderRadius: 15,
								borderWidth: 2,
								borderColor:'#773333',
								backgroundColor:'#44FFFFFF',
								layout:'vertical',
								height: Ti.UI.SIZE,
								top:2,
								bottom:2
							});
							var titleLabel = Ti.UI.createLabel({
								font: {
									fontSize: '20sp',
									fontWeight: 'bold'
								},
								text: beer.name,
								ellipsize: true,
						  		top:0,
						  		left:0,
						  		color: '#773333'
							});
							var titleWrapper = Ti.UI.createView({
								top:5,
								left:10,
								height: Ti.UI.SIZE,
								width:'auto'
							});
							titleWrapper.add(titleLabel);
							var brewCrewLabel = Ti.UI.createLabel({
								font: {
									fontSize: '16sp'
								},
								text: beer.brewCrew,
								left:10,
								//top:20,
								width:Ti.UI.SIZE,
								height: Ti.UI.SIZE,
								color: '#773333'
								//ellipsize: true
							});
							var DateLabel = Ti.UI.createLabel({
								font: {
									fontSize: '16sp'
								},
								text: beer.date,
								left:30,
								//top:20,
								height: Ti.UI.SIZE,
								width:Ti.UI.SIZE,
								color: '#773333'
								//ellipsize: true
							});
							var whoWhenWrapper = Ti.UI.createView({
								top: 2,
								layout:'horizontal',
								height: Ti.UI.SIZE,
								width:Ti.UI.FILL
							});
							whoWhenWrapper.add(brewCrewLabel);
							whoWhenWrapper.add(DateLabel);
							var OGLabel = Ti.UI.createLabel({
								font: {
									fontSize: '16sp'
								},
								text: 'OG: ' + beer.og,
								left:10,
								//top:38,
								width:Ti.UI.SIZE,
								height: Ti.UI.SIZE,
								color: '#773333'
								//ellipsize: true	
							});
							var ABVLabel = Ti.UI.createLabel({
								font: {
									fontSize: '16sp'
								},
								text: 'ABV: ' + beer.abv,
								left:40,
								//top:38,
								width:Ti.UI.SIZE,
								color: '#773333'
							});
							var alcWrapper = Ti.UI.createView({
								top: 1,
								bottom:5,
								layout:'horizontal',
								height: Ti.UI.SIZE,
								width:Ti.UI.FILL
							});
							alcWrapper.add(OGLabel);
							alcWrapper.add(ABVLabel);

							rowWrapper.add(titleWrapper);
							rowWrapper.add(whoWhenWrapper);
							rowWrapper.add(alcWrapper);
							row.add(rowWrapper);
						data.push(row);
					};
					table.setData(data);
					Ti.API.info('Success:\n' + 'Count: ' + e.beers.length);	
			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}
	fillTable();
	setInterval(fillTable,4000);
	button.addEventListener('click', function() {
		AddView();
	});

	table.addEventListener('longpress', function(e) {
	
	var beerToDelete = e.rowData.id;
	var delAlert = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : ['Confirm', 'Cancel'],
		message : 'Would you like to delete this Beer?',
		title : 'Delete'
	});
	delAlert.addEventListener('click', function(e) {
			if (e.index === 0) {
				Cloud.Objects.remove({
					classname: 'beers',
					id: beerToDelete
				}, function(e) {
					if (e.success) {
						alert('Beer Deleted');
					} else {
						alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
					}
				});
			}
		});
		delAlert.show();
	});

	table.addEventListener('singletap', DetailPage); 
	
	return self;
}

module.exports = ListPage;