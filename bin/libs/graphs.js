const {ModelClassDiagram} = require('../../src/libs/graphs')
const engines = {
    mermaid: 'mermaid'
}
module.exports = {
    'db-graphs':[
        {
            name: 'ModelClassDiagram',
            engine: engines.mermaid,
            /**
             * @param {any} source
             * @return {string}
             */
            template: ModelClassDiagram
        }
    ]
}