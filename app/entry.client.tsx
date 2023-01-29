import { RemixBrowser } from '@remix-run/react'
import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

import { CacheProvider, ThemeProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from '@mui/material'

const theme = createTheme()
const emotionCache = createCache({ key: 'css' })

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RemixBrowser />
          </ThemeProvider>
        </CacheProvider>
      </StrictMode>
    )
  })
}

if (typeof requestIdleCallback === 'function') {
  requestIdleCallback(hydrate)
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1)
}
