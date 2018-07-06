import React from 'react';
import {connect} from 'react-redux';
import api from '../../api';

const mapDispatchToProps = dispatch => {
  return {
    onClick: (payload, commentId) => dispatch({type: 'DELETE_COMMENT', payload, commentId}),
  };
};

const DeleteButton = props => {
  const del = () => {
    const payload = api.Comments.delete(props.slug, props.commentId);
    props.onClick(payload, props.commentId);
  };

  if (props.show) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={del}></i>
      </span>
    );
  }
  return null;
}

export default connect(mapDispatchToProps)(DeleteButton);