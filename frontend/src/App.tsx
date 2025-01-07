import Dashboard from "./components/Dashboard"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Home from "./components/Home"
import { BrowserRouter,Routes, Route} from "react-router"
import { RecoilRoot } from "recoil"


function App() {

  return (
  <>
  <RecoilRoot>
  <BrowserRouter>
  <Routes>
    <Route path = '/' element = {<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/login" element={<Login />} />

  </Routes>

 </BrowserRouter>
 </RecoilRoot>
   </>
  )
}

export default App
