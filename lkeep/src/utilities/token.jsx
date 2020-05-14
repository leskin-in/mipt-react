/*
 * A utility module to work with tokens
 */


const TOKEN_V = 'atoken'


/**
 * Set the token
 */
export const setToken = (token) => {
  window.localStorage.setItem(TOKEN_V, token)
}

/**
 * Remove the token
 */
export const removeToken = () => {
  window.localStorage.removeItem(TOKEN_V)
}

/**
 * Retrieve the token. Returns 'null' if token is not available
 */
export const retrieveToken = () => {
  return (window.localStorage.getItem(TOKEN_V))
}
