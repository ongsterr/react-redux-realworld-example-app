import React, { Component } from 'react';
import { connect } from 'react-redux';
import Banner from './Banner';
import MainView from './MainView';
import api from '../../api';

const mapStateToProps = state => {
  return {
    appName: state.common.appName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: payload => dispatch({type: 'HOME_PAGE_LOADED', payload})
  };
};

class Home extends Component {
  componentWillMount () {
    const articles = api.Articles.all();
    this.props.onLoad(articles);
  };

  render() {
    return (
      <div className="home-page">
        <Banner appName={this.props.appName} />

        <div className="container page">
          <div className="row">
            <MainView />

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);