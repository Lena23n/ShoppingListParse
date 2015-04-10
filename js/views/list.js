var ProductList = Backbone.View.extend({
	el: '#item-list',
	template: _.template($('#one-item-template').html()),
	events: {
		"click .toggle": "toggleDone",
		"click a.destroy": "clear"
	},

	initialize: function () {
		this.listenTo(this.model, 'all', this.render);
	},

	render: function () {
		if (!this.template) {
			return false;
		}

		var data = null;

		if (this.model) {
			data = this.model.toJSON();
		}
		var html = this.template({model: data});

		this.$el.html(html);

		return this;
	},

	toggleDone: function(e) {
		var idx, modelToToggle;

		idx = $(e.currentTarget).closest('li').index();
		modelToToggle = this.model.at(idx);

		modelToToggle.toggle();
	},


	clear: function(e) {
		var idx, modelToDestroy;

		idx = $(e.currentTarget).closest('li').index();
		modelToDestroy = this.model.at(idx);

		modelToDestroy.destroy();
	}

});

