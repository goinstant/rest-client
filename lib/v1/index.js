/*jshint node:true*/
'use strict';

exports = module.exports = Version1;

var Client = require('../client');

var Route = require('./route');
var Teams = require('./teams');
var Keys = require('./keys');

function Version1(opts) {
  this.client = new Client(opts);

  this.devs = new Route(this.client, 'devs');
  this.developers = this.devs;

  this.apps = new Route(this.client, 'apps');
  this.applications = this.apps;

  this.keys = new Keys(this.client);
  this.teams = new Teams(this.client);
}
