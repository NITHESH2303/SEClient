import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Chat from './components/pages/Chat'
import Dashboard from './components/pages/Dashboard'
import Performance from './components/pages/Performance'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/signup" Component={Signup} />
          <Route path="/chat" Component={Chat} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/performance" Component={Performance} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App