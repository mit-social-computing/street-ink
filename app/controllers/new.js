import Ember from 'ember';

export default Ember.Controller.extend({
    selectedCity: function() {
        return this.get('cities').findBy('id', this.get('city'))
    }.property('city'),
    actions: {
        setCity: function(city) {
            this.set('city', city.id)
        }
    }
})
