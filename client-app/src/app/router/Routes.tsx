import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../layout/features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../layout/features/activities/form/ActivityForm";
import ActivityDetails from "../layout/features/activities/details/ActivityDetails";
import TestErrors from "../errors/TestError";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'activities/:id', element: <ActivityDetails /> },
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'createActivity', element: <ActivityForm key='create' /> },
            { path: 'manage/:id', element: <ActivityForm key='manage' /> },
            { path: 'errors', element: <TestErrors /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to="/not-found" /> }
        ]
    }]
export const router = createBrowserRouter(routes);