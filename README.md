# Online Docs of NKN

This documentations is the English version of documents of NKN. You can read it at [NKN Docs](https://nknorg.github.io/documentations).


# Get Started


## Fork repository

fork *nknorg/documentations* to your own github account.

## Clone repository

```sh
$ git clone https://github.com/<YOUR NAME>/documentations.git
```

## Install dependencies

```sh
$ yarn install
```

## testing in localhost

```sh
$ yarn run start
```

## commit your code

```sh
$ git add --all
$ git commit -m "commit comments"
$ git push origin master
```

## pull request

create a pull request to remote repository.


## Directory Structure

Your project file structure should look something like this

```
documentations/
  docs/
    home.md
    get-start.md
    jsonrpc-api-reference.md
  website/
    core/
    node_modules/
    pages/
    static/
      css/
      img/
    package.json
    sidebar.json
    siteConfig.js
```

# Editing Content

## Editing an existing docs page

Edit docs by navigating to `docs/` and editing the corresponding document:

`docs/jsonrpc-api-reference.md`

```markdown
---
id: jsonrpc-api-reference
title: JsonRPC API Reference
---
```

# Adding Content

## Adding a new docs page to an existing sidebar

1. Create the doc as a new markdown file in `/docs`, example `docs/jsonrpc-api-reference.md`:

```md
---
id: jsonrpc-api-reference
title: JsonRPC API Reference
---
```

1. Refer to that doc's ID in an existing sidebar in `website/sidebar.json`:

```javascript
// Add newly-created-doc to the API Reference category of docs
{
  "docs": {
    "API Reference": [
      "quick-start",
      "jsonrpc-api-reference" // new doc here
    ],
    ...
  },
  ...
}
```

## Adding items to your site's top navigation bar

1. Add links to docs, custom pages or external links by editing the headerLinks field of `website/siteConfig.js`:

`website/siteConfig.js`
```javascript
{
  headerLinks: [
    ...
    /* you can add docs */
    { doc: 'my-examples', label: 'Examples' },
    /* you can add custom pages */
    { page: 'help', label: 'Help' },
    /* you can add external links */
    { href: 'https://nkn.org', label: 'NKN' },
    ...
  ],
  ...
}
```

