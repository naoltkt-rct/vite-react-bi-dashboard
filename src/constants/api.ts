/**
 * API URL
 */
export const PREFIX = `${import.meta.env.VITE_API_ENDPOINT}/api/v1`
export const API_ENDPOINT = {
  USER: 'users',
  TASK: 'tasks',
}
export const API_URL = {
  USER: {
    POST_LOGIN: `${PREFIX}/${API_ENDPOINT.USER}/login`,
    POST_LOGOUT: `${PREFIX}/${API_ENDPOINT.USER}/logout`,
    GET_INFO: `${PREFIX}/${API_ENDPOINT.USER}/info`,
    PUT_INFO: `${PREFIX}/${API_ENDPOINT.USER}/info`,
    GETS_OVER_CAPACITY: `${PREFIX}/${API_ENDPOINT.USER}/over-capacity`,
    POST_ASSIGNMENTS: `${PREFIX}/${API_ENDPOINT.USER}/assignments`,
    GET: (id: string) => `${PREFIX}/${API_ENDPOINT.USER}/${id}`,
    GETS: `${PREFIX}/${API_ENDPOINT.USER}`,
    POST: `${PREFIX}/${API_ENDPOINT.USER}`,
    PUT: `${PREFIX}/${API_ENDPOINT.USER}`,
    DELETE: `${PREFIX}/${API_ENDPOINT.USER}`,
  },
  TASK: {
    POST_ASSIGNMENTS: `${PREFIX}/${API_ENDPOINT.TASK}/assignments`,
    GET: (id: string) => `${PREFIX}/${API_ENDPOINT.TASK}/${id}`,
    GETS: `${PREFIX}/${API_ENDPOINT.TASK}`,
    POST: `${PREFIX}/${API_ENDPOINT.TASK}`,
    PUT: `${PREFIX}/${API_ENDPOINT.TASK}`,
    DELETE: `${PREFIX}/${API_ENDPOINT.TASK}`,
  },
}

/**
 * デフォルト 表示件数
 */
export const DEFAULT_DATA_LENGTH = 10
