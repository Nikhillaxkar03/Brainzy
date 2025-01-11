import ProjectLogo from "./ui/ProjectLogo";
import { Fade } from "react-awesome-reveal";
import Button from "./ui/Button"
import { useNavigate } from "react-router";
import toast from 'react-hot-toast'


const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-tr from-stone-200 to-blue-400">
      <div className=" flex gap-4 mt-5 justify-center items-center">
        <ProjectLogo />
      </div>

      <div className="w-[90%] flex mt-16 m-auto">
        <div className="text-5xl basis-[50%] font-semibold">
          <Fade duration={2000}>
            <span className=" text-main-dark">Welcome,To the Brainzy.</span></Fade>
            <p className="mt-6 text-base">
              <span className="text-main-dark">Brainzy,</span> is your
              all-in-one digital organizer designed to help you save, manage,
              and revisit your favorite links, important documents, YouTube
              videos, and Twitter posts — all in one place. Whether you're
              planning a project, saving inspiration, or keeping track of
              must-see content, we've got you covered.
            </p>
        </div>
        <div>
            <Button variant="primary" size="lg" text="Get Started" onClick={()=> {
                const authorization = localStorage.getItem('token');

                console.log("worink")

                if(authorization) { 
                  toast.success("User Autharized");
                  setTimeout(()=> navigate('/dashboard'), 1000)                 
                }
                else{
                  toast.error("User Not Autharized");
                  setTimeout(()=> navigate('/signup'), 1000)     
                }
            }}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
