import React from 'react'
import Page from '../Page'
import WithMe from '../WithMe'
import Content from './Content'

const Home = () => (
  <Page title="Home" className="home-page">
    <div className="container page">
      <WithMe>
        {me => <Content me={me} />}
      </WithMe>
    </div>
  </Page>
)

export default Home
