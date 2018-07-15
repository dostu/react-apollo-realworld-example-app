import React from 'react'
import Page from '../Page'
import WithCurrentUser from '../WithCurrentUser'
import Content from './Content'

const Home = () => (
  <Page title="Home" className="home-page">
    <div className="container page">
      <WithCurrentUser>
        {currentUser => <Content currentUser={currentUser} />}
      </WithCurrentUser>
    </div>
  </Page>
)

export default Home
