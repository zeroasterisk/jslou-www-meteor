// Pages: dynamic/static pages
//   Meteor.Collection() = Basic DB model/collection
//   SmartCollection() = alternative to Meteor.Collection (faster?)
//   GroundDB() to cache data clientside
Pages = new Meteor.Collection('pages');
//Pages = new SmartCollection('pages');
//Pages = new GroundDB('Pages');

/**

DEV NOTE: may just make these pages as Markdown files and render, vs. via an admin interface

*/
