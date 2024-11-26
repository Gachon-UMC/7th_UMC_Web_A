import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // App 컴포넌트 가져오기
import { Provider } from 'react-redux';
import store from './redux/store'; // Redux Store 가져오기

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
