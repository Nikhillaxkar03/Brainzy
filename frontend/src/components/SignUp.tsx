import Button from "./ui/Button"
import Input from "./ui/Input"
import { useRef, useState } from "react"
import ProjectLogo from "./ui/ProjectLogo";
import axios from "axios";
import { SERVER_URL } from "../config";
import { Link, useNavigate } from "react-router";

const SignUp = () => {

  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const usernameref = useRef();
  const passwrodref = useRef();

  async function handleSignUp (e: any) {
    e.preventDefault()
    try{
    const response = await axios.post(`${SERVER_URL}/signin`, {
      username: usernameref.current,
      password: passwrodref.current
    })
    if(response.status === 200) {
      navigate('/login')
    }
    }
    catch(e : any) {
      setErr(e.response.data.message || e.message)
    }
  }
    
  return (
    <div className="w-screen flex flex-col gap-2 text-center justify-center items-center h-screen">
      <ProjectLogo />
        <form className="min-w-96 mt-6 flex flex-col gap-4 items-center border-gray-700 max-w-[650px] rounded-2xl border-2 p-5 w-[50%]" 
        onSubmit = {handleSignUp}>
          <h1 className="text-main-dark mt-3 mb-4 font-semibold text-3xl">Sign Up</h1>
            <Input type = "text" title = "Username" refer = {usernameref}/>
            <Input type = "password" title = "Password" refer = {passwrodref}/>
            {err && <p className="text-sm text-red-600">{err}</p>}
            <Button type = "Submit" size="md" variant = "primary" text = "Sign Up" />
           <Link to = '/login' ><p className="text-main-dark hover:underline cursor-pointer">Already have an account?, Login!</p></Link>
         </form>
    </div>
  )
}

export default SignUp