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

		console.log('List render');
		return this;
	},

	toggleDone: function(e) {
		var idx, query, modelToToggle;

		//modelId = $(e.currentTarget).closest('li').find('span').text();
		//console.log(modelId);
        //
		//query = new Parse.Query(Item);
		//query.equalTo('objectId', modelId);
        //
		//query.find().then(function (models) {
		//	console.log(models[0]);
		//	modelToToggle = models[0];
		//	modelToToggle.toggle();
		//});

		idx = $(e.currentTarget).closest('li').index();
		modelToToggle = this.model.at(idx);

		console.log(idx);
		console.log(modelToToggle);

		modelToToggle.toggle();
	},


	clear: function(e) {
		var idx, query, modelToDestroy;

		//modelId = $(e.currentTarget).closest('li').find('span').text();
		//console.log(this.model);
        //
		//query = new Parse.Query(Item);
		//query.equalTo('objectId', modelId);
        //
		//query.find().then(function (models) {
		//	console.log(models[0]);
		//	modelToDestroy = models[0];
		//	modelToDestroy.destroy();
		//});

		idx = $(e.currentTarget).closest('li').index();
		modelToDestroy = this.model.at(idx);

		modelToDestroy.destroy();
	}

});

