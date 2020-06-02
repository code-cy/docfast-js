#!/usr/bin/env node

const yaml = require('js-yaml')
const fs = require('fs-extra')
const xmlComment = require('xml-comment-api');
const command = require('meow')

const cli = command(`
  Usage
    $ docfast-js <source.yaml> <target> <tag-name?>
  Examples
    $ docfast-js ./api/swagger/swagger.yaml ./README.md  my-tag
`)

const [source, target,tag] = cli.input


Promise.resolve()
  .then(() => readYamlFile(source))
  .then((data) => template(data))
  .then((template) => updateMarkdownApi(template, target))


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

function template(data) {
  return {
    render: require(`../src/templates/${data.format}`)(data).render(),
    data,
  }
}

function updateMarkdownApi(template, target) {
  return fs.readFile(target, 'utf-8')
    .then((data) => {
      const updated = xmlComment(data).replace(`docfast-js-${template.data.format}${tag?`-${tag}`:""}`, `\n${template.render}\n`).contents()
      return fs.writeFile(target, updated)
    })
    .catch((error) => {
      if (error.code === 'ENOENT') {
        throw new Error(`${target} doesn't exist`)
      }
      throw error;
    })
}