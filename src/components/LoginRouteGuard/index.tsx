// pages
import Login from '@/pages/Login'

// hooks
import { useLoginRouteGuard } from '@/components/LoginRouteGuard/hooks'

// type
type Props = {
  children: React.ReactElement
}

export default function LoginRouteGuard({ children }: Props) {
  // hooks
  const { authorized } = useLoginRouteGuard()

  // 出力
  return authorized ? children : <Login />
}
