import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return Ember.$.getJSON('/cities')
    },
    setupController: function(controller, model) {
        controller.set('cities', model.cities)
        controller.set('colors', model.colors)
    },
    renderTemplate: function() {
        this.render('draw')
    }
});
