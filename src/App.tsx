import { AutoLogout } from "./auth/components/aoutlogout"
import { PropsDataProvider } from "./providers/propsContext"
import Router from "./router/router"
import routes from "./routes/routesConfig"

function App() {

  return (
    <>
      <PropsDataProvider>
        <AutoLogout />
        <Router routes={routes} />
      </PropsDataProvider>
    </>
  )
}

export default App
