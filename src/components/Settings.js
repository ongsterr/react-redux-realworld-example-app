import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import api from '../api';
import ListErrors from './ListErrors';

const mapStateToProps = state => {
  return {
    ...state.settings,
    currentUser: state.common.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClickLogout: () => dispatch({type: 'LOGOUT'}),
    onSubmitForm: user => dispatch({type: 'SETTINGS_SAVED', payload: api.Auth.update(user)}),
  };
};

class SettingsForm extends Component { // Downside here is that when the page is refreshed, "currentUser" will be undefined
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      image: props.currentUser.image || '',
      username: props.currentUser.username,
      bio: props.currentUser.bio || '',
      email: props.currentUser.email,
      password: '',
    };

    this.updateState = ev => {
      const target = ev.target;
      const name = target.name;
      const value = target.value;
      this.setState({[name]: value});
    };

    this.submitForm = ev => {
      ev.preventDefault();
      const user = this.state;
      if (!user.password) {
        delete user.password;
      };
      this.props.onSubmitForm({user});
    };
  }

  componentDidMount() {
    if (this.props.currentUser) {
      const currentState = Object.assign(this.state, {
        image: this.props.currentUser.image || '',
        username: this.props.currentUser.username,
        bio: this.props.currentUser.bio || '',
        email: this.props.currentUser.email,
      });
      this.setState(currentState);
    };
  }

  // componentWillUpdate(nextProps) {
  //   if (nextProps.currentUser) {
  //     this.setState(Object.assign({}, this.state, {
  //       image: nextProps.currentUser.image || '',
  //       username: nextProps.currentUser.username,
  //       bio: nextProps.currentUser.bio,
  //       email: nextProps.currentUser.email,
  //     }));
  //   };
  // }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <fieldset>
          <fieldset className="form-group">
            <input 
              type="text"
              className="form-control"
              placeholder="URL of profile picture"
              name="image"
              value={this.state.image}
              onChange={this.updateState} />
          </fieldset>

          <fieldset className="form-group">
            <input 
              type="text"
              className="form-control form-control-lg"
              placeholder="Username"
              name="username"
              value={this.state.username}
              onChange={this.updateState} />
          </fieldset>

          <fieldset className="form-group">
            <input 
              type="text"
              className="form-control form-control-lg"
              rows="8"
              placeholder="Short bio about you"
              name="bio"
              value={this.state.bio}
              onChange={this.updateState} />
          </fieldset>

          <fieldset className="form-group">
            <input 
              type="email"
              className="form-control form-control-lg"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.updateState} />
          </fieldset>

          <fieldset className="form-group">
            <input 
              type="password"
              className="form-control form-control-lg"
              placeholder="New password"
              name="password"
              value={this.state.password}
              onChange={this.updateState} />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={this.state.inProgress}>
            Update Settings
          </button>
        </fieldset>
      </form>
    )
  }
}

class Settings extends Component {

  render() {
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>
              <ListErrors errors={this.props.error} />
              <SettingsForm
                currentUser={this.props.currentUser}
                onSubmitForm={this.props.onSubmitForm} />
              <hr />

              <button
                className="btn btn-outline-danger"
                onClick={this.props.onClickLogout}>
                Or click here to logout.  
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);