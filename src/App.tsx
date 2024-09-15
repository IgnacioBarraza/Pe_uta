import { AuthProvider } from "./providers/authProvider";
import { BackendProvider } from "./providers/backendContext";
import { PropsDataProvider } from "./providers/propsContext";
import Router from "./router/router";
import routes from "./routes/routesConfig";

function App() {
  return (
    <AuthProvider>
      <BackendProvider>
        <PropsDataProvider>
          <Router routes={routes} />
        </PropsDataProvider>
      </BackendProvider>
    </AuthProvider>
  );
}

export default App;
