import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AllPosts from "../pages/AllPosts";
import AddPost from "../pages/AddPost";
import ManagePosts from "../pages/ManagePosts";
import Error from "../pages/Error";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../context/PrivateRoute";
import VolunteerDetails from "../pages/VolunteerDetails";

const Router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                path: "/",
                Component: Home
            },
            {
                path: "/all-posts",
                Component: AllPosts
            },
            {
                path: "/add-post",
                element: <PrivateRoute>
                    <AddPost></AddPost>
                </PrivateRoute>
            },
            {
                path: "/volunteer-post/:id",
                element: <PrivateRoute>
                    <VolunteerDetails></VolunteerDetails>
                </PrivateRoute>
            },
            {
                path: "/manage-posts",
                Component: ManagePosts
            },
            {
                path: "/login",
                Component: Login
            },
            {
                path: "/register",
                Component: Register
            },
            {
                path:"/detials/:id",
                element:<PrivateRoute>
                    <VolunteerDetails></VolunteerDetails>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`https://volunteer-hub-server-dun.vercel.app/volunteer/${params.id}`)
            }
        ]
    },
    {
        path: "/*",
        Component: Error,
    }
]);

export default Router;
