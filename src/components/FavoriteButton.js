import classNames from 'classnames'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom'
import useViewer from './useViewer'

const FAVORITE_ARTICLE = gql`
  mutation FavoriteArticle($input: FavoriteArticleInput!) {
    favoriteArticle(input: $input) {
      article {
        id
        viewerHasFavorited
        favoritesCount
      }
    }
  }
`

const UNFAVORITE_ARTICLE = gql`
  mutation UnfavoriteArticle($input: UnfavoriteArticleInput!) {
    unfavoriteArticle(input: $input) {
      article {
        id
        viewerHasFavorited
        favoritesCount
      }
    }
  }
`

const FavoriteButton = ({ article, history, children, className }) => {
  const viewer = useViewer()
  const [togglFavorite] = useMutation(
    article.viewerHasFavorited ? UNFAVORITE_ARTICLE : FAVORITE_ARTICLE
  )
  return (
    <button
      type="button"
      className={classNames(
        'btn btn-sm',
        article.viewerHasFavorited ? 'btn-primary' : 'btn-outline-primary',
        className
      )}
      onClick={() => {
        if (!viewer) {
          history.push('/register')
          return
        }
        togglFavorite({ variables: { input: { id: article.id } } })
      }}
    >
      {children}
    </button>
  )
}

FavoriteButton.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    viewerHasFavorited: PropTypes.bool.isRequired,
    favoritesCount: PropTypes.number.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

FavoriteButton.defaultProps = {
  className: null
}

FavoriteButton.fragments = {
  article: gql`
    fragment FavoriteButton on Article {
      id
      viewerHasFavorited
      favoritesCount
    }
  `
}

export default withRouter(FavoriteButton)
