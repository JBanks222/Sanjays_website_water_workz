import {type LinksFunction, json} from '@remix-run/node'
import styles from './styles/index.css'
import {Links, LiveReload, Meta, Outlet, Scripts, useLoaderData} from '@remix-run/react'
import {Suspense, lazy} from 'react'
import Header from '~/components/Header'
import ScrollManager from '~/components/ScrollManager'

const LiveVisualEditing = lazy(() => import('~/components/LiveVisualEditing'))

export const loader = () => {
  return json({
    ENV: {
      SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
      SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
      SANITY_STUDIO_URL: process.env.SANITY_STUDIO_URL,
      SANITY_STUDIO_STEGA_ENABLED: process.env.SANITY_STUDIO_STEGA_ENABLED,
    },
  })
}

export const links: LinksFunction = () => {
  return [
    {rel: 'stylesheet', href: styles},
    {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    {rel: 'preconnect', href: 'https://fonts.gstatic.com'},
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
    },
  ]
}

export default function App() {
  const {ENV} = useLoaderData<typeof loader>()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){history.scrollRestoration='manual';if(location.pathname==='/'&&location.hash){history.replaceState(null,'',location.pathname+location.search);scrollTo(0,0)}else if(!location.hash){scrollTo(0,0)}})();`,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <ScrollManager />
        <main>
          <Outlet />
        </main>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        {ENV.SANITY_STUDIO_STEGA_ENABLED === 'true' ? (
          <Suspense>
            <LiveVisualEditing />
          </Suspense>
        ) : null}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
