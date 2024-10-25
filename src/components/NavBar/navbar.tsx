import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { DialogTitle } from '@radix-ui/react-dialog'
import { clearUserData } from '@/utils/authHelpers'
import { useProps } from '@/hooks/useProps'
import { useLocationContext } from '@/hooks/locationHook'

export default function Navbar() {
  const { userToken, userName, userRole } = useProps()
  const isAuthenticated = !!userToken

  const { location } = useLocationContext()

  const isLoginOrNotFound =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/404'

  const handleLogout = () => {
    clearUserData()
  }

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Sheet>
        <SheetTrigger asChild aria-describedby="Navigation menu">
          <Button variant="outline" size="icon" className="lg:hidden">
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        {!isLoginOrNotFound && (
          <SheetContent side="left">
            <VisuallyHidden>
              <DialogTitle>Navigation Menu</DialogTitle>
            </VisuallyHidden>
            <a href="/inicio" className="flex items-center justify-center">
              <img
                src="/expo_logo.svg"
                alt="Logo feria de ciencias"
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">Feria de Ciencia</span>
            </a>
            <nav className="grid gap-4 sm:gap-6 py-6">
              {isAuthenticated && (
                <div className="text-sm font-medium">
                  Bienvenid@, {userName}
                </div>
              )}
              <a
                href="/inicio"
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Inicio
              </a>
              <a
                href="/inicio/proyectos"
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Proyectos
              </a>
              <a
                href="/inicio/evaluados"
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Evaluados
              </a>
              {isAuthenticated && userRole && userRole === 'admin' && (
                <a
                  href="/admin"
                  className="text-sm font-medium hover:underline underline-offset-4"
                >
                  Admin
                </a>
              )}
              {isAuthenticated ? (
                <button
                  className="text-sm font-medium hover:underline underline-offset-4"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              ) : (
                <>
                  <a
                    href="/login"
                    className="text-sm font-medium hover:underline underline-offset-4"
                  >
                    Iniciar Sesión
                  </a>
                  <a
                    href="/register"
                    className="text-sm font-medium hover:underline underline-offset-4"
                  >
                    Registrarse
                  </a>
                </>
              )}
            </nav>
          </SheetContent>
        )}
      </Sheet>
      <img
        src="/expo_logo.svg"
        alt="Logo feria de ciencias"
        className="w-8 h-8 hidden sm:block"
      />
      <a
        href={'/inicio'}
        className="hidden sm:flex items-center justify-center"
      >
        <span className="text-xl font-bold">Feria de Ciencia</span>
      </a>
      {!isLoginOrNotFound && (
        <div className="ml-auto hidden lg:flex gap-4 sm:gap-6">
          {isAuthenticated && (
            <div className="text-sm font-medium">Bienvenid@, {userName}</div>
          )}
          <a
            href="/inicio"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Inicio
          </a>
          <a
            href="/inicio/proyectos"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Proyectos
          </a>
          <a
            href="/inicio/evaluados"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Evaluados
          </a>
          {isAuthenticated && userRole && userRole === 'admin' && (
            <a
              href="/admin"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Admin
            </a>
          )}
          {isAuthenticated ? (
            <button
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          ) : (
            <>
              <a
                href="/login"
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Iniciar Sesión
              </a>
              <a
                href="/register"
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Registrarse
              </a>
            </>
          )}
        </div>
      )}
    </header>
  )
}
