import Dashboard from "./components/Dashboard"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import { BrowserRouter,Routes, Route} from "react-router"


function App() {

  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/login" element={<Login />} />

  </Routes>

 </BrowserRouter>
   </>
  )
}

export default App
