import React, {Component} from 'react';
import {connect} from 'react-redux'

import api from '../../api';

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: payload => dispatch({type: 'ADD_COMMENT', payload})
  };
}

class CommentInput extends Component {
  constructor() {
    super();
    this.state = {
      body: ''
    };

    this.setBody = ev => {
      this.setState({body: ev.target.value})
    };

    this.createComment = ev => {
      ev.preventDefault();
      const payload = api.Comments.create(this.props.slug, {body: this.state.body});
      this.props.onSubmit(payload);
      this.setState({body: ''});
    }
  }

  render() {
    return (
      <form className="card comment-form" onSubmit={this.createComment}>
        <div className="card-block">
          <textarea 
            name="body" 
            rows="3" 
            className="form-control"
            placeholder="Write a comment"
            value={this.state.body}
            onChange={this.setBody}>
          </textarea>
        </div>
        <div className="card-footer">
          <img src={this.props.currentUser.image} alt="commentator" className="comment-author-img"/>
          <button type="submit" className="btn btn-sm btn-primary">
            Post Comment
          </button>
        </div>
      </form>
    );
  };
}

export default connect(mapDispatchToProps)(CommentInput);