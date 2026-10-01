import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import logo from '../../../docs/octofitapp-small.png'
import './octofit.css'

const navigation = [
  { label: 'Overview', path: '/leaderboard' },
  { label: 'Activities', path: '/activities' },
  { label: 'Teams', path: '/teams' },
  { label: 'Members', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container app-header-inner">
          <NavLink className="brand" to="/leaderboard" aria-label="OctoFit Tracker home">
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
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={<Navigate to="/leaderboard" replace />} />
          <Route path="*" element={<Navigate to="/leaderboard" replace />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <div className="container">Mergington High School / OctoFit Tracker</div>
      </footer>
    </div>
  )
}

export default App