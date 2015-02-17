import Ember from 'ember';

export function unixToCalendar(input) {
    /*global moment*/
    return moment(input).format('MMM D, YYYY')
}

export default Ember.Handlebars.makeBoundHelper(unixToCalendar);
