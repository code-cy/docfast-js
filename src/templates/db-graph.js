const { Container } = require('../libs/markdown-js-template')
const { MermaidGraph } = require('../libs/graphs');

module.exports = (source) => {
    return Container({}, [
        MermaidGraph((graph) => {
            graph.classDiagram('Model', (schema) => {
                Object.keys(source.models).forEach(modelName => {
                    var model = source.models[modelName];
                    schema.addTable(modelName, (table) => {
                        Object.keys(model.props).forEach(propName => {
                            var prop = model.props[propName];
                            table.addProp(prop.type, propName + `${prop.primary ? ': primary' : prop.fk ? ': foreign' : ''}`);
                        })
                    })
                })
            })
        })
    ])
}