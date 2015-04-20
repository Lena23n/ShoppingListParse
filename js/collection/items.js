//Collection
var ItemList = Parse.Collection.extend({
	model: Item,
	query : new Parse.Query(Item),
	initialize : function () {
		var self = this;
		this.vent = vent;
		this.vent.on('showList', function () {
			self.fetchItem();
		})
	},
	fetchItem : function () {
		var currentUser = Parse.User.current(),
			self = this,
			result;

		/*var result = currentUser.get('group');
			self.query.equalTo('group', result);
			self.fetch();*/


		currentUser.fetch().then(function(fetchedUser){
			console.log(fetchedUser);
			return fetchedUser
		}).then(function (fetchedUser) {
			result = fetchedUser.get('group');
			self.query.equalTo('group', result);
			self.fetch();
		})/*.then(function (group) {
		//	self.query.equalTo('group', group);
		//	self.fetch();
		//})*/;

		//var group = new Parse.Query(Group),
		//	query = group.equalTo('name','Test');
        //
		//console.log(currentUser);
		//console.log(query);
		//console.log(currentUser.find('group'));


		//this.query.get('group')
		//	.then(function (group) {
		//		console.log(group);
		//	});

//console.log(this.query.get('objectId'));
		//console.log(currentUser.get('group'));
		//currentUser.get('group')
		//	.then(function (group) {
		//		console.log(group);
        //
		//	});
		//currentUser.get('group')
		//	.then(function (group) {
		//	this.query.equalTo('group', group);
		//	console.log(group);
		//	this.fetch();
		//});


		//var userGroup = Parse.User.current().get('group');
		//if(userGroup != undefined) {
		//this.query.equalTo('group', userGroup);
		//	console.log(userGroup);
		//	this.fetch();
		//}
	}
});