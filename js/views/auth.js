var AuthView = Backbone.View.extend({
    id : ('auth-wrap'),
    template: _.template($('#auth-view').html()),
    events: {
        "click #auth": "login",
        "click #signUp": "signUp"
    },
    initialize: function () {
        this.vent = vent;
        console.log('Auth is ready');

    },
    render : function () {
        if (!this.template) {
            return false;
        }
        var html = this.template();

        this.$el.html(html);

        console.log(this);
        return this;
    },
    login: function () {

        var self = this,
            login = this.$el.find('#login').val(),
            pass = this.$el.find('#password').val();

        Parse.User.logIn(login, pass, {
            success: function (user) {
                self.authSuccess();
            },
            error: function (user, error) {
                self.showError(error.message);
            }
        });
    },
    signUp: function () {
        var self = this,
            user = new Parse.User(),
            login = this.$el.find('#newLogin').val(),
            pass = this.$el.find('#newPassword').val(),
            roleName = this.$el.find('#role').val();

        if (!login.length || !pass.length || !roleName.length) {
            this.showError('verify your credentials, please');
            return false;
        }

        user.set("username", login);
        user.set("password", pass);

        user.signUp(null, {
            success: function (user) {
                var query = new Parse.Query(Group);
                query.equalTo('name', roleName);

                //todo simplify promises
                query.find().then(function (groups) {
                    if (groups.length > 0) {
                        var currentGroupId = groups[0].toJSON().objectId ;
                        console.log(currentGroupId,'add to group');
                        user.set("group", currentGroupId);
                        user.save();
                    } else {
                        var groupList = new Group({name: roleName});
                        groupList.save();

                        console.log(groupList.toJSON().name);

                        var query = new Parse.Query(Group);
                        query.equalTo('name', groupList.toJSON().name);

                        query.find().then(function (group) {
                            console.log(group[0]);

                            var newGroupId = group[0].toJSON().objectId;

                            user.set("group", newGroupId);
                            user.save();
                            console.log(newGroupId,'Create new group');
                        });

                    }
                    self.authSuccess();
                });
            },
            error: function (user, error) {
                self.showError(error.code + " " + error.message);
            }
        });
    },
    showError: function (error) {
        alert(error);
    },
    authSuccess: function () {
        this.$el.find('input').val('');
        this.vent.trigger('loginSuccess');
    }
});
// todo promise practice
/*setTimeout(function () {
    console.log(1);
    setTimeout(function () {
        console.log(2);
        setTimeout(function () {
            console.log(3);
        }, 100);
    }, 100);
}, 100);*/
