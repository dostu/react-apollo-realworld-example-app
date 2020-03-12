import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
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
  const { loading, data, error, client } = useQuery(GET_ARTICLE_COMMENTS, {
    variables: { slug }
  })

  if (loading || error) return 'Loading comments...'

  return (
    <Fragment>
      <NewComment article={data.article} />

      {data.article.comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          onDelete={async () => {
            const result = await client.mutate({
              mutation: DELETE_COMMENT,
              variables: { input: { id: comment.id } }
            })
            const deletedCommentId = result.data.deleteComment.comment.id
            const cacheData = client.readQuery({
              query: GET_ARTICLE_COMMENTS,
              variables: { slug }
            })
            cacheData.article.comments = cacheData.article.comments.filter(
              x => x.id !== deletedCommentId
            )
            client.writeQuery({
              query: GET_ARTICLE_COMMENTS,
              data: cacheData
            })
          }}
        />
      ))}
    </Fragment>
  )
}

ArticleComments.propTypes = {
  slug: PropTypes.string.isRequired
}

export default ArticleComments
