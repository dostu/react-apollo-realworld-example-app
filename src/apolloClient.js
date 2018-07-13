import ApolloClient from 'apollo-boost'
import tokenStorage from './tokenStorage'

const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL || 'https://realworld-graphql.herokuapp.com/graphql'

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  request: (operation) => {
    const token = tokenStorage.read()
    let headers = {}
    if (token) {
      headers = { authorization: `Token ${token}` }
    }
    operation.setContext({ headers })
  }
})

export default client
