import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import HomeContextProvider from './context/HomeContext.jsx'

createRoot(document.getElementById('root')).render(
   <HomeContextProvider>
   
         <App />

   </HomeContextProvider>

 
)
