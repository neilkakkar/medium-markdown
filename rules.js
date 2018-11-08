
const linebreakRule = {
    filter: 'hr',
    replacement: function(content, node, options) {
        return content + options.hr + '\n<br>';
    }
};

module.exports = {
    linebreakRule,
};
