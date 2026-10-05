import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import logo from '../../../docs/octofitapp-small.png'
import './octofit.css'

const navigation = [
  { label: 'Overview', path: '/api/leaderboard/' },
  { label: 'Activities', path: '/api/activities/' },
  { label: 'Teams', path: '/api/teams/' },
  { label: 'Members', path: '/api/users/' },
  { label: 'Workouts', path: '/api/workouts/' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container app-header-inner">
          <NavLink className="brand" to="/api/leaderboard/" aria-label="OctoFit Tracker home">
            <img src={logo} alt="" />
            <span>OctoFit<span className="brand-accent">.</span></span>
          </NavLink>
          <nav className="app-nav" aria-label="Main navigation">
            {navigation.map(({ label, path }) => (
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                key={path}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <span className="header-tag">MOVE TOGETHER</span>
        </div>
      </header>

      <main className="container app-main">
        <Routes>
          <Route path="/api/activities/" element={<Activities />} />
          <Route path="/api/leaderboard/" element={<Leaderboard />} />
          <Route path="/api/teams/" element={<Teams />} />
          <Route path="/api/users/" element={<Users />} />
          <Route path="/api/workouts/" element={<Workouts />} />
          <Route path="/" element={<Navigate to="/api/leaderboard/" replace />} />
          <Route path="*" element={<Navigate to="/api/leaderboard/" replace />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <div className="container">Mergington High School / OctoFit Tracker</div>
      </footer>
    </div>
  )
}

export default App