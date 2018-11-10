
const linebreakRule = {
    filter: 'hr',
    replacement: function(content, node, options) {
        return content + options.hr + '\n<br>';
    }
};

const figureDivNoLinkeBreakRule = {
    filter: function(node, options) {
        return (
            node.nodeName === 'DIV' &&
            node.parentNode &&
            node.parentNode.nodeName === 'FIGURE'
        );
    },
    replacement: function(content, node, options) {
        return content.trim();
    }
}


const figCaptionEnclosing = {
    filter: function(node, options) {
        return (
            node.nodeName === 'FIGCAPTION' &&
            node.parentNode &&
            node.parentNode.nodeName === 'FIGURE'
        );
    },
    replacement: function(content, node, options) {
        const ret = content.trim();
        return '*(' + ret + ')*';
    }
}

module.exports = {
    linebreakRule,
    figureDivNoLinkeBreakRule,
    figCaptionEnclosing,
};
