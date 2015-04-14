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
		var name = this.inputs.name.val(),
			quantity = this.inputs.quantity.val(),
			item = {
				title: name,
				quantity: quantity
			};


		if (!name || !quantity) {
			alert('You should fill in all the fields');
			return;
		}

		//var postACL = new Parse.ACL();
		//postACL.setRoleWriteAccess("Moderators", true);
		//wallPost.setACL(postACL);
		//wallPost.save();

		var data = _.extend({
			user:    Parse.User.current(),
			ACL:     new Parse.ACL(/*Parse.User.current()*/'k')
		}, item);

		this.model.create(data, {
			validate: true,
			error : function (model, error){
				self.showError(error)
			}
		});

		//this.model.create({
		//	title: name,
		//	quantity: quantity
		//});
        //
		//this.model.setACL(new Parse.ACL(Parse.User.current()));
		//this.model.save();

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