import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React from 'react'
import { Query } from 'react-apollo'
import ApolloInfiniteScroll from '../ApolloInfiniteScroll'
import ArticlePreview from '../ArticlePreview'

export const MY_ARTICLES = 'MY_ARTICLES'
export const FAVORITED_ARTICLES = 'FAVORITED_ARTICLES'

const GET_USER_ARTICLES = gql`
  query UserArticles($authoredBy: String, $favoritedBy: String, $cursor: String) {
    articles(authoredBy: $authoredBy, favoritedBy: $favoritedBy, first: 10, after: $cursor) {
      edges {
        node {
          id
          ...ArticlePreview
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  },
  ${ArticlePreview.fragments.article}
`

const UserArticles = ({ username, type }) => (
  <Query
    query={GET_USER_ARTICLES}
    variables={type === FAVORITED_ARTICLES ? { favoritedBy: username } : { authoredBy: username }}
    fetchPolicy="cache-and-network"
  >
    {({ loading, error, data, fetchMore }) => {
      if (error || !data.articles) {
        return (
          <div className="article-preview">
            Loading articles...
          </div>
        )
      }

      if (data.articles.edges.length === 0) {
        return (
          <div className="article-preview">
            No articles are here... yet.
          </div>
        )
      }

      return (
        <ApolloInfiniteScroll
          data={data}
          connectionPath="articles"
          loading={loading}
          fetchMore={fetchMore}
          threshold={500}
        >
          {article => <ArticlePreview article={article} key={article.id} />}
        </ApolloInfiniteScroll>
      )
    }}
  </Query>
)

UserArticles.propTypes = {
  username: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default UserArticles
