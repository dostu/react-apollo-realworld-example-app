import React from 'react'
import WithMe from '../../WithMe'
import GuestMenuItems from './GuestMenuItems'
import UserMenuItems from './UserMenuItems'

const Menu = () => (
  <ul className="nav navbar-nav pull-xs-right">
    <WithMe>
      {me => (
        me ? <UserMenuItems me={me} /> : <GuestMenuItems />
      )}
    </WithMe>
  </ul>
)

export default Menu
