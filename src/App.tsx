import Footer from "./components/Footer/footer";
import Navbar from "./components/NavBar/navbar";
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
          <div className="flex flex-col min-h-[100dvh]">
            <Navbar />
            <main className="flex-1">
              <Router routes={routes} />
            </main>
            <Footer />
          </div>
        </PropsDataProvider>
      </BackendProvider>
    </AuthProvider>
  );
}

export default App;
