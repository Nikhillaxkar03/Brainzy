import Button from "./ui/Button"
import PlusIcon from "../assets/icons/PlusIcon"
import ShareIcon from "../assets/icons/ShareIcon"

const Header = ({updateMenu, toggleShare} : any) => {
  return (
    <div className="m-9 flex justify-between">   
    <h1 className="text-3xl font-semibold">All Notes</h1>
    <div className="flex justify-end gap-3">
    <Button 
    variant="primary" 
    startIcon = {<PlusIcon size="md"/>} 
    size="sm" 
    text="Add Content" 
    onClick={()=> updateMenu()}>
    </Button>

    <Button 
    variant="secondary"
    size="sm"
    text="Share Brain"
    onClick={()=> toggleShare()}
    startIcon={<ShareIcon size= "md" />} />
    </div>
    </div>
  )
}

export default Header