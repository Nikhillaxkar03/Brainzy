import { FiTwitter, FiYoutube } from "react-icons/fi"
import { HiOutlineDocumentText } from "react-icons/hi"
import { PiLinkSimpleBold } from "react-icons/pi";
import { FaHashtag } from "react-icons/fa";

const sidemenuData = [
    {
        logo: <FiTwitter />,
        title: 'Tweets',
        key: "tw"
    }, 
    {
        logo: <FiYoutube />,
        title: 'Videos',
        key: "yt"
    }, 
    {
        logo: <HiOutlineDocumentText />,
        title: 'Documents',
        key: "dc"
    }, 
    {
        logo: <PiLinkSimpleBold />,
        title: 'Links',
        key: "li"
    },
    {
        logo: <FaHashtag />,
        title: 'Tags',
        key: "tg"
    }
]

export {sidemenuData}