import Ember from 'ember';

export function feetToMiles(input) {
    if ( typeof input !== 'number' && isNaN(input) ) {
        return input
    }
    return (parseInt(input, 10) * 0.000189394).toFixed(2);
}

export default Ember.Handlebars.makeBoundHelper(feetToMiles);
