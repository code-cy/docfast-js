module.exports = {
    langs: require('./src/libs/langs'),
    functions: require('./src/libs/functions'),
    markdown_template: require('markdown-js-template'),
    formats:{
        api_doc: require('./src/api-doc')
    }
}