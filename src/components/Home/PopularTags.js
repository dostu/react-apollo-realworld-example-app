import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import Tag from './Tag'

const GET_TAGS = gql`
  query Tags {
    tags
  }
`

const PopularTags = ({ onTagClick }) => (
  <Fragment>
    <p>Popular Tags</p>
    <Query
      query={GET_TAGS}
      fetchPolicy="cache-and-network"
    >
      {({ loading, error, data }) => {
        if (loading || error) return 'Loading tags...'

        return (
          <div className="tag-list">
            {data.tags.map(tag => (
              <Tag
                key={tag}
                onClick={() => onTagClick(tag)}
              >
                {tag}
              </Tag>
            ))}
          </div>
        )
      }}
    </Query>
  </Fragment>
)

PopularTags.propTypes = {
  onTagClick: PropTypes.func.isRequired
}

export default PopularTags
