// Used for generating HTML blog files based on template
// Usage: npm run generate [page.md] or node blog/util/generate.js "[page.md]"

const arg = process.argv.slice(2)[0]
if (arg == undefined) throw Error('Error: Filename was not provided. Please use the following syntax: npm run generate [page.md]')

const fs = require('fs')

const templatePath = 'blog/template.html'
const pagePath = `blog/pages/${arg}`
const filePath = 'blog/test.html'

const page = fs.readFileSync(pagePath, 'utf8', (e, data) => {
    if (e) { console.log(e); return }

    return data
})

const template = fs.readFileSync(templatePath, 'utf8', (e, data) => {
    if (e) { console.log(e); return }

    return data
})

// TODO: Update title properly
const buildHtml = () => {
    const head = template.split('<!DOCTYPE html>').pop().split('<body>')[0]
    const selection = template.split('<body>').pop().split('</body>')

    const content = page.replace(/(\r\n|\n|\r)/gm, "")

    return '<!DOCTYPE html>' + head + selection[0] +
    `<body>\n<div id="content"></div>\n
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script>
    document.getElementById("content").innerHTML = marked.parse("${content}");
    document.title = "${content}"
    </script>\n</body>` + selection[1]
}

const stream = fs.createWriteStream(filePath)

stream.once('open', (fd) => {
    const content = buildHtml()

    stream.end(content)
})

console.log(`Successfully wrote ${pagePath} to ` + filePath)