import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // hace que todos los componentes escuchen el estado de la app
import './index.css';
import App from './App';
import {store} from './redux/store';
import { CssBaseline } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline/>
    <Provider store={store}> {/* paso como props la store de la carpeta de redux */}
      <App />
    </Provider>

  </React.StrictMode>
);

