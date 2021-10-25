# Medium Markdown
[![npm V0.1.0](https://img.shields.io/badge/npm-0.1.3-orange.svg)](https://www.npmjs.com/package/medium-markdown)
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

`generateFile` also takes in an optional padding before and after argument, which it
adds to the markdown. Thus, to directly generate Jekyll suitable markdown posts,
you can do the following (this is the script I use too):

```javascript
const markdownConverter = require('medium-markdown');

const url = 'your medium article url';

const paddingBefore = `---
layout: post
---
Originally published on [Medium](${url})  
`;

async function main(postUrl) {
    markdownConverter.generateFile(
        await markdownConverter.convert(postUrl),
        paddingBefore,
    );
}

main(url);

```

Further, I have fixed the subtitles for images looking pathetic. To style the subtitles
however you want, you can use the following css. Or add it to your existing `.scss` file on Jekyll.

```css

img + em {
    font-style: italic;
    font-weight: 600;
    margin-bottom: 20px;
    margin-top: 8px;
    display: block;
    text-align: center;
    font-size: 14px;
    color: black;
}

```

This returns me, precisely, [this](https://neilkakkar.com/Writing-isn't-about-more.html)
