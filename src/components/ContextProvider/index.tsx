// packages
import { Fragment, ReactNode } from 'react'
import { createPortal } from 'react-dom'

// hooks
import {
  CustomContext,
  useCustomContextState,
} from '@/components/ContextProvider/hooks'

// styles
import { bars, loading, wrapper } from '@/components/ContextProvider/styles.css'

export function ContextProvider({ children }: { children: ReactNode }) {
  const { isLoading, setIsLoading } = useCustomContextState()

  return (
    <CustomContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading &&
        createPortal(
          <div className={wrapper}>
            <div className={loading}>
              {Array.from({ length: 6 }, (_, i) => (
                <Fragment key={i}>
                  <span className={bars[`facade-${i}`]} />
                  <span className={bars[`back-${i}`]} />
                </Fragment>
              ))}
            </div>
          </div>,
          document.body,
        )}
      {children}
    </CustomContext.Provider>
  )
}
