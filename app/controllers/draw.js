import Ember from 'ember';

export default Ember.Controller.extend({
    needs: 'application',
    actions: {
        setCity: function(city) {
            this.set('selectedCity', city)
            this.get('model').set('city', city.id)
        }
    },
    init: function() {
        var model = this.get('controllers.application.model')
        this.set('cities', model.cities)
        this.set('colors', model.colors)
        this.set('currentColor', model.colors.get('firstObject'))
    }
});
