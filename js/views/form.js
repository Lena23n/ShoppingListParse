var FormView = Backbone.View.extend({
	id: ("app"),
	template: _.template($('#form-view').html()),
	events: {
		"click #add":  "createOnClickAddButton",
		"click #logout": "logout"
	},

	inputs: {
		name : null,
		quantity : null
	},

	items: null,

	view: null,

	initialize: function() {
		this.vent = vent;
	},

	render : function () {
		if (!this.template) {
			return false;
		}
		var html = this.template();

		this.$el.html(html);
		return this;
	},

	createOnClickAddButton: function() {
		this.inputs.name = $("#new-item");
		this.inputs.quantity = $("#count");

		var self = this,
			name = this.inputs.name.val(),
			quantity = this.inputs.quantity.val(),
			currentUser = Parse.User.current(),
			userGroup = currentUser.toJSON().group,
			newACL,
			groupId,
			item;

		if (!name || !quantity) {
			alert('You should fill in all the fields');
			return;
		}

		console.log(userGroup);
		newACL = new Parse.ACL();

		newACL.setPublicReadAccess(true);
		newACL.setPublicWriteAccess(true);


		var query = new Parse.Query(Group);
		query.equalTo('objectId', userGroup);

		query.find().then(function (groups) {
			groupId = groups[0].toJSON().objectId;

			item = {
				title: name,
				quantity: quantity,
				group: groupId
			};

			var data = _.extend({
				ACL: newACL
			}, item);


			self.model.create(data, {
				validate: true,
				error : function (model, error){
					self.showError(error)
				}
			});
			// todo async shit
			self.inputs.name.val('');
			self.inputs.quantity.val('');
		});
	},


	logout : function (){
		Parse.User.logOut();
		this.showAuthView();
	},
	showAuthView : function () {
		this.vent.trigger('showAuthView');
	}
});