import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import AppProvider from "./context/AppContext.tsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import {ENV} from "./Utils/Contanst.ts";


createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={ENV.GOOGLE_CLIENT_ID}>
      <BrowserRouter>
          <AppProvider>
              <App/>
          </AppProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
)
