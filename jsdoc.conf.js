'use strict';

module.exports = {
  plugins: [
    "node_modules/jsdoc-vuejs",
    'plugins/markdown'
  ],
  source: {
    "includePattern": "\\.(vue|js)$"
  },
  opts: {
    encoding: 'utf8',
    destination: 'docs-docstrap',
    template: './node_modules/ink-docstrap/template',
    readme: "README.md",
    theme: "cosmo"
  },
  templates: {
    linenums: true,
    outputSourceFiles: true,
  }
};
