import Ember from 'ember';

export default Ember.Controller.extend({
    currentUser: "",
    currentName: "",

    email: "",
    password: "",

    signupName: "",
    signupEmail: "",
    signupPassword: "",
    allergicPeanuts: null,
    allergicGluten: null,
    allergicShellfish: null,

    isAuthenticated: function() {
        return !Ember.isEmpty(this.get('currentUser'));
    }.property('currentUser'),

    actions: {
        login: function() {
            var _this = this;

            var data = this.getProperties('email', 'password');

            this.setProperties({
                password: null
            });

            Ember.$.post('http://localhost:3000/session', data).then(function(response) {
                _this.setProperties({
                    currentUser: response.user_id,
                    currentName: response.user_name
                });
            }, function(err) {
                if (err.status === 401) {
                    Ember.$('#alertError').fadeIn();
                }
            });
        },

        signUp: function() {
            var allergies = [];
            if (this.get('allergicShellfish')) {
                allergies.push("Shellfish");
            }
            if (this.get('allergicGluten')) {
                allergies.push("Gluten");
            }
            if (this.get('allergicPeanuts')) {
                allergies.push("Peanuts");
            }

            var diet = Ember.$('#diet')[0].value;
            var user = this.get('store').createRecord('user', {
                name: this.get('signupName'),
                email: this.get('signupEmail'),
                password: this.get('signupPassword'),
                allergies: allergies,
                diet: diet
            });
            user.save();
            this.setProperties({
                currentUser: user.get('id'),
                currentName: this.get('signupName'),
            });
            Ember.$('#myModal').modal('hide');
        },

        closeError: function() {
            Ember.$('#alertError').fadeOut();
        }

    }

});
