import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import store from 'config/store';
import common_ua from "./translations/ua/common.json";
import common_en from "./translations/en/common.json";
import App from './App';

i18next.init({
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
  lng: 'en',
  resources: {
    en: {
      common: common_en
    },
    ua: {
      common: common_ua
    },
  },
});

ReactDOM.render(
    <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
    </Provider> , document.getElementById('root')
);
