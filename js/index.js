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
		this.vent = vent;
		//console.log(this.vent);
		this.views.auth = new application.constructors.auth({});
		console.log(this.views.auth);
		//this.collection = new application.constructors.list();
		//this.list = new application.constructors.productView({model: this.collection});
		//this.form = new application.constructors.form({model: this.collection});
		this.vent.on('loginSuccess', function (){
			console.log('Vent caught Success');
		});
	}
});

window.addEventListener('load', function () {
	var container = new Container();
});
