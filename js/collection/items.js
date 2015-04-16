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
		var userGroup = Parse.User.current().toJSON().group;

		if(userGroup != undefined) {
			console.log('fetch');
			this.query.equalTo('group', userGroup);
			console.log(userGroup);
			this.fetch();
			console.log(this);
		}
	}
});