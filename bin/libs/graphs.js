const {classDiagram} = require('../../src/libs/graphs')

module.exports = {
    'db-graphs':[
        {
            name: 'classDiagram',
            engine: 'mermaid',
            /**
             * @param {any} source
             * @return {string}
             */
            template: (source)=>{
                return classDiagram(source).children[0].children;                       
            } 
        }
    ]
}