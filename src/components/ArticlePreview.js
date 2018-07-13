import { format } from 'date-fns'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'

const ArticlePreview = ({ article }) => {
  const { author } = article

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${author.username}`}>
          <img src={author.image} alt={author.username} />
        </Link>
        <div className="info">
          <Link to={`/profile/${author.username}`} className="author">
            {author.username}
          </Link>
          <span className="date">{format(Date.parse(article.createdAt), 'MMMM Do, YYYY')}</span>
        </div>

        <FavoriteButton article={article} className="pull-xs-right">
          <i className="ion-heart" />&nbsp;{article.favoritesCount}
        </FavoriteButton>
      </div>

      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  )
}

ArticlePreview.propTypes = {
  article: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      image: PropTypes.string
    }).isRequired
  }).isRequired
}

ArticlePreview.fragments = {
  article: gql`
    fragment ArticlePreview on Article {
      id
      slug
      title
      description
      favorited
      favoritesCount
      createdAt
      author {
        id
        username
        image
      }
    }
  `
}

export default ArticlePreview
