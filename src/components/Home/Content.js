import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Tab from '../Tab'
import Feed, { GLOBAL_FEED, TAG_FEED, YOUR_FEED } from './Feed'
import PopularTags from './PopularTags'

class Content extends Component {
  constructor(props) {
    super(props)
    this.state = { tab: props.me ? YOUR_FEED : GLOBAL_FEED, tag: null }
  }

  handleTabSelect = (tab) => {
    this.setState({ tab, tag: null })
  }

  handleTagClick = (tag) => {
    this.setState({ tab: TAG_FEED, tag })
  }

  render() {
    const { me } = this.props
    const { tab, tag } = this.state

    return (
      <div className="row">
        <div className="col-md-9">
          <div className="feed-toggle">
            <ul className="nav nav-pills outline-active">
              {me && (
                <Tab
                  active={tab === YOUR_FEED}
                  onClick={() => this.handleTabSelect(YOUR_FEED)}
                >
                  Your Feed
                </Tab>
              )}

              <Tab
                active={tab === GLOBAL_FEED}
                onClick={() => this.handleTabSelect(GLOBAL_FEED)}
              >
                Global Feed
              </Tab>

              {tab === TAG_FEED && (
                <Tab active>#{tag}</Tab>
              )}
            </ul>
          </div>

          <Feed feedType={tab} tag={tag} />
        </div>

        <div className="col-md-3">
          <div className="sidebar">
            <PopularTags onTagClick={clickedTag => this.handleTagClick(clickedTag)} />
          </div>
        </div>
      </div>
    )
  }
}

Content.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  me: PropTypes.object
}

Content.defaultProps = {
  me: null
}

export default Content
