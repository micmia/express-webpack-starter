import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import {Route, Link, withRouter} from 'react-router-dom';

import imgLogo from '../../images/logo.png';

import HomeContainer from '../Home';
import StoriesContainer from '../Stories';

class App extends PureComponent {
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

    const {count} = this.props;

    return (<div>
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
              {count ? <span className="badge badge-pill badge-primary">{count}</span> : ''}
            </NavItem>
            <NavItem exact to="/about"><FormattedMessage id="app.nav.about"/></NavItem>
          </ul>
        </div>
      </nav>
      <div className="container main">
        <Route exact path="/" render={() => <HomeContainer/>}></Route>
        <Route path="/stories" render={() => <StoriesContainer/>}></Route>
      </div>
    </div>);
  }
}

const mapStateToProps = (state) => ({
  count: state.getIn(['stories', 'count']),
});

export default withRouter(connect(mapStateToProps)(App));
