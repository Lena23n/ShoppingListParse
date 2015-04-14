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

		//var query = new Parse.Query(Parse.Role);
		//query.equalTo('name', 'Test');

		//query.contains("name", "Test");
        //
		//console.log(query.get("name"));


		var query = new Parse.Query(Parse.Role);
		query.equalTo('name', 'k');
		query.find().then(function(roles){
			console.log(roles);

		});


		//var queryRole = new Parse.Query(Parse.Role);
		//queryRole.equalTo('name', 'Test');
		//queryRole.first({
		//	success: function(result) { // Role Object
		//		var role = result;
		//		var adminRelation = new Parse.Relation(role, 'users');
		//		var queryAdmins = adminRelation.query();
		//		queryAdmins.equalTo('objectId', Parse.User.current().id);
		//		queryAdmins.first({
		//			success: function(result) {    // User Object
		//				var user = result;
		//				user ? console.log('USER : ', user) : console.log('User not Administrator!');
		//			}
		//		});
		//	},
		//	error: function(error) {}
		//});

//query.find().then(function(obj) {
//	console.log(obj);
//	console.log('the user with name test was found');
//}, function(error) {
//	alert("Error: " + error.code + " " + error.message);
//});

		//console.log((new Parse.Query(Parse.Role)).equalTo("name", "Test").find());

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
