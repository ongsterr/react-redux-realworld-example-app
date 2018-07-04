import React from 'react';
import ArticlePreview from './ArticlePreview';

const ArticleList = props => {
  if (!props.articles) {
    return (
      <div className="article-preview">
        Loading...
      </div>
    );
  };

  if (props.articles.length === 0) {
    return (
      <div className="article-preview">
        No articles are here... yet.
      </div>
    );
  };

  const articlesFeed = props.articles.map(article => {
    return (
      <ArticlePreview article={article} key={article.slug} />
    );
  });

  return (
    <div>
      {articlesFeed}
    </div>
  );
};

export default ArticleList;