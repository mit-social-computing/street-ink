import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function(controller, model) {
        this._super(controller, model)
        controller.set('cities', this.get('cities'))
        controller.set('colors', this.get('colors'))
        controller.set('currentColor', this.get('colors').get('firstObject'))
    }
});

