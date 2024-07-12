import { createBrowserRouter } from "react-router-dom";
import App from "../Components/App";
import UserCreatePage from "../Pages/UserCreatePage/UserCreatePage";
import UserListPage from "../Pages/UserListPage/UserListPage";
import HomePage from "../Pages/HomePage/HomePage";
import UserDeletePage from "../Pages/UserDeletePage/UserDeletePage";
import UserModifyPage from "../Pages/UserModifyPage/UserModifyPage";
import UserProfilePage from "../Pages/UserProfilePage/UserProfilePage";
import SignInPage from "../Pages/SignInPage/SignInPage";
import SignOutPage from "../Pages/SignOutPage/SignOutPage";
import TicketCreatePage from "../Pages/TicketCreatePage/TicketCreatePage";
import TicketListPage from "../Pages/TicketListPage/TicketListPage";
import TicketDetailPage from "../Pages/TicketProfilePage/TicketDetailPage";
import HardWorkPage from "../Pages/HardWorkPage/HardWorkPage";
import TicketModifyPage from "../Pages/TicketModifyPage/TicketModifyPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element:<App/>,
        children: [
            {path:"CamFeed/47",element:<HardWorkPage/>},

            {path:"",element:<HomePage/>},
            {path:"/User/Create",element:<UserCreatePage/>},
            {path:"/User/List",element:<UserListPage/>},
            {path:"/User/Edit/:id",element:<UserModifyPage/>},
            {path:"/User/Delete/:id",element:<UserDeletePage/>},
            {path:"/User/Detail/:id",element:<UserProfilePage/>},
            {path:"User/SignIn",element:<SignInPage/>},
            {path:"User/SignOut",element:<SignOutPage/>},

            {path:"Ticket/Create",element:<TicketCreatePage/>},
            {path:"Ticket/List",element:<TicketListPage/>},
            {path:"Ticket/Detail/:id",element:<TicketDetailPage/>},
            {path:"Ticket/Edit/:id",element:<TicketModifyPage/>},
            
        ],
    },
]);