// packages
import { Link } from 'react-router-dom'

// constants
import { APP_URL, USER_AUTHORITY } from '@/constants'

// hooks
import { useHeader } from '@/components/Header/hooks'

// components
import Popover from '@/components/Popover'

// styles
import {
  avatarIcon,
  avatarImage,
  button,
  container,
  header,
  image,
  label,
  link,
  logo,
  utilities,
} from '@/components/Header/styles.css'

// types
type Props = {
  ids: string
  avatars: string
  usernames: string
  authorities: string
}

export default function Header({
  ids,
  avatars,
  usernames,
  authorities,
}: Props) {
  const { postLogout } = useHeader()
  return (
    <header className={header}>
      <div className={container}>
        <div className={logo}>
          <Link className={link} to={APP_URL.HOME.path as string}>
            <img src="/icons/logo.svg" alt="LOGO" className={image} />
          </Link>
          {authorities !== USER_AUTHORITY.USER && (
            <span className={label}>{authorities}</span>
          )}
        </div>
        <div className={utilities}>
          {usernames}
          <Popover
            trigger={
              <span className={avatarIcon}>
                <img
                  src={avatars ?? '/icons/users.svg'}
                  alt={usernames ?? ''}
                  className={avatarImage}
                />
              </span>
            }
          >
            <button
              key={ids}
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                postLogout()
              }}
              className={button}
            >
              ログアウト
            </button>
          </Popover>
        </div>
      </div>
    </header>
  )
}
