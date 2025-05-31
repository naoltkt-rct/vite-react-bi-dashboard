// packages
import { useNavigate } from 'react-router-dom'

// constants
import { GLOBAL_NAVIGATION } from '@/constants'

// styles
import {
  button,
  icon,
  image,
  items,
  menu,
  nav,
  toggle,
} from '@/components/Navigation/styles.css'

// types
type Props = {
  directory?: string
  toggleDrawer: () => void
}
type NavigationButtonProps = {
  link: string
  img: string
  text: string
  directory?: string
}

function NavigationButton({
  link,
  img,
  text,
  directory,
}: NavigationButtonProps) {
  // useNavigate
  const navigate = useNavigate()
  return (
    <button
      type="button"
      onClick={() => navigate(link)}
      className={button[`/${directory}` === link ? 'active' : 'default']}
    >
      <i className={icon}>
        <img src={img} alt="" className={image} />
      </i>
      <span className={menu}>{text}</span>
    </button>
  )
}

export default function Navigation({ directory, toggleDrawer }: Props) {
  return (
    <nav className={nav}>
      {/* buttons */}
      <ul>
        {GLOBAL_NAVIGATION.map((item) => (
          <li key={item.link} className={items}>
            <NavigationButton
              link={item.link as string}
              img={item.icon}
              text={item.text}
              directory={directory}
            />
          </li>
        ))}
      </ul>
      {/* toggle */}
      <button
        type="button"
        onClick={toggleDrawer}
        className={button['default']}
      >
        <i className={`${icon} ${toggle}`}>
          <img src="/icons/arrow_menu_open.svg" alt="" className={image} />
        </i>
        <span className={menu}>閉じる</span>
      </button>
    </nav>
  )
}
