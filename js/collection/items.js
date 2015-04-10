//Collection
var ItemList = Parse.Collection.extend({
	model: Item,
	query : new Parse.Query(Item),
	initialize : function (){
		this.query.equalTo('user', Parse.User.current());
		this.fetch();
	}
});