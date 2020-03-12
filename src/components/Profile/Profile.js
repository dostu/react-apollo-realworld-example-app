import gql from 'graphql-tag'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import Avatar from '../Avatar'
import FollowButton from '../FollowButton'
import Page from '../Page'
import useViewer from '../useViewer'
import ArticleTabs from './ArticleTabs'

const GET_PROFILE = gql`
  query Profile($username: String!) {
    user(username: $username) {
      id
      username
      image
      bio
      ...FollowButton
    }
  }
  ${FollowButton.fragments.user}
`

const EditSettingsLink = () => (
  <Link to="/settings" className="btn btn-sm btn-outline-secondary action-btn">
    <i className="ion-gear-a" />
    &nbsp; Edit Profile Settings
  </Link>
)

const Profile = ({ username }) => {
  const {
    loading,
    data: { user },
    error
  } = useQuery(GET_PROFILE, {
    variables: { username }
  })
  const viewer = useViewer()

  if (loading || error) return null
  return (
    <Fragment>
      <Avatar src={user.image} className="user-img" alt="" />
      <h4>{user.username}</h4>
      <p>{user.bio}</p>

      {_.get(viewer, 'user.id') === user.id ? (
        <EditSettingsLink />
      ) : (
        <FollowButton user={user} className="action-btn" />
      )}
    </Fragment>
  )
}

Profile.propTypes = {
  username: PropTypes.string.isRequired
}

const ProfilePage = ({
  match: {
    params: { username }
  }
}) => (
  <Page title={`@${username}`} className="profile-page">
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <Profile username={username} />
          </div>
        </div>
      </div>
    </div>

    <ArticleTabs username={username} />
  </Page>
)

ProfilePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default ProfilePage
