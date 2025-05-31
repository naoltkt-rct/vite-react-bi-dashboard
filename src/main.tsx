'use client'

// packages
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// components
import App from '@/App.tsx'

// mocks
import { initMocks } from '@/mocks'

// createRoot
function generator() {
  const root = document.getElementById('root')!
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

// msw 有効化
import.meta.env.VITE_API_MOCKING === 'enabled'
  ? initMocks().then(() => generator())
  : generator()
