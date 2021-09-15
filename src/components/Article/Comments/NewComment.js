import gql from 'graphql-tag'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import useViewer from '../../useViewer'
import Comment from './Comment'
import CommentForm from './Form'

const ADD_COMMENT = gql`
  mutation AddComment($input: AddCommentInput!) {
    addComment(input: $input) {
      comment {
        ...Comment
      }
      errors {
        message
      }
    }
  }
  ${Comment.fragments.comment}
`

const NewComment = ({ article }) => {
  const viewer = useViewer()

  if (!viewer) {
    return (
      <>
        <Link to="/login">Sign in</Link> or <Link to="/register">sign up</Link>{' '}
        to add comments on this article.
      </>
    )
  }

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: ['ArticleComments']
  })

  return (
    <CommentForm
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const { data } = await addComment({
          variables: { input: { ...values, articleId: article.id } }
        })

        if (!_.isEmpty(data.addComment.errors)) {
          setSubmitting(false)
          return
        }

        resetForm()
      }}
    />
  )
}

NewComment.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired
  }).isRequired
}

export default NewComment
