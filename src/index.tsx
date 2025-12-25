import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HistoryRouter } from 'redux-first-history/rr6'

import 'src/style/index.scss'
import { history } from 'src/store/store'
import StoreProvider from 'src/store/StoreProvider'
import App from 'src/components/common/App'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element not found')
}

const root = createRoot(container)

root.render(
  <StoreProvider>
    <StrictMode>
      <HistoryRouter history={history}>
        <App />
      </HistoryRouter>
    </StrictMode>
  </StoreProvider>
)

