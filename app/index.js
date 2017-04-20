import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Provider as ReduxProvider} from 'react-redux';

import {IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import localeData from './locales';

import 'font-awesome/scss/font-awesome.scss';
import './index.scss';
import imgLogo from './images/logo.png';

import HomeContainer from './containers/Home';
import StoriesContainer from './containers/Stories';

import store from './configureStore';

if (module.hot) {
  module.hot.accept();
}

addLocaleData([...en, ...fr]);

const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
const lang = language.toLowerCase().split(/[_-]+/)[0];
const messages = localeData[lang] || localeData[language] || localeData.en;

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const NavItem = ({exact, to, children}) => (
      <Route exact={exact} path={to} children={({match}) => (
        <li className={classNames('nav-item', {active: match})}>
          <Link className="nav-link" to={to}>{children}</Link>
        </li>
      )}>
      </Route>
    );

    return (
      <ReduxProvider store={store}>
        <IntlProvider locale={language} messages={messages}>
          <Router>
            <div>
              <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                        data-target="#navbarNav">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <Link to="/" className="navbar-brand">
                  <img src={imgLogo} width="30" height="30" alt="Historia"/> Historia
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav mr-auto">
                    <NavItem exact to="/"><FormattedMessage id="app.nav.home"/></NavItem>
                    <NavItem exact to="/stories">
                      <FormattedMessage id="app.nav.stories"/>&nbsp;
                      {store.getState().getIn(['stories', 'count']) ? <span
                          className="badge badge-pill badge-primary">{store.getState().getIn(['stories', 'count'])}</span> : ''}
                    </NavItem>
                    <NavItem exact to="/about"><FormattedMessage id="app.nav.about"/></NavItem>
                  </ul>
                </div>
              </nav>
              <div className="container main">
                <Route exact path="/" render={() => <HomeContainer/>}></Route>
                <Route path="/stories" render={() => <StoriesContainer/>}></Route>
              </div>
            </div>
          </Router>
        </IntlProvider>
      </ReduxProvider>);
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);