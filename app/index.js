import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider as ReduxProvider} from 'react-redux';
import AppContainer from './containers/App';

import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import localeData from './locales';

import 'font-awesome/scss/font-awesome.scss';
import './index.scss';

import store from './configureStore';

if (module.hot) {
  module.hot.accept();
}

addLocaleData([...en, ...fr]);

const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
const lang = language.toLowerCase().split(/[_-]+/)[0];
const messages = localeData[lang] || localeData[language] || localeData.en;

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ReduxProvider store={store}>
        <IntlProvider locale={language} messages={messages}>
          <Router>
            <AppContainer/>
          </Router>
        </IntlProvider>
      </ReduxProvider>);
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
