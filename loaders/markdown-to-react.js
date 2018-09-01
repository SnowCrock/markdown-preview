const React = require('react')

module.exports = function(source) {
  source.shift()
  let reactApp = '[\n'
  source.forEach(element => {
    if (!element) return
    const type = element[0]
    if(type === 'pre') return
    reactApp += generateSource(element, 1)
  })
  reactApp += ']'
  return reactApp
}

function generateSource(source, deep) {
  deep +=1
  const nextDeep = deep + 1
  if (typeof source === 'string') {
    return `${indent(deep)}'${source}',\n`
  }

  let [ type, children ] = source
  if (type === 'pre') return `${indent(deep)}null,\n`
  children = source.length > 2 ? source.slice(1): children
  if (Array.isArray(children)) {
    if (isElement(children)) {
      const childType = children.shift()
      if (children.length === 1 && !Array.isArray(children)) {
        const child = children.shift()
        return createElement(childType, child, deep)
      }
      const childElement = createElement(childType, children.map(item => generateSource(item, nextDeep+1)), deep+1)
      return createElement(type, '\n' + childElement, deep)
    }

    return createElement(type, children.map(item => generateSource(item, nextDeep)), deep)
  }
  return createElement(type, children, deep)
}

function createElement(type, children, deep) {
  let strDeep = indent(deep)
  const childrenDeep = indent(deep - 2)
  if (!type) return `${strDeep}null,\n`
  if (children === undefined) return `${strDeep}React.createElement('${type}'),\n`
  if (typeof children !== 'string') {
    if (Array.isArray(children)) {
      children = '[\n' + toString(children) + strDeep + indent(1) + '],'
    }
  } else if (isChildText(children)){
    children = `"${children}"`
  } else {
    children = children
  }
  if (!hasChangeLine(children) && type !== 'tr') {
    return `${strDeep}React.createElement('${type}', {children: ${children}}),\n`
  } else if (type === 'tr') {
    // strDeep = '\n' + strDeep
  } else if (isChildText(children) && children.indexOf('[') < 0) {
    return (
      `${strDeep}React.createElement('${type}', {
        children: [
          ${stringToArray(children)},
        ]}),\n`
      )
  }
  return (
    `${strDeep}React.createElement('${type}', {
      ${childrenDeep}children: ${children}
    ${childrenDeep}}),\n`
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
  const arr = str.replace(/^'|'$/g, ' ').split('\n')
  arr.forEach(item => result += `'${item}',\n`)
  return result
}