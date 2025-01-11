import Button from "./ui/Button"
import Input from "./ui/Input"
import { useRef, useState } from "react"
import ProjectLogo from "./ui/ProjectLogo";
import axios from "axios";
import { SERVER_URL } from "../config";
import { Link, useNavigate} from "react-router";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();

  const [err, setErr] = useState("");

  const usernameref = useRef();
  const passwrodref = useRef();

  async function handleLogin (e: any) {
    e.preventDefault()
    try{
    const response :any = await axios.post(`${SERVER_URL}/Login`, {
      username: usernameref.current,
      password: passwrodref.current
    })

    if(response.status === 200) {
        localStorage.setItem('token', response.data.token);
        toast.success("Login successful");
        setTimeout(()=> navigate('/dashboard'), 1000) 
    }
    }
    catch(e : any) {
      setErr(e.response.data.message)
    }
  }
    
  return (
    <div className="w-screen flex flex-col gap-2 text-center justify-center items-center h-screen">
      <ProjectLogo />
        <form className="min-w-96 mt-6 flex flex-col gap-4 items-center border-gray-700 max-w-[650px] rounded-2xl border-2 p-5 w-[50%]" 
        onSubmit = {handleLogin}>
          <h1 className="text-main-dark mt-3 mb-4 font-semibold text-3xl">Login</h1>
            <Input type = "text" title = "Username" refer = {usernameref}/>
            <Input type = "password" title = "Password" refer = {passwrodref}/>
            {err && <p className="text-sm text-red-600">{err}</p>}
            <Button type = "Submit" size="md" variant = "primary" text = "Login" />
            <Link to = '/signup' > <p className="text-main-dark hover:underline cursor-pointer">Don't have an account? Sign up!</p> </Link>
         </form>
    </div>
  )
}

export default SignUp