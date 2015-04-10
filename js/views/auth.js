var AuthView = Backbone.View.extend({
    el: $("#auth-view"),
    events: {
        "click #auth":  "login",
        "click #signUp": "signUp"
    },
    initialize : function () {
        this.vent = vent;
        console.log('Auth is ready');

    },
    login : function () {
        console.log('Login is clicked');
        var self = this,
            login = this.$el.find('#login').val(),
            pass = this.$el.find('#password').val();

        Parse.User.logIn(login, pass, {
            success: function(user) {
                self.authSuccess();
            },
            error: function(user, error) {
                self.showError(error.message);
            }
        });
    },
    signUp : function () {
        console.log('signUp is clicked');
    },
    showError : function (error) {
       console.log('error');
        alert(error);
    },
    authSuccess : function () {
        //alert('COOl');
        //this.$el.find('input').val('');
        this.vent.trigger('loginSuccess');
    }
});