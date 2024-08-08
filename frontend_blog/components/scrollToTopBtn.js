import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";


export default function scrollToTopBtn(){
    const [isVisible,setIsVisible] = useState(false);

    //function to scroll to the top of the page
    const scrollToTop =() =>{
        window.scrollTo({
            top:0,
            behavior:'smooth',
        });
    }
    //show or hide the button based on scroll position 
    const handleScroll= () =>{
        if(window.scrollY > 300){
           setIsVisible(true);
        }else{
           setIsVisible(false);
        }
    }

    //add scroll event listener when component mounts
    useEffect(()=>{
      window.addEventListener('scroll',handleScroll);
      return ()=>{
        window.removeEventListener('scroll',handleScroll);
      }
    },[])

    return<>
    <button className={`scrollToTop ${isVisible ? 'show' : 'hide'}`} onClick={scrollToTop}>
     <FaArrowUp/>
    </button>
    </>
}