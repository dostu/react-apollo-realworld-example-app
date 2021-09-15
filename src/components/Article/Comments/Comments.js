import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Comment from './Comment'
import NewComment from './NewComment'

const GET_ARTICLE_COMMENTS = gql`
  query ArticleComments($slug: String!) {
    article(slug: $slug) {
      id
      slug
      comments {
        ...Comment
      }
    }
  }
  ${Comment.fragments.comment}
`

const DELETE_COMMENT = gql`
  mutation DeleteComment($input: DeleteCommentInput!) {
    deleteComment(input: $input) {
      comment {
        id
      }
    }
  }
`

const ArticleComments = ({ slug }) => {
  const { loading, data, error } = useQuery(GET_ARTICLE_COMMENTS, {
    variables: { slug }
  })

  if (loading || error) return 'Loading comments...'

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    update(cache, { data: { deleteComment: { comment } } }) {
      const deletedCommentId = comment.id
      const cacheData = cache.readQuery({
        query: GET_ARTICLE_COMMENTS,
        variables: { slug }
      })
      cacheData.article.comments = cacheData.article.comments.filter(
        (x) => x.id !== deletedCommentId
      )
      cache.writeQuery({
        query: GET_ARTICLE_COMMENTS,
        data: cacheData
      })
    }
  })

  return (
    <>
      <NewComment article={data.article} />

      {data.article.comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onDelete={() => deleteComment({ variables: { input: { id: comment.id } } })}
        />
      ))}
    </>
  )
}

ArticleComments.propTypes = {
  slug: PropTypes.string.isRequired
}

export default ArticleComments
