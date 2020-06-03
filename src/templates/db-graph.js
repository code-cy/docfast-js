const { Container } = require('../libs/markdown-js-template')
const { classDiagram } = require('../libs/graphs');

module.exports = (source) => {
    return Container({}, [
        classDiagram(source),
    ])
}