// ─────────────────────────────────────────────────────────────────
// src/pages/patient/PatientPage.tsx
// Root – switches between Dashboard and Finder flow.
// ─────────────────────────────────────────────────────────────────

import React, { useState } from 'react'
import DashboardView from './components/DashboardView'
import FinderFlow    from './components/FinderFlow'

type Screen = 'dashboard' | 'finder'

const PatientPage: React.FC = () => {
  const [screen,     setScreen]     = useState<Screen>('dashboard')
  const [refreshKey, setRefreshKey] = useState(0)

  const handleBookingComplete = () => {
    setScreen('dashboard')
    setRefreshKey(k => k + 1)
  }

  if (screen === 'finder') {
    return <FinderFlow onBack={handleBookingComplete} />
  }

  return (
    <DashboardView
      onFindNew={() => setScreen('finder')}
      refreshKey={refreshKey}
    />
  )
}

export default PatientPage