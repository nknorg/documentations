/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    const currentYear = new Date().getFullYear();
    let language = this.props.language || '';
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <img
            src={this.props.config.baseUrl + this.props.config.footerIcon}
            alt="Bowler"
            height="45"
            />
          <a href={this.props.config.nknWebsiteUrl}>
            NKN
          </a>
          <a href={'https://twitter.com/' + this.props.config.twitterUsername}>
            Twitter
          </a>
          <a href={this.props.config.repoUrl}>
            GitHub
          </a>
          <a href={this.props.config.nknForumUrl}>
            Forum
          </a>
        </section>

        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
