import React from 'react'
import useViewer from '../../useViewer'
import GuestMenuItems from './GuestMenuItems'
import UserMenuItems from './UserMenuItems'

const Menu = () => {
  const viewer = useViewer()
  return (
    <ul className="nav navbar-nav pull-xs-right">
      {viewer ? <UserMenuItems user={viewer.user} /> : <GuestMenuItems />}
    </ul>
  )
}

export default Menu
