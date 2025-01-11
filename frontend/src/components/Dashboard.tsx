import { useState } from "react";
import Header from "./Header";
import Container from "./Container";
import SideMenu from "./SideMenu";
import AddContent from "./AddContent";


const Dashboard = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [isShare, setIsShare] = useState<null | boolean>(false);

    const handleShare = ():void => {
      setIsShare(!isShare);
    }
    
      const stateUpdater = ():void => {
        setIsOpen(!isOpen);
      }

  return (
    <div>  <AddContent isOpen = {isOpen} updateMenu = {stateUpdater} />
    <div className="flex">
    <SideMenu />
    <div className="flex-grow">
      <Header updateMenu = {stateUpdater} toggleShare = {handleShare} />
      <Container isShare = {isShare} />
      </div>
      </div>
   </div>
  )
}

export default Dashboard