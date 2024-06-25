import { AutoLogout } from "./auth/components/aoutlogout";
import { BackendProvider } from "./providers/backendContext";
import { PropsDataProvider } from "./providers/propsContext";
import Router from "./router/router";
import routes from "./routes/routesConfig";

function App() {
  return (
    <>
      <BackendProvider>
        <PropsDataProvider>
          <AutoLogout />
          <Router routes={routes} />
        </PropsDataProvider>
      </BackendProvider>
    </>
  );
}

export default App;
