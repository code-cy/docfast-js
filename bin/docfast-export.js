#!/usr/bin/env node

const command = require('meow')
const fs = require('fs-extra')
const { routerSource } = require('./libs/functions')
const catchs = require('./libs/erros/catchs')
const cmd = require('node-cmd')
const path = require('path')

const cli = command(`
  #Usage
    $ docfast-export <methods> options[]
    methods:
        --graphs  <source>:         Export all graph to .png files.                
                                    Source is a docfast-js fromat file that has graphs to render.
            pramas:           
                -f  <folder>:       Folder target to export files. Must be empty.
                                    Make a folder if not exist.
            #Examples
                $ docfast-export --graphs ./db-graph.yaml -f ./exports/my/path/is/it
                
`)


const flgas = cli.flags;


Promise.resolve()
    .then(() => router(flgas))
    .catch(catchs)

/**
 * 
 * @param {string[]} params 
 */
function router(flags) {
    if (flags.graphs && flags.f) {
        return graphs(flags.graphs, flags.f)
    }
}

function graphs(source, folder) {
    return routerSource(source).then(data => {
        var formats = ['db-graphs']
        var formatGraphs = require('./libs/graphs')
        if (formats.find(f => data.format === f))
            return fs.pathExists(folder).then(exists => {             
                if (!exists)
                    return cmd.get(`mkdir ${path.toNamespacedPath(folder)}`,(err,data)=>{                        
                        if(err)throw err;                                             
                    });
            }).then(() => {
                var graphs = formatGraphs[data.format];
                graphs.forEach(g => {
                    var file = folder + '/' + g.name + '.mmd';
                    fs.writeFile(file, g.template(data).getGraph()).then(() => {
                        console.log("File created: "+file);                        
                        if (g.engine === 'mermaid')
                            cmd.get(`npx mmdc -i ${file} -o ${folder}/${g.name}.png`,(err,data)=>{
                                if(err) throw err;
                                console.log(`file created: ${folder}/${g.name}.png`);                                
                            })
                    })
                })         
            })
        throw new Error('FORMAT_HAS_NOT_GRAPH_TO_RENDER: formats allowed: ' + formats.join(' '))

    })
}