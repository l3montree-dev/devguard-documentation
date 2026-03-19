const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')
const grayMatter = require('gray-matter')

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://docs.devguard.org',
    generateRobotsTxt: true,
    robotsTxtOptions: {
        additionalSitemaps: [
            `${process.env.NEXT_PUBLIC_SITE_URL || 'https://docs.devguard.org'}/api/sitemap.xml`,
        ],
    },
    transform: (_, p) => {
        // check if the frontmatter of the page has a seo.robots of "noindex"
        console.log(`Processing ${p} for sitemap...`)
        try {


            // read the file
            const filePath = p === '/' ? 'index.mdx' : `${p.replace(/^\//, '')}.mdx`
            let fullPath = path.join(process.cwd(), 'src', 'pages', filePath)
            // check if directory

            const stat = fs.statSync(fullPath)
            if (stat.isDirectory()) {
                // we need to read the index.mdx file in the directory
                const indexPath = path.join(fullPath, 'index.mdx')
                if (fs.existsSync(indexPath)) {
                    fullPath = indexPath
                } else if (fs.existsSync(path.join(fullPath, 'index.md'))) {
                    fullPath = path.join(fullPath, 'index.md')
                }
                else if (fs.existsSync(path.join(process.cwd(), 'src', 'pages', `${filePath.replace(/\/$/, '')}.mdx`))) {
                    fullPath = path.join(process.cwd(), 'src', 'pages', `${filePath.replace(/\/$/, '')}.mdx`)
                } else if (fs.existsSync(path.join(process.cwd(), 'src', 'pages', `${filePath.replace(/\/$/, '')}.md`))) {
                    fullPath = path.join(process.cwd(), 'src', 'pages', `${filePath.replace(/\/$/, '')}.md`)
                } else {
                    console.warn(`No index.mdx or index.md found for directory ${fullPath}, skipping...`)
                    return null
                }
            }
            if (!fs.existsSync(fullPath)) {
                console.warn(`File ${fullPath} does not exist, skipping...`)
                return null
            }


            const fileContent = fs.readFileSync(fullPath, 'utf-8')
            const { data } = grayMatter(fileContent)
            if (data.seo && data.seo.robots && data.seo.robots.includes('noindex')) {
                console.log(`Page ${p} has noindex in frontmatter, skipping...`)
                return null
            }

            let lastmod
            try {
                const result = spawnSync('git', ['log', '-1', '--format=%cI', '--', fullPath], { encoding: 'utf-8' })
                const gitDate = result.stdout.trim()
                if (gitDate) lastmod = gitDate
            } catch (_) { }

            return {
                loc: p,
                lastmod,
            }
        } catch (e) {
            console.warn(`Error processing ${p} for sitemap: ${e.message}, skipping...`)
            return null
        }
    },
}
