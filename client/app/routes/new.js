import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return this.store.createRecord('map')
    },
    renderTemplate: function(controller, model) {
        this.render('draw', {controller: 'draw', model: model})
    },
    setupController: function(controller, model) {
        var dc = this.controllerFor('draw')

        this._super(controller, model)
        dc.set('selectedCity', dc.get('cities').get('firstObject'))
        dc.get('selectedCity.streets').setEach('color', null)
        dc.set('currentColor', dc.get('colors').get('firstObject'))
        model.set('city', dc.get('selectedCity'))
    }
});
