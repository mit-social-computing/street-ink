import Ember from 'ember';
import ENV from 'street-ink/config/environment';

var api = ENV.apiHost + ENV.apiPrefix

export default Ember.Route.extend({
    renderTemplate: function() {
        this.render('draw')
    },
    model: function(params) {
        return Ember.$.getJSON(api + 'maps/' + params.map_id)
    }
});
