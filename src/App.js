import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    appName: state.appName
  };
};

class App extends React.Component {

  render() {
    return (
      <div>
        { this.props.appName }
      </div>
    );
  };
};

export default connect(mapStateToProps, () => {
  return {};
})(App);