import type { RouteObject } from "react-router-dom";
import HomePage from "../layouts/HomePage";
import Lesson from "../page/Dashboard/Lesson/Lesson";
import ErrorPage from "../page/ErrorPage";
import Pronounciation from "../page/Dashboard/Pronounciation";
import Listening from "../page/Dashboard/Listening";
import Flashcard from "../page/Dashboard/Flashcard";
import Profile from "../page/Dashboard/Profile";
import HelpSection from "../page/Dashboard/HelpSection";
import Login from "../page/Authentication/Login";
import Register from "../page/Authentication/Register";
import QuestionDetail from "../components/HelpSection/QuestionDetail";
import PrivateRoute from "../components/Authentication/PrivateRoute";

const routes: RouteObject[] = [
    {
        path: "/register",
        element: (<Register />)
    },
    {
        path: "/login",
        element: (<Login />)
    }
    ,
    {
        path: "/",
        element: (
            <PrivateRoute><HomePage /></PrivateRoute>
        ),
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
            , {
                path: "/help/:id",
                element: <QuestionDetail />,
            }
        ]
    },
    { path: "*", element: (<ErrorPage />) }

];

export default routes;
