import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('view:application', 'ApplicationView');

// Replace this with your real tests.
test('it has the proper classname', function() {
  var view = this.subject();
  ok(view.classNames.indexOf('l-full') !== -1)
});
