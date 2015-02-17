import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return Ember.RSVP.allSettled([this.store.find('city'), this.store.find('color')])
    },
    setupController: function(controller, model) {
        var cities = model[0].value,
            colors = model[1].value

        controller.set('model', cities)
        controller.set('colors', colors)
        controller.set('selectedCity', cities.objectAt(0))
        controller.set('currentStreet', cities.objectAt(0).get('streets')[0])
        controller.set('currentColor', colors.objectAt(0))
    },
    renderTemplate: function() {
        this.render('draw')
    }
});
