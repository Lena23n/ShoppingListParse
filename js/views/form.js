var FormView = Backbone.View.extend({
	el: $("#app"),

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
		this.inputs.name = $("#new-item");
		this.inputs.quantity = $("#count");
	},

	createOnClickAddButton: function() {
		var self = this,
			name = this.inputs.name.val(),
			quantity = this.inputs.quantity.val(),
			currentUser = Parse.User.current(),
			userGroup = currentUser.toJSON().group,
			newACL,
			groupId,
			item;

		console.log('Name', name);
		console.log('quantity', quantity);

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
		});

		this.inputs.name.val('');
		this.inputs.quantity.val('');
	},


	logout : function (){
		Parse.User.logOut();
		this.showAuthView();
	},
	showAuthView : function () {
		$('#auth-view').css('display', 'block');
		this.clearList();
		$('#app').css("display","none");
	},
	clearList : function () {
		$('#item-list').html('');
	}
});