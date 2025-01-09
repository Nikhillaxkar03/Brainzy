import { FiTwitter, FiYoutube } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { PiLinkSimpleBold } from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";

const sidemenuData = [
  {
    logo: <IoHomeOutline />,
    title: "Home",
    type: "home",
    key: "hm",
  },

  {
    logo: <FiTwitter />,
    title: "Tweets",
    type: "twitter",
    key: "tw",
  },
  {
    logo: <FiYoutube />,
    title: "Videos",
    type: "youtube",
    key: "yt",
  },
  {
    logo: <HiOutlineDocumentText />,
    title: "Documents",
    type: "article",
    key: "dc",
  },
  {
    logo: <PiLinkSimpleBold />,
    title: "Links",
    type: 'website',
    key: "li",
  },
];

export { sidemenuData };
