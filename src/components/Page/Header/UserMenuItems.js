import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

const UserMenuItems = ({ profile }) => (
  <Fragment>
    <li className="nav-item">
      <NavLink exact to="/" className="nav-link">Home</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/editor" className="nav-link">
        <i className="ion-compose" />&nbsp;New Post
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/settings" className="nav-link">
        <i className="ion-gear-a" />&nbsp;Settings
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink to={`/profile/${profile.username}`} className="nav-link">
        <img src={profile.image} className="user-pic" alt="" />
        {profile.username}
      </NavLink>
    </li>
  </Fragment>
)

UserMenuItems.propTypes = {
  profile: PropTypes.shape({
    username: PropTypes.string.isRequired,
    image: PropTypes.string
  }).isRequired
}

export default UserMenuItems
