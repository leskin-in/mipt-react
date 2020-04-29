/*
 * A utility module to retrieve tokens
 */


const TOKEN_CONSTANT_PART = 'd0c45c55-ccd8-4bd6-8adc-43117cc87052'


/**
 * Get a token for request.
 * @returns the token (string)
 */
const retrieveToken = () => {
  return window.navigator.userAgent + ' ' + new Date().getDate().toString() + ' ' + TOKEN_CONSTANT_PART
}

export default retrieveToken
