const api = require('./webScraper.js');

module.exports = function(app){
  app.route('/api/documentation').get(api.getDocs);

  app.route('/api/search').get(api.listResults);
  app.route('/api/charts/:type').get(api.listResults);
  app.route('/api/:id').get(api.showInfo);
  app.route('/api/:id/cast').get(api.getCast);
  app.route('/api/:id/:season/:episode').get(api.getEpisode);
  app.route('/api/:id/:season').get(api.getSeason);

  app.route('*').get(api.notFound);
};
