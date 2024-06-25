import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Page404 } from "../shared/page404";

export default function Router(props) {
    const renderRoutes = (routes) => {
        return routes.map((element) => {
            if (!element.protection) {
                return (
                    <Route
                        key={element.path}
                        path={element.path}
                        element={element.component}
                    >
                        {element.routes && renderRoutes(element.routes)}
                    </Route>
                );
            }
            return (
                <Route key={element.path} element={element.protection}>
                    <Route path={element.path} element={element.component}>
                        {element.routes && renderRoutes(element.routes)}
                    </Route>
                </Route>
            );
        });
    };

    return (
        <BrowserRouter>
            <Routes>
                {renderRoutes(props.routes)}
                <Route path='*' element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    );
}
