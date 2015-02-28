import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("draw", {path: "/"});
  this.route("draw", {path: "draw"});
  this.route("draw", {path: "draw/:map_id"});
  this.route("gallery");
  this.route("about");
  this.route("admin");
});

export default Router;
