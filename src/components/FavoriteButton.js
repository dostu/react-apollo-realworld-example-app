import classNames from 'classnames'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React from 'react'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import WithCurrentUser from './WithCurrentUser'

const FAVORITE_ARTICLE = gql`
  mutation FavoriteArticle($input: FavoriteArticleInput!) {
    favoriteArticle(input: $input) {
      article {
        id
        favorited
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
        favorited
        favoritesCount
      }
    }
  }
`

const FavoriteButton = ({ article, history, children, className }) => (
  <WithCurrentUser>
    {currentUser => (
      <Mutation mutation={article.favorited ? UNFAVORITE_ARTICLE : FAVORITE_ARTICLE}>
        {mutate => (
          <button
            type="button"
            className={classNames('btn btn-sm', className, {
              'btn-outline-primary': !article.favorited,
              'btn-primary': article.favorited
            })}
            onClick={() => {
              if (!currentUser) {
                history.push('/register')
                return
              }
              mutate({ variables: { input: { id: article.id } } })
            }}
          >
            {children}
          </button>
        )}
      </Mutation>
    )}
  </WithCurrentUser>
)

FavoriteButton.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    favorited: PropTypes.bool.isRequired,
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

export default withRouter(FavoriteButton)
