const {MermaidGraph} = require('../mermaid')

module.exports = (source) => MermaidGraph((graph) => {
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