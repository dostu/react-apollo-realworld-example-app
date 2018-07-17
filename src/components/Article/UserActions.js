import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import FavoriteButton from '../FavoriteButton'
import FollowButton from '../FollowButton'

const UserActions = ({ article }) => (
  <Fragment>
    <FollowButton user={article.author} />
    &nbsp;&nbsp;
    <FavoriteButton article={article}>
      <i className="ion-heart" />
      &nbsp;
      {article.viewerHasFavorited ? 'Unfavorite' : 'Favorite'} Article ({article.favoritesCount})
    </FavoriteButton>
  </Fragment>
)

UserActions.propTypes = {
  article: PropTypes.shape({
    viewerHasFavorited: PropTypes.bool.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    author: PropTypes.object.isRequired
  }).isRequired
}

export default UserActions
