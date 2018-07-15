import gql from 'graphql-tag'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Mutation, Query } from 'react-apollo'
import { transformGraphQLErrors } from '../../apolloHelpers'
import tokenStorage from '../../tokenStorage'
import Page from '../Page'
import SettingsForm from './Form'

const PROFILE_FRAGMENT = gql`
  fragment Profile on Profile {
      id
      username
      email
      image
      bio
  }
`


const GET_CURRENT_USER = gql`
  query Viewer {
    viewer {
      profile {
        ...Profile
      }
    }
  },
  ${PROFILE_FRAGMENT}
`

const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      errors {
        message
      }
      user {
        profile {
          ...Profile
        }
      }
    }
  },
  ${PROFILE_FRAGMENT}
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
                        user={data.viewer.profile}
                        onSubmit={async (values, { setSubmitting, setErrors }) => {
                          const { data: mutationData } = await updateUser({
                            variables: { input: values }
                          })

                          setSubmitting(false)
                          setErrors(transformGraphQLErrors(mutationData.updateUser.errors))

                          if (!_.isEmpty(mutationData.updateUser.errors)) return

                          history.push(`/profile/${mutationData.updateUser.user.profile.username}`)
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
