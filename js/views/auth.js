var AuthView = Backbone.View.extend({
    id: ('auth-wrap'),
    template: _.template($('#auth-view').html()),
    events: {
        "click #auth": "login",
        "click #signUp": "signUp"
    },
    initialize: function () {
        this.vent = vent;
        console.log('Auth is ready');

    },
    render: function () {
        if (!this.template) {
            return false;
        }
        var html = this.template();

        this.$el.html(html);
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
            groupName = this.$el.find('#role').val();

        if (!login.length || !pass.length || !groupName.length) {
            this.showError('verify your credentials, please');
            return false;
        }

        user.set("username", login);
        user.set("password", pass);

        user.signUp(null, {
            success: function (user) {
                var query = new Parse.Query(Group);
                query.equalTo('name', groupName);

                //todo simplify promises
                query.find()
                    .then(function (groups) {

                    if (groups.length > 0) {
                        var currentGroup = groups[0]/*.toJSON().objectId*/;

                        console.log(currentGroup, 'add to group');
                        user.set("group", currentGroup);
                        return user.save();
                            /*.then(function () {
                            self.authSuccess();
                        });*/
                    } else {
                        //var groupList = new Group({name: roleName});
                        //groupList.save();
                        //
                        //console.log(groupList.toJSON().name);
                        //
                        //var query = new Parse.Query(Group);
                        //query.equalTo('name', groupList.toJSON().name);
                        //
                        //query.find().then(function (group) {
                        //    console.log(group[0]);
                        //
                        //    var newGroupId = group[0].toJSON().objectId;
                        //
                        //    user.set("group", newGroupId);
                        //    user.save();
                        //    console.log(newGroupId,'Create new group');
                        //});

                        var groupList = new Group({name: groupName});
                        groupList.save()
                            .then(function (group) {
                            //console.log(group.toJSON().name);
                            //
                            //var name = group.toJSON().name;
                            //return name;
                            console.log(group);
                            user.set('group', group);
                            return user.save();
                        });/*.then(function () {
                            self.authSuccess();
                        })*/



                        /*.then(function (name) {
                            var query = new Parse.Query(Group);
                            query.equalTo('name', name);
                            return query.find();
                        })*//*.then(function (group) {
                            console.log(group[0]);
                            //var newGroupId = group[0].toJSON().objectId;
                            var newGroupId = group[0].id;
                            var query = new Parse.Query(Parse.User.current());
                            query.include(newGroupId);
                            //user.set('parent', newGroupId);

                            //user.set("group", newGroupId);

                            //var relation = user.relation("group");
                            //relation.add(newGroupId);
                            user.save();
                            console.log(newGroupId, 'Create new group');
                        })*/
                    }

                }).then(function () {
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