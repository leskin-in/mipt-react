/*
 * Backend interactions
 */

import { retrieveToken } from './token'


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
  let actual_headers = {
    ...headers,
    'Content-Type': 'application/json',
  }

  let token = retrieveToken()
  if (token) {
    actual_headers = {
      ...actual_headers,
      'Token': token
    }
  }
  
  const res = await fetch(`${BACKEND_URL}/api${path}`, {
    method,
    headers: actual_headers,
    body: body ? JSON.stringify(body) : null
  })

  if (res.status > 300) {
    alert(await res.text())
    return null
  }

  return await res.json()
}

export default backendApiRequest
