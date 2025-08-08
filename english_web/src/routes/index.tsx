import type { RouteObject } from "react-router-dom";
import HomePage from "../layouts/HomePage";
import Lesson from "../page/Dashboard/Lesson/Lesson";
import ErrorPage from "../page/ErrorPage";
import Pronounciation from "../page/Dashboard/Pronounciation";
import Listening from "../page/Dashboard/Listening";
import Flashcard from "../page/Dashboard/Flashcard";
import Profile from "../page/Dashboard/Profile";
import HelpSection from "../page/Dashboard/HelpSection";
import Login from "../authentication/Login";
import Register from "../authentication/Register";

const routes: RouteObject[] = [
     {
        path:"/register",
        element: (<Register />)
    },
    {
        path:"/login",
        element: (<Login />)
    }
    ,
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
            ,
            {
                path: "pronounciation", element: (<Pronounciation />)
            }
            ,
            {
                path: "listening", element: (<Listening />)
            }
            ,
            {
                path: "flashcard", element: (<Flashcard />)
            },
            {
                path: "profile", element: (<Profile />)
            },
            {
                path: "help", element: (<HelpSection />)
            }
        ]
    },
    { path: "*", element: (<ErrorPage />) }

];

export default routes;
