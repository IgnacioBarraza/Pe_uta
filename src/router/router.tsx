import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Page404 } from '../shared/page404'
import ProtectedRoute from '../routes/protectedRoute'
import Navbar from '@/components/NavBar/navbar'
import Footer from '@/components/Footer/footer'
import { Toaster } from '@/components/ui/toaster'
import { FirebaseProvider } from '@/providers/firebaseProvider'
import { AuthProvider } from '@/providers/authProvider'
import { BackendProvider } from '@/providers/backendContext'
import { DataProvider } from '@/providers/dataProvider'
import { PropsDataProvider } from '@/providers/propsContext'
import { LocationProvider } from '@/providers/locationContext'

export default function Router(props) {
  // Function to recursively render routes
  const renderRoutes = (routes) => {
    return routes.map((route) => {
      // Check if route requires protection
      const element = route.protection ? (
        <ProtectedRoute roles={route.protection.roles}>
          {route.component}
        </ProtectedRoute>
      ) : (
        route.component
      )

      return (
        <Route key={route.path} path={route.path} element={element}>
          {route.routes && renderRoutes(route.routes)}
        </Route>
      )
    })
  }

  return (
    <BrowserRouter>
      <LocationProvider>
        <AuthProvider>
          <FirebaseProvider>
            <BackendProvider>
              <DataProvider>
                <PropsDataProvider>
                  <div className="flex flex-col min-h-[100dvh]">
                    <Navbar />
                    <main className="flex-1">
                      <Routes>
                        {renderRoutes(props.routes)}
                        <Route path="*" element={<Page404 />} />
                      </Routes>
                      <Toaster />
                    </main>
                    <Footer />
                  </div>
                </PropsDataProvider>
              </DataProvider>
            </BackendProvider>
          </FirebaseProvider>
        </AuthProvider>
      </LocationProvider>
    </BrowserRouter>
  )
}
