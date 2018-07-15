import React from 'react'
import WithCurrentUser from '../../WithCurrentUser'
import GuestMenuItems from './GuestMenuItems'
import UserMenuItems from './UserMenuItems'

const Menu = () => (
  <ul className="nav navbar-nav pull-xs-right">
    <WithCurrentUser>
      {currentUser => (
        currentUser ? <UserMenuItems currentUser={currentUser} /> : <GuestMenuItems />
      )}
    </WithCurrentUser>
  </ul>
)

export default Menu
