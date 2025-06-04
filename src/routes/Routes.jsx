import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";

const Router = createBrowserRouter([
{
     path: "/",
        Component: MainLayout,
}
])

export default Router