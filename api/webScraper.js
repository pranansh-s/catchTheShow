const cheerio = require('cheerio');
const request = require('request');
const marked = require('marked');
const fs = require('fs');

const BaseUrl = "https://next-episode.net";
const SearchUrl = `${BaseUrl}/search/?name=`;

const dateParser = (dateString) => {
  const d = new Date(dateString);
  const dateObj = {
    day: d.getDate(),
    month: d.getMonth() + 1,
    year: d.getFullYear()
  }
  return dateObj;
}

const notFound = async(req, res) => {
  res.status(404).json({message: "PATH NOT FOUND: go to https://catchtheshow.herokuapp.com/api/documentation for available endpoints"});
};

const getDocs = async(req, res) => {
  const doc = fs.readFileSync('README.md', 'utf8');
  res.send(marked(doc.toString()));
};

const listResults = async(req, res) => {
  var jsonObject = [];
  var searchLink = req.query.name;

  if(!searchLink) searchLink = `${BaseUrl}/${req.params.type}/`;
  else{
    searchLink = searchLink.replace(/ /g, '+');
    searchLink = SearchUrl + searchLink;
  }

  request({uri: searchLink, followRedirect: false}, (error, response, html) => {
    if(!error && (response.statusCode == 200 || response.statusCode == 302)){
      const $ = cheerio.load(html, { ignoreWhitespace: true });
      const cards = $('.item');

      cards.each((i, el) => {
        var obj = {};
        obj.name = $(el).find('.headlinehref').text();
        obj.id = $(el).find('.headlinehref a').attr('href');
        obj.description = $(el).find('.summary').text().replace(/[\n\t]/g, '');
        obj.imageUrl = $(el).find('.item_image').attr('src');
        obj.rating = parseFloat($(el).find('#rating_result').text().replace('/5', '')) || undefined;

        jsonObject.push(obj);
      });
    }
    else res.sendStatus(404);

    var json = JSON.stringify(jsonObject, null, 1);
    res.type('json').send(json);
  });
};

const showInfo = async(req, res) => {
  var jsonObject = {};
  const showId = req.params.id;

  request({uri: `${BaseUrl}/${showId}`, followRedirect: false}, (error, response, html) => {
    if(!error && (response.statusCode == 200 || response.statusCode == 302)){
      const $ = cheerio.load(html, { ignoreWhitespace: true });

      var prev, next;
      jsonObject.name = $('#show_name').text();
      jsonObject.description = $('#summary').text().replace(/[\n\t]/g, '');
      jsonObject.imageUrl = $('#big_image').attr('src');
      jsonObject.rating = parseFloat($('[itemprop=ratingValue]').text()) || undefined;
      jsonObject.creators = $('.sub_main').eq(2).text().split(',').map(str => str.trim());

      if(jsonObject.creators[0] == "") jsonObject.creators = undefined;

      if($('#previous_episode').length == 0) prev = undefined;
      else{
        prev = {};
        prev.name = $('#previous_episode .sub_main').first().text();
        prev.episode = parseInt($('#previous_episode .sub_main').eq(1).text());

        const dateSeason = $('#previous_episode').children().remove().end().text().replace(/[\t\n|]/g, '').trim();
        const [ date, season ] = [ dateParser(dateSeason.slice(0, 16)), parseInt(dateSeason.slice(16)) ];
        prev.season = season;
        prev.date = date;
      }
      if($('#next_episode').length == 0 || $('#next_episode .sub_main').length == 0) next = undefined;
      else{
        next = {};
        next.name = $('#next_episode .sub_main').first().text();
        next.countdown = $('#next_episode span').eq(0).text() || undefined;
        next.episode = parseInt($('#next_episode .sub_main').eq(1).text());

        const dateSeason = $('#next_episode').children().remove().end().text().replace(/[\t\n|]/g, '').trim();
        const [ date, season ] = [ dateParser(dateSeason.slice(0, 16)), parseInt(dateSeason.slice(16)) ];
        next.season = season;
        next.date = date;
      }

      const [ runtime, status ] = $('#middle_section').children().remove().end().text().replace(/[\t\n|,]/g, '').split('.').map(str => str.trim());

      jsonObject.runtime = runtime;
      jsonObject.status = status;
      jsonObject.previousEpisode = prev;
      jsonObject.nextEpisode = next;
    }
    else res.sendStatus(404);

    var json = JSON.stringify(jsonObject, null, 1);
    res.type('json').send(json);
  });
};

const getCast = async(req, res) => {
  var jsonObject = [];
  const showId = req.params.id;

  request({uri: `${BaseUrl}/${showId}/cast`, followRedirect: false}, (error, response, html) => {
      if(!error && (response.statusCode == 200 || response.statusCode == 302)){
        const $ = cheerio.load(html, { ignoreWhitespace: true });
        const cards = $('.castitem');

        cards.each((i, el) => {
          var obj = {};
          obj.name = $(el).find('[itemprop=name]').text();
          obj.imageUrl = $(el).find('img').attr('src');
          obj.role = $(el).find('.role').children().remove().end().text();

          jsonObject.push(obj);
        });
      }
      else res.sendStatus(404);

      var json = JSON.stringify(jsonObject, null, 1);
      res.type('json').send(json);
  });
};

const getEpisode = async(req, res) => {
  var jsonObject = {};
  const showId = req.params.id;
  const season = req.params.season;
  const episode = req.params.episode;

  request({uri: `${BaseUrl}/${showId}/season-${season}`, followRedirect: false}, (error, response, html) => {
    if(!error && (response.statusCode == 200 || response.statusCode == 302)){
      const $ = cheerio.load(html, { ignoreWhitespace: true });
      const ep = $('[itemprop=episode]').eq(parseInt(episode) - 1);

      jsonObject.name = ep.find('[itemprop=name]').text();
      jsonObject.date = dateParser(ep.find('[itemprop=datePublished]').text().trim());
    }
    else res.sendStatus(404);

    var json = JSON.stringify(jsonObject, null, 1);
    res.type('json').send(json);
  });
};

const getSeason = async(req, res) => {
  var jsonObject = [];
  const showId = req.params.id;
  const season = req.params.season;

  request({uri: `${BaseUrl}/${showId}/season-${season}`, followRedirect: false}, (error, response, html) => {
    if(!error && (response.statusCode == 200 || response.statusCode == 302)){
      const $ = cheerio.load(html, { ignoreWhitespace: true });
      const eps = $('[itemprop=episode]');

      eps.each((i, el) => {
        var obj = {};
        obj.name = $(el).find('[itemprop=name]').text();
        obj.date = dateParser($(el).find('[itemprop=datePublished]').text().trim());

        jsonObject.push(obj);
      });
    }
    else res.sendStatus(404);

    var json = JSON.stringify(jsonObject, null, 1);
    res.type('json').send(json);
  });
};

module.exports = { listResults, showInfo, notFound, getCast, getEpisode, getSeason, getDocs };
