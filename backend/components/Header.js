import { HiBars3BottomLeft } from "react-icons/hi2";
import { GoScreenFull } from "react-icons/go";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdFullscreenExit } from "react-icons/md";
import { useState } from "react";
import { useSession } from "next-auth/react";





export default function Header(){
  const {data:session} = useSession();
  const [isFullscreen,setIsFullscreen] =useState(false);
  const toggleFullscreen = ()=>{
    if(!document.fullscreenElement){
      document.documentElement.requestFullscreen().then(()=>{
        setIsFullscreen(true)
      })
    }else{
     if(document.exitFullscreen){
      document.exitFullscreen().then(()=>{
        setIsFullscreen(false);
      })
     }
    }
  }
    return<>
      <header className="header flex flex-sb">
       <div className="logo flex gap-2">
          <h1>Admin</h1>
          <div className="headerham flex flex-center">
            <HiBars3BottomLeft/>
          </div>
        </div>
          <div className="rightnav flex gap-2">
             <div onClick={toggleFullscreen}>
                {isFullscreen ? <MdFullscreenExit/> : <GoScreenFull/>}
              
              
             </div>
             <div className="notification">
               <IoIosNotifications/>
             </div>
             <div className="profilenav">
              {
                session ? <img src={session.user.image} width={10} height={50} alt="user"/>:<CgProfile/>
              }
                
             </div>
          </div>
       
      </header>
    </>
}