import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Home from './Home';

class App extends React.Component {

  render() {
    return (
      <div>
        <Header appName={this.props.appName} />
        <Home />
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    appName: state.appName
  };
};

export default connect(mapStateToProps, () => ({}))(App);