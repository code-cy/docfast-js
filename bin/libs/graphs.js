const {ModelClassDiagram} = require('../../src/libs/graphs')

module.exports = {
    'db-graphs':[
        {
            name: 'ModelClassDiagram',
            engine: 'mermaid',
            /**
             * @param {any} source
             * @return {string}
             */
            template: (source)=>{
                return ModelClassDiagram(source).children[0].children;                       
            } 
        }
    ]
}