var AuthView = Backbone.View.extend({
    el: $("#auth-view"),
    events: {
        "click #auth": "login",
        "click #signUp": "signUp"
    },
    initialize: function () {
        this.vent = vent;
        console.log('Auth is ready');

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

                query.find().then(function (groups) {
                    if (groups.length > 0) {
                        var currentGroupId = groups[0].toJSON().objectId;
                        console.log(currentGroupId,'add to group');
                        user.set("group", currentGroupId);
                        user.save();
                    } else {
                        var groupList = new Group({name: roleName});
                        groupList.save();

                        var query = new Parse.Query(Group);
                        query.equalTo('name', groupList.toJSON().name);

                        query.find().then(function (group) {
                            var newGroupId = group[0].toJSON().objectId;

                            user.set("group", newGroupId);
                            user.save();
                            console.log(newGroupId,'Create new group');
                        });

                    }
                });

                //var query = new Parse.Query(Parse.Role);
                //query.equalTo('name', roleName);
                //
                //query.find().then(function(roles) {
                //    if (roles.length > 0) {
                //        currentRole = roles[0];
                //        currentRole.getUsers().add(Parse.User.current());
                //        currentRole.save();
                //        console.log('User was added to the role');
                //    } else {
                //        roleACL.setPublicReadAccess(true);
                //        roleACL.setPublicWriteAccess(true);
                //
                //        var role = new Parse.Role(roleName, roleACL);
                //        console.log(role);
                //        role.getUsers().add(Parse.User.current());
                //
                //        console.log(role.getUsers().add(Parse.User.current()));
                //        role.save();
                //
                //        console.log('New role was added');
                //    }
                //});

                self.authSuccess();
            },
            error: function (user, error) {
                self.showError(error.code + " " + error.message);
            }
        });

        //var query = new Parse.Query(Parse.Role);
        //query.equalTo('name', roleName);
        //
        //query.find().then(function(roles) {
        //    if (roles.length > 0) {
        //        currentRole = roles[0];
        //        currentRole.getUsers().add(Parse.User.current());
        //        currentRole.save();
        //        console.log('User was added to the role');
        //    } else {
        //        roleACL.setPublicReadAccess(true);
        //        roleACL.setPublicWriteAccess(true);
        //
        //        var role = new Parse.Role(roleName, roleACL);
        //        console.log(role);
        //        role.getUsers().add(Parse.User.current());
        //
        //        console.log(role.getUsers().add(Parse.User.current()));
        //        role.save();
        //
        //        console.log('New role was added');
        //    }
        //});


    },
    showError: function (error) {
        alert(error);
    },
    authSuccess: function () {
        this.$el.find('input').val('');
        this.vent.trigger('loginSuccess');
    }
});