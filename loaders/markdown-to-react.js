const React = require('react')
const Prism = require('prismjs')

const loadLanguages = require('prismjs/components/')

loadLanguages(['jsx', 'json'])

module.exports = function (source) {
  source.shift()
  let reactApp = '[\n'
  source.forEach((element, index) => {
    if (!element) return
    reactApp += generateSource(element, 1, index)
  })
  reactApp += ']'
  return reactApp
}

function generateSource(source, deep, index) {
  deep += 1
  const nextDeep = deep + 1
  if (typeof source === 'string') {
    return `${indent(deep)}'${source}',\n`
  }

  let [type, children] = source
  // 为pre类型  代码类型
  if (type === 'pre') {
    const lang = getLang(source)
    const code = Prism.highlight(getCode(source), Prism.languages[lang], lang)
    return createCodeElement(code, lang, deep, index)
  }
  children = source.length > 2 ? source.slice(1) : children
  // 判断children是否为数组
  if (Array.isArray(children)) {
    // children是否为element
    if (isElement(children)) {
      const childType = children.shift()
      if (children.length === 1 && !Array.isArray(children)) {
        const child = children.shift()
        return createElement(childType, child, deep, index)
      }
      const childElement = createElement(childType, children.map((item, idx) => generateSource(item, nextDeep + 1, idx)), deep + 1, index)
      return createElement(type, '\n' + childElement, deep, index)
    }

    return createElement(type, children.map((item, idx) => generateSource(item, nextDeep, idx)), deep, index)
  }
  return createElement(type, children, deep, index)
}

function createElement(type, children, deep, index) {
  const key = `${deep}+${index}`
  let strDeep = indent(deep)
  const childrenDeep = indent(deep - 2)
  if (!type) return `${strDeep}null,\n`
  if (children === undefined) return `${strDeep}React.createElement('${type}', { key: ${key} }),\n`
  if (typeof children !== 'string') {
    if (Array.isArray(children)) {
      children = '[\n' + toString(children) + strDeep + indent(1) + '],'
    }
  } else if (isChildText(children)) {
    children = `\`${children}\``
  } else {
    children = children
  }
  // 没换行 且不等于tr
  if (!hasChangeLine(children) && type !== 'tr') {
    return `${strDeep}React.createElement('${type}', {key: ${key}, children: ${children}}),\n`
  } else if (type === 'tr') {
    // strDeep = '\n' + strDeep

    // 如果是文本且不是字符串数组，将其变成字符串数组， 如果没执行说明是数组元素
  } else if (isChildText(children) && children.indexOf('[') < 0) {
    return (
      `${strDeep}React.createElement('${type}', {
        key: ${key},
        children: [
          ${stringToArray(children)},
        ]}),\n`
    )
  }
  
  // 创建正常children， children是数组
  return (
    `${strDeep}React.createElement('${type}', {
      ${childrenDeep}key: ${key},
      ${childrenDeep}children: ${children}
    ${childrenDeep}}),\n`
  )
}

function createCodeElement(code, lang, deep, index) {
  const key = `${deep}+${index}`
  const strDeep = indent(deep - 2)
  return (
    `${strDeep}React.createElement(
      ${strDeep}"pre",
      ${strDeep}{ key: ${key}, className: "language-${lang}" },
      ${strDeep}React.createElement("code", { key: ${key}, className: "language-${lang}", dangerouslySetInnerHTML: { __html: \`${code}\` } })
    ),\n`
  )
}

function toString(arr) {
  let str = ''
  arr.forEach(item => {
    str += item
  })
  return str
}

/**
 * 是否直接为文本属性
 * @param {*} str 
 */
function isChildText(str) {
  return str.indexOf('React.createElement') <= -1
}

/**
 * 添加缩进
 * @param {*} deep 
 */
function indent(deep) {
  return '  '.repeat(deep)
}

/**
 * child 是否为dom元素
 * @param {*} child 
 */
function isElement(child) {
  return Array.isArray(child) && /^[A-Za-z]+\w?$/.test(child[0])
}

/**
 * 是否有换行
 * @param {*} str 
 */
function hasChangeLine(str) {
  return str.indexOf('\n') >= 0
}

/**
 * 将有换行符的字符串变成数组
 */
function stringToArray(str) {
  let result = ''
  const arr = str.replace(/^['"]|['"]$/g, ' ').split('\n')
  arr.forEach(item => result += `'${item}',\n`)
  return result
}

/**
 * 得到代码断
 */

function getCode(el) {
  return el[2][0] === 'code' && el[2][1]
}

function getLang(el) {
  return el[1].lang || 'js'
}
