import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return this.store.createRecord('map')
    },
    renderTemplate: function() {
        this.render('draw', {controller: 'draw'})
    },
    setupController: function(controller, model) {
        this._super(controller, model)
        controller.set('selectedCity', this.get('cities').get('firstObject'))
        model.set('city', controller.get('selectedCity'))
    }
});
