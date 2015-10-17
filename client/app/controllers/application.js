import Ember from 'ember';

export default Ember.Controller.extend({
    isAbout: function() {
        return this.currentRouteName === 'about'
    }.property('currentRouteName')
});
