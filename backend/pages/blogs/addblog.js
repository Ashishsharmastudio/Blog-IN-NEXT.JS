import Blog from "@/components/Blog";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function Addblog() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
      if (!session) {
        router.push('/login');
      }
    }
  }, [session, status, router]);

  if (isLoading) {
    return (
      <div className="loadingdata flex flex-col flex-center wh_100">
        <Loading />
        <h1>Loading ....</h1>
      </div>
    );
  }

  if (!session) {
    return null; // or a message saying "Redirecting to login..."
  }

  return (
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
        <Blog />
      </div>
    </div>
  );
}
