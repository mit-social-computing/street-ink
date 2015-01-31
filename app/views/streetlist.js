/*global $*/
import Ember from 'ember';

export default Ember.View.extend({
    templateName: 'streetlist',
    classNames: ['scrollbar'],
    didInsertElement: function() {
        $(window)
    }
});
