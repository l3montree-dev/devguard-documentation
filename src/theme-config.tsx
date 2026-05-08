import type { KernuxThemeConfig } from '@document-writing-tools/kernux-theme'
import { Head } from '@document-writing-tools/kernux-theme'
import Image from 'next/image'
import Script from 'next/script'
import Footer from './components/Footer'

const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL

const config: Partial<KernuxThemeConfig> = {
    umbrellaHeader: false,
    umbrellaFooter: false,
    project: {
        link: 'https://github.com/l3montree-dev/devguard-documentation',
    },
    theme: {
        forcedTheme: 'dark',
    },
    head: (
        <Head>
            {Boolean(websiteId) && Boolean(umamiUrl) && (
                <Script defer src={umamiUrl} data-website-id={websiteId} />
            )}
        </Head>
    ),
    logo: (
        <span aria-label="DevGuard - Back to homepage">
            <Image
                src="/logo-inverse-horizontal.svg"
                alt="DevGuard Logo"
                width={130}
                height={47}
            />
        </span>
    ),
    sidebar: {
        defaultMenuCollapseLevel: 1,
        disable: false,
        toggleButton: true,
    },
    search: {
        placeholder: 'Search documentation...',
        error: 'Failed to load search index.',
    },
    footer: {
        component: <Footer />,
        links: [], // custom Footer component handles all links internally
    },
    toc: {
        title: 'On This Page',
        footer: (
            <a
                href="https://github.com/l3montree-dev/devguard-documentation/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="kern-link"
            >
                Question? Give us feedback →
            </a>
        ),
    },
    editPage: {
        enabled: true,
        repoBaseUrl:
            'https://github.com/l3montree-dev/devguard-documentation/tree/main',
        icon: 'none',
    },
    feedback: {
        feedbackServerUrl: process.env.NEXT_PUBLIC_FEEDBACK_SERVER_URL || '',
        gitlabProjectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
        headline: "Have feedback? We want to hear from you!",
        buttonText: "Submit Feedback",
        labels: [],
        requiredText: "Fields marked with * are required",
        fields: {
            message: {
                label: "Your Feedback",
                placeholder: "Enter your feedback",
                required: true
        }
  },
  privacyConsent: {
    textBeforeLink: "By submitting this form, I confirm that I have read the ",
    link: {
      label: 'Privacy Policy',
      href: 'https://docs.devguard.org/privacy-policy/',
    },
    textAfterLink: ' and agree to its terms.',
  },
  afterSubmit: {
    successText: 'Your feedback has been successfully submitted. Thank you!',
    errorText: 'An error occurred while sending your feedback. Please try again.',
    buttonLabel: 'See submitted feedback',
  },
    },
}

export default config
