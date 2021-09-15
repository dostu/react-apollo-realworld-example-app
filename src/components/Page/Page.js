import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import Footer from './Footer'
import Header from './Header'

const Page = ({ children, title, className }) => (
  <>
    <Helmet title={`${title} — Conduit`} />
    <Header />
    <div className={className}>
      {children}
    </div>
    <Footer />
  </>
)

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
}

export default Page
