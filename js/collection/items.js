//Collection
var ItemList = Parse.Collection.extend({
	model: Item,
	query : new Parse.Query(Item),
	initialize : function () {
		var userGroup = Parse.User.current().toJSON().group;
        //
		//var query = new Parse.Query(Parse.User);
		//query.equalTo('name', Parse.User.current());
        //
		//query.find().then(function (user) {
		//
		//});
		//


		//this.query.equalTo('ACL', 'test');
		//console.log(Parse.User.current());
		//this.query.equalTo('user', Parse.User.current());
		this.query.equalTo('group', userGroup);
		console.log(userGroup);
		this.fetch();
	}
});