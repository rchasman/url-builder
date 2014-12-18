require(['jquery', 'react', 'url_builder', 'underscore'], function ($, React, UrlBuilder, _) {
  React.render(React.createElement(UrlBuilder), document.getElementById('url-builder'));
});
