import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import App from './App'
import './index.css'

/**
 * ThemeProvider from next-themes:
 *  - attribute="class"  → adds/removes 'dark' class on <html>
 *  - defaultTheme="dark" → portfolio defaults to dark mode
 *  - enableSystem → respects user OS preference
 *
 * Required so DottedSurface (and any future dark-mode components)
 * can read the current theme via useTheme().
 */
createRoot(document.getElementById('root')).render(
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
)
