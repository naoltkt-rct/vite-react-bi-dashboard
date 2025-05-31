// constants
import { USER_AUTHORITY, USER_STATUS } from '@/constants'

/**
 * GET_INFO
 */
// response
export type ResponseGetInfo = {
  id: string
  organization: string
  authority: keyof typeof USER_AUTHORITY
  username: string
  email: string
  avatar?: string
  status: keyof typeof USER_STATUS
}
