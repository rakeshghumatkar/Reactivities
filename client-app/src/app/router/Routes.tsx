import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../layout/features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../layout/features/activities/form/ActivityForm";
import ActivityDetails from "../layout/features/activities/details/ActivityDetails";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'activities/:id', element: <ActivityDetails /> },
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'createActivity', element: <ActivityForm key='create' /> },
            { path: 'manage/:id', element: <ActivityForm key='manage' /> }
        ]
    }]
export const router = createBrowserRouter(routes);