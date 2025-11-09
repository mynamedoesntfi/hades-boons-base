import { Link, Route, Routes } from 'react-router-dom'
import { RemotePlaceholder } from './components/RemotePlaceholder'
import './App.css'

const remoteRoutes = [
  {
    path: '/inventory/*',
    name: 'Inventory',
    description: 'Inventory microfrontend mount point (remote not connected yet).',
  },
  {
    path: '/codex/*',
    name: 'Codex',
    description: 'Codex microfrontend mount point (remote not connected yet).',
  },
]

function App() {
  return (
    <div className="shell">
      <header className="shell__header">
        <h1 className="shell__title">Hades 2</h1>
        <nav className="shell__nav">
          <Link to="/">Home</Link>
          {remoteRoutes.map((route) => (
            <Link to={route.path.replace('/*', '')} key={route.path}>
              {route.name}
            </Link>
          ))}
        </nav>
      </header>

      <main className="shell__content">
        <Routes>
          <Route
            path="/"
            element={
              <section className="shell__hero">
                <p>Welcome to the host shell. Select a microfrontend to mount.</p>
              </section>
            }
          />
          {remoteRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<RemotePlaceholder name={route.name} description={route.description} />}
            />
          ))}
          <Route
            path="*"
            element={
              <section className="shell__hero">
                <p>Route not found.</p>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
