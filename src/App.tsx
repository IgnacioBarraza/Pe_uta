import Footer from "@/components/Footer/footer";
import Navbar from "@/components/NavBar/navbar";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/providers/authProvider";
import { BackendProvider } from "@/providers/backendContext";
import { PropsDataProvider } from "@/providers/propsContext";
import Router from "@/router/router";
import routes from "@/routes/routesConfig";
import { FirebaseProvider } from "./providers/firebaseProvider";

function App() {
  return (
    <AuthProvider>
      <FirebaseProvider>
        <BackendProvider>
          <PropsDataProvider>
            <div className="flex flex-col min-h-[100dvh]">
              <Navbar />
              <main className="flex-1">
                <Router routes={routes} />
                <Toaster />
              </main>
              <Footer />
            </div>
          </PropsDataProvider>
        </BackendProvider>
      </FirebaseProvider>
    </AuthProvider>
  );
}

export default App;
