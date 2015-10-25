import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      cities: this.store.find('city'),
      colors: this.store.find('color')
    })
  },
//   afterModel(model) {
//     const colors = get(model, 'colors')
//     const firstColor = get(colors, 'firstObject')
//     set(model, 'currentColor', firstColor)
//   },
    actions: {
        openSave: function(model) {
            return this.render('saveModal', {
                into: 'application',
                outlet: 'saveModal',
                controller: 'draw',
                model: model
            })
        },
        closeModal: function(which) {
            return this.disconnectOutlet({
                outlet: which,
                parentView: 'application'
            })
        },
        save: function(model) {
            this.controller.set('status', 'isUploading')
            model.save().then(() => {
              this.controller.set('status', 'isDone')
            }, () => {
              console.log('error', arguments)
            })
        },
        download: function(model) {
            var link = document.createElement('a')
            link.download = model.get('title')
            link.href = model.get('imageData')
            link.click()
        },
        openPreview: function(model) {
            return this.render('previewModal', {
                into: 'application',
                outlet: 'previewModal',
                model: model
            })
        },
        willTransition() {
          this.controller.set('status', null)
        },
    }
});

