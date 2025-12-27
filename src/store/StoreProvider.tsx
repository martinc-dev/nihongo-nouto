import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import store from 'src/store/store'

interface StoreProviderProps {
  children?: ReactNode
}

const StoreProvider = ({ children }: StoreProviderProps) => (
  <Provider store={store}>{children}</Provider>
)

export default StoreProvider
