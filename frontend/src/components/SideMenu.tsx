import SideMenuItem from "./ui/SideMenuItem";
import Button from "./ui/Button";
import { sidemenuData } from "./ui";
import ProjectLogo from "./ui/ProjectLogo";
import { useNavigate } from "react-router";
import toast from 'react-hot-toast'

const SideMenu = () => {

    const navigate = useNavigate();
    return <div className="min-w-[18rem] sticky left-0 top-0 h-screen border-r-[1px] border-gray-300">
        <div className="my-5 px-5 flex gap-3 items-center">
      <ProjectLogo />
       </div>
       <div className="mt-8">
        {
            sidemenuData.map( e => {
                return <SideMenuItem key={e.key} type = {e.type} itemIcon={e.logo} title={e.title} />
            })
        }
        <div className="m-auto absolute bottom-3 left-4">
        <Button variant="danger" size="lg" text="Logout" onClick={()=> {
            localStorage.removeItem('token');
            toast.success("Logout Succesfull");
            setTimeout(()=> navigate('/'), 1000);
            
        }}></Button>
        </div>
       </div>
    </div>
}

export default SideMenu