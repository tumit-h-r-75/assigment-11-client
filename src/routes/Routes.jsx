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
import BeAVolunteer from "../pages/BeAVolunteer";
import UpdatePost from "../pages/UpdatePost";
import About from "../pages/About";
import DashBordLayout from "../layout/DashBordLayout";

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
                path: "/manage-posts",
                element: <PrivateRoute>
                    <ManagePosts></ManagePosts>
                </PrivateRoute>
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
                path: "/detials/:id",
                element: <PrivateRoute>
                    <VolunteerDetails></VolunteerDetails>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`https://volunteer-hub-server-fawn.vercel.app/volunteer/${params.id}`)
            },
            {
                path: "/be-a-volunteer/:id",
                element: <PrivateRoute>
                    <BeAVolunteer></BeAVolunteer>
                </PrivateRoute>
            },
            {
                path: '/update-data/:id',
                element: <PrivateRoute>
                    <UpdatePost></UpdatePost>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`https://volunteer-hub-server-fawn.vercel.app/volunteer/${params.id}`)
            },
            { path:"/about", Component: About }
        ]
    },
    {
        path: "/*",
        Component: Error,
    },
    {
        path:'/dashBord',
        Component:DashBordLayout,
        children:[
            {

            }
        ]
    }
]);

export default Router;
