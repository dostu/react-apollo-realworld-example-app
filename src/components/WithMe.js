import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React from 'react'
import { Query } from 'react-apollo'

const GET_CURRENT_USER = gql`
  query Me {
    me {
      id
      username
      email
      image
      bio
    }
  }
`

const WithMe = ({ children }) => (
  <Query query={GET_CURRENT_USER}>
    {({ loading, error, data }) => {
      if (loading || error) return null
      return children(data.me)
    }}
  </Query>
)

WithMe.propTypes = {
  children: PropTypes.func.isRequired
}

export default WithMe
