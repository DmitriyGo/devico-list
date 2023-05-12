import {Provider} from 'react-redux'

import store from './src/store/store'
import Router from './src/Router'
import {setupHttpClient} from './src/helpers'

function App() {
  setupHttpClient(store)

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default App
