import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return Ember.$.getJSON('/cities')
    },
    setupController: function(controller, model) {
        controller.set('cities', model.cities)
    },
    renderTemplate: function() {
        this.render('draw')
    }
});
