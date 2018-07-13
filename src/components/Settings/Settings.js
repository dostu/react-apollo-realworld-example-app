import gql from 'graphql-tag'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Mutation, Query } from 'react-apollo'
import { transformGraphQLErrors } from '../../apolloHelpers'
import tokenStorage from '../../tokenStorage'
import Page from '../Page'
import SettingsForm from './Form'

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

const UPDATE_USER = gql`
  mutation UpdateUser($email: String!, $username: String!, $bio: String, $image: String, $password: String) {
    updateUser(email: $email, username: $username, bio: $bio, image: $image, password: $password) {
      errors {
        message
      }
      user {
        id
        username
        email
        image
        bio
      }
    }
  }
`

const Settings = ({ history }) => (
  <Page title="Settings" className="settings-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Your Settings</h1>
          <Query query={GET_CURRENT_USER}>
            {({ loading, error, data, client }) => {
              if (loading || error) return 'Loading...'

              return (
                <Fragment>
                  <Mutation mutation={UPDATE_USER}>
                    {updateUser => (
                      <SettingsForm
                        user={data.currentUser}
                        onSubmit={async (values, { setSubmitting, setErrors }) => {
                          const { data: mutationData } = await updateUser({ variables: values })

                          setSubmitting(false)
                          setErrors(transformGraphQLErrors(mutationData.updateUser.errors))

                          if (!_.isEmpty(mutationData.updateUser.errors)) return

                          history.push(`/profile/${mutationData.updateUser.user.username}`)
                        }}
                      />
                    )}
                  </Mutation>
                  <hr />
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      tokenStorage.delete()
                      client.cache.reset()
                      history.push('/')
                    }}
                  >
                    Or click here to logout.
                  </button>
                </Fragment>
              )
            }}
          </Query>
        </div>
      </div>
    </div>
  </Page>
)

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default Settings
