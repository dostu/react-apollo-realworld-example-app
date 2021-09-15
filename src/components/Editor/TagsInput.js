import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'

class TagsInput extends Component {
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const value = event.target.value.trim()
      const { tagList, onChange } = this.props

      if (value === '') return
      if (tagList.includes(value)) return

      onChange([...tagList, value])

      // eslint-disable-next-line no-param-reassign
      event.target.value = ''
    }
  }

  handleDeleteClick = (deletedTag) => {
    const { tagList, onChange } = this.props
    onChange(tagList.filter((tag) => tag !== deletedTag))
  }

  render() {
    const { tagList, name, className, placeholder } = this.props

    return (
      <>
        <input
          type="text"
          onKeyPress={this.handleKeyPress}
          name={name}
          className={className}
          placeholder={placeholder}
        />
        <div className="tag-list">
          {tagList.map((tag) => (
            <span key={tag} className="tag-default tag-pill">
              <i
                className="ion-close-round"
                role="button"
                tabIndex="0"
                aria-label="Delete"
                onClick={() => this.handleDeleteClick(tag)}
              />
              {tag}
            </span>
          ))}
        </div>
      </>
    )
  }
}

TagsInput.propTypes = {
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
}

export default TagsInput
