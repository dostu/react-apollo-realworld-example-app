import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React from 'react'
import { Query } from 'react-apollo'

const GET_CURRENT_USER = gql`
  query Viewer {
    viewer {
      id
      username
      email
      image
      bio
    }
  }
`

const WithViewer = ({ children }) => (
  <Query query={GET_CURRENT_USER}>
    {({ loading, error, data }) => {
      if (loading || error) return null
      return children(data.viewer)
    }}
  </Query>
)

WithViewer.propTypes = {
  children: PropTypes.func.isRequired
}

export default WithViewer
