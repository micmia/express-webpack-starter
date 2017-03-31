import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import localeData from './locales';
import './fonts/FontAwesome.scss';
import './index.scss';
import HomeComponent from './components/Home';
import StoriesContainer from './containers/Stories';

if (module.hot) {
  module.hot.accept();
}

addLocaleData([...en, ...fr]);

const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
const lang = language.toLowerCase().split(/[_-]+/)[0];
const messages = localeData[lang] || localeData[language] || localeData.en;

const NavItem = ({exact, to, children}) => (
  <Route exact={exact} path={to} children={({match}) => (
    <li className={classNames('nav-item', {active: match})}>
      <Link className="nav-link" to={to}>{children}</Link>
    </li>
  )}>
  </Route>
);

ReactDOM.render(
  <IntlProvider locale={language} messages={messages}>
    <Router>
      <div>
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                  data-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="/" className="navbar-brand">Historia</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <NavItem exact to="/"><FormattedMessage id="app.nav.home"/></NavItem>
              <NavItem exact to="/about"><FormattedMessage id="app.nav.about"/></NavItem>
            </ul>
          </div>
        </nav>
        <div className="container">
          <Route exact path="/" component={HomeComponent}></Route>
          <Route path="/stories" component={StoriesContainer}></Route>
        </div>
      </div>
    </Router>
  </IntlProvider>,
  document.getElementById('root')
);