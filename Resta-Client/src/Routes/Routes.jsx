import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home";
import OurMenuPage from "../Pages/OurMenuPage/OurMenuPage";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[
            {
                path:'/',
                element: <Home></Home>

            },
            {
                path:'menu',
                element: <OurMenuPage></OurMenuPage>

            },
            {
                path:'order',
                element: <Order></Order>

            },
            {
                path:'login',
                element: <Login></Login>

            }
            
        ]
    },
]);