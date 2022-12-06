import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import { defineCustomElements } from '@ionic/pwa-elements/loader'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

let persistor = persistStore(store)

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
defineCustomElements(window)
