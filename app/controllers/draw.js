import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        setCity: function(city) {
            this.set('selectedCity', city)
            this.get('model').set('city', city.id)
        },
        saveMap: function(pathData) {
            this.get('model').set('pathData', pathData).save()
        }
    }
});
