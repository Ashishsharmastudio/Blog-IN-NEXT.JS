import Images from "../public/Imge.png";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/router';
import Loading from "@/components/Loading";
import { useEffect } from 'react';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/').catch(console.error);
    }
  }, [session, router]);
  
  async function login() {
    try {
      await signIn();
      await router.push('/');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }
  

  if (status === "loading") {
    return (
      <div className="loadingdata flex flex-col flex-center wh_100">
        <Loading />
        <h1>Loading ....</h1>
      </div>
    );
  }

  if (session) {
    return null; // or a loading indicator
  }

  return (
    <div className="loginfront flex flex-center flex-col full-w">
      <Image
        src={Images}
        height={250}
        width={250}
        alt="image"
      />
      <h1>Welcome Admin of the tech blog service.</h1>
      <p>Visit our main website <a href="https://www.ashishsharmablog.tech">Ashish sharma blog</a></p>
      <button onClick={login} className="mt-2">Login with google</button>
    </div>
  );
}
