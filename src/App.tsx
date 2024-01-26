import MantineProviderWrapper from "./theme"
import { RouterProvider } from "react-router-dom";
import router from "@/router/index";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeContext from '@/context/ThemeContext'
import { local } from "./utils/storage";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState(local.getTheme());
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <MantineProviderWrapper defaultColorScheme={theme}>
        <ToastContainer />
        <RouterProvider router={router}></RouterProvider>
      </MantineProviderWrapper>
    </ThemeContext.Provider>
  )
}

export default App
