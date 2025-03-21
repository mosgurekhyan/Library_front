import './index.css'

import App from './App.jsx'
import store, { persistor } from './store/store.jsx'
import Loader from './components/Loader/Loader.jsx'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={<Loader/>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)