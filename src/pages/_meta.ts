import { title } from "process";

export default {
    index: {
        theme: {
            layout: 'raw',
        },
        display: 'hidden',
    },
    pricing: {
        theme: {
            layout: 'raw',
        },
        display: 'hidden',
    },
    "reachability-analysis": {
        theme: {
            layout: 'raw'
        },
        display: 'hidden',
    },
    'terms-of-use': {
        display: 'hidden',
    },
    'privacy-policy': {
        display: 'hidden',
    },
    introduction: { title: 'Introduction' },
    'getting-started': { title: 'Getting Started' },
    'how-to-guides': { title: 'How-to Guides' },
    tutorials: { title: 'Tutorials' },
    explanations: { title: 'Explanations' },
    reference: { title: 'Reference' },
    contributing: { title: 'Contributing' },
    other: {
        title: 'Other',
    },
    'header-pricing': {
        title: 'Pricing',
        type: 'page',
        href: '/pricing',
    },
    'header-docs': {
        title: 'Documentation',
        type: 'page',
        href: '/introduction',
    },
    'header-reachability':{
        title: 'Reachability',
        type: 'page',
        href: '/reachability-analysis'
    },
    '404': {
        theme: {
            layout: 'raw',
        },
        display: 'hidden',
    },
}
