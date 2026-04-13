import React, { useState } from 'react'
import Header       from './components/Header'
import AuthModal    from './components/AuthModal'
import HomePage     from './pages/HomePage'
import PatientPage  from './pages/patient/PatientPage'
import TherapistPage from './pages/therapist/TherapistPage'
import AdminPage    from './pages/admin/AdminPage'
import { useAuth }  from './context/AuthContext'
import type { ViewType, AuthRole } from './types/app'
import './styles/global.css'

export type { ViewType, AuthRole }

const App: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth()

  const [view,        setView]        = useState<ViewType>('home')
  const [authOpen,    setAuthOpen]    = useState(false)
  const [pendingRole, setPendingRole] = useState<AuthRole>('patient')

  const openAuth = (role: AuthRole) => {
    setPendingRole(role)
    setAuthOpen(true)
  }

  const handleAuthSuccess = (role: string) => {
    setAuthOpen(false)
    setView(role === 'therapist' ? 'therapist' : 'patient')
  }

  const handleLogout = () => {
    logout()
    setView('home')
  }

  const renderView = () => {
    switch (view) {
      case 'patient':    return <PatientPage />
      case 'therapist':  return <TherapistPage setView={setView} />
      case 'admin':      return <AdminPage />
      default:           return <HomePage openAuth={openAuth} setView={setView} />
    }
  }

  return (
    <div className="app-root">
      <Header
        view={view}
        setView={setView}
        openAuth={openAuth}
        isAuthenticated={isAuthenticated}
        userName={user?.name}
        onLogout={handleLogout}
      />
      <main className="content-viewport" key={view}>
        {renderView()}
      </main>
      {authOpen && (
        <AuthModal
          role={pendingRole}
          onClose={() => setAuthOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  )
}

export default App