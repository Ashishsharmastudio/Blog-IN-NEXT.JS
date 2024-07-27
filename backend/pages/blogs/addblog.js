import Blog from "@/components/Blog";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";



export default function Addblog() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // check if there's no active session and redirect to login page
    if (!session) {
      router.push('/login')
    }

    if (status === "loading") {
      // loading State, loader or any other loader indicator
      return <div className="loadingdata flex flex-col flex-center wh_100">
        <Loading />
        <h1>Loading ....</h1>

      </div>
    }
  }, [session, router]);

  if (session) {
    return <>
      <div className="addblogspage">
        <div className="titledashboard flex flex-sb">
          <div data-aos="fade-right">
            <h2>All <span>Blog</span></h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb" data-aos="fade-left">
            <MdOutlineAddPhotoAlternate /> <span>/</span> <span>Addblog</span>
          </div>
        </div>
        <div className="blogsadd">
           <Blog/>
        </div>
      </div>
    </>
  }

}