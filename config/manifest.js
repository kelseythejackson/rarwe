'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: "Rock & Roll with Ember.js 3",
    short_name: "RaRwE 3",
    description: "A catalog of great rock bands",
    start_url: "/",
    display: "standalone",
    background_color: "#555",
    theme_color: "#fff",
    icons: [
      {
        src: "/images/icons/logo-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/images/icons/logo-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
    ],
    ms: {
      tileColor: '#fff'
    }
  };
}