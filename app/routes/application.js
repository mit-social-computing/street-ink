import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return Ember.RSVP.hash({
            cities: this.store.find('city'),
            colors: this.store.find('color')
        })
    },
    actions: {
        openSave: function(model) {
            return this.render('saveModal', {
                into: 'application',
                outlet: 'saveModal',
                model: model
            })
        },
        closeModal: function() {
            return this.disconnectOutlet({
                outlet: 'saveModal',
                parentView: 'application'
            })
        },
        save: function(model) {
            model.save()
        }
    }
})
