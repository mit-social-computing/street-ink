import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return Ember.$.getJSON('/cities')
    },
    setupController: function(controller, model) {
        controller.set('cities', model.cities)
        controller.set('colors', model.colors)
        controller.set('selectedCity', model.cities[0])
    },
    renderTemplate: function() {
        this.render('draw')
    }
});
