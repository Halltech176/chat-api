import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "../forms/register";
import HomePage from "../pages/";
import ChatRoom from "../pages/chat";
const Routes = () => {
  const NoAuthRoutes = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/chat",
      element: <ChatRoom />,
    },
  ];

  const router = createBrowserRouter([...NoAuthRoutes]);

  return <RouterProvider router={router} />;
};

export default Routes;
