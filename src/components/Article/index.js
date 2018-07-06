import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';
import api from '../../api';

import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import marked from 'marked'; // What is this for?

const mapStateToProps = state => {
  return {
    ...state.article,
    currentUser: state.common.currentUser,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: payload =>  dispatch({type: 'ARTICLE_PAGE_LOADED', payload}),
    onUnload: () => dispatch({type: 'ARTICLE_PAGE_UNLOADED'})
  };
}

class Article extends Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      api.Articles.get(this.props.params.id),
      api.Comments.forArticle(this.props.params.id)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.article) {
      return null;
    }

    const markup = { __html: marked(this.props.article.body) }; // What is this doing? "Marked" parse markdown to HTML.
    const canModify = this.props.currentUser && this.props.currentUser.username === this.props.article.author.username;
    const tags = this.props.article.tagList.map(tag => {
      return (
        <li 
          className="tag-default tag-pill tag-outline"
          key={tag} >
          {tag}
        </li>
      );
    })

    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{this.props.article.title}</h1>
            <ArticleMeta 
              article={this.props.article}
              canModify={canModify} />
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-xs-12">
              <div dangerouslySetInnerHTML={markup}></div>
              <ul className="tag-list">
                {tags}
              </ul>
            </div>
          </div>
        </div>

        <hr/>

        <div className="article-actions">
        </div>
        <div className="row">
          <CommentContainer 
            comments={this.props.comments || []}
            errors={this.props.commentErros}
            slug={this.props.params.id}
            currentUser={this.props.currentUser} />
        </div>
      </div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
