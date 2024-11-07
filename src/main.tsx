import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import AppProvider from "./context/AppContext.tsx";
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId="696765481231-9dnujkc06qhqomnjkp2626c85c52qfct.apps.googleusercontent.com">
      <BrowserRouter>
          <AppProvider>
              <App/>
          </AppProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
)
