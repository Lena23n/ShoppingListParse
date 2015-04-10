// Model
var Item = Parse.Object.extend ("Item", {
	defaults: {
		title: 'Title...',
		quantity: '',
		done: false
	},

	toggle: function() {
		this.set({done: !this.get("done")});
		//this.save();
	}

});