import classNames from 'classnames'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React from 'react'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import WithCurrentUser from './WithCurrentUser'

const FOLLOW_USER = gql`
  mutation FollowUser($id: ID!) {
    followUser(id: $id) {
      user {
        id
        following
        followersCount
      }
    }
  }
`

const UNFOLLOW_USER = gql`
  mutation UnfollowUser($id: ID!) {
    unfollowUser(id: $id) {
      user {
        id
        following
        followersCount
      }
    }
  }
`

const FollowButton = ({ user, className, history }) => (
  <WithCurrentUser>
    {currentUser => (
      <Mutation mutation={user.following ? UNFOLLOW_USER : FOLLOW_USER}>
        {mutate => (
          <button
            type="button"
            className={classNames('btn btn-sm', className, {
              'btn-outline-secondary': !user.following,
              'btn-secondary': user.following
            })}
            onClick={() => {
              if (!currentUser) {
                history.push('/register')
                return
              }
              mutate({ variables: { id: user.id } })
            }}
          >
            <i className="ion-plus-round" />
            &nbsp;
            {user.following ? 'Unfollow' : 'Follow'} {user.username}
            &nbsp;
            <span className="counter">({user.followersCount})</span>
          </button>
        )}
      </Mutation>
    )}
  </WithCurrentUser>
)

FollowButton.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    following: PropTypes.bool.isRequired,
    followersCount: PropTypes.number.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  className: PropTypes.string
}

FollowButton.defaultProps = {
  className: null
}

export default withRouter(FollowButton)
