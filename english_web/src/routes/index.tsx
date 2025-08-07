import type { RouteObject } from "react-router-dom";
import HomePage from "../layouts/HomePage";
import Lesson from "../page/Dashboard/Lesson";
import ErrorPage from "../page/ErrorPage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: (<HomePage />),
        children: [
            {
                index: true, element: (<Lesson />),
            },
            {
                path: "lesson", element: (<Lesson />)
            }
        ]
    },
    { path:"*", element:(<ErrorPage />) }

];

export default routes;
