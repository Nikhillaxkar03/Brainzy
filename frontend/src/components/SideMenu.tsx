import SideMenuItem from "./ui/SideMenuItem";
import Button from "./ui/Button";
import { sidemenuData } from "./ui";
import ProjectLogo from "./ui/ProjectLogo";

const SideMenu = () => {
    return <div className="min-w-[18rem] sticky left-0 top-0 h-screen border-r-[1px] border-gray-300">
        <div className="my-5 px-5 flex gap-3 items-center">
      <ProjectLogo />
       </div>
       <div className="mt-8">
        {
            sidemenuData.map( e => {
                return <SideMenuItem key={e.key} itemIcon={e.logo} title={e.title} />
            })
        }
        <div className="m-auto absolute bottom-3 left-4">
        <Button variant="danger" size="lg" text="Logout"></Button>
        </div>
       </div>
    </div>
}

export default SideMenu