import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Page404 } from "../shared/page404";
import ProtectedRoute from "../routes/protectedRoute";

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
            );

            return (
                <Route
                    key={route.path}
                    path={route.path}
                    element={element}
                >
                    {route.routes && renderRoutes(route.routes)}
                </Route>
            );
        });
    };

    return (
        <BrowserRouter>
            <Routes>
                {renderRoutes(props.routes)}
                <Route path="*" element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    );
}
