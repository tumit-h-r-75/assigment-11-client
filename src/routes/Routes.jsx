import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AllPosts from "../pages/AllPosts";
import AddPost from "../pages/AddPost";
import ManagePosts from "../pages/ManagePosts";
import Error from "../pages/Error";

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
                Component: AddPost
            },
            {
                path: "/manage-posts",
                Component: ManagePosts
            }
        ]
    },
    {
        path: "/*",
        Component: Error,
    }
]);

export default Router;
