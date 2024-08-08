import Images from "../public/Imge.png";
import Image from "next/image";
import {useSession,signIn,signOut} from "next-auth/react";
import { useRouter } from 'next/router'; 
import Loading from "@/components/Loading";

export default function Login(){
  const { data: session,status } = useSession()
  if(status === "loading"){
    // loading State, loader or any other loader indicator
    return <div className="loadingdata flex flex-col flex-center wh_100">
      <Loading/>
      <h1>Loading ....</h1>

    </div>
  }
  const router = useRouter();
  async function login(){
    await router.push('/');
    await signIn();
  }
  if(session){
    router.push('/')
    return null; //return null or any lodaing indicator
  }
  // not session or not login then show this page for login
  if(!session){
     return<>
      <div className="loginfront flex flex-center flex-col full-w">
         <Image
          src={Images}
          heith={250}
          width={250}
          alt="image"
         />
         <h1>Welcome Admin of the tech blog service.</h1>
         <p>Visit our main website <a href="www.techblogservice.online">tech blog service</a> </p>
         <button onClick={login} className="mt-2 ">Login wiht google</button>
      </div>
    </>
  }
   
}