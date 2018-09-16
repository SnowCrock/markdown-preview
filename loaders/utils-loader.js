const fs = require('fs')
const path = require('path')
const MT = require('mark-twain')
const highlight = require('./highlight')
const markdown = require('markdown').markdown

const resolve = dir => path.resolve(process.cwd(), dir)
let aviableFiles = []

const dirs = {
  component: resolve('src/components'),
}

const afterDirs = {}

module.exports = function() {
  aviableFiles = []
  Object.keys(dirs).forEach(prefix => afterDirs[prefix] = generate(dirs[prefix], prefix))

  let content = ''
  aviableFiles.forEach(item => {
    content += `${item.filename}: require('${item.path}'),\n` + '  '.repeat(3)
  })
  return `module.exports = {
    component: {
      ${content}
    }
  }`
}

function generate(source, prefix) {
  return fs.readdirSync(source)
    .filter(file => findvalidFiles(source, file, prefix))
}

// 目前只支持2级搜索
function findvalidFiles(currentDir, filename, prefix) {
  const nextDir = path.join(currentDir, filename)
  if(isDirectory(nextDir)) {
    return fs.readdirSync(nextDir).filter(file => {
      if(isTargetFile(file)) aviableFiles.push({ path: getPath(path.join(nextDir, file)), filename: getFilename(file)})
    })
  } else if(isTargetFile(filename)) aviableFiles.push({filename: getFilename(filename), path: getPath(filename)})
  else return false
}

function isDirectory(filename) {
  return fs.statSync(filename).isDirectory()
}


function getDirectory(path) {
  const paths = path.split('/')
  return paths[paths.length - 2]
}

/**
 * 从path中得到文件名
 * @param {*} path 是全路径，不同操作系统不一样，将‘\’ 变成 ‘/’ 防止操作系统不识别
 */
function getFilename(path) {
  const paths = path.replace(/\\/g, '/').split('/')
  return paths[paths.length - 1].replace(/\.+/, '')
}

// 将path中的'\' 变成 '\\'  windows系统识别
function getPath(path) {
  return path.replace(/\\/g, '\\\\')
}

// 是否为目标文件
function isTargetFile(filename) {
  return /\.md/.test(filename)
}