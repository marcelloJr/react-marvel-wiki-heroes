import { Navigate, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Main from "@/layout/Main";
import Login from "@/views/auth/Login";
import Recovery from "@/views/auth/Recovery";
import BackToLogin from "@/views/auth/BackToLogin";
import ChooseAgent from "@/views/auth/ChooseAgent";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
    // children: [
    //   {
    //     path: "",
    //     element: <Navigate to="/candidate" />
    //   },
    //   {
    //     path: "candidate/*",
    //     element: (
    //       <ProtectedRoute>
    //         <Parcel config={() => System.import('@recruiter-sys/candidate')} />
    //       </ProtectedRoute>
    //     )
    //   }
    // ]
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