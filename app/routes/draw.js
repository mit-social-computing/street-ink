import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        if (params.map_id) {
            return this.store.find('map', params.map_id)
        } else {
            return this.store.createRecord('map')
        }
    },
    afterModel: function() {
        var self = this
        return Ember.RSVP.hash({
            cities: this.store.find('city'),
            colors: this.store.find('color')
        }).then(function(result) {
            self.set('cities', result.cities)
            self.set('colors', result.colors)
        })
    },
    setupController: function(controller, model) {
        this._super(controller, model)
        controller.set('cities', this.get('cities'))
        controller.set('colors', this.get('colors'))
        controller.set('currentColor', this.get('colors').get('firstObject'))

        if ( model.get('isNew') ) {
            controller.set('selectedCity', this.get('cities').get('firstObject'))
            model.set('city', controller.get('selectedCity'))
        } else {
            controller.set('selectedCity', this.get('cities').findBy('id', model.get('city').id))
        }
    }
});
