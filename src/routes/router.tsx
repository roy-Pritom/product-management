import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage/LoginPage";
import AllProductPage from "../pages/AllProductPage/AllProductPage";
import HomePage from "../pages/HomePage/HomePage";
import AddProductPage from "../pages/AddProductPage/AddProductPage";
import AboutPage from "../pages/AboutPage/AboutPage";

const router = createBrowserRouter([
    {
        path: "/",
        element:<App/>,
        children:[
            
            {
                path:"/",
                element:<HomePage/>
            },
            {
                path:"/products",
                element:<AllProductPage/>
            },
            {
                path:"/create-product",
                element:<AddProductPage/>
            },
            {
                path:"/about",
                element:<AboutPage/>
            },
        ]
    },
    // login route
    {
        path:"/login",
        element:<LoginPage/>
    },
]);


export default router;