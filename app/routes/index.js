import Ember from 'ember';

export default Ember.Route.extend({

    setupController: function(controller, model) {
        this._super(controller, model);
        this.controllerFor('application').setProperties({
            isHome: true,
            isMatches: false,
            isSettings: false,
        });
    }

});