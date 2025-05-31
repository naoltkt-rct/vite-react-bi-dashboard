// styles
import { title } from '@/components/Title/styles.css'

// types
type Props = {
  content: string
  variant?: 'default' | 'narrow'
  align?: 'left' | 'center' | 'right'
}

export default function Title({
  content,
  variant = 'default',
  align = 'left',
}: Props) {
  return (
    <h1
      className={title({ type: variant, align: align })}
      style={{ textAlign: align }}
    >
      {content}
    </h1>
  )
}
