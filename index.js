const request = require('request');
const TurndownService = require('turndown');
const util = require('util');
const fs = require('fs');
const cheerio = require('cheerio');

const rules = require('./rules');

const asyncGetRequest = util.promisify(request.get).bind(request);
const asyncWriteFile = util.promisify(fs.writeFile).bind(fs);

const turndownService = new TurndownService();

async function convert(url) {
    try {
        const resp = await asyncGetRequest(url);
        if (resp.statusCode !== 200) {
            console.log('Error while fetching URL');
            return resp.statusMessage;
        }

        turndownService.addRule('lineBreakRule', rules.linebreakRule);
        turndownService.addRule('figureDivNoLineBreakRule', rules.figureDivNoLinkeBreakRule);
        turndownService.addRule('figureCapNoLineBreakRule', rules.figCaptionEnclosing);
        
        const $ = cheerio.load(resp.body);
        const html = $('.postArticle-content').html();
        const markdown = turndownService.turndown(html);
        const time = $('time').attr('datetime').split('T')[0];
        const heading = $('h1', '.section-inner.sectionLayout--insetColumn')
            .html();
        return Promise.resolve({ markdown, heading, time });
    } catch (err) {
        return Promise.reject(err);
    }
}

async function generateFile(data, paddingBefore = '', paddingAfter = '') {
    try {
        const fileName = `${data.time}-${data.heading}.md`;
        const toWrite = paddingBefore + data.markdown + paddingAfter;
        await asyncWriteFile(fileName, toWrite);
        console.log(`Success - Written file ${fileName}`);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    convert,
    generateFile,
};
