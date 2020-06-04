const fs = require('fs-extra')
const path = require('path')

const yaml = require('js-yaml')
const formats = require('./erros/formats')


function readYamlFile(source) {
    return fs.readFile(source, 'utf-8')
        .then((data) => yaml.safeLoad(data))
        .catch((error) => {
            if (error.code === 'ENOENT') {
                throw new Error(`${source} doesn't exist`)
            }

            throw error;
        })
}

function readJson(source) {
    return fs.readJSON(source, 'utf-8').then(data => data)
        .catch((error) => {
            if (error.code === 'ENOENT') {
                throw new Error(`${source} doesn't exist`)
            }
            throw error;
        });
}
function readJsAsSource(source){
    var data = require(path.toNamespacedPath(source)).docfast;
    if(!data) throw new Error('IS_NOT_DEFINED_AS_MODULE_EXPORT: docfast '+source);
    return data;
}
/**
 * 
 * @param {string} source 
 */
function routerSource(source) {
    return fs.pathExists(source).then(exists => {
        if (exists) {
            if (!source.endsWith('.json') 
                && !source.endsWith('.yaml') 
                && !source.endsWith('.js')) throw new Error(`IS_NOT_SOURCE_FILE ${source}`)
            return source.endsWith('.json') ?
                readJson(source) : source.endsWith('.yaml') ?
                    readYamlFile(source) : source.endsWith('.js')?
                        readJsAsSource(source):null;
        } else {
            throw new Error(`NO_EXISTS_SOURCE: ${source}`);
        }
    }).then((data)=>formats(data))
}


module.exports = {
    readYamlFile,
    readJson,
    routerSource,
}