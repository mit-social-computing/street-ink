import Ember from 'ember';
import ENV from 'street-ink/config/environment';

var api = ENV.apiHost + ENV.apiPrefix

export default Ember.Controller.extend({
    actions: {
        save: function() {
            console.log('name', this.get('cityName'))
            console.log('streets:', this.get('streets'))

            Ember.$.post(api + 'cities/', { 
                name: this.get('cityName'),
                streets: this.get('streets')
            })
        }
    }
});
