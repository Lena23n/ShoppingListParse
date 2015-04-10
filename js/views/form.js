var FormView = Backbone.View.extend({
	el: $("#addFormContainer"),

	events: {
		"click #add":  "createOnClickAddButton"
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

		this.model.fetch();
	},

	createOnClickAddButton: function() {
		if (!this.inputs.name.val() || !this.inputs.quantity.val()) {
			alert('You should fill in all the fields');
			return;
		}

		this.model.create({
			title: this.inputs.name.val(),
			quantity: this.inputs.quantity.val()
		});

		this.inputs.name.val('');
		this.inputs.quantity.val('');
	}
});