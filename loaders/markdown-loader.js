const MT = require('mark-twain')
const toReact = require('./markdown-to-react')
const highlight = require('./highlight')
const markdown = require('markdown').markdown
const fs = require('fs')
// const markdownContent = fs.readFileSync(__dirname + '/demo.md').toString()

// const result = markdown.toHTML(markdownContent)

// highlight(jsonML.content)
const md = require('markdown-it')()
// const result = md.render(markdownContent)


// fs.writeFile('index1.html', result, function() {console.log('success')})

module.exports = function(source) {
  const jsonML = MT(source)
  const react = toReact(jsonML.content)
  const { title = '' } = jsonML.meta || {}
  const { html: highlightCode } = highlight(jsonML)

  function renderReact(React) {

  }
  // const highlight = `module.exports = {html: ${JSON.stringify(highlightCode)}, code: ${JSON.stringify(code)}}`
  // const str = `const React = require('react'); module.exports = React`
  const content = `
    function preview() {
      const React = require('react')
      const ReactDOM = require('react-dom')
      return Demo
    }
  `
  return `
    const React = require('react')
    module.exports = {
      html: ${JSON.stringify(highlightCode)},
      preivew: ${content},
      result: ${JSON.stringify(md.render(source))},
      react: ${react},
    }
  `
}