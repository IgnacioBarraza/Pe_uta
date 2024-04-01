import Router from "./routes/router"
import routes from "./routes/routesConfig"

function App() {

  return (
    <>
      <Router routes={routes} />
    </>
  )
}

export default App
