import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import store from 'src/store/store'

const StoreProvider = ({ children }) => <Provider store={store}>{children}</Provider>

StoreProvider.propTypes = {
  children: PropTypes.node
}

export default StoreProvider
