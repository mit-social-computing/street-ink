import DS from 'ember-data';
import ENV from 'street-ink/config/environment';

export default DS.RESTAdapter.extend({
    host: ENV.apiHost,
    namespace: ENV.apiPrefix
});
