import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Import direto do Client App
import ClientApp from '../Client/src/App'

// Lazy load do Barber
const BarberLogin = lazy(() => import('../Barber/src/pages/auth/Login'))

// Loading component
const Loading = () => (
  <div className="min-h-dvh flex items-center justify-center">
    <div className="animate-spin h-8 w-8 border-4 border-gold border-t-transparent rounded-full" />
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Barber admin routes */}
          <Route path="/admin/login" element={<BarberLogin />} />
          
          {/* Client routes - todas as outras rotas */}
          <Route path="/*" element={<ClientApp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
