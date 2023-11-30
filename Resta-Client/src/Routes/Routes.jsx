import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home";
import OurMenuPage from "../Pages/OurMenuPage/OurMenuPage";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import PersonalInfo from "../Pages/PersonalInfo/PersonalInfo";
import Dashboard from "../layout/Dashboard";
import Cart from "../Pages/UserDashboard/Cart/Cart";
import AllUser from "../layout/AdminPages/AllUser";
import AddItemsPage from "../layout/AdminPages/AddItemsPage";
import AdminRoutes from "./AdminRoutes";
import ItemHandler from "../layout/AdminPages/ItemHandler";
import UpdateItem from "../layout/AdminPages/UpdateItem";
import Payment from "../Pages/UserDashboard/Payment/Payment";
import PaymentHistory from "../Pages/UserDashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/UserDashboard/UserHome/UserHome";
import AdminHome from "../layout/AdminPages/AdminHome";



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
            ,
            {
                path:'signUp',
                element: <SignUp></SignUp>

            },
            {
                path:'personalInfo',
                element: <PrivateRoutes><PersonalInfo></PersonalInfo></PrivateRoutes>

            }
            
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children:[
            {
                path: 'cart',
                element: <Cart></Cart>

            },
            {
                path: 'userHome',
                element: <UserHome></UserHome>
            },
            {
                path: 'payment',
                element: <Payment></Payment>

            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },

            //admin routes

            {
                path: 'adminHome',
                element: <AdminHome></AdminHome>


            },
            
            {
                path: 'users',
                element: <AdminRoutes><AllUser></AllUser></AdminRoutes>
            },
            {
                path: 'addItems',
                element: <AdminRoutes><AddItemsPage></AddItemsPage></AdminRoutes>
            },
            {
                path: 'manageItems',
                element: <AdminRoutes><ItemHandler></ItemHandler></AdminRoutes>
            },
            {
                path: 'update/:id',
                element: <AdminRoutes><UpdateItem></UpdateItem></AdminRoutes>,
                loader: ({params})=> fetch(`http://localhost:5000/menu/${params.id}`)
            }
        ]
    }
]);