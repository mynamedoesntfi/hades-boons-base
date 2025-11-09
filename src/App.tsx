import { lazy, Suspense, type ReactElement } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { RemotePlaceholder } from './components/RemotePlaceholder'
import { RemoteErrorBoundary } from './components/RemoteErrorBoundary'
import './App.css'

const BoonInfoRouter = lazy(() => import('boon_info/App'))

type RemoteRouteConfig = {
  path: string
  name: string
  render?: () => ReactElement
  description?: string
}

const remoteRoutes: RemoteRouteConfig[] = [
  {
    path: '/codex/*',
    name: 'Codex',
    render: () => <BoonInfoRouter />,
  },
  {
    path: '/inventory/*',
    name: 'Inventory (Soon)',
    description:
      'Inventory microfrontend mount point. Connect the remote to render the live experience.',
  },
  {
    path: '/aspects/*',
    name: 'Weapon Aspects (Soon)',
    description:
      'Weapon aspects microfrontend mount point. Connect the remote to render the live experience.',
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
                <p>
                  Welcome to the host shell. Browse the navigation to open mounted microfrontends.
                </p>
              </section>
            }
          />
          {remoteRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.render ? (
                  <Suspense
                    fallback={
                      <RemotePlaceholder
                        name={`${route.name} loading`}
                        description="Connecting to remote microfrontend..."
                      />
                    }
                  >
                    <RemoteErrorBoundary name={route.name}>{route.render()}</RemoteErrorBoundary>
                  </Suspense>
                ) : (
                  <RemotePlaceholder name={route.name} description={route.description} />
                )
              }
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
