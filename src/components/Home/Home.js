import React from 'react'
import Page from '../Page'
import WithViewer from '../WithViewer'
import Content from './Content'

const Home = () => (
  <Page title="Home" className="home-page">
    <div className="container page">
      <WithViewer>
        {viewer => <Content viewer={viewer} />}
      </WithViewer>
    </div>
  </Page>
)

export default Home
