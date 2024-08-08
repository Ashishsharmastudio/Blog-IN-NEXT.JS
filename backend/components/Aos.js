import { useEffect } from "react";
import AOS from 'aos'
import 'aos/dist/aos.css' // fix animation 
export default function Aos({children}){
    useEffect(()=>{
      AOS.init({
        // gloval settings for aos animation 
        duration:1000,  // duration of the animation 1 second
        offset:200, // offset (in px ) from the original trigger point
        easing:'ease', //default easing for aos animation 
        once:true, //whether animation should happen only once - while scrolling 
      });
    },[]);
    return <div>{children}</div> 
}