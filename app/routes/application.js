import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return Ember.RSVP.hash({
            cities: this.store.find('city'),
            colors: this.store.find('color')
        })
    }
})
