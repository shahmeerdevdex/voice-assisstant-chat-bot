import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import VocalAuraWidget from './VocalAuraWidget'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VocalAuraWidget/>
  </StrictMode>,
)
