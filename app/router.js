import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("new", {path: "/"});
  this.route("new", {path: "/draw"});
  this.route("edit", {path: "/draw/:map_id"});
  this.route("gallery");
  this.route("about");
});

export default Router;
