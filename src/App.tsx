// packages
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// constants
import { APP_URL } from '@/constants'

// components
import { ContextProvider } from '@/components/ContextProvider'
import LoginRouteGuard from '@/components/LoginRouteGuard'

// styles
// destyle
import 'destyle.css/destyle.min.css'

// global
import '@/styles/global.css'

export default function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <LoginRouteGuard>
          <Routes>
            {/* `/`への遷移は、ログイン画面にリダイレクトさせる */}
            <Route
              path="/"
              element={<Navigate to={APP_URL.LOGIN.path as string} replace />}
            />
            {Object.keys(APP_URL).map((key) => {
              const Component = APP_URL[key].Component as React.ComponentType
              return (
                <Route
                  key={key}
                  path={APP_URL[key].path}
                  element={<Component />}
                />
              )
            })}
          </Routes>
        </LoginRouteGuard>
      </ContextProvider>
    </BrowserRouter>
  )
}
