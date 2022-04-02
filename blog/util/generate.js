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
    const title = page.split('\n')[0].replace(/\*|#/g, '');
    const content = page.replace(/(\r\n|\n|\r)/gm, '')

    return template.replace('<!-- CONTENT START -->', `
    <div id="content" class="mt-32"></div>\n
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script>
    document.getElementById("content").innerHTML = marked.parse("${content}");
    document.title = "${title}"
    </script>`)
}

const stream = fs.createWriteStream(filePath)

stream.once('open', (fd) => {
    const content = buildHtml()

    stream.end(content)
})

console.log(`Successfully wrote ${pagePath} to ` + filePath)