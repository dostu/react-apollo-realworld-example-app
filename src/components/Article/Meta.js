import { format } from 'date-fns'
import gql from 'graphql-tag'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import AuthorActions from './AuthorActions'
import UserActions from './UserActions'

const ArticleMeta = ({ article, me }) => {
  const { author } = article

  return (
    <div className="article-meta">
      <Link to={`/profile/${author.username}`}>
        <img src={author.image} alt={author.username} />
      </Link>
      <div className="info">
        <Link to={`/profile/${author.username}`} className="author">
          {author.username}
        </Link>
        <span className="date">
          {format(Date.parse(article.createdAt), 'MMMM Do, YYYY')}
        </span>
      </div>

      {_.get(me, 'id') === author.id
        ? <AuthorActions article={article} />
        : <UserActions article={article} />
      }
    </div>
  )
}

ArticleMeta.propTypes = {
  article: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      image: PropTypes.string
    }).isRequired
  }).isRequired,
  me: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
}

ArticleMeta.defaultProps = {
  me: null
}

ArticleMeta.fragments = {
  article: gql`
    fragment ArticleMetaArticle on Article {
      favorited
      favoritesCount
      createdAt
      author {
        id
        username
        image
        following
        followersCount
      }
    }
  `,
  me: gql`
    fragment ArticleMetaMe on User {
      id
      username
      image
    }
  `
}

export default ArticleMeta
