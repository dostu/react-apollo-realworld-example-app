import gql from 'graphql-tag'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { transformGraphQLErrors } from '../apolloHelpers'
import Editor from './Editor'
import Page from './Page'

const GET_ARTICLE = gql`
  query Article($slug: String!) {
    article(slug: $slug) {
      id
      slug
      title
      description
      body
      tagList
    }
  }
`

const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($input: UpdateArticleInput!) {
    updateArticle(input: $input) {
      article {
        id
        slug
        title
        description
        body
        tagList
      }
      errors {
        message
      }
    }
  }
`

const EditArticle = ({
  history,
  match: {
    params: { slug }
  }
}) => {
  const { loading, data, error } = useQuery(GET_ARTICLE, {
    variables: { slug }
  })
  const [updateArticle] = useMutation(UPDATE_ARTICLE)

  if (loading || error) return null

  return (
    <Page title="Editor" className="editor-page">
      <Editor
        article={data.article}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const { data: mutationData } = await updateArticle({
            variables: { input: { ...values, id: data.article.id } }
          })

          setSubmitting(false)
          setErrors(transformGraphQLErrors(mutationData.updateArticle.errors))

          if (!_.isEmpty(mutationData.updateArticle.errors)) return

          const updatedSlug = _.get(mutationData, 'updateArticle.article.slug')
          history.push(`/article/${updatedSlug}`)
        }}
      />
    </Page>
  )
}

EditArticle.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default EditArticle
