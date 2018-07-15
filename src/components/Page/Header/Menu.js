import React from 'react'
import WithViewer from '../../WithViewer'
import GuestMenuItems from './GuestMenuItems'
import UserMenuItems from './UserMenuItems'

const Menu = () => (
  <ul className="nav navbar-nav pull-xs-right">
    <WithViewer>
      {viewer => (
        viewer ? <UserMenuItems viewer={viewer} /> : <GuestMenuItems />
      )}
    </WithViewer>
  </ul>
)

export default Menu
