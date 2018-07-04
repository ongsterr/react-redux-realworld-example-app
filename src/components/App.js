import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Home from './Home';
import api from '../api';

const mapStateToProps = state => {
  return {
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: (payload, token) => dispatch({type: 'APP_LOAD', payload, token}),
    onRedirect: () => dispatch({type: 'REDIRECT'})
  };
}

class App extends React.Component {
  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      api.setToken(token);
    }
    this.props.onLoad(token ? api.getCurrentUser() : null, token); // Check what agent.Auth.current() is for
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  render() {
    return (
      <div>
        <Header appName={this.props.appName} currentUser={this.props.currentUser} />
        {this.props.children}
      </div>
    );
  };
};

App.contextTypes = {
  router: React.PropTypes.object.isRequired // What does this do?
};

export default connect(mapStateToProps, mapDispatchToProps)(App);