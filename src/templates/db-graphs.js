const { Container, Img } = require('../libs/markdown-js-template')
const graphsFormats = require('../../bin/libs/graphs')
const path = require('path')
module.exports = (source) => {
    return Container({}, [
        ()=>{
            if(source.config)
            if(typeof source.config.graphs === 'object')
            if(source.config.graphs.folder){
                var graphs = source.config.graphs;
                return graphsFormats[source.format].map(g=>Img({
                    src:graphs.url?graphs.url+graphs.folder+'/'+g.name+'.png':
                    './'+graphs.folder+'/'+g.name+'.png',
                }));
            }                
            return graphsFormats[source.format].map(g=>g.template(source));
        }
    ])
}