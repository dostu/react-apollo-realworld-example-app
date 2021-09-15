import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

export const WithViewer = {}
const USER_FRAGMENT = gql`
  fragment WithViewer on Viewer {
    user {
      id
      username
      email
      image
      bio
    }
  }
`

const GET_VIEWER = gql`
  query Viewer {
    viewer {
      ...WithViewer
    }
  }
  ${USER_FRAGMENT}
`

const useViewer = () => {
  const { loading, data } = useQuery(GET_VIEWER)

  if (loading) { return null }

  return data.viewer
}

WithViewer.fragments = {
  viewer: USER_FRAGMENT
}

export default useViewer
