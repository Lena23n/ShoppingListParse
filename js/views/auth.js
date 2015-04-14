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

        var self = this,
            login = this.$el.find('#login').val(),
            pass = this.$el.find('#password').val();



        var query = new Parse.Query(Parse.Role);
        query.equalTo('name', 'test');
        query.find().then(function(roles){
            console.log(roles/*.getUsers().add(Parse.User.current())*/);
            //roles[0].save().then(function () {
            //	self.setState({
            //		visibleSpinner: 'hidden'
            //	});
            //	self.props.showMainView();
            //});
        });

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
        var self = this,
            user = new Parse.User(),
            roleACL = new Parse.ACL(),
            login = this.$el.find('#newLogin').val(),
            pass = this.$el.find('#newPassword').val(),
            roleName = this.$el.find('#role').val(),
            role;

        if (!login.length || !pass.length || !roleName.length) {
            this.showError('verify your credentials, please');
            return false;
        }

        user.set("username", login);
        user.set("password", pass);



        user.signUp(null, {
            success: function(user) {
                roleACL.setPublicReadAccess(true);
                roleACL.setPublicWriteAccess(true);

                role = new Parse.Role(roleName, roleACL);
                role.getUsers().add(Parse.User.current());
                role.save();

                self.authSuccess();
            },
            error: function(user, error) {
                self.showError(error.code + " " + error.message);
            }
        });
    },
    showError : function (error) {
        alert(error);
    },
    authSuccess : function () {
        this.$el.find('input').val('');
        this.vent.trigger('loginSuccess');
    }
});