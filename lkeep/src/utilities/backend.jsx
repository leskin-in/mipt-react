/*
 * Backend interactions
 */

import retrieveToken from './token'


const BACKEND_URL = 'http://valerystatinov.me'


/**
 * Perform a request to backend using its predefined API URL.
 * @param {string} path the relative request path. Must start with '/'
 * @param {object} headers request headers
 * @param {string} method the request method
 * @param {object} body the JS object to use as request body
 * @returns the resulting JSON object
 */
const backendApiRequest = async (path, headers={}, method='GET', body=null) => {
  const res = await fetch(`${BACKEND_URL}/api${path}`, {
    method,
    headers: {
      ...headers,

      'Token': retrieveToken(),
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null
  })
  return await res.json()
}

export default backendApiRequest
