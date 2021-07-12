import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'connected-react-router'

import 'src/style/index.scss'
import { history } from 'src/store/store'
import StoreProvider from 'src/store/StoreProvider'
import App from 'src/components/common/App'

ReactDOM.render(
  <StoreProvider>
    <React.StrictMode>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </React.StrictMode>
  </StoreProvider>,
  document.getElementById('root')
)
