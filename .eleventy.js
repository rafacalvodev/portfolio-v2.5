const i18n = require('eleventy-plugin-i18n');
const translations = require('./src/_data/i18n');
const markdownIt = require('markdown-it');
//const markdownItAnchor = require('markdown-it-anchor');
const emojiReadTime = require('@11tyrocks/eleventy-plugin-emoji-readtime');
const { DateTime } = require('luxon');
const fs = require('fs');

const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection('posts_en', function (collection) {
    return collection.getFilteredByGlob('./src/en/posts/*.md');
  });
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection('posts_fr', function (collection) {
    return collection.getFilteredByGlob('./src/fr/posts/*.md');
  });
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy('src/_redirects');

  eleventyConfig.addWatchTarget('./src/assets/sass/');

  eleventyConfig.addPassthroughCopy('./src/assets/sass');
  eleventyConfig.addPassthroughCopy('./src/assets/fonts');
  eleventyConfig.addPassthroughCopy('./src/assets/img');
  eleventyConfig.addPassthroughCopy('./src/assets/js/main.js');
  eleventyConfig.addPassthroughCopy('./src/assets/favicon.png');
  eleventyConfig.addPassthroughCopy('./src/favicon.png');

  eleventyConfig.addFilter('jsonTitle', (str) => {
    let title = str.replace(/((.*)\s(.*)\s(.*))$/g, '$2&nbsp;$3&nbsp;$4');
    title = title.replace(/"(.*)"/g, '\\"$1\\"');
    return title;
  });

  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('DDDD');
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd LLL yyyy'
    );
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('head', (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Return the smallest number argument
  eleventyConfig.addFilter('min', (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1
    );
  }

  eleventyConfig.addFilter('filterTagList', filterTagList);

  // Create an array of all tags
  eleventyConfig.addCollection('tagList', function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });

    return filterTagList([...tagSet]);
  });

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  });
  // .use(markdownItAnchor, {
  //   permalink: true,
  //   permalinkClass: 'direct-link',
  //   permalinkSymbol: '#',
  // });
  eleventyConfig.setLibrary('md', markdownLibrary);

  eleventyConfig.addPlugin(emojiReadTime, {
    emoji: '📕',
    label: 'mins',
    wpm: 300,
    bucketSize: 3,
  });

  // date filter (localized)
  eleventyConfig.addNunjucksFilter('date', function (date, format, locale) {
    locale = locale ? locale : 'en';
    moment.locale(locale);
    return moment(date).format(format);
  });

  // Plugins
  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      '*': 'es-ES',
    },
  });

  // TEMP demo of what could be an i18n-aware plural package?
  eleventyConfig.addFilter('pluralize', function (term, count = 1) {
    // Poorman's pluralize for now...
    return count === 1 ? term : `${term}s`;
  });

  // Browsersync
  // Redirect from root to default language root during --serve
  // Can also be handled by netlify.toml?
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', (req, res) => {
          if (req.url === '/') {
            res.writeHead(302, {
              location: '/es-ES/',
            });
            res.end();
          }
        });
      },
    },
  });

  // base config
  return {
    dir: {
      input: 'src',
      output: 'public',
      includes: '_includes',
      data: '_data',
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true,
  };
};
