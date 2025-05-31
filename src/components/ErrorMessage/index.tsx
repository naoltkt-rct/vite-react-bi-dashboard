// packages
import { assignInlineVars } from '@vanilla-extract/dynamic'

// styles
import {
  error,
  errorAdjustment,
  icon,
  image,
} from '@/components/ErrorMessage/styles.css'

// types
type Props = {
  message: string
  adjustment?: number
}

export default function ErrorMessage({ message, adjustment }: Props) {
  return (
    <p
      style={assignInlineVars({
        [errorAdjustment]: adjustment ? `calc(100% - ${adjustment}em)` : '100%',
      })}
      className={error}
    >
      <span className={icon}>
        <img src="/icons/close.svg" alt="" className={image} />
      </span>
      {message}
    </p>
  )
}
