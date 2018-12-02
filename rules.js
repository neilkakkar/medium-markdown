
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

const codeFormattingRule = {
    filter: 'pre',
    replacement: function(content, node, options) {
        const end = '```\n';
        const begin = '```code_language\n';
        const linebreak = '\n';
        const NODENAME = 'PRE';
        if (node.nextSibling && node.nextSibling.nodeName === NODENAME) {
            if (node.previousSibling && node.previousSibling.nodeName === NODENAME) {
                return content + linebreak;
            }
            return begin + content + linebreak;
        }
        if (node.previousSibling && node.previousSibling.nodeName === NODENAME) {
            return content + linebreak + end;
        }
        return begin + content + linebreak + end;
    }
}

module.exports = {
    linebreakRule,
    figureDivNoLinkeBreakRule,
    figCaptionEnclosing,
    codeFormattingRule,
};
