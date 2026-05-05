// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// // import './index.css'
// // import App from './App.jsx'
// // import { BrowserRouter } from 'react-router-dom'
// // import AppContextProvider from './context/AppContext.jsx'

// // createRoot(document.getElementById('root')).render( 
// //     <BrowserRouter>
// //     <AppContextProvider>
// //       <App />
// //     </AppContextProvider>
// //     </BrowserRouter>
// // )



// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'

// import AppContextProvider from './context/AppContext.jsx'
// import AuthProvider from './context/AuthContext.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <AuthProvider>        {/* ✅ AUTH FIRST */}
//         <AppContextProvider> {/* ✅ THEN APP DATA */}
//           <App />
//         </AppContextProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   </StrictMode>
// )


import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import AppContextProvider from './context/AppContext.jsx'
import AuthProvider from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </AuthProvider>
  </BrowserRouter>
)