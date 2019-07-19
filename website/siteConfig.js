/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
  title: 'NKN Docs', // Title for your website.
  tagline: 'A website for nkn online documentations',
  url: 'https://docs.nkn.org', // Your website URL
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'documentations',
  organizationName: 'nknorg',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  cname: 'docs.nkn.org',
  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    //{search: true},
    {doc: 'home', label: 'Docs'},
    {href: 'https://github.com/nknorg/nkn', label: 'GitHub'},
    {href: 'https://nkn.org', label: 'NKN'},
    {href: 'https://github.com/nknorg/nkn/wiki', label: 'Help'},
    //{page: 'help', label: 'Help'},
    //{blog: true, label: 'Blog'},
  ],


  /* path to images for header/footer */
  headerIcon: 'img/favicon.png',
  footerIcon: 'img/favicon.png',
  favicon: 'img/favicon.ico',

  /* Colors for website */
  colors: {
    //primaryColor: '#20232a',
    //secondaryColor: '#1874CD',
    primaryColor: '#006699',
    secondaryColor: '#54375b',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} NKN | All rights reserved`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'atom-one-dark',
  },

  algolia: {
    apiKey: '4a0261289a8269108860d1988a7e48f6',
    indexName: 'nkn',
    algoliaOptions: {} // Optional, if provided by Algolia
  },
  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
      'https://buttons.github.io/buttons.js',
      'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
      '/js/code-blocks-buttons.js',
  ],
  stylesheets: ['/css/code-block-buttons.css'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',
    
  twitterUsername: 'NKN_ORG',
  nknWebsiteUrl: 'https://nkn.org',
  nknForumUrl: 'https://forum.nkn.org',

  docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
     repoUrl: 'https://github.com/nknorg/nkn',
};

module.exports = siteConfig;
