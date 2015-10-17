import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.find('map', params.map_id)
    },
    renderTemplate: function(controller, model) {
        this.render('draw', {controller: 'draw', model: model})
    },
    setupController: function(controller, model) {
        var dc = this.controllerFor('draw')

        this._super(controller, model)
        dc.set('selectedCity', dc.get('cities').findBy('id', model.get('city').id))
    }
});
