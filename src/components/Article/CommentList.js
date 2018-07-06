import React from 'react';
import Comment from './Comment';

const CommentList = props => {
  const comments = props.comments.map(comment => {
    return (
      <Comment
        comment={comment}
        currentUser={props.currentUser}
        slug={props.slug}
        key={comment.id} />
    );
  });
  return (
    <div>{comments}</div>
  )
};

export default CommentList;