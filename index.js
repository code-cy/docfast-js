module.exports = {
    langs: require('./src/libs/langs'),
    functions: require('./src/libs/functions'),
    markdown_js_template: require('./src/libs/markdown-js-template/index'),
    formats:{
        api_doc: require('./src/templates/api-doc'),
        topics: require('./src/templates/topics')
    }
}