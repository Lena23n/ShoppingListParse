var application = {
	views : {},
	models : {},
	constructors : {
		views : {},
		models : {}
	}
};

application.constructors.form = FormView;
application.constructors.auth = AuthView;
application.constructors.productView = ProductList;
application.constructors.list = ItemList;
application.constructors.container = null;

Parse.initialize("YZp2Tqvez72boawZIl1Q6imzyfJvytJuvtmzrvz7", "UvDJCduCQ8b5NSpnBIu5KlypZvTSqgg2Y62QIoJ2");

var vent = _.extend({}, Backbone.Events);

var Container = Backbone.View.extend({
	//list : null,
	//form : null,
	//model : null,
	//collection: null,
	vent: null,
	views : {
		addForm : null,
		list : null,
		auth : null
	},

	initialize : function () {
		var self = this;
		this.vent = vent;

		this.views.auth = new application.constructors.auth({});


		//var query = new Parse.Query(Group);
		//query.equalTo('name', 'Gropchik');
        //
		//query.find().then(function (groups) {
		//		console.log(groups[0].toJSON().objectId);
        //
		//});



		this.vent.on('loginSuccess', function () {
			console.log('Vent caught Success');
			self.showList();
		});

	},
	showList : function () {
		this.collection = new application.constructors.list();
		this.list = new application.constructors.productView({model: this.collection});
		this.form = new application.constructors.form({model: this.collection});

		$('#auth-view').css("display","none");
		$('#app').css("display","block");
	}
});

window.addEventListener('load', function () {
	var container = new Container();
});
