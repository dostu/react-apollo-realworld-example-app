import gql from 'graphql-tag'
import React, { Fragment } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Tag from './Tag'
import { TAG_FEED } from './feedTypes'

const GET_TAGS = gql`
  query Tags {
    tags
  }
`

/* eslint-disable graphql/template-strings */
const CHANGE_FEED_FILTER = gql`
  mutation ChangeFeedFilter($type: String, $tag: String) {
    changeFeedFilter(type: $type, tag: $tag) @client
  }
`
/* eslint-enable */

const PopularTags = () => {
  const { loading, data, error } = useQuery(GET_TAGS, {
    fetchPolicy: 'cache-and-network'
  })
  const [changeFeedFilter] = useMutation(CHANGE_FEED_FILTER)

  if (loading || error) return 'Loading tags...'
  return (
    <Fragment>
      <p>Popular Tags</p>
      <div className="tag-list">
        {data.tags.map(tag => (
          <Tag
            key={tag}
            onClick={() =>
              changeFeedFilter({ variables: { type: TAG_FEED, tag } })
            }
          >
            {tag}
          </Tag>
        ))}
      </div>
    </Fragment>
  )
}

export default PopularTags
