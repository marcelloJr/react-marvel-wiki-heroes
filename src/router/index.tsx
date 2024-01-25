import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Main from "@/layout/Main";
import Login from "@/views/auth/Login";
import Recovery from "@/views/auth/Recovery";
import BackToLogin from "@/views/auth/BackToLogin";
import ChooseAgent from "@/views/auth/ChooseAgent";
import Home from "@/views/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "profile/:id?",
        element: (
          <ProtectedRoute>
            <h1>Profile</h1>
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "account-recovery",
    element: <Recovery />
  },
  {
    path: "back-to-login",
    element: <BackToLogin />
  },
  {
    path: "choose-agent",
    element: <ChooseAgent />
  },
]);

export default router;