import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="min-h-screen w-full bg-white relative">
  {/* Grid Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(to right, #d9d9d9 1px, transparent 1px),
        linear-gradient(to bottom, #d9d9d9 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
    }}
  />
      
      {/* Your App Content */}
      <div className="relative z-10">
        <App />
      </div>
    </div>
  </StrictMode>,
)