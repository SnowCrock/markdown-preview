const Prism = require('prismjs')
const JsonML = require('jsonml.js/lib/utils')
const babel = require('babel-core')

const loadLanguages = require('prismjs/components/')

loadLanguages(['jsx', 'json'])

function getCode(node) {
  return JsonML.getChildren(JsonML.getChildren(node)[0] || '')[0] || '';
}

function getLang(node) {
  return (node[1] || {}).lang || 'js'
}

function highlight(node) {
  if(!JsonML.isElement(node)) return
  if(JsonML.getTagName(node) !== 'pre') {
    JsonML.getChildren(node).forEach(highlight)
    return
  }
  const code = getCode(node)
  const lang = getLang(node)
  html = Prism.highlight(getCode(node), Prism.languages[lang], lang)
  JsonML.getAttributes(node).highlighted = html
  JsonML.getAttributes(node).code = lang !== 'json' ? babel.transform(code, {
    presets: ['babel-preset-react', 'babel-preset-env'],
  }).code : code
}

module.exports = function(markdown) {
  highlight(markdown.content)
  return markdown
}