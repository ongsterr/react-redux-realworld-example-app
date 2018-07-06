import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {Profile, mapStateToProps} from './Profile';
import api from '../api';

const mapDispatchToProps = dispatch => {
  return {
    onFollow: username => dispatch({type: 'FOLLOW_USER', payload: api.Profile.follow(username)}),
    onLoad: payload => dispatch({type: 'PROFILE_FAVORITES_PAGE_LOADED', payload}),
    onUnfollow: username => dispatch({type: 'UNFOLLOW_USER', payload: api.Porfile.unfollow(username)}),
    onUnload: () => dispatch({type: 'PROFILE_FAVORITES_PAGE_UNLOADED'}),
  };
};

class ProfileFavorites extends Profile {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      api.Profile.get(this.props.params.username),
      api.Articles.favoritedBy(this.props.params.username),
    ]));
  };

  componentWillUnmount() {
    this.props.onUnload();
  };

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link 
            className="nav-link"
            to={`@${this.props.profile.username}`}>
            My Articles
          </Link>
        </li>
        <li className="nav-item">
        <Link 
            className="nav-link active"
            to={`@${this.props.profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);