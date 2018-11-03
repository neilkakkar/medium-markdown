# Medium Markdown
[![npm V0.1.0](https://img.shields.io/badge/npm-0.1.0-orange.svg)](https://www.npmjs.com/package/medium-markdown)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/neilkakkar/medium-markdown/blob/master/LICENSE)

## Introduction
This package provides two functions: 
* generating markdown from an Medium article
* writing the article to file

The package supports [Jekyll](https://github.com/jekyll) style blogging, 
such that you can directly copy the generated file into your `_posts/` folder. 

## Usage
```javascript

const markdownConverter = require('medium-markdown');

async function main(postUrl) {
    markdownConverter.generateFile(
        await markdownConverter.convert(postUrl));
}

```

The `convert` function returns a dict containing `{ markdown, heading, time }`
for the Medium post.
