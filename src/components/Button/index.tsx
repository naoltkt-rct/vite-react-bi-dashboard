// styles
import { button } from '@/components/Button/styles.css'

// types
type Props = {
  type?: 'submit' | 'button'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, type = 'button', ...props }: Props) {
  return (
    <button className={button({ type: type })} {...props}>
      {children}
    </button>
  )
}
