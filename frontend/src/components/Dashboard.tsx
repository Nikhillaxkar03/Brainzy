import { useState } from "react";
import { useRecoilState } from "recoil";

import Header from "./Header";
import Container from "./Container";
import SideMenu from "./SideMenu";
import AddContent from "./AddContent";


const Dashboard = () => {

    const [isOpen, setIsOpen] = useState(false);
    
      const stateUpdater = ():void => {
        setIsOpen(!isOpen);
      }

  return (
    <div>  <AddContent isOpen = {isOpen} updateMenu = {stateUpdater} />
    <div className="flex">
    <SideMenu />
    <div className="flex-grow">
      <Header updateMenu = {stateUpdater} />
      <Container />
      </div>
      </div>
   </div>
  )
}

export default Dashboard