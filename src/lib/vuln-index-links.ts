export const SEVERITY_LINKS = [
    { label: 'Critical (CVSS 9–10)', href: '/vulnerability-database/severity/critical/' },
    { label: 'High (CVSS 7–8.9)', href: '/vulnerability-database/severity/high/' },
    { label: 'Medium (CVSS 4–6.9)', href: '/vulnerability-database/severity/medium/' },
    { label: 'Low (CVSS < 4)', href: '/vulnerability-database/severity/low/' },
]

export const YEAR_LINKS = Array.from({ length: 8 }, (_, i) => {
    const year = String(new Date().getFullYear() - i)
    return { label: year, href: `/vulnerability-database/year/${year}/` }
})
