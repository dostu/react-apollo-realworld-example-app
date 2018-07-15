import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React from 'react'
import { Query } from 'react-apollo'

const GET_CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      username
      email
      image
      bio
    }
  }
`

const WithCurrentUser = ({ children }) => (
  <Query query={GET_CURRENT_USER}>
    {({ loading, error, data }) => {
      if (loading || error) return null
      return children(data.currentUser)
    }}
  </Query>
)

WithCurrentUser.propTypes = {
  children: PropTypes.func.isRequired
}

export default WithCurrentUser
