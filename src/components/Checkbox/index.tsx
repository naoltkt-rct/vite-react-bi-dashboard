// packages
import React from 'react'

// styles
import { checkbox, input } from '@/components/Checkbox/styles.css'

// types
type Props = Omit<JSX.IntrinsicElements['input'], 'ref'> & {
  values: string
  checked?: boolean
  icon?: 'check' | 'minus'
}

export const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  function CheckboxInner(props, ref) {
    const { values, checked, icon = 'check', onChange, ...inputProps } = props

    return (
      <label className={checkbox({ checked, icon })}>
        <input
          type="checkbox"
          value={values}
          // checked={checked}
          onChange={onChange}
          ref={ref}
          className={input}
          {...inputProps}
        />
      </label>
    )
  },
)
