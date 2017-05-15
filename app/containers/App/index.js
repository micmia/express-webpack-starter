import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import {Navbar, Nav} from 'react-bootstrap';
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
        </li>)}>
      </Route>
    );

    const {count} = this.props;

    return (<div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" className="navbar-brand">
              <img src={imgLogo} width="20" height="20" alt="Historia"/>
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem exact to="/"><FormattedMessage id="app.nav.home"/></NavItem>
          <NavItem to="/stories">
            <FormattedMessage id="app.nav.stories"/>&nbsp;
            {count ? <span className="badge badge-pill badge-primary">{count}</span> : ''}
          </NavItem>
          <NavItem exact to="/about"><FormattedMessage id="app.nav.about"/></NavItem>
        </Nav>
      </Navbar>
      <div className="container main">
        <Route exact path="/" render={() => <HomeContainer/>}></Route>
        <Route path="/stories" exact render={() => <StoriesContainer/>}></Route>
        <Route path="/stories/new" exact render={() => <StoriesContainer/>}></Route>
        <Route path="/stories/:id/edit" exact render={() => <StoriesContainer/>}></Route>
      </div>
    </div>);
  }
}

const mapStateToProps = (state) => ({
  count: state.getIn(['stories', 'count']),
});

export default withRouter(connect(mapStateToProps)(App));
