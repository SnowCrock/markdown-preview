const fs = require('fs')
const path = require('path')
const MT = require('mark-twain')
const highlight = require('./highlight')
const markdown = require('markdown').markdown

const resolve = dir => path.resolve(process.cwd(), dir )
let aviableFiles = []

module.exports = function() {
  aviableFiles = []
  const paths = resolve('src/components')
  generate(paths)
  // const obj =  aviableFiles.map(file => {
  //   const source = fs.readFileSync(file).toString()
  //   const content = MT(source)
  //   return highlight(content)
  // })
  let content = ''
  aviableFiles.forEach(item => {
    content += `      ${item.filename}: require('${item.path}'),\n`
  })
  return `module.exports = {
    component: {
${content}
    }
  }`
}

function generate(source) {
  return fs.readdirSync(source).filter(file => findvalidFiles(path.join(source, file)))
}

function findvalidFiles(filename) {
  if(isDirectory(filename)) {
    return fs.readdirSync(filename).filter(file => {
      if(/\.md/.test(file)) aviableFiles.push({ path: path.join(filename, file), filename: getFilename(file)})
    })
  } else if(/\.md/.test(filename)) aviableFiles.push({filename: getFilename(filename), path: filename})
  else return false
}

function isDirectory(filename) {
  return fs.statSync(filename).isDirectory()
}


function getDirectory(path) {
  const paths = path.split('/')
  return paths[paths.length - 2]
}

function getFilename(path) {
  const paths = path.split('/')
  return paths[paths.length - 1].replace(/\.+/, '')
}