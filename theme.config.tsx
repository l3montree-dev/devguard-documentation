import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import Image from 'next/image'
import { useRouter } from 'next/router'

import InverseLogo from './public/logo_inverse_horizontal.png'

const config: DocsThemeConfig = {
  logo: <Image src={InverseLogo} alt="DevGuard Logo" className="h-12 w-auto" />,
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  project: {
    link: 'https://github.com/l3montree-dev/devguard',
  },
  docsRepositoryBase: 'https://github.com/l3montree-dev/devguard-docs',
  useNextSeoProps() {
    const { asPath } = useRouter()
    return {
      titleTemplate: '%s – DevGuard',
    }
  },
  main: ({ children }) => {
    return <div className="text-base">{children}</div>
  },
  footer: {
    text: (
      <div className="flex w-full flex-col items-center text-sm sm:items-start">
        <div className="grid grid-cols-2 gap-4">
          <a
            className="text-blue-500 hover:text-blue-400"
            title="Impressum"
            href="https://l3montree.com/impressum"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Impressum</span>
          </a>
          <a
            className="text-blue-500 hover:text-blue-400"
            title="Datenschutz"
            href="https://l3montree.com/datenschutz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Datenschutz</span>
          </a>
        </div>
        <p className="mt-6 max-w-xl">
          Except where otherwise noted, content on this site is licensed under a{' '}
          <a
            target="_blank"
            className="text-blue-500 hover:text-blue-400"
            rel="noopener noreferrer"
            href="https://github.com/l3montree-dev/devguard-docs/blob/main/LICENSE-docs.md"
          >
            Creative Commons Attribution 4.0 International
          </a>{' '}
          license. Icons by{' '}
          <a
            target="_blank"
            className="text-blue-500 hover:text-blue-400"
            rel="noopener noreferrer"
            href="https://heroicons.com"
          >
            Heroicons
          </a>
          . The &apos;DevGuard&apos; name and logo are trademarks of L3montree
          UG (haftungsbeschränkt).
        </p>
        <p className="mt-4">
          © {new Date().getFullYear()} L3montree UG (haftungsbeschränkt) and
          the DevGuard Contributors
        </p>
      </div>
    ),
  },
}

export default config
