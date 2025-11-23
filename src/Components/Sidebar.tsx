import SidebarItem from "./Sidebaritem";
import TwitterIcon from "../icons/Twittericon";
import Youtubeicon from "../icons/Youtubeicon";
import Logo from "../icons/Logo";
export function Sidebar(){
return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-4">
        <div className=" flex text-2xl font-bold text-gray-700 pt-8 items-center">
           
           <div className="pr-4 text-purple-600">

           <Logo/>
           </div>
            Brainly
        </div>
        <div className="pt-8 pl-4">
            <SidebarItem icon={<TwitterIcon />} text="Twitter" />
            <SidebarItem icon={<Youtubeicon />} text="YouTube" />
        </div>

    </div>
)

}
export default Sidebar;