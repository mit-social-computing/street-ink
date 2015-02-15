import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return Ember.$.getJSON('/cities')
    },
    setupController: function(controller, model) {
        controller.set('model', model)
        controller.set('selectedCity', model.cities[0])
        controller.set('currentStreet', model.cities[0].streets[0])
    },
    renderTemplate: function() {
        this.render('draw')
    }
});
