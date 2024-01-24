import MantineProviderWrapper from "./theme"
import { RouterProvider } from "react-router-dom";
import router from "@/router/index";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <MantineProviderWrapper>
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </MantineProviderWrapper>
  )
}

export default App
