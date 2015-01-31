/*global $*/
import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement: function() {
        $(document).click(() => {
            this.get('element').classList.remove('active')
        })
    },
    classNames: ['dropdown'],
    click: function() {
        this.get('element').classList.toggle('active')
        return false
    },
    actions: {
        selectCity: function(city) {
            this.sendAction('action', city)
        }
    }
})
