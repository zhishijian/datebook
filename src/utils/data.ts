const identity = (str: string) => str

type Identity = (str: string) => string

/**
 * Creates a param string from a flat key-value pair.
 *
 * @param {Record<string, string>} params
 * @param {string} [delimiter = ';']
 * @param {function} [transformFn = identity] - transformation function to be
 * applied to each param. If omitted, no transform occurs
 * @returns {string}
 */
export const toParamString = (params: Record<string, string>, delimiter: string = ';', transformFn: Identity = identity) => {
  const paramString = []

  for (let key in params) {
    if (params.hasOwnProperty(key) && params[key] !== undefined) {
      paramString.push(`${key}=${transformFn(params[key])}`)
    }
  }

  return paramString.join(delimiter)
}

/**
 * Creates a query string from a flat key-value pair.
 *
 * @param {Record<string, string>} params
 * @returns {string}
 */
export const toQueryString = (params: Record<string, string>): string => {
  return toParamString(params, '&', encodeURIComponent)
}

/**
 * Creates an ICS param string from a flat key-value pair.
 *
 * @param {Record<string, string>} params
 * @returns {string}
 */
export const toIcsParamString = (params: Record<string, string>): string => {
  return toParamString(params, ';')
}
