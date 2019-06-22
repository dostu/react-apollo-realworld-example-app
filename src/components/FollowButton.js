import classNames from 'classnames'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom'
import useViewer from './useViewer'

const FOLLOW_USER = gql`
  mutation FollowUser($input: FollowUserInput!) {
    followUser(input: $input) {
      user {
        id
        followedByViewer
        followers {
          totalCount
        }
      }
    }
  }
`

const UNFOLLOW_USER = gql`
  mutation UnfollowUser($input: UnfollowUserInput!) {
    unfollowUser(input: $input) {
      user {
        id
        followedByViewer
        followers {
          totalCount
        }
      }
    }
  }
`

const FollowButton = ({ user, className, history }) => {
  const viewer = useViewer()
  const [toggleFollow] = useMutation(
    user.followedByViewer ? UNFOLLOW_USER : FOLLOW_USER
  )

  return (
    <button
      type="button"
      className={classNames(
        'btn btn-sm',
        user.followedByViewer ? 'btn-secondary' : 'btn-outline-secondary',
        className
      )}
      onClick={() => {
        if (!viewer) {
          history.push('/register')
          return
        }
        toggleFollow({ variables: { input: { id: user.id } } })
      }}
    >
      <i className="ion-plus-round" />
      &nbsp;
      {user.followedByViewer ? 'Unfollow' : 'Follow'} {user.username}
      &nbsp;
      <span className="counter">({user.followers.totalCount})</span>
    </button>
  )
}

FollowButton.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    followedByViewer: PropTypes.bool.isRequired,
    followers: PropTypes.shape({
      totalCount: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  className: PropTypes.string
}

FollowButton.defaultProps = {
  className: null
}

FollowButton.fragments = {
  user: gql`
    fragment FollowButton on User {
      id
      username
      followedByViewer
      followers {
        totalCount
      }
    }
  `
}

export default withRouter(FollowButton)
