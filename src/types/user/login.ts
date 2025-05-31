/**
 * POST_LOGIN
 */
// request
export type RequestPostLogin = {
  username: string
  password: string
}
// response
export type ResponsePostLogin = {
  message?: string
  status?: number
}
