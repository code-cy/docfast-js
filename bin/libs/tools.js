const graphs = require('./graphs')
const cmd = require('node-cmd')
const path = require('path')

module.exports = (d)=>{
    var format = d.data.format;
    var config = d.data.config;
    if(config)
    if(typeof config.graphs === 'object'){
        var graph = graphs[format];
        if(graph && config.graphs.folder){
            var tr = d.target.split('\\');
            var t = tr.slice(0,tr.length-1).join('\\')+"\\"+config.graphs.folder;              
            cmd.get(`node ./bin/docfast-export.js --graphs ${d.source} -f ${t}`,(err,data)=>{
                  console.log(data);                              
            })
        }
    }
    
}