import gql from 'graphql-tag'
import React, { Fragment } from 'react'
import { Mutation, Query } from 'react-apollo'
import Tag from './Tag'
import { TAG_FEED } from './feedTypes'

const GET_TAGS = gql`
  query Tags {
    tags
  }
`

/* eslint-disable graphql/template-strings */
const SET_FEED_FILTER = gql`
  mutation SetFeedFilter($type: String, $tag: String) {
    setFeedFilter(type: $type, tag: $tag) @client
  }
`
/* eslint-enable */

const PopularTags = () => (
  <Fragment>
    <p>Popular Tags</p>
    <Query
      query={GET_TAGS}
      fetchPolicy="cache-and-network"
    >
      {({ loading, error, data }) => {
        if (loading || error) return 'Loading tags...'

        return (
          <Mutation mutation={SET_FEED_FILTER}>
            {setFeedFilter => (
              <div className="tag-list">
                {data.tags.map(tag => (
                  <Tag
                    key={tag}
                    onClick={() => setFeedFilter({ variables: { type: TAG_FEED, tag } })}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </Mutation>
        )
      }}
    </Query>
  </Fragment>
)

export default PopularTags
