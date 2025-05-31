// hooks
import { useLayout } from '@/components/Layout/hooks'

// components
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'

// styles
import { main, wrapper } from '@/components/Layout/styles.css'

// types
type Props = {
  directory?: string
  title?: string
  children: React.ReactNode
}

export default function Layout({ directory, title, children }: Props) {
  const { ids, avatars, usernames, authorities, drawers, toggleDrawer } =
    useLayout(directory, title)
  return (
    <>
      <Header
        ids={ids as string}
        avatars={avatars as string}
        usernames={usernames as string}
        authorities={authorities as string}
      />
      <div className={wrapper[drawers ? 'open' : 'close']}>
        <Navigation directory={directory} toggleDrawer={toggleDrawer} />
        <main className={main}>{children}</main>
      </div>
    </>
  )
}
