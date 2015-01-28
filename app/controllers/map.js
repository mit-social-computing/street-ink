import Ember from 'ember';

export default Ember.ObjectController.extend({
    date: function() {
        /*global moment*/
        return moment(this.get('timestamp')).format('MMM D, YYYY')
    }.property('timestamp')
});
